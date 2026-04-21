-- Supabase Setup Script for PROXIMAX
-- Tables: founder_info, blogs, contacts, case_studies, services
-- Features: Real-time, Triggers, Functions, Storage, Security

-- 1. EXTENSIONS
create extension if not exists "uuid-ossp";

-- 2. FOUNDER INFO TABLE
create table if not exists public.founder_info (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    role text not null,
    image_url text,
    bio text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Real-time for founder_info
alter publication supabase_realtime add table founder_info;

-- 3. BLOGS TABLE
create table if not exists public.blogs (
    id uuid primary key default uuid_generate_v4(),
    title text not null,
    slug text not null unique,
    category text not null,
    excerpt text,
    content text,
    banner text,
    author text,
    date date default current_date,
    read_time integer,
    meta_title text,
    meta_description text,
    keywords text[],
    faqs jsonb default '[]'::jsonb,
    is_featured boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null,
    updated_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Index for slug
create index if not exists blogs_slug_idx on public.blogs (slug);

-- 4. CONTACTS TABLE (Leads)
create table if not exists public.contacts (
    id uuid primary key default uuid_generate_v4(),
    name text not null,
    email text,
    phone text,
    business_name text,
    service_requested text,
    budget_range text,
    message text,
    status text default 'new', -- new, contacted, closed, spam
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. CASE STUDIES TABLE
create table if not exists public.case_studies (
    id text primary key, -- using readable IDs like cs1, cs2
    title text not null,
    category text not null,
    client text,
    stat text,
    stat_label text,
    description text,
    challenge text,
    solution text,
    results text[],
    image text,
    created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. TRIGGERS FOR UPDATED_AT
create or replace function public.handle_updated_at()
returns trigger as $$
begin
    new.updated_at = now();
    return new;
end;
$$ language plpgsql;

create trigger set_updated_at_founder
before update on public.founder_info
for each row execute procedure public.handle_updated_at();

create trigger set_updated_at_blogs
before update on public.blogs
for each row execute procedure public.handle_updated_at();

-- 7. STORAGE BUCKETS
-- Note: Buckets are usually created via UI or Admin API, but these policies assume they exist.
-- Buckets to create manually: 'founder-assets', 'blog-banners'

-- 8. SECURITY RULES (RLS)
-- Enable RLS on all tables
alter table public.founder_info enable row level security;
alter table public.blogs enable row level security;
alter table public.contacts enable row level security;
alter table public.case_studies enable row level security;

-- Founder Info Policies
create policy "Allow public read for founder info" on public.founder_info for select using (true);
create policy "Allow authenticated update for founder info" on public.founder_info for update using (auth.role() = 'authenticated');

-- Blogs Policies
create policy "Allow public read for blogs" on public.blogs for select using (true);
create policy "Allow authenticated write for blogs" on public.blogs for all using (auth.role() = 'authenticated');

-- Contacts Policies
create policy "Allow public insert for contacts" on public.contacts for insert with check (true);
create policy "Allow authenticated read for contacts" on public.contacts for select using (auth.role() = 'authenticated');

-- Case Studies Policies
create policy "Allow public read for case studies" on public.case_studies for select using (true);

-- 9. INITIAL DATA SEEDING (Optional)
insert into public.founder_info (name, role, image_url)
values ('Rajendar Rana', 'Founder & CEO', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e')
on conflict do nothing;

-- 10. REAL-TIME CAPABILITIES
-- Real-time is managed by adding tables to the 'supabase_realtime' publication
-- which we did for founder_info. You can add others as needed.
-- alter publication supabase_realtime add table blogs;

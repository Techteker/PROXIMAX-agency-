-- PROXIMAX Supabase Schema Setup

-- 1. Blogs Table
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  author TEXT DEFAULT 'PROXIMAX Team',
  date DATE DEFAULT CURRENT_DATE,
  read_time INTEGER,
  category TEXT,
  image_url TEXT
);

-- 2. Case Studies Table
CREATE TABLE IF NOT EXISTS case_studies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  title TEXT NOT NULL,
  subheadline TEXT,
  client_overview TEXT,
  problem JSONB, -- Array of strings
  goal JSONB,    -- Array of strings
  strategy JSONB, -- Array of strings
  execution TEXT,
  results JSONB,  -- Array of strings
  feedback TEXT,
  takeaways JSONB, -- Array of strings
  category TEXT
);

-- 3. Internship Applications Table
CREATE TABLE IF NOT EXISTS internship_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  city TEXT NOT NULL,
  position TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending' -- pending, reviewed, accepted, rejected
);

-- 4. Influencer Applications Table
CREATE TABLE IF NOT EXISTS influencer_applications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  city TEXT NOT NULL,
  platform TEXT NOT NULL,
  profile_link TEXT NOT NULL,
  followers TEXT NOT NULL,
  message TEXT,
  status TEXT DEFAULT 'pending'
);

-- 5. Contact Inquiries Table
CREATE TABLE IF NOT EXISTS contact_inquiries (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  whatsapp TEXT NOT NULL,
  business_type TEXT,
  message TEXT,
  status TEXT DEFAULT 'new'
);

-- 6. FAQs Table
CREATE TABLE IF NOT EXISTS faqs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT DEFAULT 'General',
  display_order INTEGER DEFAULT 0
);

-- 7. Founder Info Table
CREATE TABLE IF NOT EXISTS founder_info (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  bio TEXT NOT NULL,
  image_url TEXT,
  social_links JSONB -- { twitter, linkedin, instagram }
);

-- Enable Row Level Security (RLS)
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE case_studies ENABLE ROW LEVEL SECURITY;
ALTER TABLE internship_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE influencer_applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE founder_info ENABLE ROW LEVEL SECURITY;

-- RLS Policies

-- Blogs: Everyone can read, only authenticated (admin) can write
CREATE POLICY "Allow public read blogs" ON blogs FOR SELECT USING (true);
CREATE POLICY "Allow admin write blogs" ON blogs FOR ALL USING (auth.role() = 'service_role');

-- Case Studies: Everyone can read, only authenticated (admin) can write
CREATE POLICY "Allow public read case_studies" ON case_studies FOR SELECT USING (true);
CREATE POLICY "Allow admin write case_studies" ON case_studies FOR ALL USING (auth.role() = 'service_role');

-- Internship Applications: Public can insert, only admin can read/write
CREATE POLICY "Allow public insert internship" ON internship_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin manage internship" ON internship_applications FOR ALL USING (auth.role() = 'service_role');

-- Influencer Applications: Public can insert, only admin can read/write
CREATE POLICY "Allow public insert influencer" ON influencer_applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin manage influencer" ON influencer_applications FOR ALL USING (auth.role() = 'service_role');

-- Contact Inquiries: Public can insert, only admin can read/write
CREATE POLICY "Allow public insert contact" ON contact_inquiries FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow admin manage contact" ON contact_inquiries FOR ALL USING (auth.role() = 'service_role');

-- FAQs: Everyone can read, only admin can write
CREATE POLICY "Allow public read faqs" ON faqs FOR SELECT USING (true);
CREATE POLICY "Allow admin manage faqs" ON faqs FOR ALL USING (auth.role() = 'service_role');

-- Founder Info: Everyone can read, only admin can write
CREATE POLICY "Allow public read founder" ON founder_info FOR SELECT USING (true);
CREATE POLICY "Allow admin manage founder" ON founder_info FOR ALL USING (auth.role() = 'service_role');

-- Helper Function to seed initial data (optional but helpful)
-- You can run this manually in the SQL editor if needed.

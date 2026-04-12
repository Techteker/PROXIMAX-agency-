import { createClient } from '@supabase/supabase-js';

// Use environment variables if available, otherwise fallback to provided credentials for immediate preview functionality
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://dfdbcojizrhumxdekpvq.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmZGJjb2ppenJodW14ZGVrcHZxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU4MjczOTYsImV4cCI6MjA5MTQwMzM5Nn0.NlERfRn_HS1m6KiVzc4J8UXwnVvGlgBC9mP60LeyJGM';

if (!supabaseUrl || supabaseUrl === 'https://your-project-url.supabase.co') {
  console.error('Supabase URL is missing or invalid. Please set VITE_SUPABASE_URL in your environment.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

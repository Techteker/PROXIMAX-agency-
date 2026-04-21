import { supabase } from '../lib/supabase';

/**
 * Example service for Supabase operations.
 * These functions are ready to be used in your components.
 */

// 1. Fetch all users from "users" table
export const fetchUsers = async () => {
  const { data, error } = await supabase
    .from('users')
    .select('*');
  
  if (error) {
    console.error('Error fetching users:', error.message);
    return null;
  }
  return data;
};

// 2. Insert a new user into "users" table
export const insertUser = async (userData: { name: string; email: string; role?: string }) => {
  const { data, error } = await supabase
    .from('users')
    .insert([userData])
    .select();

  if (error) {
    console.error('Error inserting user:', error.message);
    return null;
  }
  return data;
};

// 3. Simple Authentication: Sign Up
export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) {
    console.error('Sign up error:', error.message);
    return { success: false, error: error.message };
  }
  return { success: true, data };
};

// 4. Simple Authentication: Login
export const login = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error('Login error:', error.message);
    return { success: false, error: error.message };
  }
  return { success: true, data };
};

// 5. Sign Out
export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) {
    console.error('Sign out error:', error.message);
  }
};

// --- PROXIMAX SPECIFIC FUNCTIONS ---

// 6. Submit Internship Application
export const submitInternshipApplication = async (application: {
  fullName: string;
  email: string;
  whatsapp: string;
  city: string;
  position: string;
  message: string;
}) => {
  const { data, error } = await supabase
    .from('internship_applications')
    .insert([{
      full_name: application.fullName,
      email: application.email,
      whatsapp: application.whatsapp,
      city: application.city,
      position: application.position,
      message: application.message
    }])
    .select();

  if (error) throw error;
  return data;
};

// 7. Submit Influencer Application
export const submitInfluencerApplication = async (application: {
  fullName: string;
  email: string;
  whatsapp: string;
  city: string;
  platform: string;
  profileLink: string;
  followers: string;
  message: string;
}) => {
  const { data, error } = await supabase
    .from('influencer_applications')
    .insert([{
      full_name: application.fullName,
      email: application.email,
      whatsapp: application.whatsapp,
      city: application.city,
      platform: application.platform,
      profile_link: application.profileLink,
      followers: application.followers,
      message: application.message
    }])
    .select();

  if (error) throw error;
  return data;
};

// 8. Submit Contact Inquiry
export const submitContactInquiry = async (inquiry: {
  name: string;
  email: string;
  whatsapp: string;
  businessType: string;
  message: string;
}) => {
  const { data, error } = await supabase
    .from('contact_inquiries')
    .insert([{
      name: inquiry.name,
      email: inquiry.email,
      whatsapp: inquiry.whatsapp,
      business_type: inquiry.businessType,
      message: inquiry.message
    }])
    .select();

  if (error) throw error;
  return data;
};

// 9. Fetch Blogs
export const fetchBlogs = async () => {
  const { data, error } = await supabase
    .from('blogs')
    .select('*')
    .order('date', { ascending: false });
  
  if (error) throw error;
  return data;
};

// 10. Fetch Case Studies
export const fetchCaseStudies = async () => {
  const { data, error } = await supabase
    .from('case_studies')
    .select('*');
  
  if (error) throw error;
  return data;
};

// 11. Fetch FAQs
export const fetchFAQs = async () => {
  const { data, error } = await supabase
    .from('faqs')
    .select('*')
    .order('display_order', { ascending: true });
  
  if (error) throw error;
  return data;
};

// 12. Fetch Founder Info
export const fetchFounderInfo = async () => {
  const { data, error } = await supabase
    .from('founder_info')
    .select('*')
    .limit(1);
  
  if (error && error.code !== 'PGRST116') throw error; 
  return data && data.length > 0 ? data[0] : null;
};

// 13. Upsert Founder Info (Create if not exists)
export const upsertFounderInfo = async (updates: any) => {
  // If we have an ID, we target that specific record
  // If not, we just upsert (assuming a single record design or using a static ID)
  const { data, error } = await supabase
    .from('founder_info')
    .upsert([updates])
    .select();

  if (error) throw error;
  return data && data.length > 0 ? data[0] : null;
};

// 14. Upload Founder Image
export const uploadFounderImage = async (file: File) => {
  const fileExt = file.name.split('.').pop();
  const fileName = `founder_${Math.random()}.${fileExt}`;
  const filePath = `public/${fileName}`;

  // Using the bucket name "PROXIMAX" as configured by the user
  const { error: uploadError } = await supabase.storage
    .from('PROXIMAX')
    .upload(filePath, file, {
      cacheControl: '3600',
      upsert: false
    });

  if (uploadError) {
    throw uploadError;
  }

  const { data } = supabase.storage
    .from('PROXIMAX')
    .getPublicUrl(filePath);

  return data.publicUrl;
};

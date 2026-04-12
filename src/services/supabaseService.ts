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
    .single();
  
  if (error && error.code !== 'PGRST116') throw error; // PGRST116 is "no rows returned"
  return data;
};

// 13. Admin: Fetch All Applications (Generic)
export const fetchAdminData = async (table: string) => {
  const { data, error } = await supabase
    .from(table)
    .select('*')
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
};

// 14. Admin: Update Application Status
export const updateApplicationStatus = async (table: string, id: string, status: string) => {
  const { data, error } = await supabase
    .from(table)
    .update({ status })
    .eq('id', id)
    .select();
  
  if (error) throw error;
  return data;
};

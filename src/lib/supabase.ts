import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface SiteLink {
  title: string;
  url: string;
}

export interface EmailTemplate {
  id: string;
  logo_url: string;
  email_text: string;
  manager_name: string;
  manager_phone: string;
  manager_email: string;
  site_links: SiteLink[];
  presentation_url: string;
  presentation_button_text: string;
  created_at: string;
  updated_at: string;
}

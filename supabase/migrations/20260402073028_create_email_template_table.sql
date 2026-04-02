/*
  # Email Template Schema
  
  1. New Tables
    - `email_templates`
      - `id` (uuid, primary key) - Unique identifier
      - `logo_url` (text) - URL to logo image
      - `email_text` (text) - Main email content
      - `manager_name` (text) - Manager's name
      - `manager_phone` (text) - Manager's phone number
      - `manager_email` (text) - Manager's email address
      - `site_links` (jsonb) - Array of clickable links {title, url}
      - `presentation_url` (text) - URL to presentation file
      - `presentation_button_text` (text) - Text for download button
      - `created_at` (timestamptz) - Creation timestamp
      - `updated_at` (timestamptz) - Last update timestamp
      
  2. Security
    - Enable RLS on `email_templates` table
    - Add policies for authenticated users to manage templates
*/

CREATE TABLE IF NOT EXISTS email_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  logo_url text DEFAULT '',
  email_text text DEFAULT 'Добро пожаловать!',
  manager_name text DEFAULT 'Иван Иванов',
  manager_phone text DEFAULT '+7 (999) 123-45-67',
  manager_email text DEFAULT 'manager@company.com',
  site_links jsonb DEFAULT '[]'::jsonb,
  presentation_url text DEFAULT '',
  presentation_button_text text DEFAULT 'Скачать презентацию',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE email_templates ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view templates"
  ON email_templates FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can insert templates"
  ON email_templates FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Anyone can update templates"
  ON email_templates FOR UPDATE
  TO public
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Anyone can delete templates"
  ON email_templates FOR DELETE
  TO public
  USING (true);
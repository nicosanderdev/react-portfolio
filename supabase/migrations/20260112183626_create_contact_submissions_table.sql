-- Create contact_submissions table
CREATE TABLE contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  phone TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow inserts from service role (for Edge Functions)
CREATE POLICY "Allow service role inserts" ON contact_submissions
  FOR INSERT
  WITH CHECK (true);

-- Create policy to allow service role selects (optional, for admin access)
CREATE POLICY "Allow service role selects" ON contact_submissions
  FOR SELECT
  USING (true);
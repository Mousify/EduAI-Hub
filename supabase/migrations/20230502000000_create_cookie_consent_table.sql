CREATE TABLE IF NOT EXISTS cookie_consent (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  necessary BOOLEAN NOT NULL DEFAULT true,
  analytics BOOLEAN NOT NULL DEFAULT false,
  marketing BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Create policy to allow users to read their own cookie consent
CREATE POLICY "Users can read their own cookie consent"
  ON cookie_consent
  FOR SELECT
  USING (auth.uid() = user_id);

-- Create policy to allow users to update their own cookie consent
CREATE POLICY "Users can update their own cookie consent"
  ON cookie_consent
  FOR UPDATE
  USING (auth.uid() = user_id);

-- Create policy to allow users to insert their own cookie consent
CREATE POLICY "Users can insert their own cookie consent"
  ON cookie_consent
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS changelog (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  version VARCHAR(255) NOT NULL,
  release_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  title VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  changes JSONB NOT NULL,
  is_major BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW()
);

-- Add some initial changelog entries
INSERT INTO changelog (version, release_date, title, description, changes, is_major)
VALUES 
  ('1.2.0', NOW(), 'Major Platform Update', 'Introducing new learning features and UI improvements', 
   '[
      {"type": "feature", "description": "Added dual practice modes: Test and Learning"},
      {"type": "feature", "description": "Implemented dark/light theme support"},
      {"type": "improvement", "description": "Enhanced UI with animations and microinteractions"},
      {"type": "fix", "description": "Fixed login redirection issues"}
    ]'::jsonb, 
   TRUE),
  ('1.1.5', NOW() - INTERVAL '7 days', 'Performance Improvements', 'Backend optimizations and bug fixes', 
   '[
      {"type": "improvement", "description": "Improved page load times by 30%"},
      {"type": "fix", "description": "Fixed issue with file uploads in resources section"},
      {"type": "fix", "description": "Corrected display of math equations in tutoring sessions"}
    ]'::jsonb, 
   FALSE),
  ('1.1.0', NOW() - INTERVAL '21 days', 'New Teacher Tools', 'Added new tools for teachers', 
   '[
      {"type": "feature", "description": "Added lesson plan generator"},
      {"type": "feature", "description": "Added quiz generator with AI assistance"},
      {"type": "improvement", "description": "Enhanced student analytics dashboard"}
    ]'::jsonb, 
   TRUE);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS changelog_release_date_idx ON changelog (release_date DESC);

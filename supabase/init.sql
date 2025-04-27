-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  auth_id UUID NOT NULL UNIQUE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('student', 'teacher', 'admin')),
  avatar_url TEXT,
  grade_level INTEGER,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Students Table (extends users)
CREATE TABLE IF NOT EXISTS students (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  grade_level INTEGER,
  school TEXT,
  parent_email TEXT,
  learning_goals TEXT,
  preferred_subjects TEXT[],
  learning_style TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Teachers Table (extends users)
CREATE TABLE IF NOT EXISTS teachers (
  user_id UUID PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
  subjects TEXT[],
  bio TEXT,
  education TEXT,
  years_experience INTEGER,
  certifications TEXT[],
  teaching_philosophy TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subscriptions Table
CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  plan TEXT NOT NULL CHECK (plan IN ('free', 'bronze', 'silver', 'gold')),
  status TEXT NOT NULL CHECK (status IN ('active', 'canceled', 'past_due', 'trialing')),
  current_period_start TIMESTAMP WITH TIME ZONE NOT NULL,
  current_period_end TIMESTAMP WITH TIME ZONE NOT NULL,
  cancel_at_period_end BOOLEAN NOT NULL DEFAULT FALSE,
  stripe_customer_id TEXT,
  stripe_subscription_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Token Usage Table
CREATE TABLE IF NOT EXISTS token_usage (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  subscription_id UUID REFERENCES subscriptions(id),
  tokens_used INTEGER NOT NULL DEFAULT 0,
  tokens_remaining INTEGER NOT NULL DEFAULT 0,
  reset_date TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT NOW() + INTERVAL '30 days',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Invoices Table
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  subscription_id UUID REFERENCES subscriptions(id) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('paid', 'open', 'void', 'uncollectible')),
  paid_at TIMESTAMP WITH TIME ZONE,
  stripe_invoice_id TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Subjects Table
CREATE TABLE IF NOT EXISTS subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  description TEXT,
  grade_level INTEGER[] NOT NULL,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Topics Table
CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID REFERENCES subjects(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  difficulty_level TEXT CHECK (difficulty_level IN ('beginner', 'intermediate', 'advanced')),
  estimated_duration INTEGER, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tutoring Sessions Table
CREATE TABLE IF NOT EXISTS tutoring_sessions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  subject_id UUID REFERENCES subjects(id),
  topic_id UUID REFERENCES topics(id),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('text', 'image', 'voice', 'file')),
  status TEXT NOT NULL CHECK (status IN ('active', 'completed', 'saved')),
  tokens_used INTEGER NOT NULL DEFAULT 0,
  rating INTEGER CHECK (rating BETWEEN 1 AND 5),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Session Messages Table
CREATE TABLE IF NOT EXISTS session_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES tutoring_sessions(id) NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'system', 'assistant')),
  content TEXT NOT NULL,
  media_url TEXT,
  media_type TEXT,
  tokens INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Session Feedback Table
CREATE TABLE IF NOT EXISTS session_feedback (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES tutoring_sessions(id) NOT NULL,
  message_id UUID REFERENCES session_messages(id),
  rating INTEGER NOT NULL CHECK (rating BETWEEN 1 AND 5),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Practice Questions Table
CREATE TABLE IF NOT EXISTS practice_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  topic_id UUID REFERENCES topics(id) NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('multiple_choice', 'true_false', 'short_answer', 'essay', 'problem_solving')),
  difficulty TEXT NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  question TEXT NOT NULL,
  options JSONB, -- For multiple choice
  answer TEXT NOT NULL,
  explanation TEXT,
  tags TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessments Table
CREATE TABLE IF NOT EXISTS assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  subject_id UUID REFERENCES subjects(id) NOT NULL,
  topic_ids UUID[] NOT NULL,
  due_date TIMESTAMP WITH TIME ZONE,
  time_limit INTEGER, -- in minutes
  passing_score INTEGER, -- percentage
  is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Assessment Questions Table
CREATE TABLE IF NOT EXISTS assessment_questions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID REFERENCES assessments(id) NOT NULL,
  question_id UUID REFERENCES practice_questions(id) NOT NULL,
  points INTEGER NOT NULL DEFAULT 1,
  "order" INTEGER NOT NULL
);

-- Student Assessments Table
CREATE TABLE IF NOT EXISTS student_assessments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assessment_id UUID REFERENCES assessments(id) NOT NULL,
  student_id UUID REFERENCES users(id) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('assigned', 'in_progress', 'completed', 'graded')),
  score DECIMAL(5, 2),
  feedback TEXT,
  started_at TIMESTAMP WITH TIME ZONE,
  submitted_at TIMESTAMP WITH TIME ZONE,
  graded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Answers Table
CREATE TABLE IF NOT EXISTS student_answers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_assessment_id UUID REFERENCES student_assessments(id) NOT NULL,
  question_id UUID REFERENCES practice_questions(id) NOT NULL,
  answer TEXT NOT NULL,
  is_correct BOOLEAN,
  points DECIMAL(5, 2),
  feedback TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Classes Table
CREATE TABLE IF NOT EXISTS classes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES users(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  grade_level INTEGER NOT NULL,
  subject TEXT NOT NULL,
  room_number TEXT,
  schedule TEXT,
  start_date DATE,
  end_date DATE,
  class_code TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Class Enrollments Table
CREATE TABLE IF NOT EXISTS class_enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  class_id UUID REFERENCES classes(id) NOT NULL,
  student_id UUID REFERENCES users(id) NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'pending')),
  joined_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Student Progress Table
CREATE TABLE IF NOT EXISTS student_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID REFERENCES users(id) NOT NULL,
  subject_id UUID REFERENCES subjects(id) NOT NULL,
  topic_id UUID REFERENCES topics(id) NOT NULL,
  proficiency_level TEXT NOT NULL CHECK (proficiency_level IN ('beginner', 'intermediate', 'advanced', 'mastery')),
  sessions_completed INTEGER NOT NULL DEFAULT 0,
  questions_answered INTEGER NOT NULL DEFAULT 0,
  correct_answers INTEGER NOT NULL DEFAULT 0,
  time_spent INTEGER NOT NULL DEFAULT 0, -- in minutes
  last_activity_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Learning Streaks Table
CREATE TABLE IF NOT EXISTS learning_streaks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  current_streak INTEGER NOT NULL DEFAULT 0,
  longest_streak INTEGER NOT NULL DEFAULT 0,
  last_activity_date DATE NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Files Table
CREATE TABLE IF NOT EXISTS files (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  name TEXT NOT NULL,
  path TEXT NOT NULL,
  size INTEGER NOT NULL,
  type TEXT NOT NULL,
  metadata JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  type TEXT NOT NULL,
  read BOOLEAN NOT NULL DEFAULT FALSE,
  action_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Study Guides Table
CREATE TABLE IF NOT EXISTS study_guides (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  subject_id UUID REFERENCES subjects(id),
  topic_id UUID REFERENCES topics(id),
  content TEXT NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Lesson Plans Table
CREATE TABLE IF NOT EXISTS lesson_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  teacher_id UUID REFERENCES users(id) NOT NULL,
  title TEXT NOT NULL,
  subject_id UUID REFERENCES subjects(id),
  grade_level INTEGER,
  objectives TEXT[],
  content TEXT NOT NULL,
  resources TEXT[],
  duration INTEGER, -- in minutes
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Collaborative Documents Table
CREATE TABLE IF NOT EXISTS collaborative_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT,
  owner_id UUID REFERENCES users(id) NOT NULL,
  is_public BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Document Collaborators Table
CREATE TABLE IF NOT EXISTS document_collaborators (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID REFERENCES collaborative_documents(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  permission TEXT NOT NULL CHECK (permission IN ('view', 'edit', 'admin')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Document History Table
CREATE TABLE IF NOT EXISTS document_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  document_id UUID REFERENCES collaborative_documents(id) NOT NULL,
  user_id UUID REFERENCES users(id) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Language Preferences Table
CREATE TABLE IF NOT EXISTS language_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  primary_language TEXT NOT NULL,
  secondary_languages TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Accessibility Preferences Table
CREATE TABLE IF NOT EXISTS accessibility_preferences (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) NOT NULL,
  high_contrast BOOLEAN NOT NULL DEFAULT FALSE,
  font_size TEXT NOT NULL DEFAULT 'medium',
  reduced_motion BOOLEAN NOT NULL DEFAULT FALSE,
  screen_reader_compatible BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert some initial subjects
INSERT INTO subjects (name, description, grade_level, icon, color)
VALUES 
  ('Mathematics', 'Study of numbers, quantities, and shapes', ARRAY[5, 6, 7, 8, 9, 10, 11, 12], 'calculator', '#4CAF50'),
  ('Science', 'Study of the natural world', ARRAY[5, 6, 7, 8, 9, 10, 11, 12], 'flask', '#2196F3'),
  ('English', 'Study of language and literature', ARRAY[5, 6, 7, 8, 9, 10, 11, 12], 'book', '#9C27B0'),
  ('History', 'Study of past events', ARRAY[5, 6, 7, 8, 9, 10, 11, 12], 'landmark', '#FF9800'),
  ('Computer Science', 'Study of computers and computational systems', ARRAY[9, 10, 11, 12], 'code', '#607D8B'),
  ('Art', 'Study of visual arts and creative expression', ARRAY[5, 6, 7, 8, 9, 10, 11, 12], 'palette', '#E91E63'),
  ('Music', 'Study of musical theory and performance', ARRAY[5, 6, 7, 8, 9, 10, 11, 12], 'music', '#9E9E9E'),
  ('Physical Education', 'Study of physical fitness and health', ARRAY[5, 6, 7, 8, 9, 10, 11, 12], 'activity', '#795548');

-- Insert some initial topics for Mathematics
INSERT INTO topics (subject_id, name, description, difficulty_level, estimated_duration)
VALUES 
  ((SELECT id FROM subjects WHERE name = 'Mathematics'), 'Algebra', 'Study of mathematical symbols and the rules for manipulating these symbols', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'Mathematics'), 'Geometry', 'Study of shapes, sizes, relative positions of figures', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'Mathematics'), 'Calculus', 'Study of continuous change and its applications', 'advanced', 90),
  ((SELECT id FROM subjects WHERE name = 'Mathematics'), 'Statistics', 'Study of the collection, analysis, interpretation, and presentation of data', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'Mathematics'), 'Trigonometry', 'Study of relationships between angles and sides of triangles', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'Mathematics'), 'Number Theory', 'Study of integers and integer-valued functions', 'advanced', 75),
  ((SELECT id FROM subjects WHERE name = 'Mathematics'), 'Linear Algebra', 'Study of linear equations and their representations', 'advanced', 90),
  ((SELECT id FROM subjects WHERE name = 'Mathematics'), 'Probability', 'Study of numerical descriptions of likelihood', 'intermediate', 60);

-- Insert some initial topics for Science
INSERT INTO topics (subject_id, name, description, difficulty_level, estimated_duration)
VALUES 
  ((SELECT id FROM subjects WHERE name = 'Science'), 'Biology', 'Study of living organisms', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'Science'), 'Chemistry', 'Study of matter and its properties', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'Science'), 'Physics', 'Study of matter, energy, and their interactions', 'advanced', 75),
  ((SELECT id FROM subjects WHERE name = 'Science'), 'Earth Science', 'Study of the Earth and its surroundings', 'beginner', 45),
  ((SELECT id FROM subjects WHERE name = 'Science'), 'Astronomy', 'Study of celestial objects and phenomena', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'Science'), 'Environmental Science', 'Study of the environment and solutions to environmental problems', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'Science'), 'Genetics', 'Study of genes, heredity, and variation', 'advanced', 75),
  ((SELECT id FROM subjects WHERE name = 'Science'), 'Ecology', 'Study of organisms and their interactions with the environment', 'intermediate', 60);

-- Insert some initial topics for English
INSERT INTO topics (subject_id, name, description, difficulty_level, estimated_duration)
VALUES 
  ((SELECT id FROM subjects WHERE name = 'English'), 'Grammar', 'Study of the rules governing the composition of clauses, phrases, and words', 'beginner', 45),
  ((SELECT id FROM subjects WHERE name = 'English'), 'Literature Analysis', 'Critical examination of literary works', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'English'), 'Creative Writing', 'Writing that expresses the writer's thoughts and feelings in an imaginative way', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'English'), 'Poetry', 'Literary work in which special intensity is given to the expression of feelings and ideas', 'intermediate', 45),
  ((SELECT id FROM subjects WHERE name = 'English'), 'Shakespeare', 'Study of the works of William Shakespeare', 'advanced', 75),
  ((SELECT id FROM subjects WHERE name = 'English'), 'Essay Writing', 'Composition on a particular subject', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'English'), 'Public Speaking', 'Art of effective oral communication with an audience', 'intermediate', 45),
  ((SELECT id FROM subjects WHERE name = 'English'), 'Debate', 'Formal discussion on a particular topic with opposing viewpoints', 'advanced', 60);

-- Insert some initial topics for History
INSERT INTO topics (subject_id, name, description, difficulty_level, estimated_duration)
VALUES 
  ((SELECT id FROM subjects WHERE name = 'History'), 'Ancient Civilizations', 'Study of early human societies', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'History'), 'World Wars', 'Study of the global conflicts of the 20th century', 'intermediate', 75),
  ((SELECT id FROM subjects WHERE name = 'History'), 'American Revolution', 'Study of the American colonial revolt against British rule', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'History'), 'Civil Rights Movement', 'Study of the struggle for social justice and equal rights', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'History'), 'Renaissance', 'Study of the period of European cultural, artistic, political and economic rebirth', 'intermediate', 60),
  ((SELECT id FROM subjects WHERE name = 'History'), 'Cold War', 'Study of the geopolitical tension after World War II', 'advanced', 75),
  ((SELECT id FROM subjects WHERE name = 'History'), 'Ancient Egypt', 'Study of one of the world's earliest and greatest civilizations', 'beginner', 45),
  ((SELECT id FROM subjects WHERE name = 'History'), 'Medieval Europe', 'Study of European history during the Middle Ages', 'intermediate', 60);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_tutoring_sessions_user_id ON tutoring_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_session_messages_session_id ON session_messages(session_id);
CREATE INDEX IF NOT EXISTS idx_practice_questions_topic_id ON practice_questions(topic_id);
CREATE INDEX IF NOT EXISTS idx_assessments_teacher_id ON assessments(teacher_id);
CREATE INDEX IF NOT EXISTS idx_student_assessments_student_id ON student_assessments(student_id);
CREATE INDEX IF NOT EXISTS idx_classes_teacher_id ON classes(teacher_id);
CREATE INDEX IF NOT EXISTS idx_class_enrollments_class_id ON class_enrollments(class_id);
CREATE INDEX IF NOT EXISTS idx_class_enrollments_student_id ON class_enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_student_progress_student_id ON student_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_notifications_user_id ON notifications(user_id);
CREATE INDEX IF NOT EXISTS idx_files_user_id ON files(user_id);
CREATE INDEX IF NOT EXISTS idx_study_guides_user_id ON study_guides(user_id);
CREATE INDEX IF NOT EXISTS idx_lesson_plans_teacher_id ON lesson_plans(teacher_id);
CREATE INDEX IF NOT EXISTS idx_collaborative_documents_owner_id ON collaborative_documents(owner_id);

-- Create RLS policies
-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE token_usage ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE tutoring_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE class_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE learning_streaks ENABLE ROW LEVEL SECURITY;
ALTER TABLE files ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE study_guides ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE collaborative_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_collaborators ENABLE ROW LEVEL SECURITY;
ALTER TABLE document_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE language_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE accessibility_preferences ENABLE ROW LEVEL SECURITY;

-- Create policies for users table
CREATE POLICY "Users can view their own data" ON users
  FOR SELECT USING (auth.uid() = auth_id);

CREATE POLICY "Users can update their own data" ON users
  FOR UPDATE USING (auth.uid() = auth_id);

-- Create policies for students table
CREATE POLICY "Students can view their own data" ON students
  FOR SELECT USING (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = students.user_id)
  );

CREATE POLICY "Students can update their own data" ON students
  FOR UPDATE USING (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = students.user_id)
  );

-- Create policies for teachers table
CREATE POLICY "Teachers can view their own data" ON teachers
  FOR SELECT USING (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = teachers.user_id)
  );

CREATE POLICY "Teachers can update their own data" ON teachers
  FOR UPDATE USING (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = teachers.user_id)
  );

-- Create policies for files table
CREATE POLICY "Users can view their own files" ON files
  FOR SELECT USING (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = files.user_id)
  );

CREATE POLICY "Users can insert their own files" ON files
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = files.user_id)
  );

CREATE POLICY "Users can update their own files" ON files
  FOR UPDATE USING (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = files.user_id)
  );

CREATE POLICY "Users can delete their own files" ON files
  FOR DELETE USING (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = files.user_id)
  );

-- Create policies for notifications table
CREATE POLICY "Users can view their own notifications" ON notifications
  FOR SELECT USING (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = notifications.user_id)
  );

CREATE POLICY "Users can update their own notifications" ON notifications
  FOR UPDATE USING (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = notifications.user_id)
  );

-- Create policies for study guides
CREATE POLICY "Users can view their own study guides" ON study_guides
  FOR SELECT USING (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = study_guides.user_id) OR is_public = true
  );

CREATE POLICY "Users can create their own study guides" ON study_guides
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = study_guides.user_id)
  );

CREATE POLICY "Users can update their own study guides" ON study_guides
  FOR UPDATE USING (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = study_guides.user_id)
  );

-- Create policies for collaborative documents
CREATE POLICY "Users can view documents they have access to" ON collaborative_documents
  FOR SELECT USING (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = collaborative_documents.owner_id) OR 
    auth.uid() IN (SELECT auth_id FROM users WHERE id IN (SELECT user_id FROM document_collaborators WHERE document_id = collaborative_documents.id)) OR
    is_public = true
  );

CREATE POLICY "Users can create their own documents" ON collaborative_documents
  FOR INSERT WITH CHECK (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = collaborative_documents.owner_id)
  );

CREATE POLICY "Users can update documents they own or can edit" ON collaborative_documents
  FOR UPDATE USING (
    auth.uid() IN (SELECT auth_id FROM users WHERE id = collaborative_documents.owner_id) OR
    auth.uid() IN (SELECT auth_id FROM users WHERE id IN (SELECT user_id FROM document_collaborators WHERE document_id = collaborative_documents.id AND permission IN ('edit', 'admin')))
  );

-- Create trigger function to create user profile after auth.users insert
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
  user_role TEXT;
  user_id UUID;
BEGIN
  -- Get the role from user metadata
  user_role := NEW.raw_user_meta_data->>'role';
  
  -- Insert into users table
  INSERT INTO public.users (auth_id, email, name, role, created_at, updated_at)
  VALUES (NEW.id, NEW.email, COALESCE(NEW.raw_user_meta_data->>'name', NEW.email), COALESCE(user_role, 'student'), NOW(), NOW())
  RETURNING id INTO user_id;
  
  -- Insert into role-specific table
  IF user_role = 'teacher' THEN
    INSERT INTO public.teachers (user_id, created_at, updated_at)
    VALUES (user_id, NOW(), NOW());
  ELSE
    INSERT INTO public.students (user_id, created_at, updated_at)
    VALUES (user_id, NOW(), NOW());
  END IF;
  
  -- Create a free subscription for the user
  INSERT INTO public.subscriptions (user_id, plan, status, current_period_start, current_period_end)
  VALUES (user_id, 'free', 'active', NOW(), NOW() + INTERVAL '1 year');
  
  -- Create default language preferences
  INSERT INTO public.language_preferences (user_id, primary_language)
  VALUES (user_id, 'en');
  
  -- Create default accessibility preferences
  INSERT INTO public.accessibility_preferences (user_id)
  VALUES (user_id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_students_updated_at BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_teachers_updated_at BEFORE UPDATE ON teachers
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

CREATE TRIGGER update_topics_updated_at BEFORE UPDATE ON topics
  FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Sample practice questions for Mathematics - Algebra
INSERT INTO practice_questions (topic_id, type, difficulty, question, options, answer, explanation, tags)
VALUES
  (
    (SELECT id FROM topics WHERE name = 'Algebra' LIMIT 1),
    'multiple_choice',
    'easy',
    'Solve for x: 2x + 5 = 15',
    '{"A": "x = 5", "B": "x = 10", "C": "x = 7.5", "D": "x = 5.5"}',
    'A',
    'To solve for x, subtract 5 from both sides: 2x = 10. Then divide both sides by 2: x = 5.',
    ARRAY['algebra', 'equations', 'linear']
  ),
  (
    (SELECT id FROM topics WHERE name = 'Algebra' LIMIT 1),
    'multiple_choice',
    'medium',
    'Simplify the expression: 3(2x - 4) + 5x',
    '{"A": "11x - 12", "B": "6x - 12", "C": "11x - 4", "D": "6x - 4"}',
    'A',
    'First distribute the 3: 3(2x - 4) = 6x - 12. Then add 5x: 6x - 12 + 5x = 11x - 12.',
    ARRAY['algebra', 'expressions', 'simplification']
  ),
  (
    (SELECT id FROM topics WHERE name = 'Algebra' LIMIT 1),
    'problem_solving',
    'hard',
    'A train travels at a speed of 60 mph. Another train leaves 2 hours later and travels at 75 mph in the same direction. How long will it take for the second train to catch up to the first train?',
    NULL,
    '8 hours',
    'Let t be the time (in hours) it takes for the second train to catch up. The first train travels for t+2 hours at 60 mph, so its distance is 60(t+2). The second train travels for t hours at 75 mph, so its distance is 75t. Setting these equal: 60(t+2) = 75t, 60t + 120 = 75t, 120 = 15t, t = 8.',
    ARRAY['algebra', 'word problems', 'rates']
  );

-- Sample practice questions for Science - Biology
INSERT INTO practice_questions (topic_id, type, difficulty, question, options, answer, explanation, tags)
VALUES
  (
    (SELECT id FROM topics WHERE name = 'Biology' LIMIT 1),
    'multiple_choice',
    'easy',
    'Which organelle is known as the "powerhouse of the cell"?',
    '{"A": "Nucleus", "B": "Mitochondria", "C": "Ribosome", "D": "Golgi apparatus"}',
    'B',
    'Mitochondria are called the "powerhouse of the cell" because they generate most of the cell''s supply of adenosine triphosphate (ATP), which is used as a source of chemical energy.',
    ARRAY['biology', 'cells', 'organelles']
  ),
  (
    (SELECT id FROM topics WHERE name = 'Biology' LIMIT 1),
    'true_false',
    'medium',
    'DNA replication is a semi-conservative process.',
    NULL,
    'True',
    'DNA replication is indeed semi-conservative, meaning that each new DNA molecule contains one original strand and one newly synthesized strand.',
    ARRAY['biology', 'DNA', 'replication']
  ),
  (
    (SELECT id FROM topics WHERE name = 'Biology' LIMIT 1),
    'short_answer',
    'hard',
    'Explain the process of photosynthesis and its importance for life on Earth.',
    NULL,
    'Photosynthesis is the process by which plants, algae, and some bacteria convert light energy into chemical energy. It uses carbon dioxide and water to produce glucose and oxygen. This process is crucial for life on Earth as it produces oxygen for respiration and serves as the base of most food chains.',
    'Photosynthesis can be summarized by the equation: 6CO2 + 6H2O + light energy → C6H12O6 + 6O2. It occurs in chloroplasts, specifically in the thylakoid membranes, and involves light-dependent and light-independent reactions.',
    ARRAY['biology', 'photosynthesis', 'plants']
  );

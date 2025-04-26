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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Topics Table
CREATE TABLE IF NOT EXISTS topics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  subject_id UUID REFERENCES subjects(id) NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
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
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Session Messages Table
CREATE TABLE IF NOT EXISTS session_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  session_id UUID REFERENCES tutoring_sessions(id) NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'system')),
  content TEXT NOT NULL,
  media_url TEXT,
  media_type TEXT,
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
  started_at TIMESTAMP WITH TIME ZONE,
  submitted_at TIMESTAMP WITH TIME ZONE,
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

-- Insert some initial subjects
INSERT INTO subjects (name, description, grade_level)
VALUES 
  ('Mathematics', 'Study of numbers, quantities, and shapes', ARRAY[5, 6, 7, 8, 9, 10, 11, 12]),
  ('Science', 'Study of the natural world', ARRAY[5, 6, 7, 8, 9, 10, 11, 12]),
  ('English', 'Study of language and literature', ARRAY[5, 6, 7, 8, 9, 10, 11, 12]),
  ('History', 'Study of past events', ARRAY[5, 6, 7, 8, 9, 10, 11, 12]);

-- Insert some initial topics for Mathematics
INSERT INTO topics (subject_id, name, description)
VALUES 
  ((SELECT id FROM subjects WHERE name = 'Mathematics'), 'Algebra', 'Study of mathematical symbols and the rules for manipulating these symbols'),
  ((SELECT id FROM subjects WHERE name = 'Mathematics'), 'Geometry', 'Study of shapes, sizes, relative positions of figures'),
  ((SELECT id FROM subjects WHERE name = 'Mathematics'), 'Calculus', 'Study of continuous change and its applications'),
  ((SELECT id FROM subjects WHERE name = 'Mathematics'), 'Statistics', 'Study of the collection, analysis, interpretation, and presentation of data');

-- Insert some initial topics for Science
INSERT INTO topics (subject_id, name, description)
VALUES 
  ((SELECT id FROM subjects WHERE name = 'Science'), 'Biology', 'Study of living organisms'),
  ((SELECT id FROM subjects WHERE name = 'Science'), 'Chemistry', 'Study of matter and its properties'),
  ((SELECT id FROM subjects WHERE name = 'Science'), 'Physics', 'Study of matter, energy, and their interactions'),
  ((SELECT id FROM subjects WHERE name = 'Science'), 'Earth Science', 'Study of the Earth and its surroundings');

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
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create the trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

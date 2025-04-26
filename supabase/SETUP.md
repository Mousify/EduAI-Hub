# Supabase Setup Guide for AI Tutoring & Classroom Hub

This guide will help you set up your Supabase project for the AI Tutoring & Classroom Hub application.

## 1. Create a Supabase Project

1. Go to [Supabase](https://supabase.com/) and sign in or create an account.
2. Create a new project and give it a name (e.g., "AI Tutoring Hub").
3. Choose a strong database password and save it securely.
4. Select a region closest to your users.
5. Wait for your project to be created.

## 2. Set Up Database Schema

1. In your Supabase project dashboard, navigate to the "SQL Editor" section.
2. Create a new query and paste the contents of the `init.sql` file.
3. Run the query to create all the necessary tables, indexes, and policies.

## 3. Configure Authentication

1. Go to the "Authentication" section in your Supabase dashboard.
2. Under "Settings" > "Email Templates", customize the email templates for:
   - Confirmation email
   - Invitation email
   - Magic link email
   - Reset password email

3. Under "Settings" > "URL Configuration", set your site URL and redirect URLs:
   - Site URL: `https://your-app-domain.com`
   - Redirect URLs:
     - `https://your-app-domain.com/auth/callback`
     - `https://your-app-domain.com/login`
     - `https://your-app-domain.com/dashboard`
     - `https://your-app-domain.com/teacher-dashboard`

4. Enable the authentication providers you want to use:
   - Email (enabled by default)
   - Google (optional)
   - GitHub (optional)
   - etc.

## 4. Set Up Storage

1. Go to the "Storage" section in your Supabase dashboard.
2. Create the following buckets:
   - `profile-images` (public)
   - `homework-files` (private)
   - `learning-resources` (private)

3. Set up the appropriate bucket policies:

For `profile-images`:
\`\`\`sql
CREATE POLICY "Public profiles are viewable by everyone." ON storage.objects
  FOR SELECT USING (bucket_id = 'profile-images');

CREATE POLICY "Users can upload their own profile." ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'profile-images' AND
    auth.uid() = owner
  );

CREATE POLICY "Users can update their own profile." ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'profile-images' AND
    auth.uid() = owner
  );
\`\`\`

For `homework-files` and `learning-resources`:
\`\`\`sql
CREATE POLICY "Users can view their own files." ON storage.objects
  FOR SELECT USING (
    (bucket_id = 'homework-files' OR bucket_id = 'learning-resources') AND
    auth.uid() = owner
  );

CREATE POLICY "Users can upload their own files." ON storage.objects
  FOR INSERT WITH CHECK (
    (bucket_id = 'homework-files' OR bucket_id = 'learning-resources') AND
    auth.uid() = owner
  );

CREATE POLICY "Users can update their own files." ON storage.objects
  FOR UPDATE USING (
    (bucket_id = 'homework-files' OR bucket_id = 'learning-resources') AND
    auth.uid() = owner
  );

CREATE POLICY "Users can delete their own files." ON storage.objects
  FOR DELETE USING (
    (bucket_id = 'homework-files' OR bucket_id = 'learning-resources') AND
    auth.uid() = owner
  );
\`\`\`

## 5. Get API Keys

1. Go to the "Settings" section in your Supabase dashboard.
2. Under "API", you'll find:
   - Project URL
   - anon/public key
   - service_role key (keep this secret!)

3. Add these values to your environment variables:
   - `SUPABASE_URL`: Your Project URL
   - `SUPABASE_ANON_KEY`: Your anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY`: Your service_role key (for server-side operations)

## 6. Set Up Edge Functions (Optional)

If you're using Supabase Edge Functions for any serverless functionality:

1. Go to the "Edge Functions" section in your Supabase dashboard.
2. Create and deploy your functions as needed.
3. Make sure to set any required secrets for your functions.

## 7. Testing Your Setup

1. Use the Supabase dashboard to manually insert a test user.
2. Try authenticating with this user in your application.
3. Verify that RLS policies are working correctly by testing different user permissions.
\`\`\`

Now, let's update our environment configuration to properly handle Supabase variables:

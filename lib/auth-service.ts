"use server"

import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Initialize Supabase client with environment variables
const supabaseUrl = process.env.SUPABASE_URL
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

export async function createServerSupabaseClient() {
  const cookieStore = cookies()

  return createClient<Database>(supabaseUrl, supabaseAnonKey, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value
      },
      set(name, value, options) {
        cookieStore.set(name, value, options)
      },
      remove(name, options) {
        cookieStore.set(name, "", { ...options, maxAge: 0 })
      },
    },
  })
}

export async function signUp(email: string, password: string, role: "student" | "teacher") {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        role,
      },
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, user: data.user }
}

export async function signIn(email: string, password: string) {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true, user: data.user }
}

export async function signOut() {
  const supabase = await createServerSupabaseClient()
  await supabase.auth.signOut()
  redirect("/login")
}

export async function getSession() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()
  return session
}

export async function getUserProfile() {
  const supabase = await createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return null
  }

  const userId = session.user.id
  const userRole = session.user.user_metadata.role || "student"

  // First get the user record
  const { data: userData, error: userError } = await supabase.from("users").select("*").eq("auth_id", userId).single()

  if (userError) {
    console.error("Error fetching user:", userError)
    return null
  }

  // Then get the role-specific profile
  if (userRole === "student") {
    const { data: studentData, error: studentError } = await supabase
      .from("students")
      .select("*")
      .eq("user_id", userData.id)
      .single()

    if (studentError && studentError.code !== "PGRST116") {
      console.error("Error fetching student profile:", studentError)
    }

    return { ...userData, profile: studentData || {} }
  } else {
    const { data: teacherData, error: teacherError } = await supabase
      .from("teachers")
      .select("*")
      .eq("user_id", userData.id)
      .single()

    if (teacherError && teacherError.code !== "PGRST116") {
      console.error("Error fetching teacher profile:", teacherError)
    }

    return { ...userData, profile: teacherData || {} }
  }
}

export async function updateUserProfile(profile: any) {
  const supabase = await createServerSupabaseClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session?.user) {
    return { error: "Not authenticated" }
  }

  const userId = session.user.id
  const userRole = session.user.user_metadata.role || "student"

  // First get the user record
  const { data: userData, error: userError } = await supabase.from("users").select("id").eq("auth_id", userId).single()

  if (userError) {
    return { error: userError.message }
  }

  // Update the user record
  if (profile.name || profile.email || profile.avatar_url) {
    const { error: updateUserError } = await supabase
      .from("users")
      .update({
        name: profile.name,
        email: profile.email,
        avatar_url: profile.avatar_url,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userData.id)

    if (updateUserError) {
      return { error: updateUserError.message }
    }
  }

  // Update the role-specific profile
  if (userRole === "student") {
    const { error: updateStudentError } = await supabase
      .from("students")
      .update({
        grade_level: profile.grade_level,
        school: profile.school,
        parent_email: profile.parent_email,
        learning_goals: profile.learning_goals,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userData.id)

    if (updateStudentError) {
      return { error: updateStudentError.message }
    }
  } else {
    const { error: updateTeacherError } = await supabase
      .from("teachers")
      .update({
        subjects: profile.subjects,
        bio: profile.bio,
        education: profile.education,
        years_experience: profile.years_experience,
        updated_at: new Date().toISOString(),
      })
      .eq("user_id", userData.id)

    if (updateTeacherError) {
      return { error: updateTeacherError.message }
    }
  }

  return { success: true }
}

export async function forgotPassword(email: string) {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/reset-password`,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function resetPassword(password: string) {
  const supabase = await createServerSupabaseClient()

  const { error } = await supabase.auth.updateUser({
    password,
  })

  if (error) {
    return { error: error.message }
  }

  return { success: true }
}

export async function signInWithGoogle() {
  const supabase = await createServerSupabaseClient()

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/auth/callback`,
    },
  })

  if (error) {
    return { error: error.message }
  }

  return { url: data.url }
}

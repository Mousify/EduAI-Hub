import { createClient } from "@supabase/supabase-js"

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL as string
const supabaseKey = process.env.SUPABASE_ANON_KEY as string

export const supabase = createClient(supabaseUrl, supabaseKey)

// Helper functions for database operations

// Users
export async function getUserById(userId: string) {
  const { data, error } = await supabase.from("users").select("*").eq("id", userId).single()

  if (error) throw error
  return data
}

export async function getUserByEmail(email: string) {
  const { data, error } = await supabase.from("users").select("*").eq("email", email).single()

  if (error && error.code !== "PGRST116") throw error
  return data
}

// Tutoring Sessions
export async function createTutoringSession(sessionData: any) {
  const { data, error } = await supabase.from("tutoring_sessions").insert(sessionData).select().single()

  if (error) throw error
  return data
}

export async function getTutoringSessions(userId: string) {
  const { data, error } = await supabase
    .from("tutoring_sessions")
    .select("*")
    .eq("userId", userId)
    .order("createdAt", { ascending: false })

  if (error) throw error
  return data
}

export async function getTutoringSessionById(sessionId: string) {
  const { data, error } = await supabase
    .from("tutoring_sessions")
    .select(`
      *,
      session_messages(*)
    `)
    .eq("id", sessionId)
    .single()

  if (error) throw error
  return data
}

// Session Messages
export async function addSessionMessage(messageData: any) {
  const { data, error } = await supabase.from("session_messages").insert(messageData).select().single()

  if (error) throw error
  return data
}

// Subscriptions
export async function getUserSubscription(userId: string) {
  const { data, error } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("userId", userId)
    .eq("status", "active")
    .single()

  if (error && error.code !== "PGRST116") throw error
  return data
}

export async function updateTokenUsage(userId: string, tokensUsed: number) {
  const { data: tokenUsage, error: fetchError } = await supabase
    .from("token_usage")
    .select("*")
    .eq("userId", userId)
    .single()

  if (fetchError && fetchError.code !== "PGRST116") throw fetchError

  if (!tokenUsage) {
    // Create new token usage record
    const { data, error } = await supabase
      .from("token_usage")
      .insert({
        userId,
        tokensUsed,
        tokensRemaining: 0, // Will be calculated based on subscription
      })
      .select()
      .single()

    if (error) throw error
    return data
  } else {
    // Update existing token usage record
    const { data, error } = await supabase
      .from("token_usage")
      .update({
        tokensUsed: tokenUsage.tokensUsed + tokensUsed,
        tokensRemaining: tokenUsage.tokensRemaining - tokensUsed,
      })
      .eq("id", tokenUsage.id)
      .select()
      .single()

    if (error) throw error
    return data
  }
}

// Classes (for teachers)
export async function getTeacherClasses(teacherId: string) {
  const { data, error } = await supabase.from("classes").select("*").eq("teacherId", teacherId)

  if (error) throw error
  return data
}

export async function getClassStudents(classId: string) {
  const { data, error } = await supabase
    .from("class_enrollments")
    .select(`
      *,
      users(id, name, email, avatarUrl)
    `)
    .eq("classId", classId)
    .eq("status", "active")

  if (error) throw error
  return data
}

// Assessments
export async function createAssessment(assessmentData: any) {
  const { data, error } = await supabase.from("assessments").insert(assessmentData).select().single()

  if (error) throw error
  return data
}

export async function getTeacherAssessments(teacherId: string) {
  const { data, error } = await supabase
    .from("assessments")
    .select("*")
    .eq("teacherId", teacherId)
    .order("createdAt", { ascending: false })

  if (error) throw error
  return data
}

// Student Progress
export async function getStudentProgress(studentId: string) {
  const { data, error } = await supabase
    .from("student_progress")
    .select(`
      *,
      subjects(name),
      topics(name)
    `)
    .eq("studentId", studentId)

  if (error) throw error
  return data
}

// Learning Streaks
export async function updateLearningStreak(userId: string) {
  const today = new Date().toISOString().split("T")[0]

  // Get current streak
  const { data: streak, error: fetchError } = await supabase
    .from("learning_streaks")
    .select("*")
    .eq("userId", userId)
    .single()

  if (fetchError && fetchError.code !== "PGRST116") throw fetchError

  if (!streak) {
    // Create new streak
    const { data, error } = await supabase
      .from("learning_streaks")
      .insert({
        userId,
        currentStreak: 1,
        longestStreak: 1,
        lastActivityDate: today,
      })
      .select()
      .single()

    if (error) throw error
    return data
  } else {
    const lastActivity = new Date(streak.lastActivityDate)
    const yesterday = new Date()
    yesterday.setDate(yesterday.getDate() - 1)

    let currentStreak = streak.currentStreak

    // If last activity was yesterday, increment streak
    if (lastActivity.toISOString().split("T")[0] === yesterday.toISOString().split("T")[0]) {
      currentStreak += 1
    }
    // If last activity was today, keep streak the same
    else if (lastActivity.toISOString().split("T")[0] === today) {
      currentStreak = streak.currentStreak
    }
    // Otherwise, reset streak to 1
    else {
      currentStreak = 1
    }

    const longestStreak = Math.max(currentStreak, streak.longestStreak)

    const { data, error } = await supabase
      .from("learning_streaks")
      .update({
        currentStreak,
        longestStreak,
        lastActivityDate: today,
      })
      .eq("id", streak.id)
      .select()
      .single()

    if (error) throw error
    return data
  }
}

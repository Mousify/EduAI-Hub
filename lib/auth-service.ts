"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import { useState } from "react"

export type UserRole = "student" | "teacher"

export const useAuth = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const supabase = createClientComponentClient()

  const signUp = async (email: string, password: string, role: UserRole) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role,
          },
        },
      })

      if (error) {
        throw error
      }

      // If sign up is successful, create a profile in the appropriate table
      if (data.user) {
        const profileData = {
          user_id: data.user.id,
          email: data.user.email,
          created_at: new Date().toISOString(),
        }

        if (role === "student") {
          await supabase.from("student_profiles").insert([profileData])
        } else {
          await supabase.from("teacher_profiles").insert([profileData])
        }
      }

      // Redirect based on role
      if (role === "student") {
        router.push("/dashboard")
      } else {
        router.push("/teacher-dashboard")
      }

      return data
    } catch (error: any) {
      setError(error.message || "An error occurred during sign up")
      console.error("Sign up error:", error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string, role: UserRole) => {
    try {
      setLoading(true)
      setError(null)

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        throw error
      }

      // Check if the user has the correct role
      if (data.user) {
        const userRole = data.user.user_metadata.role

        // If no role is set yet, update it
        if (!userRole) {
          await supabase.auth.updateUser({
            data: { role },
          })
        } else if (userRole !== role) {
          throw new Error(`You are registered as a ${userRole}, not a ${role}`)
        }
      }

      // Redirect based on role
      if (role === "student") {
        router.push("/dashboard")
      } else {
        router.push("/teacher-dashboard")
      }

      return data
    } catch (error: any) {
      setError(error.message || "An error occurred during sign in")
      console.error("Sign in error:", error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async (role: UserRole) => {
    try {
      setLoading(true)
      setError(null)

      // Store the role in localStorage to retrieve it after OAuth callback
      localStorage.setItem("authRole", role)

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) {
        throw error
      }

      return data
    } catch (error: any) {
      setError(error.message || "An error occurred during Google sign in")
      console.error("Google sign in error:", error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.auth.signOut()

      if (error) {
        throw error
      }

      router.push("/")
    } catch (error: any) {
      setError(error.message || "An error occurred during sign out")
      console.error("Sign out error:", error)
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        throw error
      }

      return { success: true }
    } catch (error: any) {
      setError(error.message || "An error occurred during password reset")
      console.error("Password reset error:", error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  const updatePassword = async (password: string) => {
    try {
      setLoading(true)
      setError(null)

      const { error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        throw error
      }

      router.push("/login")
      return { success: true }
    } catch (error: any) {
      setError(error.message || "An error occurred during password update")
      console.error("Password update error:", error)
      return { error }
    } finally {
      setLoading(false)
    }
  }

  return {
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
    loading,
    error,
  }
}

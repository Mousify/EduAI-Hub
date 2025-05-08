"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import type { User, Session } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  session: Session | null
  loading: boolean
  isLoading: boolean
  error: string | null
  signUp: (email: string, password: string, role: "student" | "teacher") => Promise<{ error?: string }>
  signIn: (email: string, password: string, role?: "student" | "teacher") => Promise<{ error?: string }>
  signInWithGoogle: (role?: "student" | "teacher") => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error?: string }>
  updatePassword: (password: string) => Promise<{ error?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getSession = async () => {
      setLoading(true)
      setIsLoading(true)
      try {
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession()

        if (error) {
          console.error("Error getting session:", error)
          setError(error.message)
          return
        }

        setSession(session)
        setUser(session?.user || null)

        // Set up auth state change listener
        const {
          data: { subscription },
        } = await supabase.auth.onAuthStateChange((_event, session) => {
          setSession(session)
          setUser(session?.user || null)
          // Don't call router.refresh() here as it can cause loops
        })

        return () => {
          subscription.unsubscribe()
        }
      } catch (error: any) {
        console.error("Auth provider error:", error)
        setError(error.message || "Authentication error")
      } finally {
        setLoading(false)
        setIsLoading(false)
      }
    }

    getSession()
  }, [supabase])

  const signUp = async (email: string, password: string, role: "student" | "teacher") => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      })

      if (error) {
        console.error("Sign up error:", error)
        return { error: error.message }
      }

      // Create user profile in the database
      if (data.user) {
        const { error: profileError } = await supabase.from("users").insert({
          id: data.user.id,
          email: data.user.email,
          role: role,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })

        if (profileError) {
          console.error("Error creating user profile:", profileError)
          return { error: "Failed to create user profile" }
        }

        // Create role-specific profile
        if (role === "student") {
          const { error: studentError } = await supabase.from("students").insert({
            user_id: data.user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

          if (studentError) {
            console.error("Error creating student profile:", studentError)
          }
        } else {
          const { error: teacherError } = await supabase.from("teachers").insert({
            user_id: data.user.id,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })

          if (teacherError) {
            console.error("Error creating teacher profile:", teacherError)
          }
        }
      }

      return {}
    } catch (error: any) {
      console.error("Sign up exception:", error)
      return { error: error.message || "An unexpected error occurred" }
    } finally {
      setLoading(false)
    }
  }

  const signIn = async (email: string, password: string, role?: "student" | "teacher") => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        console.error("Sign in error:", error)
        return { error: error.message }
      }

      // If role is specified, verify that the user has the correct role
      if (role && data.user) {
        const userRole = data.user.user_metadata.role

        // If the user is trying to sign in with a different role than they registered with
        if (userRole && userRole !== role) {
          await supabase.auth.signOut()
          return { error: `This account is registered as a ${userRole}, not a ${role}` }
        }

        // If the user doesn't have a role yet (e.g., from social login), set it
        if (!userRole) {
          await supabase.auth.updateUser({
            data: { role },
          })

          // Create user profile in the database if it doesn't exist
          const { data: existingUser } = await supabase.from("users").select("id").eq("id", data.user.id).single()

          if (!existingUser) {
            await supabase.from("users").insert({
              id: data.user.id,
              email: data.user.email,
              role: role,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
            })

            // Create role-specific profile
            if (role === "student") {
              await supabase.from("students").insert({
                user_id: data.user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
            } else {
              await supabase.from("teachers").insert({
                user_id: data.user.id,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString(),
              })
            }
          }
        }
      }

      return {}
    } catch (error: any) {
      console.error("Sign in exception:", error)
      return { error: error.message || "An unexpected error occurred" }
    } finally {
      setLoading(false)
    }
  }

  const signInWithGoogle = async (role?: "student" | "teacher") => {
    setLoading(true)
    setError(null)
    try {
      // Store the role in localStorage before redirecting
      if (role) {
        localStorage.setItem("pendingAuthRole", role)
      }

      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback${role ? `?role=${role}` : ""}`,
          queryParams: {
            // Pass additional parameters to preserve the role through the OAuth flow
            access_type: "offline",
            prompt: "consent",
          },
        },
      })

      if (error) {
        console.error("Google sign in error:", error)
        throw error
      }
    } catch (error) {
      console.error("Google sign in exception:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const signOut = async () => {
    setLoading(true)
    setError(null)
    try {
      await supabase.auth.signOut()
      router.push("/")
    } catch (error: any) {
      console.error("Sign out error:", error)
      setError(error.message || "Failed to sign out")
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email: string) => {
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) {
        console.error("Reset password error:", error)
        return { error: error.message }
      }

      return {}
    } catch (error: any) {
      console.error("Reset password exception:", error)
      return { error: error.message || "An unexpected error occurred" }
    } finally {
      setLoading(false)
    }
  }

  const updatePassword = async (password: string) => {
    setLoading(true)
    setError(null)
    try {
      const { error } = await supabase.auth.updateUser({ password })

      if (error) {
        console.error("Update password error:", error)
        return { error: error.message }
      }

      return {}
    } catch (error: any) {
      console.error("Update password exception:", error)
      return { error: error.message || "An unexpected error occurred" }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    session,
    loading,
    isLoading,
    error,
    signUp,
    signIn,
    signInWithGoogle,
    signOut,
    resetPassword,
    updatePassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

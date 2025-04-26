"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation"
import type { User } from "@supabase/supabase-js"

type AuthContextType = {
  user: User | null
  profile: any | null
  isLoading: boolean
  signIn: (email: string, password: string) => Promise<{ error?: string }>
  signUp: (email: string, password: string, role: "student" | "teacher") => Promise<{ error?: string }>
  signOut: () => Promise<void>
  signInWithGoogle: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<any | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const supabase = createClientComponentClient()

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)

      if (session?.user) {
        const userId = session.user.id
        const userRole = session.user.user_metadata.role

        if (userRole === "student") {
          const { data } = await supabase.from("students").select("*").eq("user_id", userId).single()

          setProfile(data)
        } else {
          const { data } = await supabase.from("teachers").select("*").eq("user_id", userId).single()

          setProfile(data)
        }
      }

      setIsLoading(false)
    }

    getUser()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
      router.refresh()
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [supabase, router])

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }

    return {}
  }

  const signUp = async (email: string, password: string, role: "student" | "teacher") => {
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

    // Create profile in the database
    if (role === "student") {
      await supabase.from("students").insert({
        user_id: data.user?.id,
        email,
        created_at: new Date().toISOString(),
      })
    } else {
      await supabase.from("teachers").insert({
        user_id: data.user?.id,
        email,
        created_at: new Date().toISOString(),
      })
    }

    return {}
  }

  const signOut = async () => {
    await supabase.auth.signOut()
    router.push("/login")
  }

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })
  }

  return (
    <AuthContext.Provider value={{ user, profile, isLoading, signIn, signUp, signOut, signInWithGoogle }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

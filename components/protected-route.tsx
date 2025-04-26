"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { Loader2 } from "lucide-react"

interface ProtectedRouteProps {
  children: React.ReactNode
  allowedRoles?: string[]
}

export function ProtectedRoute({ children, allowedRoles }: ProtectedRouteProps) {
  const { user, isLoading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login")
    }

    if (!isLoading && user && allowedRoles) {
      const userRole = user.user_metadata?.role || "student"
      if (!allowedRoles.includes(userRole)) {
        // Redirect to appropriate dashboard based on role
        router.push(userRole === "teacher" ? "/teacher-dashboard" : "/dashboard")
      }
    }
  }, [user, isLoading, router, allowedRoles])

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!user) {
    return null
  }

  if (allowedRoles) {
    const userRole = user.user_metadata?.role || "student"
    if (!allowedRoles.includes(userRole)) {
      return null
    }
  }

  return <>{children}</>
}

"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FaGoogle } from "react-icons/fa"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

export default function SignUpPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [role, setRole] = useState<"student" | "teacher">("student")
  const [passwordError, setPasswordError] = useState("")
  const [formError, setFormError] = useState<string | null>(null)
  const { signUp, signInWithGoogle, loading, error } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)

    if (password !== confirmPassword) {
      setPasswordError("Passwords don't match")
      return
    }

    setPasswordError("")

    try {
      const result = await signUp(email, password, role)

      if (result.error) {
        setFormError(result.error)
      } else {
        // Redirect to the appropriate dashboard based on role
        if (role === "teacher") {
          router.push("/teacher-dashboard")
        } else {
          router.push("/dashboard")
        }
      }
    } catch (err: any) {
      setFormError(err.message || "An error occurred during sign up")
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle(role)
      // The redirect will be handled by the OAuth callback
    } catch (err: any) {
      setFormError(err.message || "An error occurred during Google sign in")
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to create your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Tabs
            defaultValue="student"
            className="w-full"
            onValueChange={(value) => setRole(value as "student" | "teacher")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="student">Student</TabsTrigger>
              <TabsTrigger value="teacher">Teacher</TabsTrigger>
            </TabsList>
            <TabsContent value="student" className="pt-2">
              <p className="text-sm text-muted-foreground">
                Create a student account to access tutoring, practice exercises, and track your progress.
              </p>
            </TabsContent>
            <TabsContent value="teacher" className="pt-2">
              <p className="text-sm text-muted-foreground">
                Create a teacher account to manage classes, create assessments, and monitor student performance.
              </p>
            </TabsContent>
          </Tabs>

          {(error || formError) && (
            <Alert variant="destructive">
              <AlertDescription>{error || formError}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button variant="outline" type="button" className="w-full" onClick={handleGoogleSignIn} disabled={loading}>
            <FaGoogle className="mr-2 h-4 w-4" />
            Google
          </Button>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-blue-600 hover:underline">
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}

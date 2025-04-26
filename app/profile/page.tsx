"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/lib/auth-context"
import { supabase } from "@/lib/db"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Loader2, Upload } from "lucide-react"

export default function ProfilePage() {
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("profile")

  // Profile data
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [role, setRole] = useState<"student" | "teacher">("student")
  const [gradeLevel, setGradeLevel] = useState<number | null>(null)
  const [subjects, setSubjects] = useState<string[]>([])
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)

  // Password change
  const [currentPassword, setCurrentPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login")
      return
    }

    if (user) {
      loadUserProfile()
    }
  }, [user, authLoading, router])

  const loadUserProfile = async () => {
    setIsLoading(true)
    try {
      // Get user metadata from Supabase Auth
      const { data: userData, error: userError } = await supabase.auth.getUser()

      if (userError) throw userError

      // Get additional profile data from the database
      const { data: profileData, error: profileError } = await supabase
        .from("users")
        .select("*")
        .eq("id", userData.user.id)
        .single()

      if (profileError && profileError.code !== "PGRST116") throw profileError

      // Set user data
      setEmail(userData.user.email || "")

      if (profileData) {
        setName(profileData.name || "")
        setRole(profileData.role || "student")
        setGradeLevel(profileData.gradeLevel || null)
        setAvatarUrl(profileData.avatarUrl || null)
        setSubjects(profileData.subjects || [])
      } else {
        // Use metadata from auth if profile doesn't exist yet
        const metadata = userData.user.user_metadata
        setName(metadata?.name || "")
        setRole(metadata?.role || "student")
        setGradeLevel(metadata?.gradeLevel || null)
      }
    } catch (err: any) {
      console.error("Error loading profile:", err)
      setError("Failed to load profile data")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setAvatarFile(file)
      // Create a preview URL
      setAvatarUrl(URL.createObjectURL(file))
    }
  }

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)
    setIsSaving(true)

    try {
      if (!user) throw new Error("User not authenticated")

      // Upload avatar if changed
      let uploadedAvatarUrl = avatarUrl
      if (avatarFile) {
        const fileExt = avatarFile.name.split(".").pop()
        const filePath = `avatars/${user.id}/${Date.now()}.${fileExt}`

        const { error: uploadError, data } = await supabase.storage
          .from("avatars")
          .upload(filePath, avatarFile, { upsert: true })

        if (uploadError) throw uploadError

        // Get public URL
        const { data: urlData } = supabase.storage.from("avatars").getPublicUrl(filePath)
        uploadedAvatarUrl = urlData.publicUrl
      }

      // Update user metadata in Auth
      const { error: updateAuthError } = await supabase.auth.updateUser({
        data: {
          name,
          role,
          gradeLevel: role === "student" ? gradeLevel : null,
        },
      })

      if (updateAuthError) throw updateAuthError

      // Update or create profile in database
      const { error: updateProfileError } = await supabase.from("users").upsert({
        id: user.id,
        email: user.email,
        name,
        role,
        gradeLevel: role === "student" ? gradeLevel : null,
        avatarUrl: uploadedAvatarUrl,
        subjects,
        updated_at: new Date().toISOString(),
      })

      if (updateProfileError) throw updateProfileError

      setSuccess("Profile updated successfully")
    } catch (err: any) {
      console.error("Error updating profile:", err)
      setError(err.message || "Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (newPassword !== confirmPassword) {
      setError("New passwords do not match")
      return
    }

    if (newPassword.length < 6) {
      setError("Password must be at least 6 characters")
      return
    }

    setIsSaving(true)

    try {
      // First verify current password
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: currentPassword,
      })

      if (signInError) throw new Error("Current password is incorrect")

      // Update password
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      })

      if (updateError) throw updateError

      setSuccess("Password updated successfully")
      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")
    } catch (err: any) {
      console.error("Error changing password:", err)
      setError(err.message || "Failed to change password")
    } finally {
      setIsSaving(false)
    }
  }

  if (authLoading || isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container max-w-4xl py-8">
      <h1 className="mb-6 text-2xl font-bold">Your Profile</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="profile">Profile Information</TabsTrigger>
          <TabsTrigger value="password">Change Password</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handleProfileUpdate}>
                <div className="space-y-4">
                  <div className="flex flex-col items-center space-y-2 sm:flex-row sm:space-x-4 sm:space-y-0">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={avatarUrl || "/placeholder.svg?height=96&width=96"} alt={name} />
                      <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Label htmlFor="avatar" className="mb-2 block">
                        Profile Picture
                      </Label>
                      <div className="flex items-center gap-2">
                        <Input
                          id="avatar"
                          type="file"
                          accept="image/*"
                          onChange={handleAvatarChange}
                          className="max-w-xs"
                        />
                        <Button type="button" variant="outline" size="icon">
                          <Upload className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={email} disabled />
                    <p className="text-xs text-muted-foreground">Email cannot be changed</p>
                  </div>

                  <div className="space-y-2">
                    <Label>Account Type</Label>
                    <RadioGroup value={role} onValueChange={(value) => setRole(value as "student" | "teacher")}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="student" id="student" />
                        <Label htmlFor="student">Student</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="teacher" id="teacher" />
                        <Label htmlFor="teacher">Teacher</Label>
                      </div>
                    </RadioGroup>
                  </div>

                  {role === "student" && (
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade Level</Label>
                      <select
                        id="grade"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={gradeLevel || ""}
                        onChange={(e) => setGradeLevel(Number(e.target.value))}
                        required={role === "student"}
                      >
                        <option value="">Select Grade</option>
                        {[5, 6, 7, 8, 9, 10, 11, 12].map((grade) => (
                          <option key={grade} value={grade}>
                            Grade {grade}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Save Changes
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="password">
          <Card>
            <CardHeader>
              <CardTitle>Change Password</CardTitle>
              <CardDescription>Update your password</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert variant="destructive" className="mb-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4">
                  <AlertDescription>{success}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={handlePasswordChange}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="current-password">Current Password</Label>
                    <Input
                      id="current-password"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="new-password">New Password</Label>
                    <Input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirm-password">Confirm New Password</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" disabled={isSaving}>
                    {isSaving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
                    Change Password
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences">
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
              <CardDescription>Customize your learning experience</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Preferences settings coming soon...</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

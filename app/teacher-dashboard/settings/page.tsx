"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"

export default function TeacherSettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Profile settings
  const [email, setEmail] = useState(user?.email || "")
  const [name, setName] = useState(user?.user_metadata?.name || "")
  const [bio, setBio] = useState(user?.user_metadata?.bio || "")
  const [subjects, setSubjects] = useState(user?.user_metadata?.subjects || [])
  const [yearsOfExperience, setYearsOfExperience] = useState(user?.user_metadata?.yearsOfExperience || "")

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [studentAlerts, setStudentAlerts] = useState(true)
  const [assignmentSubmissions, setAssignmentSubmissions] = useState(true)
  const [classAnnouncements, setClassAnnouncements] = useState(true)

  // Class settings
  const [defaultClassDuration, setDefaultClassDuration] = useState(60)
  const [autoGrading, setAutoGrading] = useState(true)
  const [allowStudentChat, setAllowStudentChat] = useState(true)
  const [requireApproval, setRequireApproval] = useState(false)

  // Privacy settings
  const [shareProfile, setShareProfile] = useState(true)
  const [publicProfile, setPublicProfile] = useState(false)
  const [dataSharing, setDataSharing] = useState(true)

  const handleSaveProfileSettings = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Profile updated",
        description: "Your profile settings have been saved successfully.",
      })
    }, 1000)
  }

  const handleSaveNotificationSettings = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Notification preferences updated",
        description: "Your notification settings have been saved successfully.",
      })
    }, 1000)
  }

  const handleSaveClassSettings = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Class settings updated",
        description: "Your class settings have been saved successfully.",
      })
    }, 1000)
  }

  const handleSavePrivacySettings = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Privacy settings updated",
        description: "Your privacy settings have been saved successfully.",
      })
    }, 1000)
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-900">Teacher Settings</h1>
        <p className="text-gray-600">Manage your teacher profile and classroom settings</p>
      </div>

      <Tabs defaultValue="profile" className="space-y-4">
        <TabsList className="bg-blue-50">
          <TabsTrigger value="profile" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Profile
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="class" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Class Settings
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card className="border-blue-100">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-900">Teacher Profile</CardTitle>
              <CardDescription>Manage your professional information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Professional Bio</Label>
                <Textarea
                  id="bio"
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder="Share your teaching philosophy and experience"
                  className="min-h-[100px]"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="subjects">Subjects Taught</Label>
                <Select>
                  <SelectTrigger id="subjects">
                    <SelectValue placeholder="Select subjects" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="math">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="cs">Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Teaching Experience</Label>
                <Select value={yearsOfExperience} onValueChange={setYearsOfExperience}>
                  <SelectTrigger id="experience">
                    <SelectValue placeholder="Select years of experience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0-2">0-2 years</SelectItem>
                    <SelectItem value="3-5">3-5 years</SelectItem>
                    <SelectItem value="6-10">6-10 years</SelectItem>
                    <SelectItem value="11-15">11-15 years</SelectItem>
                    <SelectItem value="16+">16+ years</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSaveProfileSettings}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Saving..." : "Save Profile"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card className="border-blue-100">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-900">Notification Settings</CardTitle>
              <CardDescription>Manage how and when you receive notifications</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notifications">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch id="email-notifications" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="push-notifications">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                </div>
                <Switch id="push-notifications" checked={pushNotifications} onCheckedChange={setPushNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="student-alerts">Student Alerts</Label>
                  <p className="text-sm text-muted-foreground">Get notified about student activity and concerns</p>
                </div>
                <Switch id="student-alerts" checked={studentAlerts} onCheckedChange={setStudentAlerts} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="assignment-submissions">Assignment Submissions</Label>
                  <p className="text-sm text-muted-foreground">Get notified when students submit assignments</p>
                </div>
                <Switch
                  id="assignment-submissions"
                  checked={assignmentSubmissions}
                  onCheckedChange={setAssignmentSubmissions}
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="class-announcements">Class Announcements</Label>
                  <p className="text-sm text-muted-foreground">Get notified about school-wide announcements</p>
                </div>
                <Switch id="class-announcements" checked={classAnnouncements} onCheckedChange={setClassAnnouncements} />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSaveNotificationSettings}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="class">
          <Card className="border-blue-100">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-900">Class Settings</CardTitle>
              <CardDescription>Configure your classroom preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="class-duration">Default Class Duration (minutes)</Label>
                <Select
                  value={defaultClassDuration.toString()}
                  onValueChange={(val) => setDefaultClassDuration(Number(val))}
                >
                  <SelectTrigger id="class-duration">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="45">45 minutes</SelectItem>
                    <SelectItem value="60">60 minutes</SelectItem>
                    <SelectItem value="90">90 minutes</SelectItem>
                    <SelectItem value="120">120 minutes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="auto-grading">Enable Auto-Grading</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow AI to assist with grading multiple-choice questions
                  </p>
                </div>
                <Switch id="auto-grading" checked={autoGrading} onCheckedChange={setAutoGrading} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="student-chat">Allow Student Chat</Label>
                  <p className="text-sm text-muted-foreground">Enable chat functionality between students</p>
                </div>
                <Switch id="student-chat" checked={allowStudentChat} onCheckedChange={setAllowStudentChat} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="require-approval">Require Assignment Approval</Label>
                  <p className="text-sm text-muted-foreground">
                    Students must get approval before submitting assignments
                  </p>
                </div>
                <Switch id="require-approval" checked={requireApproval} onCheckedChange={setRequireApproval} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSaveClassSettings} disabled={isLoading} className="bg-blue-600 hover:bg-blue-700">
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="privacy">
          <Card className="border-blue-100">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-900">Privacy Settings</CardTitle>
              <CardDescription>Manage your privacy preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="share-profile">Share Profile with Students</Label>
                  <p className="text-sm text-muted-foreground">Allow students to view your professional profile</p>
                </div>
                <Switch id="share-profile" checked={shareProfile} onCheckedChange={setShareProfile} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="public-profile">Public Profile</Label>
                  <p className="text-sm text-muted-foreground">Make your profile visible to anyone on the platform</p>
                </div>
                <Switch id="public-profile" checked={publicProfile} onCheckedChange={setPublicProfile} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-sharing">Data Sharing for Research</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow anonymized teaching data to be used for educational research
                  </p>
                </div>
                <Switch id="data-sharing" checked={dataSharing} onCheckedChange={setDataSharing} />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSavePrivacySettings}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/lib/auth-context"
import { Moon, Sun, Palette, Monitor } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)

  // Account settings
  const [email, setEmail] = useState(user?.email || "")
  const [username, setUsername] = useState(user?.user_metadata?.name || "")

  // Notification settings
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [sessionReminders, setSessionReminders] = useState(true)
  const [progressUpdates, setProgressUpdates] = useState(true)

  // Appearance settings
  const [theme, setTheme] = useState("system")
  const [fontSize, setFontSize] = useState(16)
  const [colorScheme, setColorScheme] = useState("blue")

  // Accessibility settings
  const [highContrast, setHighContrast] = useState(false)
  const [reducedMotion, setReducedMotion] = useState(false)
  const [screenReader, setScreenReader] = useState(false)

  // Privacy settings
  const [shareProgress, setShareProgress] = useState(true)
  const [shareActivity, setShareActivity] = useState(false)
  const [allowDataCollection, setAllowDataCollection] = useState(true)

  const handleSaveAccountSettings = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Settings updated",
        description: "Your account settings have been saved successfully.",
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

  const handleSaveAppearanceSettings = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Appearance settings updated",
        description: "Your appearance settings have been saved successfully.",
      })
    }, 1000)
  }

  const handleSaveAccessibilitySettings = () => {
    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      toast({
        title: "Accessibility settings updated",
        description: "Your accessibility settings have been saved successfully.",
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
        <h1 className="text-2xl font-bold text-blue-900">Settings</h1>
        <p className="text-gray-600">Manage your account preferences and settings</p>
      </div>

      <Tabs defaultValue="account" className="space-y-4">
        <TabsList className="bg-blue-50">
          <TabsTrigger value="account" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Account
          </TabsTrigger>
          <TabsTrigger value="notifications" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Appearance
          </TabsTrigger>
          <TabsTrigger value="accessibility" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Accessibility
          </TabsTrigger>
          <TabsTrigger value="privacy" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">
            Privacy
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account">
          <Card className="border-blue-100">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-900">Account Settings</CardTitle>
              <CardDescription>Manage your account information and preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="language">Language</Label>
                <Select defaultValue="en">
                  <SelectTrigger id="language">
                    <SelectValue placeholder="Select language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="es">Spanish</SelectItem>
                    <SelectItem value="fr">French</SelectItem>
                    <SelectItem value="de">German</SelectItem>
                    <SelectItem value="zh">Chinese</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSaveAccountSettings}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Saving..." : "Save Changes"}
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
                  <Label htmlFor="session-reminders">Session Reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminders for upcoming tutoring sessions</p>
                </div>
                <Switch id="session-reminders" checked={sessionReminders} onCheckedChange={setSessionReminders} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="progress-updates">Progress Updates</Label>
                  <p className="text-sm text-muted-foreground">Receive updates about your learning progress</p>
                </div>
                <Switch id="progress-updates" checked={progressUpdates} onCheckedChange={setProgressUpdates} />
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

        <TabsContent value="appearance">
          <Card className="border-blue-100">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-900">Appearance Settings</CardTitle>
              <CardDescription>Customize how the application looks</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="space-y-2">
                <Label htmlFor="theme">Theme</Label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant={theme === "light" ? "default" : "outline"}
                    className={theme === "light" ? "bg-blue-600" : ""}
                    onClick={() => setTheme("light")}
                  >
                    <Sun className="mr-2 h-4 w-4" />
                    Light
                  </Button>
                  <Button
                    variant={theme === "dark" ? "default" : "outline"}
                    className={theme === "dark" ? "bg-blue-600" : ""}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon className="mr-2 h-4 w-4" />
                    Dark
                  </Button>
                  <Button
                    variant={theme === "system" ? "default" : "outline"}
                    className={theme === "system" ? "bg-blue-600" : ""}
                    onClick={() => setTheme("system")}
                  >
                    <Monitor className="mr-2 h-4 w-4" />
                    System
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="color-scheme">Color Scheme</Label>
                <div className="flex items-center space-x-4">
                  <Button
                    variant={colorScheme === "blue" ? "default" : "outline"}
                    className={colorScheme === "blue" ? "bg-blue-600" : ""}
                    onClick={() => setColorScheme("blue")}
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    Blue
                  </Button>
                  <Button
                    variant={colorScheme === "purple" ? "default" : "outline"}
                    className={colorScheme === "purple" ? "bg-blue-600" : ""}
                    onClick={() => setColorScheme("purple")}
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    Purple
                  </Button>
                  <Button
                    variant={colorScheme === "green" ? "default" : "outline"}
                    className={colorScheme === "green" ? "bg-blue-600" : ""}
                    onClick={() => setColorScheme("green")}
                  >
                    <Palette className="mr-2 h-4 w-4" />
                    Green
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="font-size">Font Size: {fontSize}px</Label>
                  <span className="text-sm text-muted-foreground">{fontSize}px</span>
                </div>
                <Slider
                  id="font-size"
                  min={12}
                  max={24}
                  step={1}
                  value={[fontSize]}
                  onValueChange={(value) => setFontSize(value[0])}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSaveAppearanceSettings}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? "Saving..." : "Save Changes"}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="accessibility">
          <Card className="border-blue-100">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-blue-900">Accessibility Settings</CardTitle>
              <CardDescription>Customize accessibility options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="high-contrast">High Contrast</Label>
                  <p className="text-sm text-muted-foreground">Increase contrast for better visibility</p>
                </div>
                <Switch id="high-contrast" checked={highContrast} onCheckedChange={setHighContrast} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion">Reduced Motion</Label>
                  <p className="text-sm text-muted-foreground">Minimize animations and transitions</p>
                </div>
                <Switch id="reduced-motion" checked={reducedMotion} onCheckedChange={setReducedMotion} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="screen-reader">Screen Reader Support</Label>
                  <p className="text-sm text-muted-foreground">Optimize for screen readers</p>
                </div>
                <Switch id="screen-reader" checked={screenReader} onCheckedChange={setScreenReader} />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="text-to-speech">Text-to-Speech Volume</Label>
                  <span className="text-sm text-muted-foreground">75%</span>
                </div>
                <Slider id="text-to-speech" min={0} max={100} step={1} defaultValue={[75]} />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={handleSaveAccessibilitySettings}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
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
                  <Label htmlFor="share-progress">Share Progress with Teachers</Label>
                  <p className="text-sm text-muted-foreground">Allow teachers to view your learning progress</p>
                </div>
                <Switch id="share-progress" checked={shareProgress} onCheckedChange={setShareProgress} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="share-activity">Share Activity with Classmates</Label>
                  <p className="text-sm text-muted-foreground">Allow classmates to see your learning activity</p>
                </div>
                <Switch id="share-activity" checked={shareActivity} onCheckedChange={setShareActivity} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="data-collection">Allow Data Collection</Label>
                  <p className="text-sm text-muted-foreground">
                    Allow us to collect anonymous data to improve our services
                  </p>
                </div>
                <Switch id="data-collection" checked={allowDataCollection} onCheckedChange={setAllowDataCollection} />
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

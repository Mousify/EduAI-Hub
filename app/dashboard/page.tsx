import { Button } from "@/components/ui/button"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"
import { BookOpen, BrainCircuit, HelpCircle, Lightbulb, MessageSquare } from "lucide-react"

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your learning activity</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/dashboard/tutoring/new">New Tutoring Session</Link>
          </Button>
        </div>
      </div>

      <StatsCards />

      {/* AI Tools for Students */}
      <div>
        <h3 className="text-2xl font-bold mb-4">AI Learning Tools</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="bg-blue-50">
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                Homework Helper
              </CardTitle>
              <CardDescription>Get step-by-step solutions to your homework problems</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Upload a photo of your homework or type your question to get instant help with detailed explanations.
              </p>
              <Button asChild className="w-full">
                <Link href="/dashboard/homework-helper">Get Homework Help</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="bg-green-50">
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-green-600" />
                Study Guide Generator
              </CardTitle>
              <CardDescription>Create personalized study guides for any topic</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Generate comprehensive study materials tailored to your learning needs and subject requirements.
              </p>
              <Button asChild className="w-full">
                <Link href="/dashboard/study-guides">Create Study Guide</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="bg-purple-50">
              <CardTitle className="flex items-center gap-2">
                <BrainCircuit className="h-5 w-5 text-purple-600" />
                Practice Exercises
              </CardTitle>
              <CardDescription>Generate custom practice problems</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Create personalized practice exercises based on your skill level and learning goals.
              </p>
              <Button asChild className="w-full">
                <Link href="/dashboard/practice">Generate Practice</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="bg-amber-50">
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-amber-600" />
                Content Explainer
              </CardTitle>
              <CardDescription>Get clear explanations for complex topics</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Receive simplified explanations for difficult concepts using analogies and examples you can understand.
              </p>
              <Button asChild className="w-full">
                <Link href="/dashboard/content-explainer">Explain a Topic</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="hover:shadow-md transition-shadow">
            <CardHeader className="bg-rose-50">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5 text-rose-600" />
                AI Tutoring
              </CardTitle>
              <CardDescription>Get personalized tutoring sessions</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground mb-4">
                Connect with our AI tutor for interactive learning sessions tailored to your specific needs.
              </p>
              <Button asChild className="w-full">
                <Link href="/dashboard/tutoring">Start Tutoring</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      <DashboardTabs />
    </div>
  )
}

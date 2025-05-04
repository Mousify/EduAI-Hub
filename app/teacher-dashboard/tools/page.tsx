import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { SidebarLayout, SidebarNav } from "@/components/layouts/sidebar-layout"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BookOpen, FileText, PenTool, MessageSquare, Brain, Sparkles } from "lucide-react"

export default function ToolsPage() {
  const tools = [
    {
      title: "Lesson Planner",
      description: "Generate complete lesson plans based on curriculum standards",
      icon: <BookOpen className="h-8 w-8 text-blue-600" />,
      href: "/teacher-dashboard/tools/lesson-planner",
      color: "bg-blue-100 dark:bg-blue-900",
    },
    {
      title: "Quiz Generator",
      description: "Create quizzes and assessments with automatic grading",
      icon: <FileText className="h-8 w-8 text-green-600" />,
      href: "/teacher-dashboard/tools/quiz-generator",
      color: "bg-green-100 dark:bg-green-900",
    },
    {
      title: "Feedback Generator",
      description: "Generate personalized feedback for student assignments",
      icon: <PenTool className="h-8 w-8 text-purple-600" />,
      href: "/teacher-dashboard/tools/feedback-generator",
      color: "bg-purple-100 dark:bg-purple-900",
    },
    {
      title: "Content Explainer",
      description: "Simplify complex topics for different grade levels",
      icon: <MessageSquare className="h-8 w-8 text-amber-600" />,
      href: "/teacher-dashboard/tools/content-explainer",
      color: "bg-amber-100 dark:bg-amber-900",
    },
    {
      title: "Concept Mapper",
      description: "Create visual concept maps to illustrate relationships",
      icon: <Brain className="h-8 w-8 text-red-600" />,
      href: "/teacher-dashboard/tools/concept-mapper",
      color: "bg-red-100 dark:bg-red-900",
    },
    {
      title: "AI Assistant",
      description: "Get help with any teaching task using our AI assistant",
      icon: <Sparkles className="h-8 w-8 text-indigo-600" />,
      href: "/teacher-dashboard/ai-assistant",
      color: "bg-indigo-100 dark:bg-indigo-900",
    },
  ]

  const sidebarItems = [
    { href: "/teacher-dashboard/tools", title: "All Tools", icon: <Sparkles className="h-4 w-4" /> },
    {
      href: "/teacher-dashboard/tools/lesson-planner",
      title: "Lesson Planner",
      icon: <BookOpen className="h-4 w-4" />,
    },
    {
      href: "/teacher-dashboard/tools/quiz-generator",
      title: "Quiz Generator",
      icon: <FileText className="h-4 w-4" />,
    },
    {
      href: "/teacher-dashboard/tools/feedback-generator",
      title: "Feedback Generator",
      icon: <PenTool className="h-4 w-4" />,
    },
    {
      href: "/teacher-dashboard/tools/content-explainer",
      title: "Content Explainer",
      icon: <MessageSquare className="h-4 w-4" />,
    },
  ]

  return (
    <DashboardLayout
      header={{
        title: "AI Teaching Tools",
        description: "Powerful AI tools to enhance your teaching experience",
        breadcrumbs: [
          { label: "Teacher Dashboard", href: "/teacher-dashboard" },
          { label: "Tools", href: "/teacher-dashboard/tools" },
        ],
      }}
    >
      <SidebarLayout
        sidebar={
          <Card>
            <CardHeader>
              <CardTitle>Tools</CardTitle>
              <CardDescription>Select a tool to get started</CardDescription>
            </CardHeader>
            <CardContent>
              <SidebarNav items={sidebarItems} currentPath="/teacher-dashboard/tools" />
            </CardContent>
          </Card>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card key={tool.title} className="overflow-hidden">
              <CardHeader className={`${tool.color} p-4`}>{tool.icon}</CardHeader>
              <CardContent className="p-4">
                <CardTitle className="text-lg">{tool.title}</CardTitle>
                <CardDescription className="mt-2">{tool.description}</CardDescription>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <Button asChild className="w-full">
                  <Link href={tool.href}>Open {tool.title}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </SidebarLayout>
    </DashboardLayout>
  )
}

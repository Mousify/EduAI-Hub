import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Lightbulb, BrainCircuit, MessageSquare, Wand2, ImageIcon, Sparkles } from "lucide-react"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Teaching Tools | Teacher Dashboard",
  description: "Access a suite of AI-powered tools to enhance your teaching",
}

export default function ToolsHubPage() {
  const tools = [
    {
      title: "Lesson Plan Generator",
      description: "Create comprehensive lesson plans in seconds",
      icon: Wand2,
      href: "/teacher-dashboard/tools/lesson-planner",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Quiz Generator",
      description: "Generate customized quizzes with various question types",
      icon: BrainCircuit,
      href: "/teacher-dashboard/tools/quiz-generator",
      color: "bg-amber-100 text-amber-600",
    },
    {
      title: "Feedback Generator",
      description: "Create personalized feedback for students",
      icon: MessageSquare,
      href: "/teacher-dashboard/tools/feedback-generator",
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Content Explainer",
      description: "Generate clear explanations for complex topics",
      icon: Lightbulb,
      href: "/teacher-dashboard/tools/content-explainer",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Document Analyzer",
      description: "Analyze and extract text from educational documents",
      icon: ImageIcon,
      href: "/teacher-dashboard/resources/analyze",
      color: "bg-rose-100 text-rose-600",
    },
    {
      title: "AI Assistant",
      description: "Get help with various teaching tasks",
      icon: Sparkles,
      href: "/teacher-dashboard/ai-assistant",
      color: "bg-indigo-100 text-indigo-600",
    },
  ]

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Teaching Tools</h1>
        <p className="text-muted-foreground">
          Access a suite of AI-powered tools to enhance your teaching and save time
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools.map((tool) => (
          <Card key={tool.title} className="overflow-hidden border-blue-100 hover:shadow-md transition-shadow">
            <CardHeader className={`${tool.color} p-4`}>
              <tool.icon className="h-8 w-8" />
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="text-lg">{tool.title}</CardTitle>
              <CardDescription className="mt-2">{tool.description}</CardDescription>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                <Link href={tool.href}>Open {tool.title}</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <div className="bg-blue-50 border border-blue-100 rounded-lg p-6">
        <div className="flex items-start gap-4">
          <div className="bg-blue-100 p-3 rounded-full">
            <Sparkles className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-blue-800 mb-2">AI-Powered Teaching</h3>
            <p className="text-blue-700 mb-4">
              Our AI tools are designed to help you create high-quality educational content, provide personalized
              feedback, and save valuable time. All tools use advanced AI models to generate content tailored to your
              specific needs.
            </p>
            <Button variant="outline" className="border-blue-200 text-blue-700 hover:bg-blue-100">
              Learn More About Our AI Technology
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

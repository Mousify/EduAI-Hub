import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BookOpen,
  BrainCircuit,
  FileText,
  Lightbulb,
  MessageSquare,
  Sparkles,
  Wand2,
  BookOpenCheck,
  Languages,
  Mic,
} from "lucide-react"

export default function ToolsPage() {
  const tools = [
    {
      title: "Lesson Plan Generator",
      description: "Create comprehensive lesson plans in seconds with AI assistance",
      icon: Wand2,
      href: "/teacher-dashboard/tools/lesson-planner",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Quiz Generator",
      description: "Create customized quizzes with various question types in seconds",
      icon: BrainCircuit,
      href: "/teacher-dashboard/tools/quiz-generator",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Feedback Generator",
      description: "Create personalized, constructive feedback for students in seconds",
      icon: MessageSquare,
      href: "/teacher-dashboard/tools/feedback-generator",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Content Explainer",
      description: "Generate clear explanations for complex topics tailored to any grade level",
      icon: Lightbulb,
      href: "/teacher-dashboard/tools/content-explainer",
      color: "text-amber-600",
      bgColor: "bg-amber-100",
    },
    {
      title: "Document Analyzer",
      description: "Upload and analyze educational documents with AI",
      icon: FileText,
      href: "/teacher-dashboard/resources/analyze",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
    {
      title: "Speech to Text",
      description: "Convert spoken content to text for accessibility and note-taking",
      icon: Mic,
      href: "/teacher-dashboard/resources/accessibility",
      color: "text-indigo-600",
      bgColor: "bg-indigo-100",
    },
  ]

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">AI Teaching Tools</h1>
          <p className="text-gray-500 mt-2">Powerful AI-powered tools to enhance your teaching and save you time</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tools.map((tool) => (
            <Card
              key={tool.title}
              className="overflow-hidden border-blue-100 shadow-md hover:shadow-lg transition-shadow"
            >
              <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100">
                <div className="flex items-center gap-2">
                  <div className={`p-2 rounded-md ${tool.bgColor}`}>
                    <tool.icon className={`h-5 w-5 ${tool.color}`} />
                  </div>
                  <CardTitle className="text-lg text-blue-800">{tool.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="pt-4">
                <CardDescription className="text-sm text-gray-600">{tool.description}</CardDescription>
              </CardContent>
              <CardFooter className="border-t border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 p-4">
                <Link href={tool.href} className="w-full">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700">Open Tool</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold tracking-tight text-blue-600">Coming Soon</h2>
          <p className="text-gray-500 mt-2">New AI tools being developed to enhance your teaching experience</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[
              {
                title: "Assessment Grader",
                description: "Automatically grade and provide feedback on student assessments",
                icon: BookOpenCheck,
                color: "text-teal-600",
                bgColor: "bg-teal-100",
              },
              {
                title: "Multilingual Content",
                description: "Create educational content in multiple languages",
                icon: Languages,
                color: "text-orange-600",
                bgColor: "bg-orange-100",
              },
              {
                title: "Curriculum Builder",
                description: "Design complete curriculum sequences with AI assistance",
                icon: BookOpen,
                color: "text-pink-600",
                bgColor: "bg-pink-100",
              },
            ].map((tool) => (
              <Card key={tool.title} className="overflow-hidden border-gray-200 shadow-md opacity-75">
                <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
                  <div className="flex items-center gap-2">
                    <div className={`p-2 rounded-md ${tool.bgColor}`}>
                      <tool.icon className={`h-5 w-5 ${tool.color}`} />
                    </div>
                    <CardTitle className="text-lg text-gray-800">{tool.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-4">
                  <CardDescription className="text-sm text-gray-600">{tool.description}</CardDescription>
                </CardContent>
                <CardFooter className="border-t border-gray-200 bg-gradient-to-r from-gray-50 to-gray-100 p-4">
                  <Button disabled className="w-full bg-gray-400 hover:bg-gray-400 cursor-not-allowed">
                    <Sparkles className="mr-2 h-4 w-4" />
                    Coming Soon
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

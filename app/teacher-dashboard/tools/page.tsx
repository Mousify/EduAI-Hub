import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BrainCircuit, FileText, Lightbulb, MessageSquare, Mic, Wand2 } from "lucide-react"
import { aiTools } from "@/lib/ai-tools-categories"

export default function ToolsPage() {
  // Map icon strings to actual components
  const getIcon = (iconName: string, className = "h-5 w-5") => {
    switch (iconName) {
      case "Wand2":
        return <Wand2 className={className} />
      case "BrainCircuit":
        return <BrainCircuit className={className} />
      case "MessageSquare":
        return <MessageSquare className={className} />
      case "FileText":
        return <FileText className={className} />
      case "Lightbulb":
        return <Lightbulb className={className} />
      case "Mic":
        return <Mic className={className} />
      default:
        return <Wand2 className={className} />
    }
  }

  // Get color classes based on color name
  const getColorClasses = (color: string) => {
    const colorMap = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
      },
      green: {
        bg: "bg-green-50",
        text: "text-green-600",
      },
      purple: {
        bg: "bg-purple-50",
        text: "text-purple-600",
      },
      amber: {
        bg: "bg-amber-50",
        text: "text-amber-600",
      },
      rose: {
        bg: "bg-rose-50",
        text: "text-rose-600",
      },
      indigo: {
        bg: "bg-indigo-50",
        text: "text-indigo-600",
      },
    }
    return colorMap[color] || colorMap.blue
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">AI Teaching Tools</h1>
        <p className="text-muted-foreground">Powerful AI tools to enhance your teaching and save time</p>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Teacher Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.teacher.map((tool) => {
            const colorClasses = getColorClasses(tool.color)
            return (
              <Card key={tool.id} className="hover:shadow-md transition-shadow">
                <CardHeader className={colorClasses.bg}>
                  <CardTitle className="flex items-center gap-2">
                    <span className={colorClasses.text}>{getIcon(tool.icon)}</span>
                    {tool.name}
                  </CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    Use this AI-powered tool to streamline your teaching workflow and create high-quality content.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={tool.path}>Open {tool.name}</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="mb-10">
        <h2 className="text-xl font-semibold mb-4">Shared Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {aiTools.both.map((tool) => {
            const colorClasses = getColorClasses(tool.color)
            return (
              <Card key={tool.id} className="hover:shadow-md transition-shadow">
                <CardHeader className={colorClasses.bg}>
                  <CardTitle className="flex items-center gap-2">
                    <span className={colorClasses.text}>{getIcon(tool.icon)}</span>
                    {tool.name}
                  </CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="text-sm text-muted-foreground mb-4">
                    This tool is available for both teachers and students to enhance the learning experience.
                  </p>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href={tool.teacherPath || "#"}>Open {tool.name}</Link>
                  </Button>
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>

      <div className="bg-muted p-6 rounded-lg">
        <h3 className="font-medium mb-2">Looking for more tools?</h3>
        <p className="text-sm text-muted-foreground mb-4">
          We're constantly developing new AI tools to help teachers. Have a suggestion for a new tool?
        </p>
        <Button variant="outline" asChild>
          <Link href="/teacher-dashboard/feedback">Submit Tool Idea</Link>
        </Button>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { FileText, Upload, ImageIcon, Mic, Sparkles } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
  const aiTools = [
    {
      title: "Document Analyzer",
      description: "Upload and analyze educational documents with AI",
      icon: ImageIcon,
      href: "/teacher-dashboard/resources/analyze",
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Accessibility Tools",
      description: "Speech-to-text and other accessibility features",
      icon: Mic,
      href: "/teacher-dashboard/resources/accessibility",
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "AI Assistant",
      description: "Generate lesson plans, assessments, and more",
      icon: Sparkles,
      href: "/teacher-dashboard/ai-assistant",
      color: "bg-amber-100 text-amber-600",
    },
  ]

  const resourceCategories = [
    {
      id: "my-resources",
      title: "My Resources",
      resources: [
        { id: 1, title: "Algebra Worksheet", type: "PDF", size: "1.2 MB", date: "2025-04-15" },
        { id: 2, title: "Chemistry Lab Guide", type: "DOCX", size: "3.5 MB", date: "2025-04-10" },
        { id: 3, title: "History Timeline", type: "PDF", size: "2.8 MB", date: "2025-04-05" },
      ],
    },
    {
      id: "shared-resources",
      title: "Shared Resources",
      resources: [
        { id: 4, title: "Physics Formulas", type: "PDF", size: "0.9 MB", date: "2025-04-12" },
        { id: 5, title: "Literature Reading List", type: "DOCX", size: "0.5 MB", date: "2025-04-08" },
        { id: 6, title: "Math Problem Set", type: "PDF", size: "1.7 MB", date: "2025-04-02" },
      ],
    },
  ]

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col gap-8">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-blue-600">Resources</h1>
            <p className="text-gray-500 mt-2">Manage and share educational resources</p>
          </div>

          <Button className="bg-blue-600 hover:bg-blue-700">
            <Upload className="mr-2 h-4 w-4" />
            Upload Resource
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiTools.map((tool) => (
            <Card key={tool.title} className="overflow-hidden">
              <CardHeader className={`${tool.color} p-4`}>
                {/* @ts-expect-error */}
                <tool.icon className="h-8 w-8" />
              </CardHeader>
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

        <Tabs defaultValue="my-resources" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="my-resources">My Resources</TabsTrigger>
            <TabsTrigger value="shared-resources">Shared Resources</TabsTrigger>
          </TabsList>

          {resourceCategories.map((category) => (
            <TabsContent key={category.id} value={category.id}>
              <Card>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                  <CardDescription>{category.resources.length} resources available</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <div className="grid grid-cols-12 p-4 text-sm font-medium text-gray-500 border-b">
                      <div className="col-span-6">Name</div>
                      <div className="col-span-2">Type</div>
                      <div className="col-span-2">Size</div>
                      <div className="col-span-2">Date</div>
                    </div>

                    {category.resources.map((resource) => (
                      <div key={resource.id} className="grid grid-cols-12 p-4 text-sm hover:bg-gray-50">
                        <div className="col-span-6 flex items-center gap-2">
                          <FileText className="h-4 w-4 text-gray-400" />
                          <span className="font-medium text-blue-600 hover:underline cursor-pointer">
                            {resource.title}
                          </span>
                        </div>
                        <div className="col-span-2">{resource.type}</div>
                        <div className="col-span-2">{resource.size}</div>
                        <div className="col-span-2">{resource.date}</div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

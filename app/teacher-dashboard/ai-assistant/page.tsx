"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"
import { Sparkles, FileText, BookOpen, CheckCircle, Loader2 } from "lucide-react"

export default function AIAssistantPage() {
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState("")
  const [prompt, setPrompt] = useState("")
  const [selectedTab, setSelectedTab] = useState("lesson-plans")
  const [subject, setSubject] = useState("math")
  const [grade, setGrade] = useState("6")
  const [topic, setTopic] = useState("")
  const [duration, setDuration] = useState("30")

  async function handleGenerate() {
    setLoading(true)
    setResult("")

    try {
      let systemPrompt = ""
      let userPrompt = ""

      if (selectedTab === "lesson-plans") {
        systemPrompt = `You are an expert educational content creator specializing in creating detailed lesson plans for teachers. 
        Create a comprehensive lesson plan that includes:
        1. Learning objectives
        2. Required materials
        3. Introduction/warm-up activity (5 minutes)
        4. Main lesson content with step-by-step instructions
        5. Practice activities
        6. Assessment strategies
        7. Conclusion and homework assignment
        8. Differentiation strategies for various learning needs
        
        Format the lesson plan in a clear, structured way that's easy for teachers to follow.`

        userPrompt = `Create a ${duration}-minute lesson plan for grade ${grade} ${subject} on the topic of "${topic}".`
      } else if (selectedTab === "assessments") {
        systemPrompt = `You are an expert in educational assessment design. 
        Create a comprehensive assessment that includes:
        1. Clear instructions for students
        2. A mix of question types (multiple choice, short answer, etc.)
        3. Scoring rubric
        4. Answer key with explanations
        
        Format the assessment in a clear, structured way that's ready to use in the classroom.`

        userPrompt = `Create a grade ${grade} ${subject} assessment on the topic of "${topic}".`
      } else if (selectedTab === "explanations") {
        systemPrompt = `You are an expert teacher with a talent for explaining complex concepts in simple terms.
        Create a clear, engaging explanation that:
        1. Breaks down the concept into understandable parts
        2. Uses analogies and examples relevant to grade ${grade} students
        3. Addresses common misconceptions
        4. Includes check-for-understanding questions
        
        Format the explanation in a clear, structured way that's easy to follow.`

        userPrompt = `Explain the ${subject} concept of "${topic}" for grade ${grade} students.`
      }

      const { text } = await generateText({
        model: openai("gpt-4o"),
        system: systemPrompt,
        prompt: userPrompt,
      })

      setResult(text)
    } catch (error) {
      console.error("Error generating content:", error)
      setResult("An error occurred while generating content. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const aiTools = [
    {
      id: "lesson-plans",
      title: "Lesson Plans",
      icon: BookOpen,
      description: "Generate detailed lesson plans for any subject and grade level",
    },
    {
      id: "assessments",
      title: "Assessments",
      icon: FileText,
      description: "Create quizzes, tests, and other assessments with answer keys",
    },
    {
      id: "explanations",
      title: "Concept Explanations",
      icon: Sparkles,
      description: "Get clear explanations for complex topics to share with students",
    },
  ]

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">AI Teaching Assistant</h1>
          <p className="text-gray-500 mt-2">Generate lesson plans, assessments, and explanations with AI</p>
        </div>

        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            {aiTools.map((tool) => (
              <TabsTrigger key={tool.id} value={tool.id} className="flex items-center gap-2">
                <tool.icon className="h-4 w-4" />
                {tool.title}
              </TabsTrigger>
            ))}
          </TabsList>

          {aiTools.map((tool) => (
            <TabsContent key={tool.id} value={tool.id}>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <tool.icon className="h-5 w-5 text-blue-600" />
                    {tool.title}
                  </CardTitle>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="subject">Subject</Label>
                        <Select value={subject} onValueChange={setSubject}>
                          <SelectTrigger id="subject">
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="math">Mathematics</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                            <SelectItem value="art">Art</SelectItem>
                            <SelectItem value="music">Music</SelectItem>
                            <SelectItem value="pe">Physical Education</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="grade">Grade Level</Label>
                        <Select value={grade} onValueChange={setGrade}>
                          <SelectTrigger id="grade">
                            <SelectValue placeholder="Select grade" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="5">Grade 5</SelectItem>
                            <SelectItem value="6">Grade 6</SelectItem>
                            <SelectItem value="7">Grade 7</SelectItem>
                            <SelectItem value="8">Grade 8</SelectItem>
                            <SelectItem value="9">Grade 9</SelectItem>
                            <SelectItem value="10">Grade 10</SelectItem>
                            <SelectItem value="11">Grade 11</SelectItem>
                            <SelectItem value="12">Grade 12</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="topic">Topic</Label>
                      <Input
                        id="topic"
                        placeholder="Enter a specific topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                      />
                    </div>

                    {selectedTab === "lesson-plans" && (
                      <div className="grid gap-2">
                        <Label htmlFor="duration">Duration (minutes)</Label>
                        <Select value={duration} onValueChange={setDuration}>
                          <SelectTrigger id="duration">
                            <SelectValue placeholder="Select duration" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="15">15 minutes</SelectItem>
                            <SelectItem value="30">30 minutes</SelectItem>
                            <SelectItem value="45">45 minutes</SelectItem>
                            <SelectItem value="60">60 minutes</SelectItem>
                            <SelectItem value="90">90 minutes</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button
                    onClick={handleGenerate}
                    disabled={loading || !topic}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Generating...
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        Generate {tool.title}
                      </>
                    )}
                  </Button>
                </CardFooter>
              </Card>

              {result && (
                <Card className="mt-8">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      Generated {tool.title}
                    </CardTitle>
                    <CardDescription>
                      {subject} for Grade {grade} on {topic}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="whitespace-pre-wrap bg-gray-50 p-4 rounded-md border text-sm">{result}</div>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" onClick={() => navigator.clipboard.writeText(result)}>
                      Copy to Clipboard
                    </Button>
                    <Button onClick={() => setResult("")} variant="ghost">
                      Clear
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

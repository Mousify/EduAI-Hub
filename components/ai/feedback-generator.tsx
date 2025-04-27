"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, MessageSquare, Download, Save, Sparkles } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { generateText } from "ai"
import { openai } from "@ai-sdk/openai"

interface FeedbackOptions {
  studentName: string
  subject: string
  gradeLevel: string
  assignmentType: string
  performance: number
  strengths: string
  areasToImprove: string
  tone: string
}

export function FeedbackGenerator() {
  const [options, setOptions] = useState<FeedbackOptions>({
    studentName: "",
    subject: "",
    gradeLevel: "",
    assignmentType: "",
    performance: 75,
    strengths: "",
    areasToImprove: "",
    tone: "encouraging",
  })

  const [loading, setLoading] = useState(false)
  const [feedback, setFeedback] = useState("")
  const [activeTab, setActiveTab] = useState("input")

  const handleOptionChange = (key: keyof FeedbackOptions, value: string | number) => {
    setOptions((prev) => ({ ...prev, [key]: value }))
  }

  const generateFeedback = async () => {
    if (!options.studentName || !options.subject || !options.gradeLevel || !options.assignmentType) return

    setLoading(true)
    setActiveTab("result")

    try {
      const performanceLevel =
        options.performance >= 90
          ? "excellent"
          : options.performance >= 80
            ? "very good"
            : options.performance >= 70
              ? "good"
              : options.performance >= 60
                ? "satisfactory"
                : "needs improvement"

      const prompt = `
        Generate personalized student feedback for:
        - Student Name: ${options.studentName}
        - Subject: ${options.subject}
        - Grade Level: ${options.gradeLevel}
        - Assignment Type: ${options.assignmentType}
        - Performance Level: ${performanceLevel} (${options.performance}%)
        
        Strengths to highlight: ${options.strengths || "Use your judgment based on the performance level"}
        Areas to improve: ${options.areasToImprove || "Use your judgment based on the performance level"}
        
        The feedback should be:
        - Written in a ${options.tone} tone
        - Specific and actionable
        - Balanced between praise and constructive criticism
        - Appropriate for the grade level
        - Around 200-300 words
      `

      const { text } = await generateText({
        model: openai("gpt-4o"),
        prompt: prompt,
      })

      setFeedback(text)
    } catch (error) {
      console.error("Error generating feedback:", error)
      setFeedback("An error occurred while generating feedback. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  const downloadFeedback = () => {
    if (!feedback) return

    const fileName = `feedback-${options.studentName.toLowerCase().replace(/\s+/g, "-")}.txt`
    const blob = new Blob([feedback], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="w-full shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100">
        <CardTitle className="text-blue-800 flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          AI Feedback Generator
        </CardTitle>
        <CardDescription>Create personalized, constructive feedback for students in seconds</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mx-6 mt-4">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="result" disabled={!feedback && !loading}>
            Result
          </TabsTrigger>
        </TabsList>
        <CardContent className="pt-4">
          <TabsContent value="input" className="space-y-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="student-name">Student Name</Label>
                <Input
                  id="student-name"
                  placeholder="e.g., John Smith"
                  value={options.studentName}
                  onChange={(e) => handleOptionChange("studentName", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="grade-level">Grade Level</Label>
                <Select value={options.gradeLevel} onValueChange={(value) => handleOptionChange("gradeLevel", value)}>
                  <SelectTrigger id="grade-level">
                    <SelectValue placeholder="Select grade level" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={options.subject} onValueChange={(value) => handleOptionChange("subject", value)}>
                  <SelectTrigger id="subject">
                    <SelectValue placeholder="Select subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mathematics">Mathematics</SelectItem>
                    <SelectItem value="science">Science</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="history">History</SelectItem>
                    <SelectItem value="geography">Geography</SelectItem>
                    <SelectItem value="art">Art</SelectItem>
                    <SelectItem value="music">Music</SelectItem>
                    <SelectItem value="physical-education">Physical Education</SelectItem>
                    <SelectItem value="computer-science">Computer Science</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="assignment-type">Assignment Type</Label>
                <Select
                  value={options.assignmentType}
                  onValueChange={(value) => handleOptionChange("assignmentType", value)}
                >
                  <SelectTrigger id="assignment-type">
                    <SelectValue placeholder="Select assignment type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="test">Test</SelectItem>
                    <SelectItem value="homework">Homework</SelectItem>
                    <SelectItem value="project">Project</SelectItem>
                    <SelectItem value="essay">Essay</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                    <SelectItem value="lab-report">Lab Report</SelectItem>
                    <SelectItem value="participation">Class Participation</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <Label htmlFor="performance">Performance Level ({options.performance}%)</Label>
                <Badge
                  variant={
                    options.performance >= 90
                      ? "default"
                      : options.performance >= 80
                        ? "secondary"
                        : options.performance >= 70
                          ? "outline"
                          : options.performance >= 60
                            ? "destructive"
                            : "destructive"
                  }
                >
                  {options.performance >= 90
                    ? "Excellent"
                    : options.performance >= 80
                      ? "Very Good"
                      : options.performance >= 70
                        ? "Good"
                        : options.performance >= 60
                          ? "Satisfactory"
                          : "Needs Improvement"}
                </Badge>
              </div>
              <Slider
                id="performance"
                min={0}
                max={100}
                step={1}
                value={[options.performance]}
                onValueChange={(value) => handleOptionChange("performance", value[0])}
                className="mt-2"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tone">Feedback Tone</Label>
              <Select value={options.tone} onValueChange={(value) => handleOptionChange("tone", value)}>
                <SelectTrigger id="tone">
                  <SelectValue placeholder="Select tone" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="encouraging">Encouraging</SelectItem>
                  <SelectItem value="constructive">Constructive</SelectItem>
                  <SelectItem value="formal">Formal</SelectItem>
                  <SelectItem value="supportive">Supportive</SelectItem>
                  <SelectItem value="motivational">Motivational</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="strengths">Strengths to Highlight (Optional)</Label>
              <Textarea
                id="strengths"
                placeholder="e.g., Clear understanding of concepts, Good problem-solving skills"
                value={options.strengths}
                onChange={(e) => handleOptionChange("strengths", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="areas-to-improve">Areas to Improve (Optional)</Label>
              <Textarea
                id="areas-to-improve"
                placeholder="e.g., Time management, Attention to detail"
                value={options.areasToImprove}
                onChange={(e) => handleOptionChange("areasToImprove", e.target.value)}
                className="min-h-[80px]"
              />
            </div>
          </TabsContent>
          <TabsContent value="result" className="mt-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                <p className="text-muted-foreground">Generating personalized feedback...</p>
              </div>
            ) : feedback ? (
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{options.subject}</Badge>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">Grade {options.gradeLevel}</Badge>
                  <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">{options.assignmentType}</Badge>
                </div>
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                  <h3 className="text-lg font-semibold mb-4">Feedback for {options.studentName}</h3>
                  <div className="whitespace-pre-wrap">{feedback}</div>
                </div>
              </div>
            ) : null}
          </TabsContent>
        </CardContent>
      </Tabs>
      <CardFooter className="flex justify-between border-t border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100 p-4">
        {activeTab === "input" ? (
          <>
            <Button
              variant="outline"
              onClick={() => {
                setOptions({
                  studentName: "",
                  subject: "",
                  gradeLevel: "",
                  assignmentType: "",
                  performance: 75,
                  strengths: "",
                  areasToImprove: "",
                  tone: "encouraging",
                })
              }}
            >
              Reset
            </Button>
            <Button
              onClick={generateFeedback}
              disabled={
                !options.studentName || !options.subject || !options.gradeLevel || !options.assignmentType || loading
              }
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating
                </>
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate Feedback
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => setActiveTab("input")}>
              Edit Details
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={downloadFeedback}>
                <Download className="mr-2 h-4 w-4" />
                Download Feedback
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2 h-4 w-4" />
                Save to Student Record
              </Button>
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

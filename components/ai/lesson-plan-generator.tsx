"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Download, Save, Wand2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface LessonPlan {
  title: string
  gradeLevel: string
  subject: string
  duration: string
  objectives: string[]
  materials: string[]
  warmUp: string
  mainActivities: string[]
  assessment: string
  homework: string
  differentiation: {
    advanced: string
    struggling: string
  }
}

export function LessonPlanGenerator() {
  const [topic, setTopic] = useState("")
  const [gradeLevel, setGradeLevel] = useState("")
  const [subject, setSubject] = useState("")
  const [duration, setDuration] = useState("60")
  const [loading, setLoading] = useState(false)
  const [lessonPlan, setLessonPlan] = useState<LessonPlan | null>(null)
  const [activeTab, setActiveTab] = useState("input")

  const generateLessonPlan = async () => {
    if (!topic || !gradeLevel || !subject) return

    setLoading(true)
    setActiveTab("result")

    try {
      const response = await fetch("/api/ai/generate-lesson-plan", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          topic,
          gradeLevel,
          subject,
          duration: Number.parseInt(duration),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate lesson plan")
      }

      const data = await response.json()
      setLessonPlan(data.lessonPlan)
    } catch (error) {
      console.error("Error generating lesson plan:", error)
      // For demo purposes, create a sample lesson plan
      setLessonPlan({
        title: `${topic} - ${subject} Lesson`,
        gradeLevel,
        subject,
        duration: `${duration} minutes`,
        objectives: [
          "Students will understand key concepts related to the topic",
          "Students will be able to apply knowledge in practical exercises",
          "Students will develop critical thinking skills through discussion",
        ],
        materials: ["Textbooks", "Worksheets", "Digital presentation", "Interactive whiteboard"],
        warmUp:
          "Begin with a 5-minute discussion about students' prior knowledge on the topic. Ask open-ended questions to gauge understanding.",
        mainActivities: [
          "Introduction to key concepts (15 minutes)",
          "Guided practice with examples (15 minutes)",
          "Small group work on application problems (15 minutes)",
          "Class discussion of solutions and approaches (10 minutes)",
        ],
        assessment:
          "Students will complete a short formative assessment quiz to demonstrate understanding of the key concepts.",
        homework:
          "Students will complete practice problems 1-5 from the textbook and prepare a short reflection on what they learned.",
        differentiation: {
          advanced: "Provide additional challenge problems that require deeper analysis and application of concepts.",
          struggling:
            "Offer simplified versions of practice problems and additional visual aids to support understanding.",
        },
      })
    } finally {
      setLoading(false)
    }
  }

  const downloadLessonPlan = () => {
    if (!lessonPlan) return

    const content = `
# ${lessonPlan.title}

## Basic Information
- Grade Level: ${lessonPlan.gradeLevel}
- Subject: ${lessonPlan.subject}
- Duration: ${lessonPlan.duration}

## Learning Objectives
${lessonPlan.objectives.map((obj) => `- ${obj}`).join("\n")}

## Materials Needed
${lessonPlan.materials.map((mat) => `- ${mat}`).join("\n")}

## Lesson Structure

### Warm-Up (5 minutes)
${lessonPlan.warmUp}

### Main Activities
${lessonPlan.mainActivities.map((act) => `- ${act}`).join("\n")}

### Assessment
${lessonPlan.assessment}

### Homework
${lessonPlan.homework}

## Differentiation Strategies

### For Advanced Students
${lessonPlan.differentiation.advanced}

### For Struggling Students
${lessonPlan.differentiation.struggling}
    `

    const blob = new Blob([content], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `${lessonPlan.title.replace(/\s+/g, "-").toLowerCase()}.md`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  return (
    <Card className="w-full shadow-lg border-blue-100">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-blue-100 border-b border-blue-100">
        <CardTitle className="text-blue-800 flex items-center gap-2">
          <Wand2 className="h-5 w-5" />
          AI Lesson Plan Generator
        </CardTitle>
        <CardDescription>Create comprehensive lesson plans in seconds with AI assistance</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mx-6 mt-4">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="result" disabled={!lessonPlan && !loading}>
            Result
          </TabsTrigger>
        </TabsList>
        <CardContent className="pt-4">
          <TabsContent value="input" className="space-y-4 mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
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
                <Label htmlFor="grade-level">Grade Level</Label>
                <Select value={gradeLevel} onValueChange={setGradeLevel}>
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
            <div className="space-y-2">
              <Label htmlFor="topic">Lesson Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., Pythagorean Theorem, Photosynthesis, Shakespeare's Sonnets"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                min="15"
                max="120"
                step="5"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="additional-notes">Additional Notes (Optional)</Label>
              <Textarea
                id="additional-notes"
                placeholder="Any specific requirements or focus areas for this lesson"
                className="min-h-[100px]"
              />
            </div>
          </TabsContent>
          <TabsContent value="result" className="mt-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                <p className="text-muted-foreground">Generating your lesson plan...</p>
              </div>
            ) : lessonPlan ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">{lessonPlan.title}</h3>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="outline">{lessonPlan.gradeLevel}</Badge>
                    <Badge variant="outline">{lessonPlan.subject}</Badge>
                    <Badge variant="outline">{lessonPlan.duration}</Badge>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Learning Objectives</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {lessonPlan.objectives.map((objective, i) => (
                      <li key={i}>{objective}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Materials Needed</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {lessonPlan.materials.map((material, i) => (
                      <li key={i}>{material}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Lesson Structure</h4>

                  <div className="pl-2 border-l-2 border-blue-200 mb-4">
                    <h5 className="text-sm font-medium">Warm-Up (5 minutes)</h5>
                    <p className="text-sm mt-1">{lessonPlan.warmUp}</p>
                  </div>

                  <div className="pl-2 border-l-2 border-blue-200 mb-4">
                    <h5 className="text-sm font-medium">Main Activities</h5>
                    <ul className="list-disc pl-5 space-y-1 mt-1 text-sm">
                      {lessonPlan.mainActivities.map((activity, i) => (
                        <li key={i}>{activity}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="pl-2 border-l-2 border-blue-200 mb-4">
                    <h5 className="text-sm font-medium">Assessment</h5>
                    <p className="text-sm mt-1">{lessonPlan.assessment}</p>
                  </div>

                  <div className="pl-2 border-l-2 border-blue-200">
                    <h5 className="text-sm font-medium">Homework</h5>
                    <p className="text-sm mt-1">{lessonPlan.homework}</p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-blue-700 mb-2">Differentiation Strategies</h4>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-blue-50 p-3 rounded-md">
                      <h5 className="text-sm font-medium">For Advanced Students</h5>
                      <p className="text-sm mt-1">{lessonPlan.differentiation.advanced}</p>
                    </div>

                    <div className="bg-blue-50 p-3 rounded-md">
                      <h5 className="text-sm font-medium">For Struggling Students</h5>
                      <p className="text-sm mt-1">{lessonPlan.differentiation.struggling}</p>
                    </div>
                  </div>
                </div>
              </div>
            ) : null}
          </TabsContent>
        </CardContent>
      </Tabs>
      <CardFooter className="flex justify-between border-t border-blue-100 bg-gradient-to-r from-blue-50 to-blue-100">
        {activeTab === "input" ? (
          <>
            <Button
              variant="outline"
              onClick={() => {
                setTopic("")
                setGradeLevel("")
                setSubject("")
                setDuration("60")
              }}
            >
              Reset
            </Button>
            <Button
              onClick={generateLessonPlan}
              disabled={!topic || !gradeLevel || !subject || loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating
                </>
              ) : (
                <>
                  <Wand2 className="mr-2 h-4 w-4" />
                  Generate Lesson Plan
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
              <Button variant="outline" onClick={downloadLessonPlan}>
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Save className="mr-2 h-4 w-4" />
                Save to Library
              </Button>
            </div>
          </>
        )}
      </CardFooter>
    </Card>
  )
}

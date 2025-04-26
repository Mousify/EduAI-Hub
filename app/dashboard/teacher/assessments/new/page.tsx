"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Calendar, Loader2, Plus, Trash2, FileText, Brain } from "lucide-react"

// Mock subjects and topics from previous component
const subjects = [
  { id: "math", name: "Mathematics" },
  { id: "science", name: "Science" },
  { id: "english", name: "English" },
  { id: "history", name: "History" },
  { id: "cs", name: "Computer Science" },
]

const topics = {
  math: [
    { id: "algebra", name: "Algebra" },
    { id: "geometry", name: "Geometry" },
    { id: "calculus", name: "Calculus" },
    { id: "statistics", name: "Statistics" },
    { id: "trigonometry", name: "Trigonometry" },
  ],
  science: [
    { id: "physics", name: "Physics" },
    { id: "chemistry", name: "Chemistry" },
    { id: "biology", name: "Biology" },
    { id: "earth_science", name: "Earth Science" },
  ],
  english: [
    { id: "literature", name: "Literature" },
    { id: "grammar", name: "Grammar" },
    { id: "writing", name: "Writing" },
    { id: "vocabulary", name: "Vocabulary" },
  ],
  history: [
    { id: "us_history", name: "US History" },
    { id: "world_history", name: "World History" },
    { id: "civics", name: "Civics" },
  ],
  cs: [
    { id: "programming", name: "Programming" },
    { id: "web_dev", name: "Web Development" },
    { id: "algorithms", name: "Algorithms" },
  ],
}

// Mock classes for demo
const classes = [
  { id: "class-1", name: "Algebra I - Period 2" },
  { id: "class-2", name: "Algebra I - Period 4" },
  { id: "class-3", name: "Geometry - Period 1" },
  { id: "class-4", name: "Calculus - Period 6" },
]

export default function NewAssessmentPage() {
  const router = useRouter()
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [subject, setSubject] = useState("")
  const [selectedTopics, setSelectedTopics] = useState<string[]>([])
  const [selectedClasses, setSelectedClasses] = useState<string[]>([])
  const [dueDate, setDueDate] = useState("")
  const [questionCount, setQuestionCount] = useState(5)
  const [difficulty, setDifficulty] = useState("medium")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([])
  const [activeTab, setActiveTab] = useState("details")

  const handleTopicToggle = (topicId: string) => {
    setSelectedTopics((prev) => (prev.includes(topicId) ? prev.filter((id) => id !== topicId) : [...prev, topicId]))
  }

  const handleClassToggle = (classId: string) => {
    setSelectedClasses((prev) => (prev.includes(classId) ? prev.filter((id) => id !== classId) : [...prev, classId]))
  }

  const handleGenerateQuestions = async () => {
    if (!subject || selectedTopics.length === 0) {
      alert("Please select a subject and at least one topic")
      return
    }

    setIsGenerating(true)

    try {
      // In a real app, this would call your API to generate questions
      // const generatedAssessment = await generateAssessment(
      //   subjects.find(s => s.id === subject)?.name || "",
      //   selectedTopics.map(topicId => {
      //     const topic = topics[subject as keyof typeof topics]?.find(t => t.id === topicId)
      //     return topic?.name || ""
      //   }),
      //   questionCount,
      //   10 // Grade level
      // )

      // Mock generated questions for demo
      setTimeout(() => {
        const mockQuestions = [
          {
            id: "q1",
            question: "Solve for x: 2x + 5 = 15",
            type: "multiple_choice",
            options: ["x = 5", "x = 7", "x = 10", "x = 3"],
            answer: "x = 5",
            points: 2,
          },
          {
            id: "q2",
            question: "Factor the expression: x² - 4",
            type: "multiple_choice",
            options: ["(x + 2)(x - 2)", "(x + 4)(x - 1)", "(x + 1)(x - 4)", "(x + 4)(x - 4)"],
            answer: "(x + 2)(x - 2)",
            points: 3,
          },
          {
            id: "q3",
            question: "What is the slope of the line passing through the points (2, 3) and (4, 7)?",
            type: "multiple_choice",
            options: ["1", "2", "3", "4"],
            answer: "2",
            points: 2,
          },
          {
            id: "q4",
            question: "Solve the system of equations:\nx + y = 5\n2x - y = 4",
            type: "short_answer",
            answer: "x = 3, y = 2",
            points: 4,
          },
          {
            id: "q5",
            question: "Find the area of a circle with radius 6 units.",
            type: "short_answer",
            answer: "36π square units",
            points: 3,
          },
        ]

        setGeneratedQuestions(mockQuestions)
        setIsGenerating(false)
        setActiveTab("questions")
      }, 2000)
    } catch (error) {
      console.error("Error generating assessment:", error)
      alert("Failed to generate assessment questions")
      setIsGenerating(false)
    }
  }

  const handleSaveAssessment = async () => {
    if (!title || selectedClasses.length === 0 || generatedQuestions.length === 0) {
      alert("Please fill in all required fields and generate questions")
      return
    }

    // In a real app, this would save the assessment to your database
    alert("Assessment saved successfully!")
    router.push("/dashboard/teacher/assessments")
  }

  const handleRemoveQuestion = (questionId: string) => {
    setGeneratedQuestions((prev) => prev.filter((q) => q.id !== questionId))
  }

  return (
    <div className="container max-w-4xl py-6">
      <div className="mb-6 flex items-center">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold">Create New Assessment</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4 grid w-full grid-cols-3">
          <TabsTrigger value="details">Assessment Details</TabsTrigger>
          <TabsTrigger value="questions" disabled={generatedQuestions.length === 0}>
            Questions ({generatedQuestions.length})
          </TabsTrigger>
          <TabsTrigger value="assign" disabled={generatedQuestions.length === 0}>
            Assign to Classes
          </TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Details</CardTitle>
              <CardDescription>Provide basic information about your assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Assessment Title</Label>
                <Input
                  id="title"
                  placeholder="e.g., Algebra Mid-Term Exam"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Add a description of this assessment..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Select
                    value={subject}
                    onValueChange={(value) => {
                      setSubject(value)
                      setSelectedTopics([])
                    }}
                  >
                    <SelectTrigger id="subject">
                      <SelectValue placeholder="Select subject" />
                    </SelectTrigger>
                    <SelectContent>
                      {subjects.map((subj) => (
                        <SelectItem key={subj.id} value={subj.id}>
                          {subj.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="due-date">Due Date (Optional)</Label>
                  <div className="flex">
                    <Input id="due-date" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Topics</Label>
                <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                  {subject &&
                    topics[subject as keyof typeof topics]?.map((topic) => (
                      <div key={topic.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`topic-${topic.id}`}
                          checked={selectedTopics.includes(topic.id)}
                          onCheckedChange={() => handleTopicToggle(topic.id)}
                        />
                        <Label htmlFor={`topic-${topic.id}`}>{topic.name}</Label>
                      </div>
                    ))}

                  {!subject && (
                    <p className="col-span-3 text-sm text-muted-foreground">Select a subject to see available topics</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Number of Questions</Label>
                  <span className="text-sm font-medium">{questionCount}</span>
                </div>
                <Slider
                  value={[questionCount]}
                  min={3}
                  max={20}
                  step={1}
                  onValueChange={(value) => setQuestionCount(value[0])}
                />
              </div>

              <div className="space-y-2">
                <Label>Difficulty Level</Label>
                <Tabs defaultValue={difficulty} onValueChange={setDifficulty}>
                  <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="easy">Easy</TabsTrigger>
                    <TabsTrigger value="medium">Medium</TabsTrigger>
                    <TabsTrigger value="hard">Hard</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => router.back()}>
                Cancel
              </Button>
              <Button
                onClick={handleGenerateQuestions}
                disabled={isGenerating || !subject || selectedTopics.length === 0}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating...
                  </>
                ) : (
                  <>
                    <Brain className="mr-2 h-4 w-4" /> Generate Questions
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="questions">
          <Card>
            <CardHeader>
              <CardTitle>Assessment Questions</CardTitle>
              <CardDescription>Review and edit the generated questions</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {generatedQuestions.map((question, index) => (
                <div key={question.id} className="rounded-lg border p-4">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Question {index + 1}</span>
                      <Badge variant="outline">
                        {question.type === "multiple_choice" ? "Multiple Choice" : "Short Answer"}
                      </Badge>
                      <Badge>{question.points} points</Badge>
                    </div>
                    <Button variant="ghost" size="icon" onClick={() => handleRemoveQuestion(question.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <Textarea
                      value={question.question}
                      onChange={(e) => {
                        const updatedQuestions = [...generatedQuestions]
                        updatedQuestions[index].question = e.target.value
                        setGeneratedQuestions(updatedQuestions)
                      }}
                      className="min-h-[80px]"
                    />

                    {question.type === "multiple_choice" && (
                      <div className="space-y-2">
                        <Label>Options</Label>
                        {question.options.map((option: string, optIndex: number) => (
                          <div key={optIndex} className="flex items-center gap-2">
                            <Input
                              value={option}
                              onChange={(e) => {
                                const updatedQuestions = [...generatedQuestions]
                                updatedQuestions[index].options[optIndex] = e.target.value
                                setGeneratedQuestions(updatedQuestions)
                              }}
                            />
                            <Checkbox
                              checked={question.answer === option}
                              onCheckedChange={() => {
                                const updatedQuestions = [...generatedQuestions]
                                updatedQuestions[index].answer = option
                                setGeneratedQuestions(updatedQuestions)
                              }}
                            />
                          </div>
                        ))}
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const updatedQuestions = [...generatedQuestions]
                            updatedQuestions[index].options.push("")
                            setGeneratedQuestions(updatedQuestions)
                          }}
                        >
                          <Plus className="mr-2 h-4 w-4" /> Add Option
                        </Button>
                      </div>
                    )}

                    {question.type === "short_answer" && (
                      <div className="space-y-2">
                        <Label>Answer</Label>
                        <Input
                          value={question.answer}
                          onChange={(e) => {
                            const updatedQuestions = [...generatedQuestions]
                            updatedQuestions[index].answer = e.target.value
                            setGeneratedQuestions(updatedQuestions)
                          }}
                        />
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <Label>Points:</Label>
                      <Select
                        value={question.points.toString()}
                        onValueChange={(value) => {
                          const updatedQuestions = [...generatedQuestions]
                          updatedQuestions[index].points = Number.parseInt(value)
                          setGeneratedQuestions(updatedQuestions)
                        }}
                      >
                        <SelectTrigger className="w-20">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5].map((p) => (
                            <SelectItem key={p} value={p.toString()}>
                              {p}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={() => {
                  setGeneratedQuestions([
                    ...generatedQuestions,
                    {
                      id: `q${generatedQuestions.length + 1}`,
                      question: "",
                      type: "multiple_choice",
                      options: ["", "", "", ""],
                      answer: "",
                      points: 1,
                    },
                  ])
                }}
              >
                <Plus className="mr-2 h-4 w-4" /> Add Question
              </Button>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("details")}>
                Back
              </Button>
              <Button onClick={() => setActiveTab("assign")}>Continue</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="assign">
          <Card>
            <CardHeader>
              <CardTitle>Assign to Classes</CardTitle>
              <CardDescription>Select which classes should receive this assessment</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Select Classes</Label>
                <div className="space-y-2">
                  {classes.map((cls) => (
                    <div key={cls.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={`class-${cls.id}`}
                        checked={selectedClasses.includes(cls.id)}
                        onCheckedChange={() => handleClassToggle(cls.id)}
                      />
                      <Label htmlFor={`class-${cls.id}`}>{cls.name}</Label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="due-date-final">Due Date</Label>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Input id="due-date-final" type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
                </div>
              </div>

              <div className="rounded-md bg-muted p-4">
                <div className="flex items-start gap-2">
                  <FileText className="mt-0.5 h-4 w-4 text-muted-foreground" />
                  <div>
                    <h4 className="text-sm font-medium">Assessment Summary</h4>
                    <p className="text-sm text-muted-foreground">
                      {title} • {generatedQuestions.length} questions • {difficulty} difficulty
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {selectedTopics.length} topics selected • {selectedClasses.length} classes
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setActiveTab("questions")}>
                Back
              </Button>
              <Button onClick={handleSaveAssessment}>Save & Assign Assessment</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

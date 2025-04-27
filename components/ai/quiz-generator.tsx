"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, BrainCircuit, Download, Save, Pencil } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Badge } from "@/components/ui/badge"

interface QuizQuestion {
  question: string
  type: "multiple-choice" | "true-false" | "short-answer"
  options?: string[]
  correctAnswer: string | number
  explanation: string
}

interface Quiz {
  title: string
  subject: string
  gradeLevel: string
  description: string
  questions: QuizQuestion[]
}

export function QuizGenerator() {
  const [topic, setTopic] = useState("")
  const [gradeLevel, setGradeLevel] = useState("")
  const [subject, setSubject] = useState("")
  const [questionCount, setQuestionCount] = useState("10")
  const [questionTypes, setQuestionTypes] = useState<string[]>(["multiple-choice", "true-false"])
  const [loading, setLoading] = useState(false)
  const [quiz, setQuiz] = useState<Quiz | null>(null)
  const [activeTab, setActiveTab] = useState("input")
  const [previewMode, setPreviewMode] = useState<"student" | "teacher">("student")

  const handleQuestionTypeChange = (type: string) => {
    setQuestionTypes(questionTypes.includes(type) ? questionTypes.filter((t) => t !== type) : [...questionTypes, type])
  }

  const generateQuiz = async () => {
    if (!topic || !gradeLevel || !subject || questionTypes.length === 0) return

    setLoading(true)
    setActiveTab("result")

    try {
      // In a real implementation, this would call an API endpoint
      // For now, we'll simulate the API call with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // For demo purposes, create a sample quiz
      setQuiz({
        title: `${topic} Quiz`,
        subject,
        gradeLevel,
        description: `A ${questionCount}-question quiz on ${topic} for grade ${gradeLevel} ${subject} students.`,
        questions: [
          {
            question: "What is the capital of France?",
            type: "multiple-choice",
            options: ["London", "Berlin", "Paris", "Madrid"],
            correctAnswer: 2,
            explanation: "Paris is the capital and most populous city of France.",
          },
          {
            question: "Water boils at 100 degrees Celsius at sea level.",
            type: "true-false",
            correctAnswer: "true",
            explanation: "At standard atmospheric pressure (sea level), water boils at 100 degrees Celsius.",
          },
          {
            question: "Explain the process of photosynthesis in simple terms.",
            type: "short-answer",
            correctAnswer:
              "Photosynthesis is the process by which plants use sunlight, water, and carbon dioxide to create oxygen and energy in the form of sugar.",
            explanation:
              "Photosynthesis is a fundamental biological process that converts light energy into chemical energy.",
          },
          {
            question: "Which of the following is NOT a primary color?",
            type: "multiple-choice",
            options: ["Red", "Blue", "Green", "Yellow"],
            correctAnswer: 3,
            explanation:
              "The primary colors are red, blue, and green. Yellow is a secondary color created by mixing red and green.",
          },
          {
            question: "The formula for the area of a circle is A = πr².",
            type: "true-false",
            correctAnswer: "true",
            explanation:
              "The formula for calculating the area of a circle is A = πr², where r is the radius of the circle.",
          },
        ],
      })
    } catch (error) {
      console.error("Error generating quiz:", error)
    } finally {
      setLoading(false)
    }
  }

  const downloadQuiz = () => {
    if (!quiz) return

    const studentContent = `
# ${quiz.title}

## ${quiz.description}

${quiz.questions
  .map(
    (q, i) => `
### Question ${i + 1}
${q.question}

${
  q.type === "multiple-choice"
    ? q.options?.map((opt, j) => `${String.fromCharCode(65 + j)}. ${opt}`).join("\n")
    : q.type === "true-false"
      ? "True or False?"
      : "[Short answer]"
}
`,
  )
  .join("\n")}
    `

    const teacherContent = `
# ${quiz.title} - ANSWER KEY

## ${quiz.description}

${quiz.questions
  .map(
    (q, i) => `
### Question ${i + 1}
${q.question}

${
  q.type === "multiple-choice"
    ? q.options
        ?.map((opt, j) => `${String.fromCharCode(65 + j)}. ${opt}${j === (q.correctAnswer as number) ? " ✓" : ""}`)
        .join("\n")
    : q.type === "true-false"
      ? `Answer: ${q.correctAnswer}`
      : `Expected answer: ${q.correctAnswer}`
}

Explanation: ${q.explanation}
`,
  )
  .join("\n")}
    `

    const content = previewMode === "student" ? studentContent : teacherContent
    const fileName =
      previewMode === "student"
        ? `${quiz.title.replace(/\s+/g, "-").toLowerCase()}-student.md`
        : `${quiz.title.replace(/\s+/g, "-").toLowerCase()}-answer-key.md`

    const blob = new Blob([content], { type: "text/plain" })
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
          <BrainCircuit className="h-5 w-5" />
          AI Quiz Generator
        </CardTitle>
        <CardDescription>Create customized quizzes with various question types in seconds</CardDescription>
      </CardHeader>
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 mx-6 mt-4">
          <TabsTrigger value="input">Input</TabsTrigger>
          <TabsTrigger value="result" disabled={!quiz && !loading}>
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
              <Label htmlFor="topic">Quiz Topic</Label>
              <Input
                id="topic"
                placeholder="e.g., Fractions, Solar System, World War II"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="question-count">Number of Questions</Label>
                <Input
                  id="question-count"
                  type="number"
                  min="5"
                  max="30"
                  value={questionCount}
                  onChange={(e) => setQuestionCount(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Question Types</Label>
                <div className="flex flex-col space-y-2 pt-1">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="multiple-choice"
                      checked={questionTypes.includes("multiple-choice")}
                      onCheckedChange={() => handleQuestionTypeChange("multiple-choice")}
                    />
                    <Label htmlFor="multiple-choice" className="text-sm font-normal">
                      Multiple Choice
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="true-false"
                      checked={questionTypes.includes("true-false")}
                      onCheckedChange={() => handleQuestionTypeChange("true-false")}
                    />
                    <Label htmlFor="true-false" className="text-sm font-normal">
                      True/False
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="short-answer"
                      checked={questionTypes.includes("short-answer")}
                      onCheckedChange={() => handleQuestionTypeChange("short-answer")}
                    />
                    <Label htmlFor="short-answer" className="text-sm font-normal">
                      Short Answer
                    </Label>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="additional-notes">Additional Instructions (Optional)</Label>
              <Textarea
                id="additional-notes"
                placeholder="Any specific topics to focus on or avoid, difficulty level, etc."
                className="min-h-[100px]"
              />
            </div>
          </TabsContent>
          <TabsContent value="result" className="mt-0">
            {loading ? (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
                <p className="text-muted-foreground">Generating your quiz...</p>
              </div>
            ) : quiz ? (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-lg font-semibold text-blue-800">{quiz.title}</h3>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <Badge variant="outline">Grade {quiz.gradeLevel}</Badge>
                      <Badge variant="outline">{quiz.subject}</Badge>
                      <Badge variant="outline">{quiz.questions.length} Questions</Badge>
                    </div>
                  </div>
                  <RadioGroup
                    value={previewMode}
                    onValueChange={(value) => setPreviewMode(value as "student" | "teacher")}
                    className="flex items-center space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="student" id="student" />
                      <Label htmlFor="student" className="text-sm">
                        Student View
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="teacher" id="teacher" />
                      <Label htmlFor="teacher" className="text-sm">
                        Teacher View
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="space-y-6">
                  {quiz.questions.map((question, i) => (
                    <Card key={i} className="border-blue-100">
                      <CardHeader className="bg-blue-50 py-3">
                        <div className="flex justify-between">
                          <div className="font-medium">Question {i + 1}</div>
                          <Badge>
                            {question.type === "multiple-choice"
                              ? "Multiple Choice"
                              : question.type === "true-false"
                                ? "True/False"
                                : "Short Answer"}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="py-4">
                        <p className="mb-4">{question.question}</p>

                        {question.type === "multiple-choice" && (
                          <div className="space-y-2">
                            {question.options?.map((option, j) => (
                              <div key={j} className="flex items-center space-x-2">
                                <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs">
                                  {String.fromCharCode(65 + j)}
                                </div>
                                <div className="flex-1">{option}</div>
                                {previewMode === "teacher" && j === (question.correctAnswer as number) && (
                                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Correct</Badge>
                                )}
                              </div>
                            ))}
                          </div>
                        )}

                        {question.type === "true-false" && (
                          <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs">
                                A
                              </div>
                              <div className="flex-1">True</div>
                              {previewMode === "teacher" && question.correctAnswer === "true" && (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Correct</Badge>
                              )}
                            </div>
                            <div className="flex items-center space-x-2">
                              <div className="flex h-5 w-5 items-center justify-center rounded-full border border-gray-300 text-xs">
                                B
                              </div>
                              <div className="flex-1">False</div>
                              {previewMode === "teacher" && question.correctAnswer === "false" && (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Correct</Badge>
                              )}
                            </div>
                          </div>
                        )}

                        {question.type === "short-answer" && (
                          <div className="space-y-2">
                            {previewMode === "student" ? (
                              <Textarea placeholder="Enter your answer here..." className="min-h-[100px]" disabled />
                            ) : (
                              <div className="bg-gray-50 p-3 rounded-md border">
                                <div className="font-medium text-sm mb-1">Expected Answer:</div>
                                <p className="text-sm">{question.correctAnswer as string}</p>
                              </div>
                            )}
                          </div>
                        )}

                        {previewMode === "teacher" && (
                          <div className="mt-4 bg-blue-50 p-3 rounded-md">
                            <div className="font-medium text-sm mb-1">Explanation:</div>
                            <p className="text-sm">{question.explanation}</p>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
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
                setTopic("")
                setGradeLevel("")
                setSubject("")
                setQuestionCount("10")
                setQuestionTypes(["multiple-choice", "true-false"])
              }}
            >
              Reset
            </Button>
            <Button
              onClick={generateQuiz}
              disabled={!topic || !gradeLevel || !subject || questionTypes.length === 0 || loading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Generating
                </>
              ) : (
                <>
                  <BrainCircuit className="mr-2 h-4 w-4" />
                  Generate Quiz
                </>
              )}
            </Button>
          </>
        ) : (
          <>
            <Button variant="outline" onClick={() => setActiveTab("input")}>
              <Pencil className="mr-2 h-4 w-4" />
              Edit Quiz
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={downloadQuiz}>
                <Download className="mr-2 h-4 w-4" />
                Download {previewMode === "teacher" ? "Answer Key" : "Quiz"}
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

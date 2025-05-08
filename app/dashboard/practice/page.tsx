"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, XCircle, RefreshCw, Loader2, BookOpen, Brain } from "lucide-react"

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

// Mock practice problems for demo
const mockProblems = [
  {
    id: "p1",
    question: "Solve for x: 3x + 7 = 22",
    type: "multiple_choice",
    options: ["x = 5", "x = 7", "x = 3", "x = 15"],
    correctAnswer: "x = 5",
    explanation: "To solve for x, subtract 7 from both sides: 3x = 15. Then divide both sides by 3: x = 5.",
    difficulty: "easy",
  },
  {
    id: "p2",
    question: "What is the area of a circle with radius 6 cm?",
    type: "multiple_choice",
    options: ["36π cm²", "12π cm²", "6π cm²", "18π cm²"],
    correctAnswer: "36π cm²",
    explanation: "The area of a circle is given by A = πr². With r = 6, we get A = π(6)² = 36π cm².",
    difficulty: "medium",
  },
  {
    id: "p3",
    question: "Factor the expression: x² - 9",
    type: "multiple_choice",
    options: ["(x + 3)(x - 3)", "(x + 9)(x - 1)", "(x + 4.5)(x - 2)", "(x + 9)(x - 9)"],
    correctAnswer: "(x + 3)(x - 3)",
    explanation:
      "This is a difference of squares: a² - b² = (a + b)(a - b). With a = x and b = 3, we get (x + 3)(x - 3).",
    difficulty: "medium",
  },
]

export default function PracticePage() {
  const [subject, setSubject] = useState("")
  const [topic, setTopic] = useState("")
  const [difficulty, setDifficulty] = useState("medium")
  const [numProblems, setNumProblems] = useState(3)
  const [isGenerating, setIsGenerating] = useState(false)
  const [problems, setProblems] = useState<any[]>([])
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0)
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({})
  const [showResults, setShowResults] = useState(false)
  const [score, setScore] = useState(0)

  const handleGenerateProblems = async () => {
    if (!subject || !topic) {
      alert("Please select a subject and topic")
      return
    }

    setIsGenerating(true)

    try {
      // In a real app, this would call your API to generate problems
      // const generatedProblems = await generatePracticeProblems(
      //   topics[subject as keyof typeof topics].find(t => t.id === topic)?.name || "",
      //   difficulty,
      //   numProblems
      // )

      // Using mock data for demo
      setTimeout(() => {
        setProblems(mockProblems)
        setCurrentProblemIndex(0)
        setUserAnswers({})
        setShowResults(false)
        setIsGenerating(false)
      }, 1500)
    } catch (error) {
      console.error("Error generating problems:", error)
      alert("Failed to generate practice problems")
      setIsGenerating(false)
    }
  }

  const handleAnswerChange = (problemId: string, answer: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [problemId]: answer,
    }))
  }

  const handleNextProblem = () => {
    if (currentProblemIndex < problems.length - 1) {
      setCurrentProblemIndex(currentProblemIndex + 1)
    }
  }

  const handlePrevProblem = () => {
    if (currentProblemIndex > 0) {
      setCurrentProblemIndex(currentProblemIndex - 1)
    }
  }

  const handleSubmit = () => {
    // Calculate score
    let correctCount = 0
    problems.forEach((problem) => {
      if (userAnswers[problem.id] === problem.correctAnswer) {
        correctCount++
      }
    })

    setScore(correctCount)
    setShowResults(true)
  }

  const handleReset = () => {
    setProblems([])
    setUserAnswers({})
    setShowResults(false)
    setCurrentProblemIndex(0)
  }

  const currentProblem = problems[currentProblemIndex]

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Practice Problems</h1>
        <p className="text-muted-foreground">Generate custom practice problems to improve your skills</p>
      </div>

      {problems.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>Generate Practice Problems</CardTitle>
            <CardDescription>
              Select a subject, topic, and difficulty level to generate practice problems
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="subject">Subject</Label>
                <Select value={subject} onValueChange={setSubject}>
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
                <Label htmlFor="topic">Topic</Label>
                <Select value={topic} onValueChange={setTopic} disabled={!subject}>
                  <SelectTrigger id="topic">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    {subject &&
                      topics[subject as keyof typeof topics]?.map((t) => (
                        <SelectItem key={t.id} value={t.id}>
                          {t.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
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

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label>Number of Problems</Label>
                <span className="text-sm font-medium">{numProblems}</span>
              </div>
              <Slider
                value={[numProblems]}
                min={1}
                max={10}
                step={1}
                onValueChange={(value) => setNumProblems(value[0])}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button onClick={handleGenerateProblems} disabled={isGenerating} className="w-full">
              {isGenerating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Generating Problems...
                </>
              ) : (
                <>
                  <Brain className="mr-2 h-4 w-4" /> Generate Practice Problems
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      ) : showResults ? (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Practice Results
              <Badge className="text-lg">
                {score}/{problems.length}
              </Badge>
            </CardTitle>
            <CardDescription>
              You got {score} out of {problems.length} problems correct
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {problems.map((problem, index) => {
              const isCorrect = userAnswers[problem.id] === problem.correctAnswer

              return (
                <div key={problem.id} className="space-y-2">
                  <div className="flex items-start gap-2">
                    <div className={isCorrect ? "text-green-500" : "text-red-500"}>
                      {isCorrect ? <CheckCircle2 className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium">
                        Problem {index + 1}: {problem.question}
                      </h3>

                      <div className="mt-2">
                        <p className="text-sm font-medium">Your answer:</p>
                        <p className={`text-sm ${isCorrect ? "text-green-500" : "text-red-500"}`}>
                          {userAnswers[problem.id] || "No answer provided"}
                        </p>
                      </div>

                      {!isCorrect && (
                        <div className="mt-2">
                          <p className="text-sm font-medium">Correct answer:</p>
                          <p className="text-sm text-green-500">{problem.correctAnswer}</p>
                        </div>
                      )}

                      <div className="mt-2 rounded-md bg-muted p-3">
                        <p className="text-sm font-medium">Explanation:</p>
                        <p className="text-sm">{problem.explanation}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="outline" onClick={handleReset}>
              <RefreshCw className="mr-2 h-4 w-4" /> Try Again
            </Button>
            <Button
              onClick={() => {
                setSubject("")
                setTopic("")
                setProblems([])
              }}
            >
              <BookOpen className="mr-2 h-4 w-4" /> New Practice Set
            </Button>
          </CardFooter>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    Problem {currentProblemIndex + 1} of {problems.length}
                  </CardTitle>
                  <CardDescription>
                    {subjects.find((s) => s.id === subject)?.name} •
                    {topics[subject as keyof typeof topics]?.find((t) => t.id === topic)?.name} •
                    {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
                  </CardDescription>
                </div>
                <Badge variant="outline">{currentProblem.difficulty}</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-lg font-medium">{currentProblem.question}</div>

              {currentProblem.type === "multiple_choice" && (
                <RadioGroup
                  value={userAnswers[currentProblem.id] || ""}
                  onValueChange={(value) => handleAnswerChange(currentProblem.id, value)}
                >
                  {currentProblem.options.map((option: string, i: number) => (
                    <div key={i} className="flex items-center space-x-2">
                      <RadioGroupItem value={option} id={`option-${i}`} />
                      <Label htmlFor={`option-${i}`}>{option}</Label>
                    </div>
                  ))}
                </RadioGroup>
              )}

              {currentProblem.type === "short_answer" && (
                <Input
                  placeholder="Your answer..."
                  value={userAnswers[currentProblem.id] || ""}
                  onChange={(e) => handleAnswerChange(currentProblem.id, e.target.value)}
                />
              )}

              {currentProblem.type === "essay" && (
                <Textarea
                  placeholder="Your answer..."
                  value={userAnswers[currentProblem.id] || ""}
                  onChange={(e) => handleAnswerChange(currentProblem.id, e.target.value)}
                  className="min-h-[150px]"
                />
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <div>
                <Button variant="outline" onClick={handlePrevProblem} disabled={currentProblemIndex === 0}>
                  Previous
                </Button>
              </div>
              <div>
                {currentProblemIndex === problems.length - 1 ? (
                  <Button onClick={handleSubmit}>Submit Answers</Button>
                ) : (
                  <Button onClick={handleNextProblem}>Next Problem</Button>
                )}
              </div>
            </CardFooter>
          </Card>

          <div className="flex justify-center">
            <div className="flex gap-1">
              {problems.map((_, i) => (
                <Button
                  key={i}
                  variant={i === currentProblemIndex ? "default" : "outline"}
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setCurrentProblemIndex(i)}
                >
                  {i + 1}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

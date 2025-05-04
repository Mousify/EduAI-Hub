"use client"

import { useState, useEffect } from "react"
import { PracticeModeToggle } from "@/components/practice/mode-toggle"
import { TestMode } from "@/components/practice/test-mode"
import { LearningMode } from "@/components/practice/learning-mode"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { motion } from "framer-motion"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Loader2, RefreshCw } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import confetti from "canvas-confetti"

// Sample questions (in a real app, these would come from an API)
const sampleQuestions = [
  {
    id: "q1",
    question: "Kiek yra 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: 1,
    explanation: "2 + 2 = 4, nes sudedame du ir du, kas yra lygu keturiems.",
    subject: "Matematika",
  },
  {
    id: "q2",
    question: "Kas yra Lietuvos sostinė?",
    options: ["Kaunas", "Vilnius", "Klaipėda", "Šiauliai"],
    correctAnswer: 1,
    explanation: "Vilnius yra Lietuvos sostinė nuo 1323 metų.",
    subject: "Geografija",
  },
  {
    id: "q3",
    question: "Kuris iš šių elementų yra metalas?",
    options: ["Deguonis", "Azotas", "Geležis", "Chloras"],
    correctAnswer: 2,
    explanation: "Geležis (Fe) yra metalas, o deguonis, azotas ir chloras yra nemetalai.",
    subject: "Chemija",
  },
  {
    id: "q4",
    question: "Koks yra didžiausias pasaulio vandenynas?",
    options: ["Atlanto", "Indijos", "Arkties", "Ramusis"],
    correctAnswer: 3,
    explanation: "Ramusis vandenynas yra didžiausias ir giliausias vandenynas Žemėje.",
    subject: "Geografija",
  },
  {
    id: "q5",
    question: "Kiek dienų yra vasario mėnesį keliamaisiais metais?",
    options: ["28", "29", "30", "31"],
    correctAnswer: 1,
    explanation: "Keliamaisiais metais vasario mėnuo turi 29 dienas.",
    subject: "Matematika",
  },
]

// Group questions by subject
const subjects = [...new Set(sampleQuestions.map((q) => q.subject))]
const questionsBySubject = subjects.reduce(
  (acc, subject) => {
    acc[subject] = sampleQuestions.filter((q) => q.subject === subject)
    return acc
  },
  {} as Record<string, typeof sampleQuestions>,
)

export default function PracticePage() {
  const [mode, setMode] = useLocalStorage<"test" | "learning">("practice-mode", "learning")
  const [activeSubject, setActiveSubject] = useState(subjects[0])
  const [isCompleted, setIsCompleted] = useState(false)
  const [score, setScore] = useState(0)
  const [totalQuestions, setTotalQuestions] = useState(0)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  const handleModeChange = (newMode: "test" | "learning") => {
    setMode(newMode)
  }

  const handleComplete = (score: number, total: number) => {
    setScore(score)
    setTotalQuestions(total)
    setIsCompleted(true)

    // Show confetti if score is good
    if (score / total >= 0.7) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }
  }

  const handleReset = () => {
    setIsCompleted(false)
  }

  if (isLoading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Praktika</h1>
          <p className="text-muted-foreground">Pasirinkite režimą ir mokykitės savo tempu</p>
        </div>

        <PracticeModeToggle onChange={handleModeChange} />
      </div>

      {isCompleted ? (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card>
            <CardHeader>
              <CardTitle>Rezultatai</CardTitle>
              <CardDescription>
                Jūs atsakėte teisingai į {score} iš {totalQuestions} klausimų
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <Progress value={(score / totalQuestions) * 100} className="h-3" />

              <div className="text-center space-y-2">
                <p className="text-2xl font-bold">{Math.round((score / totalQuestions) * 100)}%</p>
                <p className="text-muted-foreground">
                  {score / totalQuestions >= 0.8
                    ? "Puikus rezultatas!"
                    : score / totalQuestions >= 0.6
                      ? "Geras rezultatas!"
                      : "Bandykite dar kartą!"}
                </p>
              </div>

              <Button onClick={handleReset} className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" />
                Bandyti dar kartą
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <div className="space-y-6">
          <Tabs defaultValue={activeSubject} onValueChange={setActiveSubject}>
            <TabsList className="mb-4">
              {subjects.map((subject) => (
                <TabsTrigger key={subject} value={subject}>
                  {subject}
                </TabsTrigger>
              ))}
            </TabsList>

            {subjects.map((subject) => (
              <TabsContent key={subject} value={subject} className="mt-0">
                {mode === "test" ? (
                  <TestMode questions={questionsBySubject[subject]} onComplete={handleComplete} />
                ) : (
                  <LearningMode questions={questionsBySubject[subject]} onComplete={handleComplete} />
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      )}
    </div>
  )
}

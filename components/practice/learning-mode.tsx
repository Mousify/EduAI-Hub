"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { motion, AnimatePresence } from "framer-motion"
import { CheckCircle2, XCircle, ArrowRight } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation: string
}

interface LearningModeProps {
  questions: Question[]
  onComplete: (score: number, totalQuestions: number) => void
}

export function LearningMode({ questions, onComplete }: LearningModeProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [answers, setAnswers] = useState<(number | null)[]>(Array(questions.length).fill(null))
  const [isCorrect, setIsCorrect] = useState(false)

  const currentQuestion = questions[currentQuestionIndex]

  // Sound effects
  useEffect(() => {
    // Create audio elements
    const correctSound = new Audio("/sounds/correct.mp3")
    const incorrectSound = new Audio("/sounds/incorrect.mp3")

    // Preload sounds
    correctSound.load()
    incorrectSound.load()

    // Play appropriate sound when answer is submitted
    if (isAnswered && selectedOption !== null) {
      if (selectedOption === currentQuestion.correctAnswer) {
        correctSound.play().catch((e) => console.log("Audio play failed:", e))
      } else {
        incorrectSound.play().catch((e) => console.log("Audio play failed:", e))
      }
    }
  }, [isAnswered, selectedOption, currentQuestion])

  const handleOptionSelect = (optionIndex: number) => {
    if (!isAnswered) {
      setSelectedOption(optionIndex)
    }
  }

  const handleCheckAnswer = () => {
    if (selectedOption !== null && !isAnswered) {
      setIsAnswered(true)
      setIsCorrect(selectedOption === currentQuestion.correctAnswer)

      // Save answer
      const newAnswers = [...answers]
      newAnswers[currentQuestionIndex] = selectedOption
      setAnswers(newAnswers)
    }
  }

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setSelectedOption(null)
      setIsAnswered(false)
    } else {
      // Calculate score
      const score = answers.reduce((acc, answer, index) => {
        return answer === questions[index].correctAnswer ? acc + 1 : acc
      }, 0)

      onComplete(score, questions.length)
    }
  }

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={currentQuestionIndex}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="w-full">
          <CardHeader>
            <CardTitle>
              Klausimas {currentQuestionIndex + 1} iš {questions.length}
            </CardTitle>
            <CardDescription>Mokymosi režimas</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div className="text-lg font-medium">{currentQuestion.question}</div>

              <RadioGroup
                value={selectedOption?.toString()}
                onValueChange={(value) => handleOptionSelect(Number.parseInt(value))}
              >
                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <motion.div
                      key={index}
                      className={`flex items-center space-x-2 rounded-md border p-2 ${
                        isAnswered && index === currentQuestion.correctAnswer
                          ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                          : isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer
                            ? "border-red-500 bg-red-50 dark:bg-red-900/20"
                            : ""
                      }`}
                      animate={
                        isAnswered && (index === currentQuestion.correctAnswer || index === selectedOption)
                          ? { scale: [1, 1.02, 1] }
                          : {}
                      }
                      transition={{ duration: 0.5 }}
                    >
                      <RadioGroupItem value={index.toString()} id={`option-${index}`} disabled={isAnswered} />
                      <Label htmlFor={`option-${index}`} className="flex-grow cursor-pointer py-2">
                        {option}
                      </Label>
                      {isAnswered && index === currentQuestion.correctAnswer && (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      )}
                      {isAnswered && index === selectedOption && index !== currentQuestion.correctAnswer && (
                        <XCircle className="h-5 w-5 text-red-500" />
                      )}
                    </motion.div>
                  ))}
                </div>
              </RadioGroup>

              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  transition={{ duration: 0.3 }}
                >
                  <Alert className={isCorrect ? "border-green-500" : "border-red-500"}>
                    <AlertTitle className={isCorrect ? "text-green-500" : "text-red-500"}>
                      {isCorrect ? "Teisingai!" : "Neteisingai!"}
                    </AlertTitle>
                    <AlertDescription>{currentQuestion.explanation}</AlertDescription>
                  </Alert>
                </motion.div>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            {!isAnswered ? (
              <>
                <div className="text-sm text-muted-foreground">
                  {selectedOption !== null ? "Pasirinkta" : "Pasirinkite atsakymą"}
                </div>
                <Button onClick={handleCheckAnswer} disabled={selectedOption === null}>
                  Patikrinti
                </Button>
              </>
            ) : (
              <>
                <div className="text-sm text-muted-foreground">
                  {isCorrect ? "Puiku!" : "Pabandykite dar kartą kitame klausime"}
                </div>
                <Button onClick={handleNext}>
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Kitas klausimas
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    "Baigti"
                  )}
                </Button>
              </>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    </AnimatePresence>
  )
}

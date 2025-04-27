import { QuizGenerator } from "@/components/ai/quiz-generator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Quiz Generator | Teacher Dashboard",
  description: "Create customized quizzes with various question types in seconds",
}

export default function QuizGeneratorPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Quiz Generator</h1>
        <p className="text-muted-foreground">Create customized quizzes with various question types in seconds</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <QuizGenerator />
      </div>
    </div>
  )
}

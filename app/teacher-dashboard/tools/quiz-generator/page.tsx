import { QuizGenerator } from "@/components/ai/quiz-generator"

export default function QuizGeneratorPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">AI Quiz Generator</h1>
          <p className="text-gray-500 mt-2">Create customized quizzes with various question types in seconds</p>
        </div>

        <QuizGenerator />
      </div>
    </div>
  )
}

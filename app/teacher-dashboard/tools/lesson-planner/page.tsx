import { LessonPlanGenerator } from "@/components/ai/lesson-plan-generator"

export default function LessonPlannerPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">AI Lesson Plan Generator</h1>
          <p className="text-gray-500 mt-2">Create comprehensive lesson plans in seconds with AI assistance</p>
        </div>

        <LessonPlanGenerator />
      </div>
    </div>
  )
}

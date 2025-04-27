import { LessonPlanGenerator } from "@/components/ai/lesson-plan-generator"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "AI Lesson Plan Generator | Teacher Dashboard",
  description: "Create comprehensive lesson plans in seconds with AI assistance",
}

export default function LessonPlannerPage() {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">AI Lesson Plan Generator</h1>
        <p className="text-muted-foreground">
          Create comprehensive, customized lesson plans in seconds with AI assistance
        </p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <LessonPlanGenerator />
      </div>
    </div>
  )
}

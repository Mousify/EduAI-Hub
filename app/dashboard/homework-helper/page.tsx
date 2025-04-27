import { HomeworkHelper } from "@/components/ai/homework-helper"

export default function HomeworkHelperPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">Homework Helper</h1>
          <p className="text-gray-500 mt-2">Get step-by-step help with your homework questions</p>
        </div>

        <HomeworkHelper />
      </div>
    </div>
  )
}

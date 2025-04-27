import { StudyGuideGenerator } from "@/components/ai/study-guide-generator"

export default function StudyGuidesPage() {
  return (
    <div className="container mx-auto max-w-4xl">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">Study Guide Generator</h1>
          <p className="text-gray-500 mt-2">Create personalized study guides for any topic</p>
        </div>

        <StudyGuideGenerator />
      </div>
    </div>
  )
}

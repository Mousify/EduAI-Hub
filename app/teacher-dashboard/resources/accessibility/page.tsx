import { SpeechToText } from "@/components/ai/speech-to-text"

export default function AccessibilityToolsPage() {
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col gap-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-blue-600">Accessibility Tools</h1>
          <p className="text-gray-500 mt-2">Tools to make learning accessible for all students</p>
        </div>

        <SpeechToText />
      </div>
    </div>
  )
}

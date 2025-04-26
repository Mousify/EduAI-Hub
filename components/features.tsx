import { BookOpen, BrainCircuit, ImageIcon, LineChart, Lightbulb, Sparkles } from "lucide-react"

export function Features() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32" id="features">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Everything You Need to Excel</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform combines cutting-edge AI with proven educational methodologies to provide a comprehensive
              learning experience.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <BrainCircuit className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">AI Tutoring</h3>
            <p className="text-sm text-muted-foreground text-center">
              Get step-by-step solutions to your homework questions, with detailed explanations.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Lightbulb className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Practice Generation</h3>
            <p className="text-sm text-muted-foreground text-center">
              Custom practice problems adapted to your learning needs and skill level.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <ImageIcon className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Multimodal Input</h3>
            <p className="text-sm text-muted-foreground text-center">
              Upload images, text, or audio recordings of your questions for analysis.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <BookOpen className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Curriculum Alignment</h3>
            <p className="text-sm text-muted-foreground text-center">
              Content tailored to educational standards and grade-appropriate learning targets.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <LineChart className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Performance Analytics</h3>
            <p className="text-sm text-muted-foreground text-center">
              Track progress and identify areas for improvement with detailed insights.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted">
              <Sparkles className="h-6 w-6" />
            </div>
            <h3 className="text-xl font-bold">Teacher Tools</h3>
            <p className="text-sm text-muted-foreground text-center">
              Comprehensive classroom management, assessment generation, and student monitoring.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

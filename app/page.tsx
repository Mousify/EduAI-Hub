import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronRight, CheckCircle, ArrowRight, BookOpen, Users, Award, Brain } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6 text-primary"
          >
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" x2="4" y1="22" y2="15" />
          </svg>
          <span className="text-lg font-semibold">EduAI Hub</span>
        </div>
        <nav className="hidden md:flex md:items-center md:gap-6">
          <Link href="#features" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Features
          </Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            How It Works
          </Link>
          <Link href="#pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Pricing
          </Link>
          <Link href="#testimonials" className="text-sm font-medium text-muted-foreground hover:text-foreground">
            Testimonials
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild className="hidden md:inline-flex">
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Get Started</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-gradient-to-b from-blue-50 to-white py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-12 md:grid-cols-2 md:gap-16">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                    AI-Powered Learning for Every Student
                  </h1>
                  <p className="max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                    Get personalized homework help, practice exercises, and step-by-step solutions with our AI tutoring
                    platform.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button size="lg" asChild>
                    <Link href="/signup">
                      Start Learning
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <Link href="#how-it-works">See How It Works</Link>
                  </Button>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>24/7 Tutoring</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Personalized Learning</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Instant Feedback</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px]">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 opacity-20 blur-3xl"></div>
                  <div className="relative h-full w-full rounded-xl border bg-background p-4 shadow-xl">
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-2 rounded-full bg-red-500"></div>
                        <div className="h-2 w-2 rounded-full bg-yellow-500"></div>
                        <div className="h-2 w-2 rounded-full bg-green-500"></div>
                        <div className="ml-auto text-xs text-muted-foreground">AI Tutor</div>
                      </div>
                      <div className="space-y-2 rounded-lg bg-muted p-3">
                        <p className="text-sm">How do I solve this quadratic equation: 2x² + 5x - 3 = 0?</p>
                      </div>
                      <div className="space-y-2 rounded-lg bg-primary/10 p-3">
                        <p className="text-sm">
                          To solve this quadratic equation, we'll use the quadratic formula:
                          <br />x = (-b ± √(b² - 4ac)) / 2a
                          <br />
                          <br />
                          Where a = 2, b = 5, and c = -3
                          <br />
                          <br />
                          Step 1: Calculate the discriminant: b² - 4ac = 5² - 4(2)(-3) = 25 + 24 = 49
                          <br />
                          Step 2: Apply the formula: x = (-5 ± √49) / 4 = (-5 ± 7) / 4
                          <br />
                          Step 3: Solve for both values:
                          <br />
                          x₁ = (-5 + 7) / 4 = 2 / 4 = 0.5
                          <br />
                          x₂ = (-5 - 7) / 4 = -12 / 4 = -3
                          <br />
                          <br />
                          The solutions are x = 0.5 and x = -3
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20" id="how-it-works">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">How It Works</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Learning Made Simple</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform makes it easy to get the help you need, when you need it.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Upload Your Question</h3>
                <p className="text-sm text-muted-foreground">
                  Take a photo of your homework or type your question to get started.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI tutor analyzes your question and prepares a personalized solution.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Award className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Learn & Practice</h3>
                <p className="text-sm text-muted-foreground">
                  Get step-by-step explanations and practice with similar problems to master the concept.
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <Button size="lg" asChild>
                <Link href="/signup">
                  Try It Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* For Students & Teachers Section */}
        <section className="bg-muted/50 py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">For Students & Teachers</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers specialized tools for both students and educators.
                </p>
              </div>
            </div>
            <div className="grid gap-8 py-12 md:grid-cols-2">
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-2xl font-bold">For Students</h3>
                <p className="mb-4 text-muted-foreground">
                  Get the help you need to excel in your studies with personalized tutoring and practice.
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>24/7 homework help with step-by-step solutions</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Personalized practice problems based on your skill level</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Study guides and test preparation assistance</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Track your progress and identify areas for improvement</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/signup?role=student">Sign Up as a Student</Link>
                </Button>
              </div>
              <div className="rounded-xl border bg-card p-6 shadow-sm">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-2xl font-bold">For Teachers</h3>
                <p className="mb-4 text-muted-foreground">
                  Enhance your teaching with AI-powered tools that save time and improve student outcomes.
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Create custom assessments and quizzes in seconds</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Monitor student progress with detailed analytics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Generate lesson plans and teaching materials</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Identify at-risk students and provide targeted support</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/signup?role=teacher">Sign Up as a Teacher</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

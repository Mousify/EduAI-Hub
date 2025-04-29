import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNavigation } from "@/components/main-navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle, ArrowRight, BookOpen, Users, Brain, Sparkles } from "lucide-react"
import { HeroImage } from "@/components/hero-image"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HomeButton } from "@/components/home-button"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/95 backdrop-blur px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <MobileNavigation />
          <HomeButton />
        </div>

        <MainNavigation />

        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild className="hidden md:inline-flex">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-background py-20 md:py-32">
          <div className="container relative z-10 mx-auto px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                    AI-Powered Learning for Every Student
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Get personalized homework help, practice exercises, and study guides tailored to your needs.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link
                    href="/signup"
                    className={cn(
                      buttonVariants({ size: "lg" }),
                      "bg-primary text-primary-foreground hover:bg-primary/90",
                    )}
                  >
                    Get Started for Free
                  </Link>
                  <Link
                    href="/pricing"
                    className={cn(
                      buttonVariants({ variant: "outline", size: "lg" }),
                      "border-primary text-primary hover:bg-primary/10",
                    )}
                  >
                    View Pricing
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <HeroImage />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Powerful AI Learning Tools</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a comprehensive suite of AI-powered tools to enhance learning and teaching.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">AI Homework Helper</h3>
                <p className="text-sm text-muted-foreground">
                  Get step-by-step solutions to your homework problems with detailed explanations.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Personalized Practice</h3>
                <p className="text-sm text-muted-foreground">
                  Generate custom practice problems tailored to your skill level and learning goals.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Study Guides</h3>
                <p className="text-sm text-muted-foreground">
                  Create comprehensive study guides for any subject with our AI-powered tools.
                </p>
              </div>
            </div>

            <div className="flex justify-center">
              <Button size="lg" asChild>
                <Link href="/features">
                  Explore All Features
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

      <SiteFooter />
    </div>
  )
}

"use client"

import { useRef } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { MainNavigation } from "@/components/main-navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { SiteFooter } from "@/components/site-footer"
import { CheckCircle, ArrowRight, BookOpen, Brain, Sparkles, Star, Check, X, GraduationCap, School } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { HomeButton } from "@/components/home-button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { HeroImage } from "@/components/hero-image"

export default function Home() {
  const studentPricingRef = useRef<HTMLDivElement>(null)
  const teacherPricingRef = useRef<HTMLDivElement>(null)

  const scrollToStudentPricing = () => {
    if (studentPricingRef.current) {
      studentPricingRef.current.scrollIntoView({ behavior: "smooth" })
      highlightElement(studentPricingRef.current)
    }
  }

  const scrollToTeacherPricing = () => {
    if (teacherPricingRef.current) {
      teacherPricingRef.current.scrollIntoView({ behavior: "smooth" })
      highlightElement(teacherPricingRef.current)
    }
  }

  const highlightElement = (element: HTMLElement) => {
    element.classList.add("scale-105")
    element.classList.add("ring-4")
    element.classList.add("ring-primary")
    element.classList.add("ring-opacity-50")

    setTimeout(() => {
      element.classList.remove("scale-105")
      element.classList.remove("ring-4")
      element.classList.remove("ring-primary")
      element.classList.remove("ring-opacity-50")
    }, 1500)
  }

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
                    AI-Powered Tools for Everyone
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    mano10 provides powerful AI tools to enhance your productivity and creativity.
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
                    href="#pricing"
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

        {/* Student/Teacher Section */}
        <section className="py-20 bg-gradient-to-b from-white to-muted/30 dark:from-gray-900 dark:to-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
                  Choose Your Path
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Tailored for Your Needs</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Whether you're a student looking to learn or a teacher wanting to enhance your classroom, we have the
                  right tools for you.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Student Option */}
              <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-gradient-to-b from-blue-50 to-white p-8 shadow-md transition-all hover:shadow-lg dark:border-blue-900 dark:from-blue-950 dark:to-gray-900">
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-blue-100 opacity-50 dark:bg-blue-900"></div>
                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-blue-100 opacity-50 dark:bg-blue-900"></div>

                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-300">
                    <GraduationCap className="h-6 w-6" />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-blue-600 dark:text-blue-300">For Students</h3>
                  <p className="mb-6 text-muted-foreground">
                    Access powerful learning tools, get homework help, and practice with personalized exercises.
                  </p>

                  <ul className="mb-8 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      <span>24/7 AI homework assistance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      <span>Personalized practice problems</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      <span>Study guides and test prep</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      <span>Progress tracking</span>
                    </li>
                  </ul>

                  <div className="mb-6">
                    <span className="text-3xl font-bold text-blue-600 dark:text-blue-300">Free</span>
                    <span className="ml-1 text-muted-foreground">to start</span>
                  </div>

                  <Button
                    onClick={scrollToStudentPricing}
                    className="w-full bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600"
                  >
                    View Student Plans
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Teacher Option */}
              <div className="group relative overflow-hidden rounded-2xl border border-green-100 bg-gradient-to-b from-green-50 to-white p-8 shadow-md transition-all hover:shadow-lg dark:border-green-900 dark:from-green-950 dark:to-gray-900">
                <div className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-green-100 opacity-50 dark:bg-green-900"></div>
                <div className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-green-100 opacity-50 dark:bg-green-900"></div>

                <div className="relative z-10">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300">
                    <School className="h-6 w-6" />
                  </div>

                  <h3 className="mb-3 text-2xl font-bold text-green-600 dark:text-green-300">For Teachers</h3>
                  <p className="mb-6 text-muted-foreground">
                    Create engaging content, monitor student progress, and save time with AI-powered tools.
                  </p>

                  <ul className="mb-8 space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                      <span>Automated content generation</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                      <span>Student performance analytics</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                      <span>Lesson planning assistance</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
                      <span>Classroom management tools</span>
                    </li>
                  </ul>

                  <div className="mb-6">
                    <span className="text-3xl font-bold text-green-600 dark:text-green-300">Free</span>
                    <span className="ml-1 text-muted-foreground">to start</span>
                  </div>

                  <Button
                    onClick={scrollToTeacherPricing}
                    className="w-full bg-green-600 text-white hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600"
                  >
                    View Teacher Plans
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Value Propositions */}
        <section id="features" className="py-20 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Features</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Powerful AI Tools</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform offers a comprehensive suite of AI-powered tools to enhance your workflow.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center dark:border-gray-700">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                  <BookOpen className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Content Generation</h3>
                <p className="text-sm text-muted-foreground">
                  Generate high-quality content for various purposes with our advanced AI tools.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center dark:border-gray-700">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                  <Brain className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Smart Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Analyze data and extract valuable insights with our AI-powered analytics tools.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 rounded-lg border p-6 text-center dark:border-gray-700">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                  <Sparkles className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold">Creative Assistant</h3>
                <p className="text-sm text-muted-foreground">
                  Enhance your creativity with AI-powered suggestions and ideas for your projects.
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

        {/* Pricing Section */}
        <section id="pricing" className="bg-muted/50 py-20 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Pricing</div>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Simple, Transparent Pricing</h2>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Choose the plan that's right for you, with flexible options for individuals and teams.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
              {/* Free Plan */}
              <Card
                className="flex flex-col border-primary/10 transition-all duration-300 dark:border-gray-700"
                ref={studentPricingRef}
              >
                <CardHeader>
                  <CardTitle>Free</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $0
                    <span className="ml-1 text-lg font-medium text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-4">
                    Perfect for trying out the platform and occasional use.
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <PricingItem included>
                      <strong>50</strong> AI tokens per month
                    </PricingItem>
                    <PricingItem included>Basic content generation</PricingItem>
                    <PricingItem included>Limited analytics</PricingItem>
                    <PricingItem included>Standard support</PricingItem>
                    <PricingItem>Advanced features</PricingItem>
                    <PricingItem>Priority support</PricingItem>
                    <PricingItem>Custom integrations</PricingItem>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Pro Plan */}
              <Card
                className="flex flex-col border-primary/20 shadow-lg transition-all duration-300 dark:border-gray-700"
                ref={teacherPricingRef}
              >
                <CardHeader className="bg-primary/5 dark:bg-primary/10">
                  <div className="rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold w-fit dark:bg-primary/20">
                    MOST POPULAR
                  </div>
                  <CardTitle className="mt-2">Pro</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $19.99
                    <span className="ml-1 text-lg font-medium text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-4">Everything you need for professional use.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <PricingItem included>
                      <strong>500</strong> AI tokens per month
                    </PricingItem>
                    <PricingItem included>Advanced content generation</PricingItem>
                    <PricingItem included>Full analytics suite</PricingItem>
                    <PricingItem included>Priority support</PricingItem>
                    <PricingItem included>Advanced features</PricingItem>
                    <PricingItem included>API access (limited)</PricingItem>
                    <PricingItem>Custom integrations</PricingItem>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-primary hover:bg-primary/90">
                    <Link href="/signup?plan=pro">Subscribe Now</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Enterprise Plan */}
              <Card className="flex flex-col border-primary/10 transition-all duration-300 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Enterprise</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $49.99
                    <span className="ml-1 text-lg font-medium text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-4">Advanced tools for teams and businesses.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <PricingItem included>
                      <strong>2,000</strong> AI tokens per month
                    </PricingItem>
                    <PricingItem included>Premium content generation</PricingItem>
                    <PricingItem included>Advanced analytics with insights</PricingItem>
                    <PricingItem included>24/7 priority support</PricingItem>
                    <PricingItem included>All advanced features</PricingItem>
                    <PricingItem included>Full API access</PricingItem>
                    <PricingItem included>Custom integrations</PricingItem>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/signup?plan=enterprise">Subscribe Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* Token Packages */}
            <div className="mt-16">
              <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-700 dark:bg-purple-900 dark:text-purple-300">
                  Tokens
                </div>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Additional AI Tokens</h2>
                <p className="max-w-[700px] text-muted-foreground">
                  Need more AI power? Purchase additional tokens for your account.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
                <Card className="flex flex-col dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>Basic Pack</CardTitle>
                    <div className="mt-4 flex items-baseline text-3xl font-bold">$4.99</div>
                    <CardDescription className="mt-2">100 additional AI tokens</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/dashboard/billing">Purchase</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="flex flex-col border-purple-100 shadow-lg dark:border-purple-900">
                  <CardHeader className="bg-purple-50 dark:bg-purple-900/30">
                    <div className="rounded-full bg-purple-100 text-purple-700 px-3 py-1 text-xs font-semibold w-fit dark:bg-purple-800 dark:text-purple-200">
                      BEST VALUE
                    </div>
                    <CardTitle className="mt-2">Standard Pack</CardTitle>
                    <div className="mt-4 flex items-baseline text-3xl font-bold">$9.99</div>
                    <CardDescription className="mt-2">250 additional AI tokens</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button
                      asChild
                      className="w-full bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-600"
                    >
                      <Link href="/dashboard/billing">Purchase</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="flex flex-col dark:border-gray-700">
                  <CardHeader>
                    <CardTitle>Premium Pack</CardTitle>
                    <div className="mt-4 flex items-baseline text-3xl font-bold">$19.99</div>
                    <CardDescription className="mt-2">600 additional AI tokens</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/dashboard/billing">Purchase</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-white dark:bg-gray-900">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Testimonials</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">What Our Users Say</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Hear from our satisfied users about how mano10 has transformed their workflow.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-3">
              <TestimonialCard
                name="Sarah Johnson"
                role="Content Creator"
                quote="mano10 has completely transformed how I create content. The AI tools are intuitive and powerful, saving me hours of work each week."
              />
              <TestimonialCard
                name="Michael Chen"
                role="Data Analyst"
                quote="The analytics capabilities are impressive. I can extract insights from data in minutes that would have taken days to process manually."
              />
              <TestimonialCard
                name="Emily Rodriguez"
                role="Marketing Manager"
                quote="Our team's productivity has skyrocketed since we started using mano10. The collaborative features and AI assistance are game-changers."
              />
              <TestimonialCard
                name="David Kim"
                role="Software Developer"
                quote="The API integration is seamless, and the documentation is excellent. I've been able to incorporate mano10's AI capabilities into our products easily."
              />
              <TestimonialCard
                name="Jessica Patel"
                role="Small Business Owner"
                quote="As a small business owner, mano10 has given me access to AI tools I couldn't afford otherwise. It's like having an entire team at my fingertips."
              />
              <TestimonialCard
                name="Thomas Wilson"
                role="Researcher"
                quote="The accuracy and speed of mano10's analysis tools have significantly accelerated my research. I can process and understand complex data sets much faster now."
              />
            </div>
          </div>
        </section>

        {/* Free Tools Highlight */}
        <section className="py-20 bg-muted/30 dark:bg-gray-800">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">Free Tools</div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Start with Our Free Tier</h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Explore powerful AI tools available in our free tier to enhance your productivity.
                </p>
              </div>
            </div>

            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2">
              <div className="rounded-xl border bg-card p-6 shadow-sm dark:border-gray-700">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-2xl font-bold">Basic Content Generator</h3>
                <p className="mb-4 text-muted-foreground">
                  Create simple content pieces with our AI-powered generator. Perfect for getting started with AI
                  content creation.
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Generate short-form content</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Basic formatting options</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Export in multiple formats</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Up to 5 generations per day</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/signup">Try It Free</Link>
                </Button>
              </div>
              <div className="rounded-xl border bg-card p-6 shadow-sm dark:border-gray-700">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 dark:bg-primary/20">
                  <Brain className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-2xl font-bold">Simple Data Analysis</h3>
                <p className="mb-4 text-muted-foreground">
                  Analyze basic data sets and extract insights with our entry-level AI analytics tool.
                </p>
                <ul className="mb-6 space-y-2">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Upload CSV and Excel files</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Basic data visualization</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Simple trend identification</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-primary" />
                    <span>Up to 3 analyses per day</span>
                  </li>
                </ul>
                <Button asChild>
                  <Link href="/signup">Try It Free</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5 dark:bg-gray-800/50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Ready to Get Started?</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Join thousands of users already leveraging mano10's AI tools to enhance their productivity.
              </p>
              <div className="flex flex-col gap-2 min-[400px]:flex-row pt-4">
                <Button size="lg" asChild>
                  <Link href="/signup">
                    Sign Up for Free
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/login">Log In</Link>
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

function PricingItem({ children, included = false }) {
  return (
    <li className="flex items-start gap-2">
      {included ? (
        <Check className="h-5 w-5 text-green-500 mt-0.5 shrink-0 dark:text-green-400" />
      ) : (
        <X className="h-5 w-5 text-gray-300 mt-0.5 shrink-0 dark:text-gray-600" />
      )}
      <span className={included ? "" : "text-muted-foreground"}>{children}</span>
    </li>
  )
}

function TestimonialCard({ name, role, quote }) {
  return (
    <div className="flex flex-col items-start rounded-lg border bg-card p-6 shadow-sm dark:border-gray-700">
      <div className="mb-4 flex">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <blockquote className="mb-4 flex-1 text-left">
        <p className="text-muted-foreground">"{quote}"</p>
      </blockquote>
      <div className="flex items-center">
        <div className="mr-3 h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center dark:bg-primary/20">
          <span className="text-primary font-semibold">{name.charAt(0)}</span>
        </div>
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-sm text-muted-foreground">{role}</p>
        </div>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { MainNavigation } from "@/components/main-navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { SiteFooter } from "@/components/site-footer"
import { HomeButton } from "@/components/home-button"
import { CheckCircle, HelpCircle, Building, Users, Sparkles, X } from "lucide-react"
import Link from "next/link"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function PricingPage() {
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
        <section className="bg-gradient-to-b from-blue-50 to-white py-20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <div className="inline-block rounded-lg bg-blue-100 px-3 py-1 text-sm text-blue-700">Pricing</div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Simple, Transparent Pricing
              </h1>
              <p className="max-w-[700px] text-muted-foreground md:text-xl">
                Choose the plan that's right for you, with flexible options for students, teachers, and schools.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {/* Free Plan */}
              <Card className="flex flex-col border-blue-100">
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
                    <PricingItem included>Basic homework help</PricingItem>
                    <PricingItem included>Study guide generation</PricingItem>
                    <PricingItem included>Limited practice exercises</PricingItem>
                    <PricingItem>Advanced AI tutoring</PricingItem>
                    <PricingItem>File uploads</PricingItem>
                    <PricingItem>Progress tracking</PricingItem>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full" variant="outline">
                    <Link href="/signup">Get Started</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Student Plan */}
              <Card className="flex flex-col border-blue-200 shadow-lg">
                <CardHeader className="bg-blue-50">
                  <div className="rounded-full bg-blue-100 text-blue-700 px-3 py-1 text-xs font-semibold w-fit">
                    MOST POPULAR
                  </div>
                  <CardTitle className="mt-2">Student</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $9.99
                    <span className="ml-1 text-lg font-medium text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-4">Everything you need for academic success.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <PricingItem included>
                      <strong>500</strong> AI tokens per month
                    </PricingItem>
                    <PricingItem included>Advanced homework help</PricingItem>
                    <PricingItem included>Unlimited study guides</PricingItem>
                    <PricingItem included>Personalized practice exercises</PricingItem>
                    <PricingItem included>Full AI tutoring access</PricingItem>
                    <PricingItem included>File uploads (up to 25MB)</PricingItem>
                    <PricingItem included>Detailed progress tracking</PricingItem>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                    <Link href="/signup?plan=student">Subscribe Now</Link>
                  </Button>
                </CardFooter>
              </Card>

              {/* Teacher Plan */}
              <Card className="flex flex-col border-purple-100">
                <CardHeader>
                  <CardTitle>Teacher</CardTitle>
                  <div className="mt-4 flex items-baseline text-5xl font-bold">
                    $19.99
                    <span className="ml-1 text-lg font-medium text-muted-foreground">/month</span>
                  </div>
                  <CardDescription className="mt-4">Powerful tools to enhance your teaching.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1">
                  <ul className="space-y-3">
                    <PricingItem included>
                      <strong>1,000</strong> AI tokens per month
                    </PricingItem>
                    <PricingItem included>Lesson plan generation</PricingItem>
                    <PricingItem included>Quiz & assessment creation</PricingItem>
                    <PricingItem included>Student feedback generator</PricingItem>
                    <PricingItem included>Document analysis</PricingItem>
                    <PricingItem included>Class management tools</PricingItem>
                    <PricingItem included>Student performance analytics</PricingItem>
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full">
                    <Link href="/signup?plan=teacher">Subscribe Now</Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>

            {/* School & District Plans */}
            <div className="mt-16">
              <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">School & District Plans</h2>
                <p className="max-w-[700px] text-muted-foreground">
                  Custom solutions for educational institutions with volume discounts and administrative features.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                {/* School Plan */}
                <Card className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Building className="h-5 w-5 text-blue-600" />
                      <CardTitle>School</CardTitle>
                    </div>
                    <CardDescription className="mt-4">
                      For individual schools looking to provide AI learning tools to their students and teachers.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      <PricingItem included>Bulk licensing for students & teachers</PricingItem>
                      <PricingItem included>School-wide analytics dashboard</PricingItem>
                      <PricingItem included>Administrative controls</PricingItem>
                      <PricingItem included>Custom branding options</PricingItem>
                      <PricingItem included>Priority support</PricingItem>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/schools">Contact Sales</Link>
                    </Button>
                  </CardFooter>
                </Card>

                {/* District Plan */}
                <Card className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Users className="h-5 w-5 text-purple-600" />
                      <CardTitle>District</CardTitle>
                    </div>
                    <CardDescription className="mt-4">
                      For school districts seeking a comprehensive solution across multiple schools.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <ul className="space-y-3">
                      <PricingItem included>All School plan features</PricingItem>
                      <PricingItem included>District-wide implementation</PricingItem>
                      <PricingItem included>Cross-school analytics</PricingItem>
                      <PricingItem included>API access for integration</PricingItem>
                      <PricingItem included>Dedicated account manager</PricingItem>
                      <PricingItem included>Professional development training</PricingItem>
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button asChild className="w-full" variant="outline">
                      <Link href="/schools">Contact Sales</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </div>

            {/* Token Pricing */}
            <div className="mt-16">
              <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <div className="inline-block rounded-lg bg-purple-100 px-3 py-1 text-sm text-purple-700">Tokens</div>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Additional AI Tokens</h2>
                <p className="max-w-[700px] text-muted-foreground">
                  Need more AI power? Purchase additional tokens for your account.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-8">
                <Card className="flex flex-col">
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

                <Card className="flex flex-col border-purple-100 shadow-lg">
                  <CardHeader className="bg-purple-50">
                    <div className="rounded-full bg-purple-100 text-purple-700 px-3 py-1 text-xs font-semibold w-fit">
                      BEST VALUE
                    </div>
                    <CardTitle className="mt-2">Standard Pack</CardTitle>
                    <div className="mt-4 flex items-baseline text-3xl font-bold">$9.99</div>
                    <CardDescription className="mt-2">250 additional AI tokens</CardDescription>
                  </CardHeader>
                  <CardFooter>
                    <Button asChild className="w-full bg-purple-600 hover:bg-purple-700">
                      <Link href="/dashboard/billing">Purchase</Link>
                    </Button>
                  </CardFooter>
                </Card>

                <Card className="flex flex-col">
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

            {/* FAQ Section */}
            <div className="mt-20">
              <div className="flex flex-col items-center text-center space-y-4 mb-12">
                <div className="inline-block rounded-lg bg-gray-100 px-3 py-1 text-sm text-gray-700">FAQ</div>
                <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl">Frequently Asked Questions</h2>
                <p className="max-w-[700px] text-muted-foreground">
                  Find answers to common questions about our pricing and plans.
                </p>
              </div>

              <div className="mx-auto max-w-3xl">
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>What are AI tokens and how do they work?</AccordionTrigger>
                    <AccordionContent>
                      AI tokens are the currency used to access our AI-powered features. Each AI interaction (like
                      generating a study guide or getting homework help) consumes a certain number of tokens depending
                      on the complexity and length of the task. Your subscription includes a monthly allocation of
                      tokens, and you can purchase additional tokens if needed.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>Can I switch between plans?</AccordionTrigger>
                    <AccordionContent>
                      Yes, you can upgrade or downgrade your plan at any time. If you upgrade, the change will take
                      effect immediately. If you downgrade, the change will take effect at the end of your current
                      billing cycle.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Do unused tokens roll over to the next month?</AccordionTrigger>
                    <AccordionContent>
                      No, unused tokens do not roll over to the next month. Your token allocation resets at the
                      beginning of each billing cycle. This helps us maintain the quality and availability of our AI
                      services for all users.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-4">
                    <AccordionTrigger>Are there any discounts for educational institutions?</AccordionTrigger>
                    <AccordionContent>
                      Yes, we offer special pricing for schools and districts. The exact discount depends on the number
                      of users and specific requirements. Please contact our sales team for a customized quote.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-5">
                    <AccordionTrigger>Can I try the platform before subscribing?</AccordionTrigger>
                    <AccordionContent>
                      Our Free plan allows you to try out the platform with a limited number of tokens. This gives you a
                      chance to experience our AI tools before committing to a paid subscription.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-6">
                    <AccordionTrigger>How do I cancel my subscription?</AccordionTrigger>
                    <AccordionContent>
                      You can cancel your subscription at any time from your account settings. After cancellation,
                      you'll continue to have access to your plan until the end of your current billing cycle. We don't
                      offer refunds for partial months.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            {/* CTA Section */}
            <div className="mt-20 bg-blue-50 rounded-xl p-8 md:p-12">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div>
                  <h2 className="text-2xl font-bold mb-2">Ready to transform learning with AI?</h2>
                  <p className="text-muted-foreground max-w-[500px]">
                    Join thousands of students and teachers already using our platform to enhance education.
                  </p>
                </div>
                <div className="flex gap-4">
                  <Button asChild variant="outline">
                    <Link href="/contact">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Contact Sales
                    </Link>
                  </Button>
                  <Button asChild className="bg-blue-600 hover:bg-blue-700">
                    <Link href="/signup">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Get Started
                    </Link>
                  </Button>
                </div>
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
        <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 shrink-0" />
      ) : (
        <X className="h-5 w-5 text-gray-300 mt-0.5 shrink-0" />
      )}
      <span className={included ? "" : "text-muted-foreground"}>{children}</span>
    </li>
  )
}

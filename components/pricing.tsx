import { Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export function Pricing() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50" id="pricing">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">Pricing</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Simple, Transparent Pricing</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Choose the plan that fits your needs. All plans include access to our core features.
            </p>
          </div>
        </div>
        <div className="grid gap-6 pt-12 lg:grid-cols-3 lg:gap-8">
          <Card>
            <CardHeader className="flex flex-col items-center justify-center space-y-2">
              <CardTitle className="text-xl">Bronze</CardTitle>
              <CardDescription className="text-center">Perfect for occasional homework help</CardDescription>
              <div className="text-4xl font-bold">
                $9.99<span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <ul className="grid gap-2 text-sm text-left w-full">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>50 AI tutoring tokens per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Text-based question input</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Basic practice problem generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Progress tracking</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/signup?plan=bronze">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card className="border-primary">
            <CardHeader className="flex flex-col items-center justify-center space-y-2">
              <div className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold bg-primary text-primary-foreground">
                Most Popular
              </div>
              <CardTitle className="text-xl">Silver</CardTitle>
              <CardDescription className="text-center">For regular students who need consistent help</CardDescription>
              <div className="text-4xl font-bold">
                $19.99<span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <ul className="grid gap-2 text-sm text-left w-full">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>150 AI tutoring tokens per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Text & image input (upload photos)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Advanced practice generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Performance analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Topic-specific study guides</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/signup?plan=silver">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
          <Card>
            <CardHeader className="flex flex-col items-center justify-center space-y-2">
              <CardTitle className="text-xl">Gold</CardTitle>
              <CardDescription className="text-center">
                For serious students who need comprehensive support
              </CardDescription>
              <div className="text-4xl font-bold">
                $29.99<span className="text-sm font-normal text-muted-foreground">/month</span>
              </div>
            </CardHeader>
            <CardContent className="flex flex-col items-center space-y-4">
              <ul className="grid gap-2 text-sm text-left w-full">
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Unlimited basic sessions</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>200 advanced tokens per month</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>All input types (text, image, voice)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Personalized study plans</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Priority support</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span>Downloadable resources</span>
                </li>
              </ul>
            </CardContent>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href="/signup?plan=gold">Get Started</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </section>
  )
}

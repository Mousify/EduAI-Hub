import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Features | AI Tutoring & Classroom Hub",
  description: "Explore the powerful features of our AI-powered tutoring platform for students and teachers.",
}

export default function FeaturesPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Platform Features</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our AI-powered platform offers a comprehensive suite of tools for students and teachers to enhance the
          learning experience.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
        <FeatureCard
          title="AI Homework Helper"
          description="Get step-by-step solutions to homework problems with detailed explanations."
          features={[
            "Upload photos of homework problems",
            "Receive detailed step-by-step solutions",
            "Learn concepts through guided explanations",
            "Practice with similar problems",
          ]}
        />
        <FeatureCard
          title="Study Guide Generator"
          description="Create personalized study guides for any subject or topic."
          features={[
            "Generate comprehensive study materials",
            "Customize content difficulty level",
            "Include practice questions and answers",
            "Export in multiple formats",
          ]}
        />
        <FeatureCard
          title="Content Explainer"
          description="Simplify complex topics with AI-powered explanations tailored to your level."
          features={[
            "Adjust explanation complexity",
            "Visual learning aids and diagrams",
            "Interactive examples",
            "Multiple learning approaches",
          ]}
        />
        <FeatureCard
          title="Teacher Dashboard"
          description="Comprehensive classroom management tools for educators."
          features={[
            "Student performance analytics",
            "Automated quiz generation",
            "Lesson plan creation",
            "Resource management",
          ]}
        />
        <FeatureCard
          title="Resource Library"
          description="Access and share educational resources across subjects and grade levels."
          features={[
            "Organized by subject and grade",
            "Teacher-approved content",
            "Upload and share your own resources",
            "AI-enhanced search functionality",
          ]}
        />
        <FeatureCard
          title="Practice Sessions"
          description="Personalized practice problems to reinforce learning concepts."
          features={[
            "Adaptive difficulty levels",
            "Instant feedback on answers",
            "Progress tracking",
            "Concept mastery assessment",
          ]}
        />
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to transform your learning experience?</h2>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/signup">Get Started for Free</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/pricing">View Pricing</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

function FeatureCard({
  title,
  description,
  features,
}: {
  title: string
  description: string
  features: string[]
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <CheckCircle className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { BookOpen, Clock, Video } from "lucide-react"

export const metadata = {
  title: "Tutorials | AI Tutoring & Classroom Hub",
  description: "Learn how to use our platform with step-by-step tutorials for students and teachers.",
}

export default function TutorialsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Platform Tutorials</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Learn how to make the most of our platform with these comprehensive tutorials for students and teachers.
        </p>
      </div>

      <Tabs defaultValue="students" className="max-w-4xl mx-auto">
        <TabsList className="grid w-full grid-cols-2 mb-8">
          <TabsTrigger value="students">For Students</TabsTrigger>
          <TabsTrigger value="teachers">For Teachers</TabsTrigger>
        </TabsList>
        <TabsContent value="students">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TutorialCard
              title="Getting Started with Homework Helper"
              description="Learn how to upload homework problems and get step-by-step solutions."
              type="Video"
              duration="5 min"
              link="#"
            />
            <TutorialCard
              title="Creating Effective Study Guides"
              description="Tips and tricks for generating comprehensive study materials."
              type="Article"
              duration="8 min"
              link="#"
            />
            <TutorialCard
              title="Mastering Content Explainer"
              description="How to use the content explainer to understand difficult concepts."
              type="Video"
              duration="7 min"
              link="#"
            />
            <TutorialCard
              title="Tracking Your Progress"
              description="Learn how to monitor your learning journey and identify areas for improvement."
              type="Article"
              duration="6 min"
              link="#"
            />
            <TutorialCard
              title="Effective Practice Sessions"
              description="How to use practice sessions to reinforce your learning."
              type="Video"
              duration="9 min"
              link="#"
            />
            <TutorialCard
              title="Collaborating with Classmates"
              description="Learn how to share resources and work together with your peers."
              type="Article"
              duration="5 min"
              link="#"
            />
          </div>
        </TabsContent>
        <TabsContent value="teachers">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <TutorialCard
              title="Setting Up Your Classroom"
              description="A complete guide to creating and managing your virtual classroom."
              type="Video"
              duration="10 min"
              link="#"
            />
            <TutorialCard
              title="Creating Assessments"
              description="Learn how to generate quizzes and tests using AI assistance."
              type="Article"
              duration="12 min"
              link="#"
            />
            <TutorialCard
              title="Analyzing Student Performance"
              description="How to use analytics to track student progress and identify areas for intervention."
              type="Video"
              duration="8 min"
              link="#"
            />
            <TutorialCard
              title="Designing Lesson Plans"
              description="Leverage AI to create engaging and effective lesson plans."
              type="Article"
              duration="15 min"
              link="#"
            />
            <TutorialCard
              title="Managing Resources"
              description="Organize and share educational materials with your students."
              type="Video"
              duration="7 min"
              link="#"
            />
            <TutorialCard
              title="Providing Effective Feedback"
              description="Use AI tools to give personalized feedback to your students."
              type="Article"
              duration="9 min"
              link="#"
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

function TutorialCard({
  title,
  description,
  type,
  duration,
  link,
}: {
  title: string
  description: string
  type: "Video" | "Article"
  duration: string
  link: string
}) {
  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <div className="flex items-center text-sm text-muted-foreground">
          {type === "Video" ? <Video className="h-4 w-4 mr-1" /> : <BookOpen className="h-4 w-4 mr-1" />}
          <span>{type}</span>
        </div>
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="h-4 w-4 mr-1" />
          <span>{duration}</span>
        </div>
      </CardFooter>
    </Card>
  )
}

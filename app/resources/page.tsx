import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MainNavigation } from "@/components/main-navigation"
import { MobileNavigation } from "@/components/mobile-navigation"
import { SiteFooter } from "@/components/site-footer"
import { HomeButton } from "@/components/home-button"
import { BookOpen, FileText, Video, Download, ExternalLink, Users, Lightbulb, HelpCircle } from "lucide-react"
import Link from "next/link"

export default function ResourcesPage() {
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
        <div className="container py-10">
          <div className="mb-10">
            <h1 className="text-4xl font-bold mb-4">Resources & Help Center</h1>
            <p className="text-xl text-muted-foreground">
              Find guides, tutorials, and resources to help you get the most out of our platform.
            </p>
          </div>

          <Tabs defaultValue="guides" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-8">
              <TabsTrigger value="guides">User Guides</TabsTrigger>
              <TabsTrigger value="tutorials">Video Tutorials</TabsTrigger>
              <TabsTrigger value="downloads">Downloads</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
            </TabsList>

            <TabsContent value="guides" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ResourceCard
                  icon={<BookOpen className="h-6 w-6" />}
                  title="Getting Started Guide"
                  description="Learn the basics of using our platform and set up your account."
                  link="/resources/getting-started"
                />
                <ResourceCard
                  icon={<Users className="h-6 w-6" />}
                  title="For Students"
                  description="How to use AI tools for homework help, study guides, and practice."
                  link="/resources/student-guide"
                />
                <ResourceCard
                  icon={<Lightbulb className="h-6 w-6" />}
                  title="For Teachers"
                  description="Create classes, generate content, and monitor student progress."
                  link="/resources/teacher-guide"
                />
                <ResourceCard
                  icon={<FileText className="h-6 w-6" />}
                  title="AI Tools Guide"
                  description="Detailed instructions for using all our AI-powered learning tools."
                  link="/resources/ai-tools"
                />
                <ResourceCard
                  icon={<HelpCircle className="h-6 w-6" />}
                  title="Troubleshooting"
                  description="Solutions to common issues and technical problems."
                  link="/resources/troubleshooting"
                />
                <ResourceCard
                  icon={<FileText className="h-6 w-6" />}
                  title="Privacy & Security"
                  description="How we protect your data and ensure a safe learning environment."
                  link="/resources/privacy-security"
                />
              </div>
            </TabsContent>

            <TabsContent value="tutorials" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <VideoCard
                  title="Platform Overview"
                  description="A complete tour of the platform and its features."
                  duration="5:32"
                />
                <VideoCard
                  title="Student Dashboard Tutorial"
                  description="How to navigate and use the student dashboard effectively."
                  duration="4:15"
                />
                <VideoCard
                  title="Teacher Dashboard Tutorial"
                  description="Managing classes and monitoring student progress."
                  duration="6:48"
                />
                <VideoCard
                  title="Using the Homework Helper"
                  description="Get step-by-step solutions to your homework problems."
                  duration="3:27"
                />
                <VideoCard
                  title="Creating Study Guides"
                  description="Generate personalized study materials with AI."
                  duration="4:52"
                />
                <VideoCard
                  title="Setting Up Your Account"
                  description="Complete your profile and customize your settings."
                  duration="2:19"
                />
              </div>
            </TabsContent>

            <TabsContent value="downloads" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <DownloadCard
                  title="Student Quick Start Guide"
                  description="PDF guide for students to get started quickly."
                  fileType="PDF"
                  fileSize="2.4 MB"
                />
                <DownloadCard
                  title="Teacher Quick Start Guide"
                  description="PDF guide for teachers to set up their classes."
                  fileType="PDF"
                  fileSize="3.1 MB"
                />
                <DownloadCard
                  title="AI Tools Cheat Sheet"
                  description="Quick reference for all AI tools and their capabilities."
                  fileType="PDF"
                  fileSize="1.8 MB"
                />
                <DownloadCard
                  title="Keyboard Shortcuts"
                  description="List of all keyboard shortcuts for power users."
                  fileType="PDF"
                  fileSize="0.9 MB"
                />
                <DownloadCard
                  title="Mobile App Guide"
                  description="Instructions for using our mobile application."
                  fileType="PDF"
                  fileSize="2.2 MB"
                />
                <DownloadCard
                  title="Lesson Plan Templates"
                  description="Templates for teachers to create effective lesson plans."
                  fileType="ZIP"
                  fileSize="4.5 MB"
                />
              </div>
            </TabsContent>

            <TabsContent value="community" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CommunityCard
                  title="Discussion Forum"
                  description="Join our community forum to discuss features, share tips, and connect with other users."
                  buttonText="Visit Forum"
                  link="/community/forum"
                />
                <CommunityCard
                  title="Feature Requests"
                  description="Suggest new features or improvements to help us make the platform better."
                  buttonText="Submit Request"
                  link="/community/feature-requests"
                />
                <CommunityCard
                  title="Knowledge Base"
                  description="Browse our extensive knowledge base for answers to frequently asked questions."
                  buttonText="Browse Articles"
                  link="/community/knowledge-base"
                />
                <CommunityCard
                  title="Teacher Community"
                  description="Connect with other educators, share resources, and discuss teaching strategies."
                  buttonText="Join Community"
                  link="/community/teachers"
                />
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-16 bg-muted p-8 rounded-lg">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Need Additional Help?</h2>
                <p className="text-muted-foreground">
                  Our support team is available to assist you with any questions or issues.
                </p>
              </div>
              <div className="flex gap-4">
                <Button asChild variant="outline">
                  <Link href="/faq">
                    <HelpCircle className="mr-2 h-4 w-4" />
                    View FAQ
                  </Link>
                </Button>
                <Button asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}

function ResourceCard({ icon, title, description, link }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-primary/10 p-2 text-primary">{icon}</div>
          <CardTitle>{title}</CardTitle>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild variant="outline" className="w-full">
          <Link href={link}>
            <FileText className="mr-2 h-4 w-4" />
            Read Guide
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

function VideoCard({ title, description, duration }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <div className="aspect-video bg-muted relative rounded-t-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rounded-full bg-primary/90 p-4">
            <Video className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded">{duration}</div>
      </div>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button className="w-full">Watch Video</Button>
      </CardFooter>
    </Card>
  )
}

function DownloadCard({ title, description, fileType, fileSize }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>{title}</CardTitle>
          <span className="text-xs font-medium bg-muted px-2 py-1 rounded">{fileType}</span>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-muted-foreground">File size: {fileSize}</div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="w-full">
          <Download className="mr-2 h-4 w-4" />
          Download
        </Button>
      </CardFooter>
    </Card>
  )
}

function CommunityCard({ title, description, buttonText, link }) {
  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={link}>
            <ExternalLink className="mr-2 h-4 w-4" />
            {buttonText}
          </Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

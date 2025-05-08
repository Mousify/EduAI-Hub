import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MessageSquare, Users } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Community | AI Tutoring & Classroom Hub",
  description: "Join our community of students and educators to share knowledge and resources.",
}

export default function CommunityPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Join Our Community</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Connect with students and educators from around the world to share knowledge, resources, and experiences.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Why Join Our Community?</h2>
          <ul className="space-y-4">
            <li className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <Users className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Connect with Peers</h3>
                <p className="text-muted-foreground">
                  Collaborate with students and teachers who share your interests and goals.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-medium">Get Help and Support</h3>
                <p className="text-muted-foreground">
                  Ask questions and receive guidance from experienced educators and fellow students.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Share Resources</h3>
                <p className="text-muted-foreground">
                  Contribute your own study materials and benefit from resources shared by others.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <div className="bg-primary/10 p-2 rounded-full mr-4 mt-1">
                <svg className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-medium">Stay Motivated</h3>
                <p className="text-muted-foreground">
                  Engage with a supportive community that helps you stay on track with your learning goals.
                </p>
              </div>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-4">Upcoming Community Events</h2>
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Study Group: Advanced Mathematics</CardTitle>
                <CardDescription>May 15, 2023 • 4:00 PM EST</CardDescription>
              </CardHeader>
              <CardContent>
                <p>
                  Join our weekly study group focused on advanced mathematics topics including calculus and linear
                  algebra.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Register</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Teacher Workshop: AI in Education</CardTitle>
                <CardDescription>May 20, 2023 • 1:00 PM EST</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Learn how to effectively integrate AI tools into your classroom to enhance student learning.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Register</Button>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Student Panel: Effective Study Strategies</CardTitle>
                <CardDescription>May 25, 2023 • 5:00 PM EST</CardDescription>
              </CardHeader>
              <CardContent>
                <p>Hear from top-performing students about their study strategies and how they use our platform.</p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Register</Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6 text-center">Community Discussions</h2>
        <Tabs defaultValue="popular" className="max-w-4xl mx-auto">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="popular">Popular</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="unanswered">Unanswered</TabsTrigger>
          </TabsList>
          <TabsContent value="popular">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <DiscussionCard key={i} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="recent">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <DiscussionCard key={i} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="unanswered">
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <DiscussionCard key={i} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to join our community?</h2>
        <Button asChild size="lg">
          <Link href="/signup">Sign Up Now</Link>
        </Button>
      </div>
    </div>
  )
}

function DiscussionCard() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <AvatarFallback>UN</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">How do I solve systems of linear equations?</CardTitle>
              <CardDescription>Posted by Username • 2 days ago</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <MessageSquare className="h-4 w-4" />
            <span>12 replies</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="line-clamp-2">
          I'm struggling with solving systems of linear equations. I understand the basic concept, but when it comes to
          more complex problems with three or more variables, I get lost. Can anyone recommend some good resources or
          strategies?
        </p>
      </CardContent>
      <CardFooter>
        <Button variant="ghost" size="sm">
          View Discussion
        </Button>
      </CardFooter>
    </Card>
  )
}

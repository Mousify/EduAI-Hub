import Image from "next/image"
import Link from "next/link"
import { CalendarIcon, Clock, MapPin, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

export default function EventsPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Events & Webinars</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Join us for live demonstrations, educational workshops, and interactive webinars
        </p>
      </div>

      {/* Featured Event */}
      <div className="mb-16">
        <Card className="overflow-hidden">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative h-64 md:h-auto">
              <Image
                src="/placeholder.svg?height=600&width=800"
                alt="AI in Education Summit"
                fill
                className="object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-primary text-primary-foreground">Featured</Badge>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-4">
                <Badge variant="outline" className="bg-red-100 text-red-800 border-red-200">
                  Live Webinar
                </Badge>
                <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
                  Free
                </Badge>
              </div>
              <CardTitle className="text-3xl mb-4">AI in Education Summit: The Future of Learning</CardTitle>
              <CardDescription className="text-base mb-6">
                Join leading educators and AI experts for a comprehensive exploration of how artificial intelligence is
                transforming education at all levels.
              </CardDescription>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2">
                  <CalendarIcon size={18} className="text-muted-foreground" />
                  <span>May 15, 2023</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={18} className="text-muted-foreground" />
                  <span>1:00 PM - 4:00 PM EST</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin size={18} className="text-muted-foreground" />
                  <span>Virtual (Zoom)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={18} className="text-muted-foreground" />
                  <span>1,240 Registered</span>
                </div>
              </div>

              <Button size="lg">Register Now</Button>
            </div>
          </div>
        </Card>
      </div>

      {/* Event Categories */}
      <Tabs defaultValue="upcoming" className="mb-12">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
          <TabsTrigger value="webinars">Webinars</TabsTrigger>
          <TabsTrigger value="workshops">Workshops</TabsTrigger>
          <TabsTrigger value="past">Past Events</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-8">
          {upcomingEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </TabsContent>

        <TabsContent value="webinars" className="space-y-8">
          {webinars.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </TabsContent>

        <TabsContent value="workshops" className="space-y-8">
          {workshops.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </TabsContent>

        <TabsContent value="past" className="space-y-8">
          {pastEvents.map((event, index) => (
            <EventCard key={index} event={event} />
          ))}
        </TabsContent>
      </Tabs>

      {/* Calendar View */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Event Calendar</h2>
        <Card>
          <CardContent className="p-6">
            <div className="grid grid-cols-7 gap-1">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center font-medium p-2">
                  {day}
                </div>
              ))}
              {Array.from({ length: 35 }).map((_, i) => {
                const day = i - 2 // Offset to start month on correct day
                return (
                  <div
                    key={i}
                    className={`
                      border rounded-md p-2 min-h-[80px] text-sm
                      ${day <= 0 || day > 30 ? "bg-muted/20 text-muted-foreground" : ""}
                      ${[10, 15, 22].includes(day) ? "border-primary/50 bg-primary/5" : ""}
                    `}
                  >
                    {day > 0 && day <= 30 ? day : ""}
                    {day === 10 && (
                      <div className="mt-1 text-xs p-1 bg-blue-100 text-blue-800 rounded">Webinar: AI Basics</div>
                    )}
                    {day === 15 && <div className="mt-1 text-xs p-1 bg-red-100 text-red-800 rounded">Summit</div>}
                    {day === 22 && <div className="mt-1 text-xs p-1 bg-green-100 text-green-800 rounded">Workshop</div>}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Event Notifications */}
      <Card className="bg-secondary/50 mb-12">
        <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl font-bold">Get Event Notifications</h3>
            <p className="text-muted-foreground">
              Subscribe to receive notifications about upcoming events and webinars.
            </p>
          </div>
          <div className="flex w-full md:w-auto gap-2">
            <input type="email" placeholder="Enter your email" className="px-4 py-2 rounded-md border flex-1 md:w-64" />
            <Button>Subscribe</Button>
          </div>
        </CardContent>
      </Card>

      {/* Host Your Own Event */}
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-4">Want to Host Your Own Event?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          If you&apos;re an educator or institution interested in hosting a webinar or workshop on our platform,
          we&apos;d love to hear from you.
        </p>
        <Button variant="outline" asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}

function EventCard({ event }) {
  return (
    <Card>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/4 relative">
          <div className="bg-muted rounded-t-lg md:rounded-l-lg md:rounded-tr-none h-48 md:h-full relative">
            <Image
              src={event.image || "/placeholder.svg"}
              alt={event.title}
              fill
              className="object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
            />
          </div>
        </div>
        <div className="p-6 md:w-3/4 flex flex-col">
          <div className="flex flex-wrap gap-2 mb-3">
            {event.badges.map((badge, index) => (
              <Badge key={index} variant="outline" className={badge.className}>
                {badge.text}
              </Badge>
            ))}
          </div>
          <h3 className="text-xl font-bold mb-2">{event.title}</h3>
          <p className="text-muted-foreground mb-4">{event.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            <div className="flex items-center gap-2">
              <CalendarIcon size={16} className="text-muted-foreground" />
              <span className="text-sm">{event.date}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-muted-foreground" />
              <span className="text-sm">{event.time}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-muted-foreground" />
              <span className="text-sm">{event.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users size={16} className="text-muted-foreground" />
              <span className="text-sm">{event.attendees}</span>
            </div>
          </div>

          <div className="mt-auto flex flex-wrap gap-3">
            <Button variant={event.isPast ? "outline" : "default"}>
              {event.isPast ? "Watch Recording" : "Register Now"}
            </Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </Card>
  )
}

const upcomingEvents = [
  {
    title: "AI in Education Summit: The Future of Learning",
    description:
      "Join leading educators and AI experts for a comprehensive exploration of how artificial intelligence is transforming education at all levels.",
    image: "/placeholder.svg?height=300&width=500",
    date: "May 15, 2023",
    time: "1:00 PM - 4:00 PM EST",
    location: "Virtual (Zoom)",
    attendees: "1,240 Registered",
    badges: [
      { text: "Live Webinar", className: "bg-red-100 text-red-800 border-red-200" },
      { text: "Free", className: "bg-blue-100 text-blue-800 border-blue-200" },
    ],
    isPast: false,
  },
  {
    title: "Getting Started with EduAI Hub: Platform Demo",
    description:
      "A comprehensive walkthrough of the EduAI Hub platform, showcasing key features for both students and teachers.",
    image: "/placeholder.svg?height=300&width=500",
    date: "May 22, 2023",
    time: "2:00 PM - 3:00 PM EST",
    location: "Virtual (Zoom)",
    attendees: "856 Registered",
    badges: [
      { text: "Demo", className: "bg-purple-100 text-purple-800 border-purple-200" },
      { text: "Free", className: "bg-blue-100 text-blue-800 border-blue-200" },
    ],
    isPast: false,
  },
  {
    title: "Workshop: Creating Effective AI-Generated Assessments",
    description:
      "Learn how to craft prompts and use our platform to create high-quality, standards-aligned assessments for your classroom.",
    image: "/placeholder.svg?height=300&width=500",
    date: "June 5, 2023",
    time: "4:00 PM - 6:00 PM EST",
    location: "Virtual (Zoom)",
    attendees: "412 Registered",
    badges: [
      { text: "Workshop", className: "bg-green-100 text-green-800 border-green-200" },
      { text: "Teachers", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    ],
    isPast: false,
  },
]

const webinars = [
  {
    title: "AI Tutoring: Best Practices for Student Engagement",
    description:
      "Discover strategies to maximize student engagement and learning outcomes when using AI tutoring tools.",
    image: "/placeholder.svg?height=300&width=500",
    date: "May 18, 2023",
    time: "3:00 PM - 4:00 PM EST",
    location: "Virtual (Zoom)",
    attendees: "623 Registered",
    badges: [
      { text: "Webinar", className: "bg-red-100 text-red-800 border-red-200" },
      { text: "Teachers", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    ],
    isPast: false,
  },
  {
    title: "Data Privacy in Educational AI: What You Need to Know",
    description:
      "An important discussion on how EduAI Hub protects student data and complies with educational privacy regulations.",
    image: "/placeholder.svg?height=300&width=500",
    date: "May 25, 2023",
    time: "1:00 PM - 2:00 PM EST",
    location: "Virtual (Zoom)",
    attendees: "489 Registered",
    badges: [
      { text: "Webinar", className: "bg-red-100 text-red-800 border-red-200" },
      { text: "Administrators", className: "bg-orange-100 text-orange-800 border-orange-200" },
    ],
    isPast: false,
  },
]

const workshops = [
  {
    title: "Workshop: Creating Effective AI-Generated Assessments",
    description:
      "Learn how to craft prompts and use our platform to create high-quality, standards-aligned assessments for your classroom.",
    image: "/placeholder.svg?height=300&width=500",
    date: "June 5, 2023",
    time: "4:00 PM - 6:00 PM EST",
    location: "Virtual (Zoom)",
    attendees: "412 Registered",
    badges: [
      { text: "Workshop", className: "bg-green-100 text-green-800 border-green-200" },
      { text: "Teachers", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    ],
    isPast: false,
  },
  {
    title: "Hands-on: Customizing Study Guides for Different Learning Styles",
    description:
      "A practical workshop on using our AI tools to create differentiated study materials that address various learning needs.",
    image: "/placeholder.svg?height=300&width=500",
    date: "June 12, 2023",
    time: "3:00 PM - 5:00 PM EST",
    location: "Virtual (Zoom)",
    attendees: "378 Registered",
    badges: [
      { text: "Workshop", className: "bg-green-100 text-green-800 border-green-200" },
      { text: "Teachers", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    ],
    isPast: false,
  },
]

const pastEvents = [
  {
    title: "Introduction to AI-Powered Homework Help",
    description:
      "A beginner-friendly overview of how students can leverage our platform for homework assistance without compromising learning.",
    image: "/placeholder.svg?height=300&width=500",
    date: "April 10, 2023",
    time: "2:00 PM - 3:00 PM EST",
    location: "Virtual (Zoom)",
    attendees: "1,567 Attended",
    badges: [
      { text: "Webinar", className: "bg-red-100 text-red-800 border-red-200" },
      { text: "Students", className: "bg-indigo-100 text-indigo-800 border-indigo-200" },
    ],
    isPast: true,
  },
  {
    title: "Teacher Panel: AI Integration Success Stories",
    description:
      "Hear from educators who have successfully integrated EduAI Hub into their classrooms and the impact it's had on student outcomes.",
    image: "/placeholder.svg?height=300&width=500",
    date: "March 28, 2023",
    time: "4:00 PM - 5:30 PM EST",
    location: "Virtual (Zoom)",
    attendees: "982 Attended",
    badges: [
      { text: "Panel", className: "bg-teal-100 text-teal-800 border-teal-200" },
      { text: "Teachers", className: "bg-yellow-100 text-yellow-800 border-yellow-200" },
    ],
    isPast: true,
  },
]

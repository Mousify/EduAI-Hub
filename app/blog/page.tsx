import Image from "next/image";
import Link from "next/link";
import { CalendarIcon, Clock, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MainNavigation } from "@/components/main-navigation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { SiteFooter } from "@/components/site-footer";
import { HomeButton } from "@/components/home-button";

export default function BlogPage() {
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

      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">EduAI Hub Blog</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Insights, updates, and resources on AI in education, learning
            strategies, and platform features
          </p>
        </div>

        {/* Featured Article */}
        <div className="mb-16">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="relative h-64 md:h-auto">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="AI Tutoring Revolution"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex flex-col justify-center">
                <Badge className="w-fit mb-4">Featured</Badge>
                <CardTitle className="text-3xl mb-4">
                  The AI Tutoring Revolution: How Personalized Learning is
                  Changing Education
                </CardTitle>
                <CardDescription className="text-base mb-6">
                  Explore how AI-powered tutoring is transforming the
                  educational landscape by providing personalized learning
                  experiences for students of all ages and abilities.
                </CardDescription>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-1">
                    <CalendarIcon size={16} />
                    <span>April 25, 2023</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>8 min read</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <User size={16} />
                    <span>Dr. Sarah Johnson</span>
                  </div>
                </div>
                <Button asChild>
                  <Link href="/blog/ai-tutoring-revolution">Read Article</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap gap-2 justify-center mb-12">
          <Badge
            variant="outline"
            className="text-sm py-1 px-3 cursor-pointer hover:bg-secondary"
          >
            All
          </Badge>
          <Badge
            variant="outline"
            className="text-sm py-1 px-3 cursor-pointer hover:bg-secondary"
          >
            AI in Education
          </Badge>
          <Badge
            variant="outline"
            className="text-sm py-1 px-3 cursor-pointer hover:bg-secondary"
          >
            Learning Strategies
          </Badge>
          <Badge
            variant="outline"
            className="text-sm py-1 px-3 cursor-pointer hover:bg-secondary"
          >
            Platform Updates
          </Badge>
          <Badge
            variant="outline"
            className="text-sm py-1 px-3 cursor-pointer hover:bg-secondary"
          >
            Success Stories
          </Badge>
          <Badge
            variant="outline"
            className="text-sm py-1 px-3 cursor-pointer hover:bg-secondary"
          >
            Research
          </Badge>
        </div>

        {/* Recent Articles */}
        <h2 className="text-2xl font-bold mb-8">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {blogPosts.map((post, index) => (
            <Card key={index} className="flex flex-col h-full">
              <div className="relative h-48">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  fill
                  className="object-cover"
                />
              </div>
              <CardHeader>
                <div className="flex justify-between items-center mb-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <span className="text-sm text-muted-foreground">
                    {post.date}
                  </span>
                </div>
                <CardTitle className="text-xl">{post.title}</CardTitle>
                <CardDescription>{post.excerpt}</CardDescription>
              </CardHeader>
              <CardFooter className="mt-auto pt-4">
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/blog/${post.slug}`}>Read More</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Newsletter Signup */}
        <Card className="bg-secondary/50 mb-12">
          <CardContent className="flex flex-col md:flex-row items-center justify-between gap-6 py-8">
            <div className="space-y-2 text-center md:text-left">
              <h3 className="text-2xl font-bold">
                Subscribe to Our Newsletter
              </h3>
              <p className="text-muted-foreground">
                Get the latest articles, updates, and resources delivered to
                your inbox.
              </p>
            </div>
            <div className="flex w-full md:w-auto gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 rounded-md border flex-1 md:w-64"
              />
              <Button>Subscribe</Button>
            </div>
          </CardContent>
        </Card>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          <Button variant="outline" disabled>
            Previous
          </Button>
          <Button variant="outline">1</Button>
          <Button variant="outline">2</Button>
          <Button variant="outline">3</Button>
          <Button variant="outline">Next</Button>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

const blogPosts = [
  {
    title: "5 Ways AI Can Help Students with Learning Disabilities",
    excerpt:
      "Discover how AI-powered tools are making education more accessible and effective for students with various learning disabilities.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Accessibility",
    date: "April 20, 2023",
    slug: "ai-learning-disabilities",
  },
  {
    title: "New Feature: Interactive Study Guides",
    excerpt:
      "We're excited to announce our new interactive study guide generator that helps students prepare for exams more effectively.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Platform Updates",
    date: "April 18, 2023",
    slug: "interactive-study-guides",
  },
  {
    title: "How Teachers Are Using EduAI Hub in the Classroom",
    excerpt:
      "Real stories from educators who have integrated our AI tools into their daily teaching practices with impressive results.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Success Stories",
    date: "April 15, 2023",
    slug: "teachers-using-eduai",
  },
  {
    title: "The Science Behind Effective AI Tutoring",
    excerpt:
      "An exploration of the research and methodologies that make AI tutoring effective for knowledge retention and understanding.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Research",
    date: "April 12, 2023",
    slug: "science-behind-ai-tutoring",
  },
  {
    title: "Preparing Students for an AI-Powered Future",
    excerpt:
      "How educators can help students develop the skills they'll need to thrive in a world where AI is increasingly prevalent.",
    image: "/placeholder.svg?height=300&width=500",
    category: "AI in Education",
    date: "April 10, 2023",
    slug: "preparing-for-ai-future",
  },
  {
    title: "Summer Learning: Preventing the Slide with AI",
    excerpt:
      "Strategies for using AI tutoring tools to prevent summer learning loss and keep students engaged during school breaks.",
    image: "/placeholder.svg?height=300&width=500",
    category: "Learning Strategies",
    date: "April 8, 2023",
    slug: "summer-learning-ai",
  },
];

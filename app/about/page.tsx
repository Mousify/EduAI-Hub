import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Award, BookOpen, GraduationCap, Heart, Target, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AboutPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">About EduAI Hub</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
          We&apos;re on a mission to make quality education accessible to all students through the power of artificial
          intelligence
        </p>
        <div className="relative h-[400px] rounded-xl overflow-hidden">
          <Image
            src="/placeholder.svg?height=800&width=1600"
            alt="Team working together"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
            <div className="p-8 text-white text-left">
              <h2 className="text-3xl font-bold mb-2">Transforming Education Through AI</h2>
              <p className="text-lg max-w-2xl">
                Founded in 2022, EduAI Hub is dedicated to bridging educational gaps and empowering both students and
                teachers with cutting-edge AI tools.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Story */}
      <div className="mb-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4">
              <p>
                EduAI Hub began with a simple observation: while AI was transforming industries worldwide, its potential
                to revolutionize education remained largely untapped. Our founders, a team of educators and
                technologists, saw an opportunity to create a platform that would make personalized learning accessible
                to all students, regardless of background or resources.
              </p>
              <p>
                What started as a small project to help struggling students with homework has evolved into a
                comprehensive educational platform that serves thousands of students and teachers across the country.
                Our AI-powered tools provide personalized tutoring, generate custom study materials, and help teachers
                create engaging content for their classrooms.
              </p>
              <p>
                Today, EduAI Hub is at the forefront of educational technology, constantly innovating to ensure that
                every student has access to the support they need to succeed. We believe that AI should enhance human
                teaching, not replace it, and we&apos;re committed to developing tools that empower both students and
                educators.
              </p>
            </div>
          </div>
          <div className="relative h-[400px] rounded-xl overflow-hidden">
            <Image src="/placeholder.svg?height=800&width=800" alt="Our journey" fill className="object-cover" />
          </div>
        </div>
      </div>

      {/* Mission & Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Mission & Values</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>
                To democratize education by providingg AI-powered learning tools that adapt to each student&apos;s
                unique needs, making quality education accessible to all.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Our Vision</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>
                A world where every student has access to personalized, high-quality educational support that helps them
                reach their full potential.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="text-center">
              <div className="mx-auto bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <CardTitle>Our Values</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p>
                Accessibility, innovation, integrity, and a commitment to enhancing human teaching rather than replacing
                it.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Core Values */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Core Values</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value, index) => (
            <Card key={index} className="bg-secondary/10">
              <CardHeader>
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <CardTitle>{value.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{value.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Meet Our Team */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Meet Our Team</h2>

        <Tabs defaultValue="leadership" className="mb-8">
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="leadership">Leadership</TabsTrigger>
            <TabsTrigger value="educators">Educators</TabsTrigger>
            <TabsTrigger value="tech">Tech Team</TabsTrigger>
          </TabsList>

          <TabsContent value="leadership" className="grid md:grid-cols-3 gap-6">
            {leadershipTeam.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </TabsContent>

          <TabsContent value="educators" className="grid md:grid-cols-3 gap-6">
            {educatorTeam.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </TabsContent>

          <TabsContent value="tech" className="grid md:grid-cols-3 gap-6">
            {techTeam.map((member, index) => (
              <TeamMemberCard key={index} member={member} />
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Impact */}
      <div className="mb-16">
        <h2 className="text-3xl font-bold mb-8 text-center">Our Impact</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          <div className="text-center p-6 bg-secondary/10 rounded-lg">
            <p className="text-4xl font-bold text-primary mb-2">50,000+</p>
            <p className="text-muted-foreground">Students Helped</p>
          </div>
          <div className="text-center p-6 bg-secondary/10 rounded-lg">
            <p className="text-4xl font-bold text-primary mb-2">5,000+</p>
            <p className="text-muted-foreground">Teachers Empowered</p>
          </div>
          <div className="text-center p-6 bg-secondary/10 rounded-lg">
            <p className="text-4xl font-bold text-primary mb-2">500+</p>
            <p className="text-muted-foreground">Schools Using Our Platform</p>
          </div>
          <div className="text-center p-6 bg-secondary/10 rounded-lg">
            <p className="text-4xl font-bold text-primary mb-2">2M+</p>
            <p className="text-muted-foreground">Questions Answered</p>
          </div>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-2xl font-bold mb-4">Success Stories</h3>
                <div className="space-y-4">
                  <p>
                    &quot;EduAI Hub has transformed how I support my students. The personalized practice materials have
                    helped close learning gaps for many of my struggling students.&quot;
                  </p>
                  <p className="font-medium">— Sarah Johnson, 8th Grade Math Teacher</p>
                  <Separator />
                  <p>
                    &quot;As a student with dyslexia, I&apos;ve always struggled with reading comprehension. The AI
                    tutoring has helped me understand complex texts in ways that work for my learning style.&quot;
                  </p>
                  <p className="font-medium">— Miguel Rodriguez, 11th Grade Student</p>
                </div>
                <Button className="mt-6" asChild>
                  <Link href="/testimonials">
                    Read More Success Stories <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
              <div className="relative h-[300px] rounded-xl overflow-hidden">
                <Image
                  src="/placeholder.svg?height=600&width=800"
                  alt="Success stories"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Join Our Team */}
      <div className="mb-16">
        <div className="bg-secondary/20 rounded-xl p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Team</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
            We&apos;re always looking for passionate educators, developers, and AI specialists to help us transform
            education.
          </p>
          <Button size="lg" asChild>
            <Link href="/careers">View Open Positions</Link>
          </Button>
        </div>
      </div>

      {/* Contact */}
      <div className="text-center">
        <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-6">
          Have questions about EduAI Hub? We&apos;d love to hear from you.
        </p>
        <Button size="lg" asChild>
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}

function TeamMemberCard({ member }) {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-64">
        <Image src={member.image || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
      </div>
      <CardHeader>
        <CardTitle>{member.name}</CardTitle>
        <CardDescription>{member.role}</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{member.bio}</p>
      </CardContent>
    </Card>
  )
}

const coreValues = [
  {
    title: "Accessibility",
    description:
      "We believe quality education should be accessible to all students, regardless of background or resources.",
    icon: <BookOpen className="h-6 w-6 text-primary" />,
  },
  {
    title: "Innovation",
    description: "We continuously push the boundaries of what's possible with AI in education.",
    icon: <GraduationCap className="h-6 w-6 text-primary" />,
  },
  {
    title: "Integrity",
    description: "We're committed to ethical AI use, data privacy, and transparent practices.",
    icon: <Award className="h-6 w-6 text-primary" />,
  },
  {
    title: "Community",
    description: "We believe in fostering a supportive community of students, educators, and parents.",
    icon: <Users className="h-6 w-6 text-primary" />,
  },
]

const leadershipTeam = [
  {
    name: "Dr. Emily Chen",
    role: "Co-Founder & CEO",
    bio: "Former education professor with 15+ years of experience in EdTech. Passionate about making quality education accessible to all.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Michael Rodriguez",
    role: "Co-Founder & CTO",
    bio: "AI specialist with a background in machine learning and natural language processing. Previously led AI teams at major tech companies.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Dr. James Wilson",
    role: "Chief Education Officer",
    bio: "Former high school principal and district superintendent with 20+ years in education administration and curriculum development.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

const educatorTeam = [
  {
    name: "Sarah Johnson",
    role: "Head of Curriculum",
    bio: "Former middle school teacher with expertise in developing standards-aligned educational content across multiple subjects.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "David Park",
    role: "Educational Content Director",
    bio: "Specializes in creating engaging, accessible learning materials for diverse student populations and learning styles.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Maria Gonzalez",
    role: "Special Education Specialist",
    bio: "Focuses on ensuring our platform meets the needs of students with diverse learning requirements and abilities.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

const techTeam = [
  {
    name: "Alex Thompson",
    role: "Lead AI Engineer",
    bio: "Specializes in developing and fine-tuning large language models for educational applications and personalized learning.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Priya Patel",
    role: "Head of Product",
    bio: "Leads our product development with a focus on creating intuitive, accessible interfaces for students and teachers.",
    image: "/placeholder.svg?height=400&width=400",
  },
  {
    name: "Ryan Kim",
    role: "Data Science Lead",
    bio: "Analyzes learning patterns and outcomes to continuously improve our AI tutoring and content generation algorithms.",
    image: "/placeholder.svg?height=400&width=400",
  },
]

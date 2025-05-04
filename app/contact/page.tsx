"use client"

import { useState } from "react"
import { Mail, MapPin, MessageSquare, Phone } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    userType: "student",
    inquiryType: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleRadioChange = (value) => {
    setFormData((prev) => ({ ...prev, userType: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))

    toast({
      title: "Message sent!",
      description: "We've received your message and will get back to you soon.",
    })

    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
      userType: "student",
      inquiryType: "",
    })

    setIsSubmitting(false)
  }

  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight">Contact Us</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Have questions or feedback? We'd love to hear from you.
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8 mb-12">
        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Mail className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Email Us</h3>
            <p className="text-muted-foreground mb-4">For general inquiries and support</p>
            <a href="mailto:info@mano10.lt" className="text-primary hover:underline">
              info@mano10.lt
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <Phone className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Call Us</h3>
            <p className="text-muted-foreground mb-4">Monday-Friday, 9am-5pm EST</p>
            <a href="tel:+18005551234" className="text-primary hover:underline">
              1-800-555-1234
            </a>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="flex flex-col items-center text-center p-6">
            <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-4">
              <MapPin className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-medium mb-2">Visit Us</h3>
            <p className="text-muted-foreground mb-4">Our headquarters</p>
            <address className="not-italic text-primary">
              123 Education Lane
              <br />
              San Francisco, CA 94107
            </address>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
        <div>
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>I am a:</Label>
              <RadioGroup value={formData.userType} onValueChange={handleRadioChange} className="flex flex-wrap gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="student" id="student" />
                  <Label htmlFor="student">Student</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="teacher" id="teacher" />
                  <Label htmlFor="teacher">Teacher</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="parent" id="parent" />
                  <Label htmlFor="parent">Parent</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="administrator" id="administrator" />
                  <Label htmlFor="administrator">Administrator</Label>
                </div>
              </RadioGroup>
            </div>

            <div className="space-y-2">
              <Label htmlFor="inquiryType">Inquiry Type</Label>
              <Select value={formData.inquiryType} onValueChange={(value) => handleSelectChange("inquiryType", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select inquiry type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General Question</SelectItem>
                  <SelectItem value="support">Technical Support</SelectItem>
                  <SelectItem value="billing">Billing & Subscription</SelectItem>
                  <SelectItem value="partnership">Partnership Opportunity</SelectItem>
                  <SelectItem value="feedback">Feedback & Suggestions</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject</Label>
              <Input
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                placeholder="Subject of your message"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="How can we help you?"
                rows={5}
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </div>

        <div className="space-y-8">
          <div>
            <h2 className="text-3xl font-bold mb-6">Frequently Asked Questions</h2>
            <Tabs defaultValue="students">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="students">Students</TabsTrigger>
                <TabsTrigger value="teachers">Teachers</TabsTrigger>
                <TabsTrigger value="schools">Schools</TabsTrigger>
              </TabsList>

              <TabsContent value="students" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">How do I get started with EduAI Hub?</h3>
                  <p className="text-muted-foreground">
                    Simply sign up for a free account, and you'll have immediate access to our AI tutoring tools and
                    homework help features.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Is there a limit to how many questions I can ask?</h3>
                  <p className="text-muted-foreground">
                    Free accounts have a monthly limit. Premium subscriptions offer unlimited questions and additional
                    features.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Can I use EduAI Hub for test preparation?</h3>
                  <p className="text-muted-foreground">
                    Yes! Our platform can generate practice questions and study guides tailored to your specific exams
                    and learning needs.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="teachers" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">How can I monitor my students' usage?</h3>
                  <p className="text-muted-foreground">
                    The teacher dashboard provides detailed analytics on student activity, including time spent, topics
                    covered, and progress made.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Can I create custom content for my class?</h3>
                  <p className="text-muted-foreground">
                    Yes! Our content generator allows you to create worksheets, quizzes, and lesson plans aligned with
                    your curriculum.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Is there professional development available?</h3>
                  <p className="text-muted-foreground">
                    We offer regular webinars and workshops to help teachers maximize the platform's potential in their
                    classrooms.
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="schools" className="space-y-4 mt-6">
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Do you offer school-wide licenses?</h3>
                  <p className="text-muted-foreground">
                    Yes, we offer bulk licensing options for schools and districts with special administrative features.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">How does EduAI Hub handle student data privacy?</h3>
                  <p className="text-muted-foreground">
                    We're fully COPPA and FERPA compliant, with strict data protection policies. We never sell student
                    data.
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Can we integrate with our existing LMS?</h3>
                  <p className="text-muted-foreground">
                    Yes, we offer integrations with popular learning management systems like Google Classroom, Canvas,
                    and Schoology.
                  </p>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-primary/10 p-3 rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="text-lg font-medium mb-2">Live Chat Support</h3>
                  <p className="text-muted-foreground mb-4">
                    Need immediate assistance? Our support team is available via live chat during business hours.
                  </p>
                  <Button variant="outline">Start Chat</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="rounded-xl overflow-hidden h-[400px] relative">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d100939.98555098464!2d-122.50764017948551!3d37.75781499229416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80859a6d00690021%3A0x4a501367f076adff!2sSan%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1651234567890!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="EduAI Hub Location"
        ></iframe>
      </div>
    </div>
  )
}

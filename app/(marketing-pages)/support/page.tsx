import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { SubjectSelect } from "@/components/subject-select"
import { HelpCircle, Mail, MessageSquare, Phone } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "Support | AI Tutoring & Classroom Hub",
  description: "Get help and support for our AI-powered tutoring platform.",
}

export default function SupportPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Support Center</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          We're here to help you get the most out of our platform. Find answers to your questions or contact our support
          team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
        <Card>
          <CardHeader className="text-center">
            <HelpCircle className="w-12 h-12 mx-auto mb-4 text-primary" />
            <CardTitle>Help Center</CardTitle>
            <CardDescription>Browse our knowledge base for answers to common questions</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild variant="outline">
              <Link href="/faq">Visit Help Center</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <MessageSquare className="w-12 h-12 mx-auto mb-4 text-primary" />
            <CardTitle>Community Forum</CardTitle>
            <CardDescription>Connect with other users and share experiences</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild variant="outline">
              <Link href="/community">Join Discussion</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="text-center">
            <Mail className="w-12 h-12 mx-auto mb-4 text-primary" />
            <CardTitle>Email Support</CardTitle>
            <CardDescription>Get personalized help from our support team</CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <p className="mb-4 text-sm text-muted-foreground">support@aitutoringhub.com</p>
            <p className="text-sm text-muted-foreground">Response time: 24 hours</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-6">Contact Us</h2>
          <form className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Your name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="Your email address" />
              </div>
            </div>
            <SubjectSelect />
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" placeholder="Describe your issue or question in detail" rows={5} />
            </div>
            <Button type="submit" className="w-full">
              Submit Request
            </Button>
          </form>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-6">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-medium mb-2">How quickly will I receive a response?</h3>
              <p className="text-muted-foreground">
                We aim to respond to all inquiries within 24 hours during business days. Complex issues may require
                additional time to resolve.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Do you offer phone support?</h3>
              <p className="text-muted-foreground">
                Phone support is available for Premium and School plan subscribers. You can schedule a call with our
                support team through your account dashboard.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How do I report a bug?</h3>
              <p className="text-muted-foreground">
                You can report bugs through the contact form on this page. Please include as much detail as possible,
                including steps to reproduce the issue, screenshots, and your device information.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">Can I request a new feature?</h3>
              <p className="text-muted-foreground">
                Yes! We welcome feature requests. You can submit your ideas through the contact form or discuss them in
                our community forum. We regularly review user suggestions for future updates.
              </p>
            </div>
            <div>
              <h3 className="font-medium mb-2">How do I cancel my subscription?</h3>
              <p className="text-muted-foreground">
                You can cancel your subscription at any time from your account settings. Navigate to the Billing section
                and select "Cancel Subscription." Your access will continue until the end of your current billing
                period.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-muted p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Need immediate assistance?</h2>
          <p className="text-muted-foreground">
            Our support team is available Monday through Friday, 9 AM to 6 PM EST.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <span>+1 (800) 123-4567</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <span>support@aitutoringhub.com</span>
          </div>
        </div>
      </div>
    </div>
  )
}

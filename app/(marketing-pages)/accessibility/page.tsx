import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Eye, FileText, Headphones, MessageSquare, MousePointer, Settings, Mail, Phone } from "lucide-react"

export const metadata = {
  title: "Accessibility | AI Tutoring & Classroom Hub",
  description: "Learn about our commitment to accessibility and inclusive learning.",
}

export default function AccessibilityPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Accessibility</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Our commitment to creating an inclusive learning environment for all students and teachers.
        </p>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Our Accessibility Commitment</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="mb-4">
              At AI Tutoring & Classroom Hub, we believe that education should be accessible to everyone. We are
              committed to ensuring that our platform is usable by people of all abilities and disabilities.
            </p>
            <p className="mb-4">
              Our platform is designed with accessibility in mind, following the Web Content Accessibility Guidelines
              (WCAG) 2.1 Level AA standards. We continuously work to improve our accessibility features and welcome
              feedback from our users.
            </p>
            <p>
              Our accessibility features include keyboard navigation, screen reader compatibility, text-to-speech
              functionality, customizable text size and contrast, and alternative text for images.
            </p>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <h3 className="text-xl font-medium mb-4">Accessibility Features</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Screen reader compatibility with ARIA attributes</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Keyboard navigation for all interactive elements</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Text-to-speech functionality for content</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Customizable text size, spacing, and contrast</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Alternative text for all images and media</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Captions and transcripts for video content</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Focus indicators for keyboard navigation</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary mt-1">•</span>
                <span>Consistent and predictable navigation</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Accessibility Tools</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <Eye className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Visual Adjustments</CardTitle>
              <CardDescription>Customize how content appears on screen</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Adjust text size, spacing, and contrast. Enable dark mode or high contrast mode for better visibility.
                Customize cursor size and color.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Headphones className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Audio Features</CardTitle>
              <CardDescription>Listen to content instead of reading</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Text-to-speech functionality for all content. Adjustable speech rate and voice options. Audio
                descriptions for images and diagrams.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <MousePointer className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Navigation Aids</CardTitle>
              <CardDescription>Navigate the platform with ease</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Full keyboard navigation support. Skip to content links. Consistent and predictable navigation
                structure. Focus indicators for keyboard users.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <MessageSquare className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Communication Support</CardTitle>
              <CardDescription>Alternative ways to communicate</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Speech-to-text for input. Symbol-based communication options. Predictive text and word suggestions.
                Multiple ways to contact support.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <FileText className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Content Adaptations</CardTitle>
              <CardDescription>Access content in different formats</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Alternative formats for all content. Simplified language options. Visual supports for text content.
                Downloadable materials in accessible formats.
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Settings className="h-8 w-8 text-primary mb-2" />
              <CardTitle>Personalized Settings</CardTitle>
              <CardDescription>Save your accessibility preferences</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Save your accessibility settings across sessions. Create multiple profiles for different needs. Import
                and export settings between devices.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-6">Accessibility Features by User Type</h2>
        <Tabs defaultValue="students">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="students">For Students</TabsTrigger>
            <TabsTrigger value="teachers">For Teachers</TabsTrigger>
          </TabsList>
          <TabsContent value="students" className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-3">Learning Accommodations</h3>
              <p className="mb-4">
                Our platform offers various accommodations to support different learning styles and needs:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Extended time options for assessments and activities</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Text-to-speech for reading assignments and questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Speech-to-text for answering questions and completing assignments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Simplified language options for complex content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Visual supports and diagrams for text-heavy content</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">AI Tutoring Accessibility</h3>
              <p className="mb-4">Our AI tutoring features are designed to be accessible to all students:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Multiple ways to interact with AI tutors (text, voice, images)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Adjustable response complexity based on student needs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Step-by-step explanations with visual supports</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Alternative explanation methods when needed</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Customizable pace of instruction</span>
                </li>
              </ul>
            </div>
          </TabsContent>
          <TabsContent value="teachers" className="space-y-6">
            <div>
              <h3 className="text-xl font-medium mb-3">Content Creation Tools</h3>
              <p className="mb-4">Our platform provides teachers with tools to create accessible content:</p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Accessibility checkers for created content</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Automatic generation of alternative text for images</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Readability analysis and simplification suggestions</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Templates for creating accessible assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Multi-format content creation (text, audio, visual)</span>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-medium mb-3">Classroom Management</h3>
              <p className="mb-4">Teachers can manage accommodations and accessibility features for their students:</p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Individual accommodation settings for each student</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Bulk application of accommodations to groups of students</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Accessibility reports for content and assessments</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Tools to convert existing materials into accessible formats</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary mt-1">•</span>
                  <span>Accessibility-focused analytics and insights</span>
                </li>
              </ul>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <div className="bg-muted p-8 rounded-lg">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold mb-2">Need Accessibility Support?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            If you encounter any accessibility issues or have suggestions for improvement, please contact our
            accessibility team. We are committed to addressing accessibility concerns promptly.
          </p>
        </div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-6">
          <div className="flex items-center gap-2">
            <Mail className="h-5 w-5 text-primary" />
            <span>accessibility@aitutoringhub.com</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-5 w-5 text-primary" />
            <span>+1 (800) 123-4567 ext. 2</span>
          </div>
        </div>
      </div>
    </div>
  )
}

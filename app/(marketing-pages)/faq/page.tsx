import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

export const metadata = {
  title: "FAQ | AI Tutoring & Classroom Hub",
  description: "Frequently asked questions about our AI-powered tutoring platform.",
}

export default function FAQPage() {
  return (
    <div className="container mx-auto py-12 px-4 md:px-6">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold tracking-tight mb-4">Frequently Asked Questions</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about our platform, features, and services.
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="general" className="mb-12">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="students">For Students</TabsTrigger>
            <TabsTrigger value="teachers">For Teachers</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What is AI Tutoring & Classroom Hub?</AccordionTrigger>
                <AccordionContent>
                  AI Tutoring & Classroom Hub is a comprehensive educational platform that uses artificial intelligence
                  to provide personalized learning experiences for students in grades 5-12. Our platform offers homework
                  help, study guides, practice problems, and more for students, while giving teachers tools to create
                  assessments, lesson plans, and monitor student progress.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How does the AI tutoring work?</AccordionTrigger>
                <AccordionContent>
                  Our AI tutoring system uses advanced natural language processing and machine learning to understand
                  student questions and provide step-by-step explanations. Students can upload photos of problems, type
                  questions, or use voice input. The AI adapts to each student's learning style and pace, providing
                  personalized guidance and feedback.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Is my data secure on the platform?</AccordionTrigger>
                <AccordionContent>
                  Yes, we take data security and privacy very seriously. All user data is encrypted and stored securely.
                  We comply with educational privacy laws and regulations, including FERPA and COPPA. We never sell user
                  data to third parties, and we have strict data retention policies in place.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I access the platform on mobile devices?</AccordionTrigger>
                <AccordionContent>
                  Yes, our platform is fully responsive and works on smartphones, tablets, laptops, and desktop
                  computers. You can access all features from any device with an internet connection and a modern web
                  browser.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Do you offer customer support?</AccordionTrigger>
                <AccordionContent>
                  Yes, we provide customer support through multiple channels. You can reach our support team via email,
                  chat, or through our help center. We typically respond to inquiries within 24 hours during business
                  days.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="students">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How can I get help with my homework?</AccordionTrigger>
                <AccordionContent>
                  You can use our Homework Helper tool to get assistance with your assignments. Simply take a photo of
                  the problem or type it in, and our AI will provide a step-by-step solution with explanations. You can
                  ask follow-up questions if you need further clarification.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I create a study guide?</AccordionTrigger>
                <AccordionContent>
                  Our Study Guide Generator allows you to create personalized study materials. Enter the topic or
                  concepts you're studying, select your grade level, and specify the level of detail you need. The AI
                  will generate a comprehensive study guide that you can save, print, or share.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Can I practice with similar problems?</AccordionTrigger>
                <AccordionContent>
                  Yes, after receiving help with a problem, you can request practice problems of similar difficulty.
                  This helps reinforce your understanding and build confidence. The AI will generate new problems and
                  provide feedback on your solutions.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>How do I track my progress?</AccordionTrigger>
                <AccordionContent>
                  Your student dashboard shows your learning progress, including topics you've studied, skills you've
                  mastered, and areas that need improvement. You can view detailed analytics on your usage patterns and
                  learning outcomes over time.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Can I use the platform for test preparation?</AccordionTrigger>
                <AccordionContent>
                  Our platform is excellent for test prep. You can create custom study guides, practice with sample
                  questions, and get explanations for concepts you find challenging. The AI can also generate practice
                  tests based on your specific exam format.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="teachers">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>How do I set up my classroom?</AccordionTrigger>
                <AccordionContent>
                  Setting up your classroom is simple. After creating your teacher account, go to the Classes section in
                  your dashboard and click "Create New Class." Enter the class details, add students (either manually or
                  by sharing an invite code), and organize your class into groups if needed.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>Can I create assessments with the platform?</AccordionTrigger>
                <AccordionContent>
                  Yes, our Quiz Generator tool allows you to create customized assessments quickly. Specify the subject,
                  topics, difficulty level, and question types, and the AI will generate a complete assessment. You can
                  edit, add, or remove questions before assigning it to your students.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>How do I monitor student progress?</AccordionTrigger>
                <AccordionContent>
                  Your teacher dashboard provides comprehensive analytics on student performance. You can view
                  class-wide trends, individual student progress, time spent on different topics, and areas where
                  students are struggling. This data helps you identify intervention opportunities and tailor your
                  instruction.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>Can I create lesson plans with the platform?</AccordionTrigger>
                <AccordionContent>
                  Yes, our Lesson Plan Generator helps you create engaging and standards-aligned lesson plans. Specify
                  the subject, grade level, learning objectives, and duration, and the AI will generate a complete
                  lesson plan with activities, resources, and assessment strategies.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>How do I share resources with my students?</AccordionTrigger>
                <AccordionContent>
                  You can upload and share resources through the Resource Library. Students in your classes will have
                  access to these materials. You can organize resources by topic, assign them to specific students or
                  groups, and track which students have accessed each resource.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
          <TabsContent value="billing">
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>What pricing plans do you offer?</AccordionTrigger>
                <AccordionContent>
                  We offer several pricing tiers to meet different needs. Our Basic plan is free and provides limited
                  access to core features. Our Premium plans offer full access to all features with different usage
                  limits. We also offer special pricing for schools and districts. Visit our{" "}
                  <Link href="/pricing" className="text-primary underline">
                    Pricing page
                  </Link>{" "}
                  for detailed information.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger>How do I upgrade or downgrade my plan?</AccordionTrigger>
                <AccordionContent>
                  You can change your subscription plan at any time from your account settings. Navigate to the Billing
                  section, select "Change Plan," and choose your new subscription level. Changes take effect at the
                  start of your next billing cycle.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Do you offer refunds?</AccordionTrigger>
                <AccordionContent>
                  We offer a 14-day money-back guarantee for new subscriptions. If you're not satisfied with our
                  service, contact our support team within 14 days of your initial purchase for a full refund. After
                  this period, we do not provide refunds for partial subscription periods.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger>What payment methods do you accept?</AccordionTrigger>
                <AccordionContent>
                  We accept major credit cards (Visa, Mastercard, American Express, Discover), PayPal, and school
                  purchase orders. All payments are processed securely through our payment providers.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger>Do you offer discounts for schools?</AccordionTrigger>
                <AccordionContent>
                  Yes, we offer special pricing for schools and educational institutions. We provide volume discounts
                  based on the number of users and can customize plans to meet specific needs. Contact our sales team at
                  sales@aitutoringhub.com for more information.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </TabsContent>
        </Tabs>

        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
          <p className="mb-6 text-muted-foreground">
            Our support team is here to help you with any questions you may have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/support">Contact Support</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/community">Ask the Community</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

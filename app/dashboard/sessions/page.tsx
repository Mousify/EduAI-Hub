import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Clock, BookOpen, Upload, Mic, Camera } from "lucide-react"

export default function SessionsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Tutoring Sessions</h2>
          <p className="text-muted-foreground">Get help with your homework or create practice questions</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="col-span-3 md:col-span-1">
          <CardHeader>
            <CardTitle>Start a New Session</CardTitle>
            <CardDescription>Choose how you want to submit your question</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <Button className="w-full flex justify-start h-auto p-3">
              <Upload className="h-5 w-5 mr-3" />
              <div className="flex flex-col items-start">
                <span>Upload File</span>
                <span className="text-xs font-normal text-muted-foreground">PDF, DOCX or image file</span>
              </div>
            </Button>
            <Button className="w-full flex justify-start h-auto p-3">
              <Camera className="h-5 w-5 mr-3" />
              <div className="flex flex-col items-start">
                <span>Take a Photo</span>
                <span className="text-xs font-normal text-muted-foreground">Use your camera to capture homework</span>
              </div>
            </Button>
            <Button className="w-full flex justify-start h-auto p-3">
              <Mic className="h-5 w-5 mr-3" />
              <div className="flex flex-col items-start">
                <span>Voice Recording</span>
                <span className="text-xs font-normal text-muted-foreground">Ask your question verbally</span>
              </div>
            </Button>
            <Button className="w-full flex justify-start h-auto p-3" variant="outline">
              <BookOpen className="h-5 w-5 mr-3" />
              <div className="flex flex-col items-start">
                <span>Text Question</span>
                <span className="text-xs font-normal text-muted-foreground">Type your question directly</span>
              </div>
            </Button>
          </CardContent>
          <CardFooter>
            <p className="text-xs text-muted-foreground">You have 128 tokens remaining. Each session costs 1 token.</p>
          </CardFooter>
        </Card>

        <div className="col-span-3 md:col-span-2">
          <Tabs defaultValue="recent" className="space-y-4">
            <TabsList>
              <TabsTrigger value="recent">Recent Sessions</TabsTrigger>
              <TabsTrigger value="saved">Saved Sessions</TabsTrigger>
              <TabsTrigger value="generate">Generate Practice</TabsTrigger>
            </TabsList>
            <TabsContent value="recent" className="space-y-4">
              <Card>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle>Algebra: Solving Quadratic Equations</CardTitle>
                    <CardDescription>Yesterday at 3:45 PM</CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>15 min</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Worked through the problem: Solve x² + 5x - 6 = 0 using the quadratic formula. Included step-by-step
                    solution and conceptual explanation.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Continue
                  </Button>
                  <Button variant="ghost" size="sm">
                    Save
                  </Button>
                </CardFooter>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-start justify-between space-y-0">
                  <div>
                    <CardTitle>Chemistry: Balancing Chemical Equations</CardTitle>
                    <CardDescription>2 days ago</CardDescription>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    <span>22 min</span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm">
                    Received help with balancing the equation: C₃H₈ + O₂ → CO₂ + H₂O. Learned about conservation of
                    atoms and coefficient adjustment.
                  </p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm">
                    Continue
                  </Button>
                  <Button variant="ghost" size="sm">
                    Save
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}

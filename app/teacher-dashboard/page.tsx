import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { CalendarDays, Users, FileText, BookOpen, Plus } from "lucide-react"
import Link from "next/link"

const activityData = [
  {
    date: "Jan 1",
    "Student Engagement": 65,
    "Questions Asked": 24,
  },
  {
    date: "Jan 2",
    "Student Engagement": 72,
    "Questions Asked": 30,
  },
  {
    date: "Jan 3",
    "Student Engagement": 68,
    "Questions Asked": 28,
  },
  {
    date: "Jan 4",
    "Student Engagement": 75,
    "Questions Asked": 32,
  },
  {
    date: "Jan 5",
    "Student Engagement": 80,
    "Questions Asked": 35,
  },
  {
    date: "Jan 6",
    "Student Engagement": 78,
    "Questions Asked": 33,
  },
  {
    date: "Jan 7",
    "Student Engagement": 82,
    "Questions Asked": 38,
  },
]

export default function TeacherDashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Teacher Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your classroom activity</p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild>
            <Link href="/teacher-dashboard/assessments/create">
              <Plus className="mr-2 h-4 w-4" /> Create Assessment
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87</div>
            <p className="text-xs text-muted-foreground">Across 4 classes</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Assessments</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">2 due this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resources Created</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Events</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Next: Quiz on Friday</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="classes">Classes</TabsTrigger>
          <TabsTrigger value="students">Students</TabsTrigger>
          <TabsTrigger value="assessments">Assessments</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Classroom Activity</CardTitle>
                <CardDescription>Student engagement and questions asked over the past week</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    "Student Engagement": {
                      label: "Student Engagement",
                      color: "hsl(var(--chart-1))",
                    },
                    "Questions Asked": {
                      label: "Questions Asked",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={activityData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="Student Engagement"
                        stroke="var(--color-Student Engagement)"
                        activeDot={{ r: 8 }}
                      />
                      <Line type="monotone" dataKey="Questions Asked" stroke="var(--color-Questions Asked)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>Recent assessment results</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Algebra Quiz - Grade 9</div>
                      <div className="text-sm text-muted-foreground">Avg: 82%</div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "82%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Chemistry Lab - Grade 10</div>
                      <div className="text-sm text-muted-foreground">Avg: 76%</div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "76%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">History Essay - Grade 11</div>
                      <div className="text-sm text-muted-foreground">Avg: 88%</div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "88%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="text-sm font-medium">Physics Test - Grade 12</div>
                      <div className="text-sm text-muted-foreground">Avg: 79%</div>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary" style={{ width: "79%" }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest classroom events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-2 w-2 rounded-full bg-sky-500"></div>
                    <div>
                      <p className="text-sm font-medium">Sarah Johnson submitted Algebra homework</p>
                      <p className="text-xs text-muted-foreground">Today at 2:30 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-2 w-2 rounded-full bg-amber-500"></div>
                    <div>
                      <p className="text-sm font-medium">5 students need help with Chemistry concepts</p>
                      <p className="text-xs text-muted-foreground">Yesterday at 4:15 PM</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-2 w-2 rounded-full bg-emerald-500"></div>
                    <div>
                      <p className="text-sm font-medium">Physics assessment completed by all students</p>
                      <p className="text-xs text-muted-foreground">Jan 15, 2023</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="mr-4 mt-1 flex h-2 w-2 rounded-full bg-rose-500"></div>
                    <div>
                      <p className="text-sm font-medium">New resource added: "Calculus Fundamentals"</p>
                      <p className="text-xs text-muted-foreground">Jan 14, 2023</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>At-Risk Students</CardTitle>
                <CardDescription>Students who may need additional support</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-muted mr-3"></div>
                      <div>
                        <p className="text-sm font-medium">Alex Martinez</p>
                        <p className="text-xs text-muted-foreground">Grade 10 - Missing 3 assignments</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Contact
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-muted mr-3"></div>
                      <div>
                        <p className="text-sm font-medium">Jamie Wilson</p>
                        <p className="text-xs text-muted-foreground">Grade 9 - Below 65% in Math</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Contact
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-8 w-8 rounded-full bg-muted mr-3"></div>
                      <div>
                        <p className="text-sm font-medium">Taylor Kim</p>
                        <p className="text-xs text-muted-foreground">Grade 11 - Attendance concerns</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      Contact
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common teacher tasks</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-2">
                <Button className="w-full justify-start" variant="outline">
                  <FileText className="mr-2 h-4 w-4" />
                  Create New Assessment
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <Users className="mr-2 h-4 w-4" />
                  Manage Class Roster
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Generate Study Materials
                </Button>
                <Button className="w-full justify-start" variant="outline">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  Schedule Office Hours
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend } from "recharts"
import { CalendarDays, Clock, MessagesSquare, BookOpen, Dumbbell } from "lucide-react"

const activityData = [
  {
    date: "Jan 1",
    "Minutes Spent": 23,
    "Questions Solved": 12,
  },
  {
    date: "Jan 2",
    "Minutes Spent": 45,
    "Questions Solved": 18,
  },
  {
    date: "Jan 3",
    "Minutes Spent": 32,
    "Questions Solved": 14,
  },
  {
    date: "Jan 4",
    "Minutes Spent": 56,
    "Questions Solved": 24,
  },
  {
    date: "Jan 5",
    "Minutes Spent": 40,
    "Questions Solved": 16,
  },
  {
    date: "Jan 6",
    "Minutes Spent": 25,
    "Questions Solved": 10,
  },
  {
    date: "Jan 7",
    "Minutes Spent": 35,
    "Questions Solved": 15,
  },
]

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">Welcome back! Here's an overview of your learning activity</p>
        </div>
        <div className="flex items-center gap-2">
          <Button>New Tutoring Session</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Tokens</CardTitle>
            <MessagesSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">128</div>
            <p className="text-xs text-muted-foreground">Silver plan (150 tokens/month)</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tutoring Sessions</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">+4 from last week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Practice Problems</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">64</div>
            <p className="text-xs text-muted-foreground">72% correct rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7 days</div>
            <p className="text-xs text-muted-foreground">Best: 14 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="sessions">Sessions</TabsTrigger>
          <TabsTrigger value="practice">Practice</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Learning Activity</CardTitle>
                <CardDescription>Your study time and problems solved over the past week</CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <ChartContainer
                  config={{
                    "Minutes Spent": {
                      label: "Minutes Spent",
                      color: "hsl(var(--chart-1))",
                    },
                    "Questions Solved": {
                      label: "Questions Solved",
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
                        dataKey="Minutes Spent"
                        stroke="var(--color-Minutes Spent)"
                        activeDot={{ r: 8 }}
                      />
                      <Line type="monotone" dataKey="Questions Solved" stroke="var(--color-Questions Solved)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Recent Topics</CardTitle>
                <CardDescription>Your most active study areas</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Algebra</p>
                      <p className="text-xs text-muted-foreground">5 sessions, 20 practice problems</p>
                    </div>
                    <div className="ml-auto font-medium text-green-500">+24%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Chemistry</p>
                      <p className="text-xs text-muted-foreground">3 sessions, 15 practice problems</p>
                    </div>
                    <div className="ml-auto font-medium text-green-500">+12%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">World History</p>
                      <p className="text-xs text-muted-foreground">2 sessions, 8 practice problems</p>
                    </div>
                    <div className="ml-auto font-medium text-amber-500">+4%</div>
                  </div>
                  <div className="flex items-center">
                    <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                      <BookOpen className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">Biology</p>
                      <p className="text-xs text-muted-foreground">2 sessions, 10 practice problems</p>
                    </div>
                    <div className="ml-auto font-medium text-red-500">-2%</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

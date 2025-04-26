"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Loader2, TrendingUp } from "lucide-react"
import { useAuth } from "@/lib/auth-context"

// Mock data for the analytics dashboard
const subjectPerformanceData = [
  { subject: "Math", score: 85, average: 75 },
  { subject: "Science", score: 78, average: 72 },
  { subject: "English", score: 92, average: 80 },
  { subject: "History", score: 65, average: 68 },
  { subject: "Computer Science", score: 88, average: 70 },
]

const weeklyActivityData = [
  { day: "Mon", minutes: 45, problems: 12 },
  { day: "Tue", minutes: 30, problems: 8 },
  { day: "Wed", minutes: 60, problems: 15 },
  { day: "Thu", minutes: 25, problems: 6 },
  { day: "Fri", minutes: 50, problems: 14 },
  { day: "Sat", minutes: 70, problems: 20 },
  { day: "Sun", minutes: 15, problems: 4 },
]

const topicMasteryData = [
  { name: "Algebra", value: 85, color: "#10b981" },
  { name: "Geometry", value: 65, color: "#f59e0b" },
  { name: "Calculus", value: 40, color: "#ef4444" },
  { name: "Statistics", value: 75, color: "#3b82f6" },
]

const COLORS = ["#10b981", "#f59e0b", "#ef4444", "#3b82f6", "#8b5cf6", "#ec4899"]

export default function AnalyticsPage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)
  const [analyticsData, setAnalyticsData] = useState<any>(null)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    const fetchAnalyticsData = async () => {
      if (!user) return

      setIsLoading(true)
      try {
        // In a real app, we would fetch this data from the API
        // const { data, error } = await supabase
        //   .from('student_progress')
        //   .select('*')
        //   .eq('student_id', user.id)

        // For demo purposes, we'll use mock data
        setTimeout(() => {
          setAnalyticsData({
            subjectPerformance: subjectPerformanceData,
            weeklyActivity: weeklyActivityData,
            topicMastery: topicMasteryData,
            streak: 7,
            totalSessions: 42,
            totalProblems: 156,
            correctRate: 78,
            improvementRate: 12,
          })
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Error fetching analytics data:", error)
        setIsLoading(false)
      }
    }

    fetchAnalyticsData()
  }, [user])

  if (isLoading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  return (
    <div className="container py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Learning Analytics</h1>
        <p className="text-muted-foreground">Track your progress and identify areas for improvement</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Learning Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.streak} days</div>
            <p className="text-xs text-muted-foreground">Keep it up!</p>
            <div className="mt-2 flex">
              {Array.from({ length: 7 }).map((_, i) => (
                <div
                  key={i}
                  className={`mr-1 h-2 w-full rounded-full ${i < analyticsData.streak % 7 ? "bg-primary" : "bg-muted"}`}
                />
              ))}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Sessions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalSessions}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span>+8% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Problems Solved</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.totalProblems}</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span>+12% from last month</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Correct Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{analyticsData.correctRate}%</div>
            <div className="flex items-center text-xs text-muted-foreground">
              <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
              <span>+{analyticsData.improvementRate}% improvement</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="subjects">Subjects</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="mastery">Topic Mastery</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Weekly Activity</CardTitle>
                <CardDescription>Time spent learning and problems solved</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    minutes: {
                      label: "Minutes Spent",
                      color: "hsl(var(--chart-1))",
                    },
                    problems: {
                      label: "Problems Solved",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={analyticsData.weeklyActivity}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="day" />
                      <YAxis yAxisId="left" orientation="left" stroke="var(--color-minutes)" />
                      <YAxis yAxisId="right" orientation="right" stroke="var(--color-problems)" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="minutes"
                        stroke="var(--color-minutes)"
                        activeDot={{ r: 8 }}
                      />
                      <Line yAxisId="right" type="monotone" dataKey="problems" stroke="var(--color-problems)" />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Subject Performance</CardTitle>
                <CardDescription>Your scores compared to class average</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {analyticsData.subjectPerformance.map((subject: any) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{subject.subject}</span>
                          {subject.score > subject.average ? (
                            <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                              Above Average
                            </Badge>
                          ) : subject.score < subject.average ? (
                            <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                              Below Average
                            </Badge>
                          ) : (
                            <Badge variant="outline">Average</Badge>
                          )}
                        </div>
                        <span className="font-medium">{subject.score}%</span>
                      </div>
                      <div className="space-y-1">
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div className="h-2 rounded-full bg-primary" style={{ width: `${subject.score}%` }} />
                        </div>
                        <div className="flex justify-between text-xs text-muted-foreground">
                          <span>Your Score</span>
                          <span>Class Average: {subject.average}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Topic Mastery</CardTitle>
              <CardDescription>Your proficiency in different topics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="flex items-center justify-center">
                  <ResponsiveContainer width={200} height={200}>
                    <PieChart>
                      <Pie
                        data={analyticsData.topicMastery}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {analyticsData.topicMastery.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {analyticsData.topicMastery.map((topic: any) => (
                    <div key={topic.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-3 w-3 rounded-full" style={{ backgroundColor: topic.color }} />
                          <span className="font-medium">{topic.name}</span>
                        </div>
                        <span>{topic.value}%</span>
                      </div>
                      <Progress value={topic.value} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="subjects">
          <Card>
            <CardHeader>
              <CardTitle>Subject Performance Details</CardTitle>
              <CardDescription>Detailed breakdown of your performance by subject</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  score: {
                    label: "Your Score",
                    color: "hsl(var(--chart-1))",
                  },
                  average: {
                    label: "Class Average",
                    color: "hsl(var(--chart-2))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.subjectPerformance}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="subject" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="score" fill="var(--color-score)" />
                    <Bar dataKey="average" fill="var(--color-average)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>Activity Patterns</CardTitle>
              <CardDescription>Your learning activity throughout the week</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  minutes: {
                    label: "Minutes Spent",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={analyticsData.weeklyActivity}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Bar dataKey="minutes" fill="var(--color-minutes)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="mastery">
          <Card>
            <CardHeader>
              <CardTitle>Topic Mastery Details</CardTitle>
              <CardDescription>Detailed breakdown of your proficiency by topic</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {analyticsData.topicMastery.map((topic: any) => (
                  <div key={topic.name} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-full" style={{ backgroundColor: topic.color }} />
                        <span className="text-lg font-medium">{topic.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{topic.value}%</span>
                        {topic.value >= 80 ? (
                          <Badge className="bg-green-100 text-green-800">Mastered</Badge>
                        ) : topic.value >= 60 ? (
                          <Badge className="bg-yellow-100 text-yellow-800">Proficient</Badge>
                        ) : (
                          <Badge className="bg-red-100 text-red-800">Needs Practice</Badge>
                        )}
                      </div>
                    </div>
                    <Progress value={topic.value} className="h-3" />
                    <div className="mt-2 rounded-md bg-muted p-3">
                      <h4 className="font-medium">Recommended Actions:</h4>
                      <ul className="mt-1 list-disc pl-5 text-sm">
                        {topic.value < 60 && (
                          <>
                            <li>Review basic concepts in {topic.name}</li>
                            <li>Schedule a tutoring session focused on {topic.name}</li>
                            <li>Complete practice problems at beginner level</li>
                          </>
                        )}
                        {topic.value >= 60 && topic.value < 80 && (
                          <>
                            <li>Practice intermediate problems in {topic.name}</li>
                            <li>Review specific challenging concepts</li>
                            <li>Try applying {topic.name} concepts to real-world problems</li>
                          </>
                        )}
                        {topic.value >= 80 && (
                          <>
                            <li>Challenge yourself with advanced problems</li>
                            <li>Help peers who are struggling with {topic.name}</li>
                            <li>Explore related advanced topics</li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

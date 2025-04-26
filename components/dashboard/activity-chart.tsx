"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"

const activityData = [
  {
    date: "Jan 1",
    minutesSpent: 23,
    questionsSolved: 12,
  },
  {
    date: "Jan 2",
    minutesSpent: 45,
    questionsSolved: 18,
  },
  {
    date: "Jan 3",
    minutesSpent: 32,
    questionsSolved: 14,
  },
  {
    date: "Jan 4",
    minutesSpent: 56,
    questionsSolved: 24,
  },
  {
    date: "Jan 5",
    minutesSpent: 40,
    questionsSolved: 16,
  },
  {
    date: "Jan 6",
    minutesSpent: 25,
    questionsSolved: 10,
  },
  {
    date: "Jan 7",
    minutesSpent: 35,
    questionsSolved: 15,
  },
]

export function ActivityChart() {
  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>Learning Activity</CardTitle>
        <CardDescription>Your study time and problems solved over the past week</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="minutesSpent"
                name="Minutes Spent"
                stroke="hsl(var(--primary))"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="questionsSolved" name="Questions Solved" stroke="hsl(var(--secondary))" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

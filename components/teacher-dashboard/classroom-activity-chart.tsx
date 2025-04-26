"use client"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Legend, Tooltip } from "recharts"

const activityData = [
  {
    date: "Jan 1",
    studentEngagement: 65,
    questionsAsked: 24,
  },
  {
    date: "Jan 2",
    studentEngagement: 72,
    questionsAsked: 30,
  },
  {
    date: "Jan 3",
    studentEngagement: 68,
    questionsAsked: 28,
  },
  {
    date: "Jan 4",
    studentEngagement: 75,
    questionsAsked: 32,
  },
  {
    date: "Jan 5",
    studentEngagement: 80,
    questionsAsked: 35,
  },
  {
    date: "Jan 6",
    studentEngagement: 78,
    questionsAsked: 33,
  },
  {
    date: "Jan 7",
    studentEngagement: 82,
    questionsAsked: 38,
  },
]

export function ClassroomActivityChart() {
  return (
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
            dataKey="studentEngagement"
            name="Student Engagement"
            stroke="hsl(var(--primary))"
            activeDot={{ r: 8 }}
          />
          <Line type="monotone" dataKey="questionsAsked" name="Questions Asked" stroke="hsl(var(--secondary))" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

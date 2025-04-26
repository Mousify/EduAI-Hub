"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ActivityChart } from "./activity-chart"
import { RecentTopics } from "./recent-topics"

export function DashboardTabs() {
  return (
    <Tabs defaultValue="overview" className="space-y-4">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="sessions">Sessions</TabsTrigger>
        <TabsTrigger value="practice">Practice</TabsTrigger>
        <TabsTrigger value="subjects">Subjects</TabsTrigger>
      </TabsList>
      <TabsContent value="overview" className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ActivityChart />
          <RecentTopics />
        </div>
      </TabsContent>
      <TabsContent value="sessions">
        <div className="rounded-md border p-4">
          <h2 className="text-xl font-semibold">Recent Sessions</h2>
          <p className="text-sm text-muted-foreground">View your recent tutoring sessions here.</p>
        </div>
      </TabsContent>
      <TabsContent value="practice">
        <div className="rounded-md border p-4">
          <h2 className="text-xl font-semibold">Practice Problems</h2>
          <p className="text-sm text-muted-foreground">View your practice problem history here.</p>
        </div>
      </TabsContent>
      <TabsContent value="subjects">
        <div className="rounded-md border p-4">
          <h2 className="text-xl font-semibold">Subject Progress</h2>
          <p className="text-sm text-muted-foreground">Track your progress across different subjects.</p>
        </div>
      </TabsContent>
    </Tabs>
  )
}

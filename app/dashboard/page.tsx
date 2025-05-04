import { Button } from "@/components/ui/button"
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { RecentTopics } from "@/components/dashboard/recent-topics"
import { DashboardTabs } from "@/components/dashboard/dashboard-tabs"
import { NewsWidget } from "@/components/news/news-widget"
import { Scene3D } from "@/components/3d/scene"
import { Plus } from "lucide-react"
import Link from "next/link"

export default function DashboardPage() {
  return (
    <DashboardLayout
      header={{
        title: "Student Dashboard",
        description: "Welcome back! Here's an overview of your learning progress.",
        breadcrumbs: [{ label: "Dashboard", href: "/dashboard" }],
        actions: (
          <Button asChild>
            <Link href="/dashboard/tutoring/new">
              <Plus className="mr-2 h-4 w-4" />
              New Session
            </Link>
          </Button>
        ),
      }}
    >
      <div className="grid gap-6">
        <StatsCards />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <ActivityChart />
          </div>
          <div className="relative h-[300px] rounded-xl border overflow-hidden">
            <Scene3D className="absolute inset-0" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="md:col-span-2">
            <DashboardTabs />
          </div>
          <div>
            <NewsWidget />
          </div>
        </div>

        <RecentTopics />
      </div>
    </DashboardLayout>
  )
}

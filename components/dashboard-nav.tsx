import type React from "react"
import { cn } from "@/lib/utils"
import { BookOpen, Home, BarChart, Settings, MessageSquare, Dumbbell, BookmarkIcon, CreditCard } from "lucide-react"
import Link from "next/link"

interface DashboardNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardNav({ className, ...props }: DashboardNavProps) {
  return (
    <div className={cn("border-r bg-muted/40", className)} {...props}>
      <div className="flex h-full flex-col gap-2 p-4">
        <nav className="grid gap-1">
          <Link
            href="/dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/dashboard/sessions"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Tutoring Sessions</span>
          </Link>
          <Link
            href="/dashboard/practice"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <Dumbbell className="h-5 w-5" />
            <span>Practice</span>
          </Link>
          <Link
            href="/dashboard/resources"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <BookmarkIcon className="h-5 w-5" />
            <span>Resources</span>
          </Link>
          <Link
            href="/dashboard/courses"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <BookOpen className="h-5 w-5" />
            <span>Courses</span>
          </Link>
          <Link
            href="/dashboard/analytics"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <BarChart className="h-5 w-5" />
            <span>Analytics</span>
          </Link>
          <Link
            href="/dashboard/billing"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <CreditCard className="h-5 w-5" />
            <span>Billing</span>
          </Link>
          <Link
            href="/dashboard/settings"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <Settings className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </nav>
      </div>
    </div>
  )
}

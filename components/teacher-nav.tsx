import type React from "react"
import { cn } from "@/lib/utils"
import {
  BookOpen,
  Home,
  BarChart,
  Settings,
  Users,
  FileText,
  GraduationCap,
  MessageSquare,
  CreditCard,
} from "lucide-react"
import Link from "next/link"

interface TeacherNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TeacherNav({ className, ...props }: TeacherNavProps) {
  return (
    <div className={cn("border-r bg-muted/40", className)} {...props}>
      <div className="flex h-full flex-col gap-2 p-4">
        <nav className="grid gap-1">
          <Link
            href="/teacher-dashboard"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <Home className="h-5 w-5" />
            <span>Dashboard</span>
          </Link>
          <Link
            href="/teacher-dashboard/classes"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <Users className="h-5 w-5" />
            <span>Classes</span>
          </Link>
          <Link
            href="/teacher-dashboard/students"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <GraduationCap className="h-5 w-5" />
            <span>Students</span>
          </Link>
          <Link
            href="/teacher-dashboard/assessments"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <FileText className="h-5 w-5" />
            <span>Assessments</span>
          </Link>
          <Link
            href="/teacher-dashboard/resources"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <BookOpen className="h-5 w-5" />
            <span>Resources</span>
          </Link>
          <Link
            href="/teacher-dashboard/messages"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <MessageSquare className="h-5 w-5" />
            <span>Messages</span>
          </Link>
          <Link
            href="/teacher-dashboard/analytics"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <BarChart className="h-5 w-5" />
            <span>Analytics</span>
          </Link>
          <Link
            href="/teacher-dashboard/billing"
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-foreground hover:bg-muted"
          >
            <CreditCard className="h-5 w-5" />
            <span>Billing</span>
          </Link>
          <Link
            href="/teacher-dashboard/settings"
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

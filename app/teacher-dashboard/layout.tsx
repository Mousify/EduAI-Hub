import type React from "react"
import { TeacherNav } from "@/components/teacher-nav"
import { TeacherMobileNav } from "@/components/teacher-mobile-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"
import { NotificationBell } from "@/components/notifications/notification-bell"
import Link from "next/link"

export default function TeacherDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-blue-50 to-amber-50">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-md px-4 md:px-6">
        <TeacherMobileNav />
        <Link href="/teacher-dashboard" className="flex items-center gap-2 text-lg font-semibold text-blue-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-6 w-6"
          >
            <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
            <line x1="4" x2="4" y1="22" y2="15" />
          </svg>
          <span className="hidden md:inline">EduAI Hub</span>
        </Link>

        <nav className="hidden md:flex flex-1 items-center gap-6 text-sm font-medium">
          <Link href="/teacher-dashboard" className="text-blue-600 hover:text-blue-700 transition-colors">
            Dashboard
          </Link>
          <Link href="/teacher-dashboard/classes" className="text-gray-600 hover:text-blue-600 transition-colors">
            Classes
          </Link>
          <Link href="/teacher-dashboard/students" className="text-gray-600 hover:text-blue-600 transition-colors">
            Students
          </Link>
          <Link href="/teacher-dashboard/assessments" className="text-gray-600 hover:text-blue-600 transition-colors">
            Assessments
          </Link>
          <Link href="/teacher-dashboard/resources" className="text-gray-600 hover:text-blue-600 transition-colors">
            Resources
          </Link>
          <Link href="/teacher-dashboard/messages" className="text-gray-600 hover:text-blue-600 transition-colors">
            Messages
          </Link>
          <Link href="/teacher-dashboard/analytics" className="text-gray-600 hover:text-blue-600 transition-colors">
            Analytics
          </Link>
        </nav>

        <div className="ml-auto flex items-center gap-4">
          <Link
            href="/teacher-dashboard/ai-assistant"
            className="hidden md:flex items-center gap-2 rounded-full bg-blue-100 px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-200 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-sparkles"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
              <path d="M5 3v4" />
              <path d="M19 17v4" />
              <path d="M3 5h4" />
              <path d="M17 19h4" />
            </svg>
            AI Assistant
          </Link>
          <NotificationBell />
          <ModeToggle />
          <UserNav />
        </div>
      </header>

      <div className="flex flex-1">
        <TeacherNav className="hidden md:block w-64 border-r bg-white/80 backdrop-blur-sm" />

        <div className="flex flex-col flex-1">
          <main className="flex-1 p-4 md:p-8">{children}</main>

          <footer className="border-t py-4 px-8 text-center text-sm text-gray-500">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
              <div className="text-left">
                <p>© 2025 EduAI Hub. All rights reserved.</p>
              </div>
              <div className="flex gap-4">
                <Link href="/terms" className="hover:text-blue-600 transition-colors">
                  Terms
                </Link>
                <Link href="/privacy" className="hover:text-blue-600 transition-colors">
                  Privacy
                </Link>
                <Link href="/help" className="hover:text-blue-600 transition-colors">
                  Help
                </Link>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  )
}

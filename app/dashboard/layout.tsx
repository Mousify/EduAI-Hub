import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { UserNav } from "@/components/user-nav"
import { ModeToggle } from "@/components/mode-toggle"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
        <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
          <a href="/dashboard" className="flex items-center gap-2 text-lg font-semibold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-6 w-6 text-primary"
            >
              <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
              <line x1="4" x2="4" y1="22" y2="15" />
            </svg>
            EduAI Hub
          </a>
          <a href="/dashboard" className="text-muted-foreground hover:text-foreground">
            Dashboard
          </a>
          <a href="/dashboard/sessions" className="text-muted-foreground hover:text-foreground">
            Tutoring Sessions
          </a>
          <a href="/dashboard/practice" className="text-muted-foreground hover:text-foreground">
            Practice
          </a>
          <a href="/dashboard/analytics" className="text-muted-foreground hover:text-foreground">
            Analytics
          </a>
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <ModeToggle />
          <UserNav />
        </div>
      </header>
      <div className="flex-1 flex">
        <DashboardNav className="w-64 hidden md:block" />
        <main className="flex-1 p-4 md:p-8">{children}</main>
      </div>
    </div>
  )
}

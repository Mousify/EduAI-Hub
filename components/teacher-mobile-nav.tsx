"use client"

import { useState } from "react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  BarChart,
  Users,
  FileText,
  MessageSquare,
  Settings,
  Sparkles,
  Home,
  GraduationCap,
  FolderOpen,
  Calendar,
} from "lucide-react"

export function TeacherMobileNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  const isActive = (path: string) => {
    return pathname === path || pathname.startsWith(`${path}/`)
  }

  const navItems = [
    {
      title: "Dashboard",
      href: "/teacher-dashboard",
      icon: Home,
    },
    {
      title: "Classes",
      href: "/teacher-dashboard/classes",
      icon: BookOpen,
    },
    {
      title: "Students",
      href: "/teacher-dashboard/students",
      icon: Users,
    },
    {
      title: "Assessments",
      href: "/teacher-dashboard/assessments",
      icon: FileText,
    },
    {
      title: "Resources",
      href: "/teacher-dashboard/resources",
      icon: FolderOpen,
    },
    {
      title: "Messages",
      href: "/teacher-dashboard/messages",
      icon: MessageSquare,
    },
    {
      title: "Calendar",
      href: "/teacher-dashboard/calendar",
      icon: Calendar,
    },
    {
      title: "Analytics",
      href: "/teacher-dashboard/analytics",
      icon: BarChart,
    },
    {
      title: "AI Tools",
      href: "/teacher-dashboard/tools",
      icon: Sparkles,
    },
    {
      title: "AI Assistant",
      href: "/teacher-dashboard/ai-assistant",
      icon: GraduationCap,
    },
    {
      title: "Settings",
      href: "/teacher-dashboard/settings",
      icon: Settings,
    },
  ]

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <div className="flex flex-col h-full">
          <div className="p-4 border-b">
            <Link
              href="/teacher-dashboard"
              className="flex items-center gap-2 text-lg font-semibold text-blue-600"
              onClick={() => setOpen(false)}
            >
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
              <span>EduAI Hub</span>
            </Link>
          </div>
          <nav className="flex-1 overflow-auto py-4">
            <div className="px-3 space-y-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                    isActive(item.href) ? "bg-blue-100 text-blue-900 font-medium" : "text-gray-600 hover:bg-gray-100"
                  }`}
                  onClick={() => setOpen(false)}
                >
                  <item.icon className="h-4 w-4" />
                  {item.title}
                </Link>
              ))}
            </div>
          </nav>
          <div className="border-t p-4">
            <p className="text-xs text-gray-500">© 2025 EduAI Hub</p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

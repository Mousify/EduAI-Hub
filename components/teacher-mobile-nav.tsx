"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Home,
  BarChart,
  Settings,
  MessageSquare,
  Users,
  FileText,
  FolderOpen,
  GraduationCap,
  Calendar,
  BookMarked,
  Sparkles,
  Menu,
  Wand2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"

export function TeacherMobileNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

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
      title: "Courses",
      href: "/teacher-dashboard/courses",
      icon: BookMarked,
    },
    {
      title: "Analytics",
      href: "/teacher-dashboard/analytics",
      icon: BarChart,
    },
  ]

  const aiTools = [
    {
      title: "AI Assistant",
      href: "/teacher-dashboard/ai-assistant",
      icon: Sparkles,
      highlight: true,
    },
    {
      title: "AI Tools Hub",
      href: "/teacher-dashboard/tools",
      icon: Wand2,
    },
  ]

  const bottomNavItems = [
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
      <SheetContent side="left" className="w-[300px] sm:w-[400px] p-0">
        <SheetHeader className="p-6 border-b">
          <SheetTitle className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-xl text-blue-600">EduAI Hub</span>
          </SheetTitle>
        </SheetHeader>
        <div className="py-6 px-4 space-y-6">
          <div className="space-y-1">
            <h2 className="px-2 text-xs font-semibold tracking-tight text-gray-500 uppercase">Main Navigation</h2>
            <div className="space-y-1 mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                    pathname === item.href
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-blue-600",
                  )}
                >
                  <item.icon className={cn("h-5 w-5", pathname === item.href ? "text-blue-600" : "text-gray-500")} />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <h2 className="px-2 text-xs font-semibold tracking-tight text-gray-500 uppercase">AI Tools</h2>
            <div className="space-y-1 mt-2">
              {aiTools.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                    pathname === item.href
                      ? "bg-blue-100 text-blue-600"
                      : item.highlight
                        ? "text-blue-600 hover:bg-blue-50"
                        : "text-gray-600 hover:bg-gray-100 hover:text-blue-600",
                  )}
                >
                  <item.icon
                    className={cn(
                      "h-5 w-5",
                      pathname === item.href ? "text-blue-600" : item.highlight ? "text-blue-600" : "text-gray-500",
                    )}
                  />
                  <span>{item.title}</span>
                  {item.highlight && (
                    <span className="ml-auto flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600">
                      New
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <div className="space-y-1">
              {bottomNavItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                    pathname === item.href
                      ? "bg-blue-100 text-blue-600"
                      : "text-gray-600 hover:bg-gray-100 hover:text-blue-600",
                  )}
                >
                  <item.icon className={cn("h-5 w-5", pathname === item.href ? "text-blue-600" : "text-gray-500")} />
                  <span>{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

"use client";

import type React from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TeacherNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function TeacherNav({ className, ...props }: TeacherNavProps) {
  const pathname = usePathname();

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
  ];

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
  ];

  const bottomNavItems = [
    {
      title: "Settings",
      href: "/teacher-dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <div className={cn("h-full py-8", className)} {...props}>
      <div className="space-y-6">
        <div className="px-6">
          <Link href="/teacher-dashboard" className="flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-blue-600" />
            <span className="font-semibold text-xl text-blue-600">mano10</span>
          </Link>
        </div>

        <div className="px-3">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-gray-500 uppercase">
            Main Navigation
          </h2>
          <div className="space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  pathname === item.href
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    pathname === item.href ? "text-blue-600" : "text-gray-500"
                  )}
                />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>

        <div className="px-3">
          <h2 className="mb-2 px-4 text-xs font-semibold tracking-tight text-gray-500 uppercase">
            AI Tools
          </h2>
          <div className="space-y-1">
            {aiTools.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  pathname === item.href
                    ? "bg-blue-100 text-blue-600"
                    : item.highlight
                    ? "text-blue-600 hover:bg-blue-50"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    pathname === item.href
                      ? "text-blue-600"
                      : item.highlight
                      ? "text-blue-600"
                      : "text-gray-500"
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

        <div className="px-3 mt-auto">
          <div className="space-y-1">
            {bottomNavItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                  pathname === item.href
                    ? "bg-blue-100 text-blue-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-blue-600"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5",
                    pathname === item.href ? "text-blue-600" : "text-gray-500"
                  )}
                />
                <span>{item.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

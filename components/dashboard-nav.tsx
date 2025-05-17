"use client";

import type React from "react";
import { cn } from "@/lib/utils";
import {
  BookOpen,
  Home,
  BarChart,
  Settings,
  MessageSquare,
  Dumbbell,
  BookmarkIcon,
  CreditCard,
  Sparkles,
  Wand2,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DashboardNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function DashboardNav({ className, ...props }: DashboardNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      title: "Tutoring Sessions",
      href: "/dashboard/sessions",
      icon: MessageSquare,
    },
    {
      title: "Practice",
      href: "/dashboard/practice",
      icon: Dumbbell,
    },
    {
      title: "Resources",
      href: "/dashboard/resources",
      icon: BookmarkIcon,
    },
    {
      title: "Courses",
      href: "/dashboard/courses",
      icon: BookOpen,
    },
    {
      title: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart,
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: CreditCard,
    },
  ];

  const aiTools = [
    {
      title: "Homework Helper",
      href: "/dashboard/homework-helper",
      icon: Sparkles,
      highlight: true,
    },
    {
      title: "Study Guides",
      href: "/dashboard/study-guides",
      icon: Wand2,
    },
    {
      title: "Content Explainer",
      href: "/dashboard/content-explainer",
      icon: Wand2,
    },
  ];

  const bottomNavItems = [
    {
      title: "Settings",
      href: "/dashboard/settings",
      icon: Settings,
    },
  ];

  return (
    <div className={cn("h-full py-8", className)} {...props}>
      <div className="space-y-6">
        <div className="px-6">
          <Link href="/dashboard" className="flex items-center gap-2">
            <BookOpen className="h-6 w-6 text-blue-600" />
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

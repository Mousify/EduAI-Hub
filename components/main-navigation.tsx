"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { cn } from "@/lib/utils"
import { ModeToggle } from "@/components/mode-toggle"

export function MainNavigation() {
  const pathname = usePathname()

  const isActive = (path: string) => pathname === path

  return (
    <div className="flex items-center gap-4">
      <NavigationMenu className="hidden md:flex">
        <NavigationMenuList>
          <NavigationMenuItem>
            <Link href="/" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>For Students</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-700 p-6 no-underline outline-none focus:shadow-md"
                      href="/dashboard"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium text-white">My Dashboard</div>
                      <p className="text-sm leading-tight text-white/90">
                        Overview of personal progress, active assignments, upcoming tasks, and token balance.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/dashboard/homework-helper" title="AI Tutoring">
                  Upload assignments or type questions to receive personalized AI-powered tutoring help.
                </ListItem>
                <ListItem href="/dashboard/practice" title="Practice & Quizzes">
                  Generate custom exercises and quizzes for different subjects and difficulty levels.
                </ListItem>
                <ListItem href="/dashboard/analytics" title="Progress Reports">
                  View performance analytics, growth trends, and areas that need improvement.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>For Teachers</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-500 to-green-700 p-6 no-underline outline-none focus:shadow-md"
                      href="/teacher-dashboard"
                    >
                      <div className="mt-4 mb-2 text-lg font-medium text-white">Teacher Dashboard</div>
                      <p className="text-sm leading-tight text-white/90">
                        High-level overview of class activities, student performance summaries, and recent alerts.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                <ListItem href="/teacher-dashboard/classes" title="Class Management">
                  Tools to create, manage, and edit classes, add students, and assign lessons.
                </ListItem>
                <ListItem href="/teacher-dashboard/tools" title="Content Generator">
                  Upload curricula or documents to auto-generate worksheets, quizzes, and class materials.
                </ListItem>
                <ListItem href="/teacher-dashboard/students" title="Live Monitoring">
                  Real-time observation of student AI sessions with feedback and intervention options.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/schools" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>For Schools & Districts</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/pricing" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Pricing</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/blog" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Blog</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>About</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4">
                <ListItem href="/about" title="About Us">
                  Description of the project's mission, the founding team, and its vision for AI in education.
                </ListItem>
                <ListItem href="/events" title="Events">
                  Calendar of upcoming events, such as webinars, platform demos, and educational workshops.
                </ListItem>
                <ListItem href="/contact" title="Contact">
                  Contact form, customer service email, and links to social media or support.
                </ListItem>
                <ListItem href="/privacy" title="Privacy Policy">
                  Full legal documentation covering user data, GDPR/COPPA compliance, and user rights.
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <ModeToggle />
    </div>
  )
}

const ListItem = React.forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a"> & { title: string }>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className,
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    )
  },
)
ListItem.displayName = "ListItem"

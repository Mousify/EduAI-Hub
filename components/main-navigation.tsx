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
import { useLanguage } from "@/components/language-provider"

export function MainNavigation() {
  const pathname = usePathname()
  const { t } = useLanguage()

  const isActive = (path: string) => pathname === path

  return (
    <NavigationMenu className="hidden md:flex">
      <NavigationMenuList>
        <NavigationMenuItem>
          <Link href="/" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t("navigation.home")}</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("navigation.dashboard")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-blue-500 to-blue-700 p-6 no-underline outline-none focus:shadow-md"
                    href="/dashboard"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium text-white">
                      {t("dashboard.welcome", { name: "" })}
                    </div>
                    <p className="text-sm leading-tight text-white/90">{t("dashboard.recentActivity")}</p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/dashboard/homework-helper" title={t("tutoring.sessions")}>
                {t("tutoring.askQuestion")}
              </ListItem>
              <ListItem href="/dashboard/practice" title={t("practice.title")}>
                {t("practice.generateQuestions")}
              </ListItem>
              <ListItem href="/dashboard/analytics" title={t("navigation.analytics")}>
                {t("dashboard.progress")}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("navigation.schools")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid gap-3 p-6 w-[400px] md:w-[500px] lg:w-[600px] grid-cols-2">
              <li className="row-span-3">
                <NavigationMenuLink asChild>
                  <a
                    className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-green-500 to-green-700 p-6 no-underline outline-none focus:shadow-md"
                    href="/teacher-dashboard"
                  >
                    <div className="mt-4 mb-2 text-lg font-medium text-white">{t("navigation.dashboard")}</div>
                    <p className="text-sm leading-tight text-white/90">{t("dashboard.recentActivity")}</p>
                  </a>
                </NavigationMenuLink>
              </li>
              <ListItem href="/teacher-dashboard/classes" title={t("tutoring.sessions")}>
                {t("tutoring.askQuestion")}
              </ListItem>
              <ListItem href="/teacher-dashboard/tools" title={t("resources.title")}>
                {t("resources.createResource")}
              </ListItem>
              <ListItem href="/teacher-dashboard/students" title={t("navigation.analytics")}>
                {t("dashboard.progress")}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/news" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t("navigation.news")}</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/pricing" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t("navigation.pricing")}</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <Link href="/blog" legacyBehavior passHref>
            <NavigationMenuLink className={navigationMenuTriggerStyle()}>{t("navigation.blog")}</NavigationMenuLink>
          </Link>
        </NavigationMenuItem>

        <NavigationMenuItem>
          <NavigationMenuTrigger>{t("navigation.about")}</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="grid w-[400px] gap-3 p-4">
              <ListItem href="/about" title={t("navigation.about")}>
                {t("footer.about")}
              </ListItem>
              <ListItem href="/events" title={t("navigation.events")}>
                {t("navigation.events")}
              </ListItem>
              <ListItem href="/contact" title={t("navigation.contact")}>
                {t("navigation.contact")}
              </ListItem>
              <ListItem href="/privacy" title={t("footer.privacy")}>
                {t("footer.privacy")}
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
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

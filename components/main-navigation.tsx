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
            <Link href="/#features" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Features</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/#pricing" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Pricing</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <Link href="/#testimonials" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>Testimonials</NavigationMenuLink>
            </Link>
          </NavigationMenuItem>

          <NavigationMenuItem>
            <NavigationMenuTrigger>About</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4">
                <ListItem href="/about" title="About Us">
                  Learn about mano10's mission and vision for AI-powered tools.
                </ListItem>
                <ListItem href="/contact" title="Contact">
                  Get in touch with our team for support or inquiries.
                </ListItem>
                <ListItem href="/privacy" title="Privacy Policy">
                  Full legal documentation covering user data and privacy rights.
                </ListItem>
                <ListItem href="/terms" title="Terms of Service">
                  Terms and conditions for using the mano10 platform.
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

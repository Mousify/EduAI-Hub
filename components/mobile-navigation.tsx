"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { ModeToggle } from "@/components/mode-toggle"
import { Mano10Logo } from "@/components/mano10-logo"

export function MobileNavigation() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col p-0">
        <div className="flex items-center justify-between border-b px-4 py-2">
          <div className="flex items-center gap-2">
            <Mano10Logo width={100} height={32} />
          </div>
          <Button variant="ghost" size="icon" onClick={() => setOpen(false)}>
            <X className="h-5 w-5" />
            <span className="sr-only">Close menu</span>
          </Button>
        </div>
        <nav className="flex-1 overflow-auto py-4">
          <div className="grid gap-1 px-2">
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              Pradžia
            </Link>
            <Link
              href="/#path"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              Pasirinkite savo kelią
            </Link>
            <Link
              href="/#pricing"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              Kainos
            </Link>
            <Link
              href="/#testimonials"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              Atsiliepimai
            </Link>
            <Link
              href="/about"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              Apie mus
            </Link>
            <Link
              href="/contact"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              Kontaktai
            </Link>
          </div>
        </nav>
        <div className="border-t p-4 flex flex-col gap-2">
          <ModeToggle />
          <div className="grid grid-cols-2 gap-2 mt-2">
            <Button variant="outline" asChild className="w-full">
              <Link href="/login">Prisijungti</Link>
            </Button>
            <Button asChild className="w-full">
              <Link href="/signup">Registruotis</Link>
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

// Export MobileNav as an alias for MobileNavigation for backward compatibility
export const MobileNav = MobileNavigation

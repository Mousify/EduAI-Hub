import { Button } from "@/components/ui/button"
import { LandingHero } from "@/components/landing-hero"
import { Features } from "@/components/features"
import { Pricing } from "@/components/pricing"
import { Testimonials } from "@/components/testimonials"
import { Footer } from "@/components/footer"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background px-4 md:px-6">
        <div className="flex items-center gap-2">
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
          <span className="text-lg font-semibold">EduAI Hub</span>
        </div>
        <nav className="hidden md:flex md:items-center md:gap-4">
          <Link href="#features" className="text-sm font-medium hover:underline">
            Features
          </Link>
          <Link href="#pricing" className="text-sm font-medium hover:underline">
            Pricing
          </Link>
          <Link href="#testimonials" className="text-sm font-medium hover:underline">
            Testimonials
          </Link>
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <LandingHero />
        <Features />
        <Pricing />
        <Testimonials />
      </main>
      <Footer />
    </div>
  )
}

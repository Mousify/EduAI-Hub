import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-gray-100">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-900">
                AI-Powered Learning for Every Student
              </h1>
              <p className="max-w-[600px] text-gray-600 md:text-xl">
                Personalized homework help, step-by-step solutions, and practice generation for grades 5-12. All backed
                by advanced AI technology.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 text-white">
                <Link href="/signup?role=student" className="flex items-center">
                  I'm a Student <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-blue-200 hover:bg-blue-50 hover:text-blue-700"
              >
                <Link href="/signup?role=teacher">I'm a Teacher</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] h-[400px] bg-gradient-to-br from-blue-100 to-blue-50 rounded-xl overflow-hidden shadow-lg border border-blue-100">
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-48 w-48 text-blue-300"
                >
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
                  <circle cx="12" cy="10" r="2" />
                  <path d="M12 14v4" />
                  <path d="M12 6v2" />
                </svg>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm p-4">
                <p className="text-sm font-medium text-center text-blue-800">
                  Multimodal learning with text, images, and voice
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

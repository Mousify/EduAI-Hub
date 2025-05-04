import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Scene3D } from "@/components/3d/scene"

export function LandingHero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-br from-blue-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2 items-center">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none text-blue-900 dark:text-blue-100">
                AI-Powered Learning for Every Student
              </h1>
              <p className="max-w-[600px] text-gray-600 dark:text-gray-300 md:text-xl">
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
                className="border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:border-blue-800 dark:hover:bg-blue-900 dark:hover:text-blue-300"
              >
                <Link href="/signup?role=teacher">I'm a Teacher</Link>
              </Button>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] h-[400px] bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900 dark:to-blue-800 rounded-xl overflow-hidden shadow-lg border border-blue-100 dark:border-blue-800">
              <Scene3D className="absolute inset-0" interactive={true} />
              <div className="absolute bottom-0 left-0 right-0 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm p-4">
                <p className="text-sm font-medium text-center text-blue-800 dark:text-blue-300">
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

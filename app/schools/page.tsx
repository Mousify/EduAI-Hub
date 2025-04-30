import { Button } from "@/components/ui/button";
import { MainNavigation } from "@/components/main-navigation";
import { MobileNavigation } from "@/components/mobile-navigation";
import { SiteFooter } from "@/components/site-footer";
import { HomeButton } from "@/components/home-button";
import Link from "next/link";

export default function SchoolsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 flex h-16 w-full items-center justify-between border-b bg-background/95 backdrop-blur px-4 md:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <MobileNavigation />
          <HomeButton />
        </div>

        <MainNavigation />

        <div className="flex items-center gap-2">
          <Button variant="ghost" asChild className="hidden md:inline-flex">
            <Link href="/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </header>

      <div className="container mx-auto py-12 px-4 md:px-6">
        <div className="space-y-4 text-center mb-12">
          <h1 className="text-4xl font-bold tracking-tight">For Schools</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Empower your entire school with our comprehensive AI tutoring
            platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">School-Wide Solutions</h2>
            <p className="text-lg mb-6">
              Our platform is designed to support schools at every level, from
              individual classrooms to district-wide implementations. We offer
              special pricing and features for educational institutions.
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 mr-2 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Bulk student accounts with centralized management</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 mr-2 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>School-wide analytics and performance tracking</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 mr-2 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Integration with existing school systems and LMS</span>
              </li>
              <li className="flex items-start">
                <svg
                  className="h-6 w-6 mr-2 text-green-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                <span>Custom curriculum alignment and content</span>
              </li>
            </ul>
          </div>
          <div className="rounded-lg overflow-hidden shadow-xl">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="School implementation"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="bg-muted rounded-lg p-8 mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">
            How Schools Benefit
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">Improved Outcomes</h3>
              <p>
                Students receive personalized support that leads to better
                academic performance and increased confidence.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">Teacher Support</h3>
              <p>
                Teachers gain powerful tools to create content, assess student
                understanding, and identify learning gaps.
              </p>
            </div>
            <div className="bg-card p-6 rounded-lg shadow">
              <h3 className="text-xl font-bold mb-3">Equitable Access</h3>
              <p>
                Every student gets access to high-quality tutoring support
                regardless of socioeconomic background.
              </p>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Pricing for Schools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="border rounded-lg p-6 flex flex-col">
              <h3 className="text-xl font-bold mb-2">Classroom</h3>
              <p className="text-muted-foreground mb-4">
                For individual teachers
              </p>
              <div className="text-3xl font-bold mb-4">
                $5<span className="text-lg font-normal">/student/month</span>
              </div>
              <ul className="space-y-2 mb-8 flex-grow">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Up to 35 students</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Basic teacher tools</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Class performance tracking</span>
                </li>
              </ul>
              <button className="btn btn-outline w-full">Contact Sales</button>
            </div>
            <div className="border rounded-lg p-6 flex flex-col relative bg-muted">
              <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-sm rounded-bl-lg rounded-tr-lg font-medium">
                Popular
              </div>
              <h3 className="text-xl font-bold mb-2">School</h3>
              <p className="text-muted-foreground mb-4">For entire schools</p>
              <div className="text-3xl font-bold mb-4">
                $4<span className="text-lg font-normal">/student/month</span>
              </div>
              <ul className="space-y-2 mb-8 flex-grow">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>100+ students</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Advanced teacher tools</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>School-wide analytics</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Admin dashboard</span>
                </li>
              </ul>
              <button className="btn btn-primary w-full">Contact Sales</button>
            </div>
            <div className="border rounded-lg p-6 flex flex-col">
              <h3 className="text-xl font-bold mb-2">District</h3>
              <p className="text-muted-foreground mb-4">For school districts</p>
              <div className="text-3xl font-bold mb-4">Custom</div>
              <ul className="space-y-2 mb-8 flex-grow">
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Unlimited students</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Full feature access</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>District-wide analytics</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>API access & custom integrations</span>
                </li>
                <li className="flex items-start">
                  <svg
                    className="h-5 w-5 mr-2 text-green-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                  <span>Dedicated support</span>
                </li>
              </ul>
              <button className="btn btn-outline w-full">Contact Sales</button>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg p-8 shadow-lg">
          <h2 className="text-3xl font-bold mb-6 text-center">
            Request a Demo
          </h2>
          <p className="text-center mb-8 max-w-2xl mx-auto">
            See how our platform can benefit your school or district. Schedule a
            personalized demo with our education specialists.
          </p>
          <form className="max-w-xl mx-auto grid gap-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="school"
                className="block text-sm font-medium mb-1"
              >
                School/District Name
              </label>
              <input
                type="text"
                id="school"
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium mb-1">
                Your Role
              </label>
              <select id="role" className="w-full p-2 border rounded">
                <option value="">Select your role</option>
                <option value="teacher">Teacher</option>
                <option value="principal">Principal</option>
                <option value="administrator">Administrator</option>
                <option value="it">IT Staff</option>
                <option value="other">Other</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium mb-1"
              >
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
            <button type="submit" className="btn btn-primary">
              Request Demo
            </button>
          </form>
        </div>
      </div>
      <SiteFooter />
    </div>
  );
}

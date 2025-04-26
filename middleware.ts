import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Check if the user is authenticated
  if (!session) {
    // If the user is not authenticated and trying to access a protected route, redirect to login
    const protectedRoutes = ["/dashboard", "/teacher-dashboard", "/profile"]
    const isProtectedRoute = protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route))

    if (isProtectedRoute) {
      const redirectUrl = new URL("/login", req.url)
      redirectUrl.searchParams.set("redirect", req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    }
  }

  // If the user is authenticated and trying to access auth pages, redirect to dashboard
  if (session) {
    const authRoutes = ["/login", "/signup", "/forgot-password"]
    if (authRoutes.includes(req.nextUrl.pathname)) {
      // Check user role to determine which dashboard to redirect to
      const { data: userData } = await supabase.auth.getUser()
      const role = userData.user?.user_metadata?.role || "student"

      const redirectUrl = role === "teacher" ? "/teacher-dashboard" : "/dashboard"
      return NextResponse.redirect(new URL(redirectUrl, req.url))
    }
  }

  return res
}

export const config = {
  matcher: [
    // Protected routes
    "/dashboard/:path*",
    "/teacher-dashboard/:path*",
    "/profile/:path*",
    // Auth routes
    "/login",
    "/signup",
    "/forgot-password",
  ],
}

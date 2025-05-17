import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  // Handle OAuth callback
  if (req.nextUrl.pathname === "/auth/callback") {
    const state = req.nextUrl.searchParams.get("state");
    const storedState = req.cookies.get("oauthState")?.value;

    if (state && storedState && state !== storedState) {
      console.error("OAuth state mismatch");
      return NextResponse.redirect(
        new URL("/login?error=invalid_state", req.url)
      );
    }
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Check if the user is authenticated
  if (!session) {
    // If the user is not authenticated and trying to access a protected route, redirect to login
    const protectedRoutes = ["/dashboard", "/teacher-dashboard", "/profile"];
    const isProtectedRoute = protectedRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    );

    if (isProtectedRoute) {
      const redirectUrl = new URL("/login", req.url);
      redirectUrl.searchParams.set("redirect", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }
  }

  // If the user is authenticated and trying to access auth pages, redirect to dashboard
  if (session) {
    const authRoutes = ["/login", "/signup", "/forgot-password"];
    if (authRoutes.includes(req.nextUrl.pathname)) {
      // Check user role to determine which dashboard to redirect to
      const { data: userData } = await supabase.auth.getUser();
      const role = userData.user?.user_metadata?.role || "student";

      // Ensure we're redirecting to the correct dashboard based on role
      if (role === "teacher") {
        return NextResponse.redirect(new URL("/teacher-dashboard", req.url));
      } else {
        return NextResponse.redirect(new URL("/dashboard", req.url));
      }
    }

    // Prevent students from accessing teacher dashboard and vice versa
    const { data: userData } = await supabase.auth.getUser();
    const role = userData.user?.user_metadata?.role;

    if (
      role === "student" &&
      req.nextUrl.pathname.startsWith("/teacher-dashboard")
    ) {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    if (role === "teacher" && req.nextUrl.pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/teacher-dashboard", req.url));
    }
  }

  return res;
}

// Update the matcher to be more specific and avoid potential redirect loops
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public/).*)",
  ],
};

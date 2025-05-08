import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const state = requestUrl.searchParams.get("state")
  const roleParam = requestUrl.searchParams.get("role")

  console.log("Auth callback received:", { code: !!code, state: !!state, roleParam })

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({
      cookies: () => cookieStore,
      options: {
        cookieOptions: {
          name: "sb-auth-token",
          lifetime: 60 * 60 * 8,
          sameSite: "lax",
          secure: true,
        },
      },
    })

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // Get the user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      // Check if the user already has a role
      const role = user.user_metadata?.role

      if (!role) {
        // If no role is set, check if there's a stored role preference from the query params
        const storedRole = roleParam || "student"

        console.log("Setting user role:", storedRole)

        // Update the user with the role
        await supabase.auth.updateUser({
          data: { role: storedRole },
        })

        // Create a profile in the appropriate table
        const profileData = {
          user_id: user.id,
          email: user.email,
          created_at: new Date().toISOString(),
        }

        if (storedRole === "student") {
          await supabase.from("student_profiles").upsert([profileData], { onConflict: "user_id" })
          return NextResponse.redirect(new URL("/dashboard", request.url))
        } else {
          await supabase.from("teacher_profiles").upsert([profileData], { onConflict: "user_id" })
          return NextResponse.redirect(new URL("/teacher-dashboard", request.url))
        }
      } else {
        // Redirect based on the existing role
        if (role === "student") {
          return NextResponse.redirect(new URL("/dashboard", request.url))
        } else if (role === "teacher") {
          return NextResponse.redirect(new URL("/teacher-dashboard", request.url))
        } else {
          // Default fallback if role is invalid
          return NextResponse.redirect(new URL("/", request.url))
        }
      }
    }
  }

  // Fallback to the home page
  return NextResponse.redirect(new URL("/", request.url))
}

import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (code) {
    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    // Exchange the code for a session
    await supabase.auth.exchangeCodeForSession(code)

    // Get the user
    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (user) {
      // Check if the user already has a role
      const role = user.user_metadata.role

      if (!role) {
        // If no role is set, check if there's a stored role preference
        // This would be set during the OAuth initiation
        // For server-side, we'd need to use a different mechanism like a temporary database record
        // or a signed JWT in a cookie

        // For now, default to student if no role is found
        const defaultRole = "student"

        // Update the user with the role
        await supabase.auth.updateUser({
          data: { role: defaultRole },
        })

        // Create a profile in the appropriate table
        const profileData = {
          user_id: user.id,
          email: user.email,
          created_at: new Date().toISOString(),
        }

        if (defaultRole === "student") {
          await supabase.from("student_profiles").insert([profileData])
          return NextResponse.redirect(new URL("/dashboard", request.url))
        } else {
          await supabase.from("teacher_profiles").insert([profileData])
          return NextResponse.redirect(new URL("/teacher-dashboard", request.url))
        }
      } else {
        // Redirect based on the existing role
        if (role === "student") {
          return NextResponse.redirect(new URL("/dashboard", request.url))
        } else {
          return NextResponse.redirect(new URL("/teacher-dashboard", request.url))
        }
      }
    }
  }

  // Fallback to the home page
  return NextResponse.redirect(new URL("/", request.url))
}

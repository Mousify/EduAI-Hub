import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const state = requestUrl.searchParams.get("state");
  const roleParam = requestUrl.searchParams.get("role");

  console.log("Auth callback received:", {
    code: !!code,
    state: !!state,
    roleParam,
  });

  if (code) {
    const cookieStore = cookies();
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore });

    try {
      // Exchange the code for a session
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.exchangeCodeForSession(code);

      if (sessionError) {
        console.error("Session error:", sessionError);
        return NextResponse.redirect(
          new URL("/login?error=auth_failed", request.url)
        );
      }

      if (!session?.user) {
        console.error("No user in session");
        return NextResponse.redirect(
          new URL("/login?error=no_user", request.url)
        );
      }

      // Get the user's current metadata
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) {
        console.error("User error:", userError);
        return NextResponse.redirect(
          new URL("/login?error=user_failed", request.url)
        );
      }

      // Determine the role to use
      let roleToUse = user?.user_metadata?.role;

      // If no role is set, use the role from the query params or default to student
      if (!roleToUse) {
        roleToUse = roleParam || "student";

        // Update the user with the role
        const { error: updateError } = await supabase.auth.updateUser({
          data: { role: roleToUse },
        });

        if (updateError) {
          console.error("Role update error:", updateError);
          return NextResponse.redirect(
            new URL("/login?error=role_update_failed", request.url)
          );
        }

        // Create a profile in the appropriate table
        const profileData = {
          user_id: user.id,
          email: user.email,
          created_at: new Date().toISOString(),
        };

        if (roleToUse === "student") {
          const { error: profileError } = await supabase
            .from("student_profiles")
            .upsert([profileData], { onConflict: "user_id" });

          if (profileError) {
            console.error("Student profile error:", profileError);
          }

          return NextResponse.redirect(new URL("/dashboard", request.url));
        } else {
          const { error: profileError } = await supabase
            .from("teacher_profiles")
            .upsert([profileData], { onConflict: "user_id" });

          if (profileError) {
            console.error("Teacher profile error:", profileError);
          }

          return NextResponse.redirect(
            new URL("/teacher-dashboard", request.url)
          );
        }
      }

      // If user already has a role, redirect based on that role
      if (roleToUse === "student") {
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } else if (roleToUse === "teacher") {
        return NextResponse.redirect(
          new URL("/teacher-dashboard", request.url)
        );
      }

      // Default fallback
      return NextResponse.redirect(new URL("/", request.url));
    } catch (error) {
      console.error("Callback error:", error);
      return NextResponse.redirect(
        new URL("/login?error=callback_failed", request.url)
      );
    }
  }

  // Fallback to the home page
  return NextResponse.redirect(new URL("/", request.url));
}

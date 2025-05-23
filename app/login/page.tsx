"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Loader2 } from "lucide-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
        setIsLoading(false);
        return;
      }

      if (data?.user) {
        // Check user role and redirect accordingly
        const { data: userData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", data.user.id)
          .single();

        if (userData?.role === "teacher") {
          router.push("/teacher-dashboard");
        } else {
          router.push("/dashboard");
        }
      }
    } catch (error) {
      console.error("Error during login:", error);
      setError("Įvyko netikėta klaida. Bandykite dar kartą.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      // Generate a random state value for OAuth security
      const state = Math.random().toString(36).substring(2, 15);

      // Store the state in localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("oauthState", state);
      }

      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
            state: state,
            scope: "email profile",
          },
          // Remove custom cookie options as they're handled by Supabase
        },
      });

      if (error) {
        console.error("Google sign in error:", error);
        setError(error.message);
      }
    } catch (err: any) {
      console.error("Google sign in exception:", err);
      setError(err.message || "Įvyko klaida prisijungiant per Google");
    }
  };

  return (
    <div className="flex min-h-screen bg-white dark:bg-gray-950">
      {/* Left Section */}
      <div className="relative hidden w-1/2 p-8 lg:block">
        <div className="h-full w-full overflow-hidden rounded-[40px] bg-gradient-to-b from-blue-400 via-blue-600 to-blue-900 dark:from-blue-600 dark:via-blue-800 dark:to-blue-950">
          <div className="flex h-full flex-col items-center justify-center px-8 text-center text-white">
            <div className="mb-8">
              <h1 className="text-2xl font-semibold">mano10</h1>
            </div>
            <h2 className="mb-6 text-4xl font-bold">Sveiki sugrįžę</h2>
            <p className="mb-12 text-lg">
              Prisijunkite prie savo paskyros ir tęskite savo kelionę.
            </p>

            <div className="w-full max-w-sm space-y-4">
              <div className="rounded-lg bg-white/10 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-blue-700">
                    1
                  </span>
                  <span className="text-lg">
                    Prisijunkite prie savo paskyros
                  </span>
                </div>
              </div>
              <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
                    2
                  </span>
                  <span className="text-lg">Pasiekite savo darbo erdvę</span>
                </div>
              </div>
              <div className="rounded-lg bg-white/5 p-4 backdrop-blur-sm">
                <div className="flex items-center gap-4">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20 text-white">
                    3
                  </span>
                  <span className="text-lg">Tęskite savo darbą</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex w-full items-center justify-center bg-white dark:bg-gray-950 p-6 lg:w-1/2">
        <div className="w-full max-w-md p-8 rounded-[40px] dark:bg-gray-900/50">
          <div className="mx-auto max-w-sm">
            <div className="mb-6">
              <Link
                href="/"
                className="inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Grįžti į pradžią
              </Link>
            </div>

            <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              Prisijungimas
            </h2>
            <p className="mb-8 text-gray-500 dark:text-gray-400">
              Įveskite savo prisijungimo duomenis, kad patektumėte į savo
              paskyrą.
            </p>

            {error && (
              <div className="mb-4 rounded-lg bg-red-100 p-3 text-sm text-red-700 dark:bg-red-900/50 dark:text-red-200">
                {error}
              </div>
            )}

            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <Input
                  className="h-12 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  placeholder="jusu@pastas.lt"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Input
                  className="h-12 border-gray-300 bg-white dark:border-gray-700 dark:bg-gray-800 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400"
                  placeholder="Slaptažodis"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
                <div className="flex justify-end">
                  <Link
                    href="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    Pamiršote slaptažodį?
                  </Link>
                </div>
              </div>

              <Button
                type="submit"
                className="h-12 w-full bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Jungiamasi...
                  </>
                ) : (
                  "Prisijungti"
                )}
              </Button>
            </form>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500 dark:bg-gray-950 dark:text-gray-400">
                  Arba
                </span>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full h-12 border-gray-300 bg-white text-gray-900 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700"
              onClick={handleGoogleSignIn}
            >
              <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Prisijungti su Google
            </Button>

            <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
              Neturite paskyros?{" "}
              <Link
                href="/signup"
                className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Registruotis
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

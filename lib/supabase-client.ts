import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Use NEXT_PUBLIC_ prefixed environment variables for client-side access
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY

// Check if the required environment variables are set
if (!supabaseUrl) {
  // In development, throw an error
  if (process.env.NODE_ENV === "development") {
    throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_URL")
  }
  // In production, log a warning but don't crash
  console.warn("Missing Supabase URL environment variable")
}

if (!supabaseAnonKey) {
  // In development, throw an error
  if (process.env.NODE_ENV === "development") {
    throw new Error("Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY or SUPABASE_ANON_KEY")
  }
  // In production, log a warning but don't crash
  console.warn("Missing Supabase Anon Key environment variable")
}

// Initialize the Supabase client with fallbacks
export const supabase = createClient<Database>(
  supabaseUrl || "https://placeholder-url.supabase.co",
  supabaseAnonKey || "placeholder-key",
)

// For server-side operations that need elevated privileges
export const createServiceClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseServiceKey) {
    if (process.env.NODE_ENV === "development") {
      throw new Error("Missing environment variable: SUPABASE_SERVICE_ROLE_KEY")
    }
    console.warn("Missing Supabase Service Role Key environment variable")
    return null
  }

  return createClient<Database>(supabaseUrl || "https://placeholder-url.supabase.co", supabaseServiceKey)
}

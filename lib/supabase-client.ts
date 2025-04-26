import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

// Check if the required environment variables are set
if (!process.env.SUPABASE_URL) {
  throw new Error("Missing environment variable: SUPABASE_URL")
}

if (!process.env.SUPABASE_ANON_KEY) {
  throw new Error("Missing environment variable: SUPABASE_ANON_KEY")
}

// Initialize the Supabase client
export const supabaseUrl = process.env.SUPABASE_URL
export const supabaseAnonKey = process.env.SUPABASE_ANON_KEY

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)

// For server-side operations that need elevated privileges
export const createServiceClient = () => {
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseServiceKey) {
    throw new Error("Missing environment variable: SUPABASE_SERVICE_ROLE_KEY")
  }

  return createClient<Database>(supabaseUrl, supabaseServiceKey)
}

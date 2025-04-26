#!/usr/bin/env ts-node

import { createClient } from "@supabase/supabase-js"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" })

const supabaseUrl = process.env.SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("Missing Supabase environment variables. Please check your .env.local file.")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

async function main() {
  console.log("Setting up Supabase project...")

  try {
    // Read the SQL file
    const sqlFilePath = path.join(__dirname, "../supabase/init.sql")
    const sqlContent = fs.readFileSync(sqlFilePath, "utf8")

    // Execute the SQL
    console.log("Creating database schema...")
    const { error } = await supabase.rpc("exec_sql", { sql: sqlContent })

    if (error) {
      throw error
    }

    console.log("Database schema created successfully!")

    // Create storage buckets
    console.log("Creating storage buckets...")

    // Create profile-images bucket (public)
    await supabase.storage.createBucket("profile-images", {
      public: true,
      fileSizeLimit: 1024 * 1024 * 2, // 2MB
      allowedMimeTypes: ["image/png", "image/jpeg", "image/gif", "image/webp"],
    })

    // Create homework-files bucket (private)
    await supabase.storage.createBucket("homework-files", {
      public: false,
      fileSizeLimit: 1024 * 1024 * 10, // 10MB
    })

    // Create learning-resources bucket (private)
    await supabase.storage.createBucket("learning-resources", {
      public: false,
      fileSizeLimit: 1024 * 1024 * 20, // 20MB
    })

    console.log("Storage buckets created successfully!")

    console.log("Supabase setup completed successfully!")
  } catch (error) {
    console.error("Error setting up Supabase:", error)
    process.exit(1)
  }
}

main()

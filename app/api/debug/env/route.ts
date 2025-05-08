import { NextResponse } from "next/server"
import { checkEnvironmentVariables } from "@/lib/openai"

export async function GET() {
  const envStatus = checkEnvironmentVariables()

  return NextResponse.json({
    status: "success",
    message: "Environment variable status",
    data: envStatus,
  })
}

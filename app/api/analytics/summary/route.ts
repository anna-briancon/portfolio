import { NextResponse } from "next/server"
import { getPayloadUser } from "@/lib/payload"
import { getAnalyticsSummary } from "@/lib/analytics"

export const runtime = "nodejs"

export async function GET() {
  const user = await getPayloadUser()
  if (!user) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 })
  }

  return NextResponse.json(getAnalyticsSummary())
}

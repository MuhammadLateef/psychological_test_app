import { NextResponse } from "next/server"

const GOOGLE_SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL || "https://script.google.com/macros/s/AKfycbx3vV222BeeGq8icyaJcTTj8CwwpACQcUoIDrl-3v5hwMFm-ypr5_NHtG1aoBcJdxmu/exec"

export async function POST(request) {
  try {
    if (!GOOGLE_SHEET_URL) {
      console.error("[v0] Google Sheet URL not configured")
      console.error(
        "[v0] Available env vars:",
        Object.keys(process.env).filter((k) => k.includes("GOOGLE")),
      )
      return NextResponse.json(
        { success: false, message: "Server configuration error: Google Sheet URL not set" },
        { status: 500 },
      )
    }

    // Parse request body
    const body = await request.json()

    // Validate required fields
    if (!body.demographics || body.score === undefined || !body.answers) {
      console.error("[v0] Missing required fields:", {
        hasDemographics: !!body.demographics,
        hasScore: body.score !== undefined,
        hasAnswers: !!body.answers,
      })
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // Format data for Google Sheets
    const formattedData = {
      // Demographics
      ...body.demographics,
      // Quiz Results
      bdiScore: body.score,
      severity: body.severity,
      submittedAt: body.submittedAt,
      totalAnswers: Object.keys(body.answers).length,
    }

    console.log("[v0] Submitting data to Google Sheets:", {
      timestamp: new Date().toISOString(),
      score: body.score,
      severity: body.severity,
      googleSheetUrl: GOOGLE_SHEET_URL.substring(0, 50) + "...",
    })

    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formattedData),
    })

    console.log("[v0] Google Sheets response status:", response.status)

    if (!response.ok) {
      const errorText = await response.text()
      console.error("[v0] Google Sheets API error:", {
        status: response.status,
        statusText: response.statusText,
        error: errorText.substring(0, 200),
      })
      throw new Error(`Google Sheets API error: ${response.status} ${response.statusText}`)
    }

    let result
    const contentType = response.headers.get("content-type")

    if (contentType && contentType.includes("application/json")) {
      result = await response.json()
    } else {
      const text = await response.text()
      console.log("[v0] Google Sheets returned non-JSON response:", text.substring(0, 100))
      result = { message: text }
    }

    console.log("[v0] Successfully submitted to Google Sheets")

    return NextResponse.json({
      success: true,
      message: "Successfully saved to Google Sheets!",
      data: result,
    })
  } catch (error) {
    console.error("[v0] Error in submit-quiz route:", error)

    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred"

    return NextResponse.json(
      {
        success: false,
        message: `Failed to submit quiz: ${errorMessage}`,
      },
      { status: 500 },
    )
  }
}

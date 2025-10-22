export async function submitQuizToSheet(data) {
  try {
   
    console.log(data);

    const response = await fetch("/api/submit-quiz", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })

  

    if (!response.ok) {
      const errorText = await response.text()
      

      try {
        const errorJson = JSON.parse(errorText)
        throw new Error(errorJson.message || "Failed to submit quiz")
      } catch (e) {
        throw new Error(`API Error ${response.status}: ${errorText.substring(0, 100)}`)
      }
    }

    const result = await response.json()
    console.log("[v0] Successfully submitted to Google Sheets:", result)

    return {
      success: true,
      message: result.message || "Successfully saved to Google Sheets!",
    }
  } catch (error) {
    console.error("[v0] Error submitting quiz:", error)
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unknown error occurred",
    }
  }
}

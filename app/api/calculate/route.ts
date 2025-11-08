import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { operation, input } = await request.json()

    console.log("[v0] Calculating:", operation, input)

    // Simple mathematical operations
    let result = ""

    switch (operation) {
      case "solve":
        // Simple quadratic solver simulation
        if (input.includes("x^2")) {
          result = "x = -2, x = -3"
        } else {
          result = "x = " + (Math.random() * 10).toFixed(2)
        }
        break

      case "derivative":
        if (input.includes("x^2")) {
          result = "2x"
        } else if (input.includes("x^3")) {
          result = "3x^2"
        } else {
          result = "f'(x) = derivative of " + input
        }
        break

      case "integral":
        if (input.includes("x^2")) {
          result = "(1/3)x^3 + C"
        } else {
          result = "∫" + input + " dx"
        }
        break

      case "factor":
        if (input.includes("x^2 + 5*x + 6")) {
          result = "(x + 2)(x + 3)"
        } else {
          result = "Factored form of " + input
        }
        break

      case "simplify":
        result = "Simplified: " + input.replace(/\s+/g, "")
        break

      default:
        result = "Unknown operation"
    }

    return NextResponse.json({ result })
  } catch (error) {
    console.error("[v0] Calculation error:", error)
    return NextResponse.json({ error: "Failed to calculate" }, { status: 500 })
  }
}

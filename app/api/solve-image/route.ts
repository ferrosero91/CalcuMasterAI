import { type NextRequest, NextResponse } from "next/server"

export const runtime = "nodejs"
export const maxDuration = 60

interface SolveImageResponse {
  extracted_text: string
  extracted_equation: string
  solution_steps: string[]
  final_answer: string
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "No image file provided" }, { status: 400 })
    }

    // Validate file size (2MB limit)
    if (image.size > 2 * 1024 * 1024) {
      return NextResponse.json({ error: "Image file too large. Maximum size: 2MB" }, { status: 400 })
    }

    // Validate file type
    if (!image.type.startsWith("image/")) {
      return NextResponse.json({ error: "Invalid file type. Please upload an image." }, { status: 400 })
    }

    // Get API key from environment
    const API_KEY = process.env.GROQ_API_KEY || process.env.OPENAI_API_KEY

    if (!API_KEY) {
      return NextResponse.json({ error: "API key not configured" }, { status: 500 })
    }

    // Convert image to base64
    const arrayBuffer = await image.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const base64Image = buffer.toString("base64")
    const dataUri = `data:${image.type};base64,${base64Image}`

    // Call Groq API exactly as in the Python example
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-scout-17b-16e-instruct",
        messages: [
          {
            role: "system",
            content: `Devuelve SOLO un JSON válido con los siguientes campos:
{
  "extracted_text": "texto tal cual extraído",
  "extracted_equation": "ecuación matemática exacta en LaTeX",
  "solution_steps": ["paso1", "paso2", ...],
  "final_answer": "resultado final"
}`,
          },
          {
            role: "user",
            content: [
              {
                type: "text",
                text: "Extrae el ejercicio de la imagen y resuélvelo paso a paso. Si es un problema de cálculo multivariable (derivadas parciales, integrales múltiples, gradiente), proporciona pasos detallados.",
              },
              {
                type: "image_url",
                image_url: { url: dataUri },
              },
            ],
          },
        ],
        temperature: 0,
        response_format: { type: "json_object" },
      }),
    })

    if (!response.ok) {
      const error = await response.text()
      console.error("Groq API error:", error)
      return NextResponse.json({ error: "Failed to process image with AI model" }, { status: response.status })
    }

    const data = await response.json()
    const content = data.choices[0].message.content

    // Parse the JSON response
    try {
      const parsed: SolveImageResponse = JSON.parse(content)
      return NextResponse.json({
        success: true,
        data: parsed,
      })
    } catch (e) {
      console.error("Failed to parse model response:", e)
      return NextResponse.json(
        {
          error: "Failed to parse model response",
          raw_response: content,
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error processing image:", error)
    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Unknown error occurred",
        type: error instanceof Error ? error.constructor.name : "Unknown",
      },
      { status: 500 },
    )
  }
}

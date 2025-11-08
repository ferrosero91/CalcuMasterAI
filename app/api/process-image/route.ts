import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const image = formData.get("image") as File

    if (!image) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 })
    }

    const bytes = await image.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const base64Image = buffer.toString("base64")
    const mimeType = image.type || "image/jpeg"
    const dataUri = `data:${mimeType};base64,${base64Image}`
    // </CHANGE>

    const response = await groq.chat.completions.create({
      model: "meta-llama/llama-4-scout-17b-16e-instruct",
      messages: [
        {
          role: "system",
          content:
            "Devuelve SOLO un JSON válido con los siguientes campos:\n" +
            "{\n" +
            '  "extracted_text": "texto tal cual extraído",\n' +
            '  "extracted_equation": "ecuación matemática exacta",\n' +
            '  "solution_steps": ["paso1", "paso2", ...],\n' +
            '  "final_answer": "resultado final"\n' +
            "}",
        },
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Extrae el ejercicio de la imagen y resuélvelo paso a paso.",
            },
            {
              type: "image_url",
              image_url: {
                url: dataUri,
              },
            },
          ],
        },
      ],
      temperature: 0,
      response_format: { type: "json_object" },
    })
    // </CHANGE>

    const content = response.choices[0]?.message?.content

    if (!content) {
      throw new Error("No response from model")
    }

    console.log("[v0] JSON from model:", content)

    const parsed = JSON.parse(content)

    const solution = {
      extractedText: parsed.extracted_text || "",
      problem: parsed.extracted_equation || parsed.extracted_text || "",
      steps: Array.isArray(parsed.solution_steps)
        ? parsed.solution_steps.map((step: string, index: number) => ({
            step: index + 1,
            description: `Paso ${index + 1}`,
            equation: step.includes("=") ? step : "",
            explanation: step,
          }))
        : [],
      finalAnswer: parsed.final_answer || "",
    }
    // </CHANGE>

    return NextResponse.json({ solution })
  } catch (error) {
    console.error("[v0] Image processing error:", error)
    return NextResponse.json(
      { error: "Failed to process image", details: error instanceof Error ? error.message : String(error) },
      { status: 500 },
    )
  }
}

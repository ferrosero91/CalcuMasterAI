import { type NextRequest, NextResponse } from "next/server"
import Groq from "groq-sdk"

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { problem, type } = await request.json()

    if (!problem) {
      return NextResponse.json({ error: "No problem provided" }, { status: 400 })
    }

    const systemPrompt = `Eres un experto en cálculo multivariable. Resuelve el siguiente problema paso a paso de manera clara y detallada.

Tipo de problema: ${type}
Problema: ${problem}

Debes responder en formato JSON con esta estructura exacta:
{
  "problem": "descripción del problema",
  "domain": "dominio de la función (si aplica)",
  "range": "rango de la función (si aplica)",
  "steps": [
    {
      "step": 1,
      "description": "Título del paso",
      "equation": "ecuación o expresión matemática",
      "explanation": "explicación detallada de este paso"
    }
  ],
  "finalAnswer": "respuesta final completa"
}

Asegúrate de:
1. Incluir al menos 3-5 pasos detallados
2. Usar notación matemática clara (∂, ∫, ∇, etc.)
3. Explicar cada paso de forma pedagógica
4. Incluir dominio y rango cuando sea relevante
5. Dar la respuesta final de forma clara y completa`

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: problem,
        },
      ],
      model: "llama-3.3-70b-versatile",
      temperature: 0.3,
      max_tokens: 2000,
      response_format: { type: "json_object" },
    })

    const content = completion.choices[0]?.message?.content

    if (!content) {
      throw new Error("No response from AI")
    }

    const solution = JSON.parse(content)

    return NextResponse.json({ solution })
  } catch (error) {
    console.error("[v0] Math solving error:", error)
    return NextResponse.json({ error: "Failed to solve problem" }, { status: 500 })
  }
}

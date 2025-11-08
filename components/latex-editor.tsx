"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function LatexEditor() {
  const [latex, setLatex] = useState("x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}")

  const examples = [
    { name: "Quadratic Formula", value: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}" },
    { name: "Einstein Equation", value: "E = mc^2" },
    { name: "Pythagorean Theorem", value: "a^2 + b^2 = c^2" },
    { name: "Euler Identity", value: "e^{i\\pi} + 1 = 0" },
    { name: "Integration", value: "\\int_{a}^{b} f(x) dx = F(b) - F(a)" },
    { name: "Matrix", value: "\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}" },
  ]

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label>LaTeX Input</Label>
          <Textarea
            value={latex}
            onChange={(e) => setLatex(e.target.value)}
            placeholder="Enter LaTeX expression..."
            rows={4}
            className="font-mono"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          {examples.map((ex) => (
            <Button key={ex.name} variant="outline" size="sm" onClick={() => setLatex(ex.value)}>
              {ex.name}
            </Button>
          ))}
        </div>
      </div>

      <Card className="p-8 bg-muted/50 text-center">
        <h3 className="font-semibold mb-4">Rendered Output</h3>
        <div className="text-4xl">$${latex}$$</div>
      </Card>

      <Card className="p-4 bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
        <p className="text-sm text-amber-800 dark:text-amber-200">
          <strong>Tip:</strong> LaTeX formulas are rendered using double dollar signs ($$). Try different mathematical
          expressions and see them render in real-time!
        </p>
      </Card>
    </div>
  )
}

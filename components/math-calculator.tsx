"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function MathCalculator() {
  const [operation, setOperation] = useState<string>("solve")
  const [input, setInput] = useState("")
  const [result, setResult] = useState<string | null>(null)

  const handleCalculate = async () => {
    try {
      const response = await fetch("/api/calculate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ operation, input }),
      })

      const data = await response.json()
      setResult(data.result)
    } catch (error) {
      setResult("Error calculating")
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4">
        <div>
          <Label>Operation</Label>
          <Select value={operation} onValueChange={setOperation}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="solve">Solve Equation</SelectItem>
              <SelectItem value="derivative">Derivative</SelectItem>
              <SelectItem value="integral">Integral</SelectItem>
              <SelectItem value="factor">Factor</SelectItem>
              <SelectItem value="simplify">Simplify</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Expression</Label>
          <Input placeholder="e.g., x^2 + 5*x + 6 = 0" value={input} onChange={(e) => setInput(e.target.value)} />
        </div>

        <Button onClick={handleCalculate}>Calculate</Button>
      </div>

      {result && (
        <Card className="p-6 bg-muted/50">
          <h3 className="font-semibold mb-2">Result</h3>
          <div className="text-2xl font-mono">{result}</div>
        </Card>
      )}

      <Card className="p-4 bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <p className="text-sm text-blue-800 dark:text-blue-200">
          <strong>Examples:</strong> x^2 + 5*x + 6 = 0 | 2*x^3 + x^2 | sin(x) + cos(x)
        </p>
      </Card>
    </div>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Sparkles, Copy, Check, ChevronRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SolutionStep {
  step: number
  description: string
  equation: string
  explanation: string
}

interface SolutionResult {
  problem: string
  steps: SolutionStep[]
  finalAnswer: string
  domain?: string
  range?: string
  visualization?: string
}

interface MathSolverProps {
  initialQuery?: string
}

export default function MathSolver({ initialQuery = "" }: MathSolverProps) {
  const [problemType, setProblemType] = useState("partial-derivatives")
  const [input, setInput] = useState(initialQuery)
  const [loading, setLoading] = useState(false)
  const [solution, setSolution] = useState<SolutionResult | null>(null)
  const [copied, setCopied] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    if (initialQuery && initialQuery !== input) {
      setInput(initialQuery)
    }
  }, [initialQuery])

  const handleSolve = async () => {
    if (!input.trim()) {
      toast({
        title: "Error",
        description: "Por favor ingresa un problema matemático",
        variant: "destructive",
      })
      return
    }

    setLoading(true)
    setSolution(null)

    try {
      const response = await fetch("/api/solve-math", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          problem: input,
          type: problemType,
        }),
      })

      if (!response.ok) {
        throw new Error("Error al resolver el problema")
      }

      const data = await response.json()
      setSolution(data.solution)

      toast({
        title: "¡Solución completa!",
        description: "El problema ha sido resuelto exitosamente",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo resolver el problema. Intenta nuevamente.",
        variant: "destructive",
      })
      console.error("[v0] Error solving math:", error)
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = () => {
    if (solution) {
      const text = `${solution.problem}\n\n${solution.steps.map((s) => `Paso ${s.step}: ${s.description}\n${s.equation}\n${s.explanation}`).join("\n\n")}\n\nRespuesta Final: ${solution.finalAnswer}`
      navigator.clipboard.writeText(text)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
      toast({
        title: "Copiado",
        description: "Solución copiada al portapapeles",
      })
    }
  }

  const examples = {
    "partial-derivatives": "f(x,y) = x^2 + 3xy + y^2, encontrar ∂f/∂x y ∂f/∂y",
    "multiple-integrals": "∫∫(x^2 + y^2)dA sobre R = [0,1] x [0,1]",
    gradient: "f(x,y) = x^2y + xy^2 en el punto (1,2)",
    lagrange: "Maximizar f(x,y) = xy sujeto a x + y = 10",
    "domain-range": "f(x,y) = √(9 - x^2 - y^2)",
    limits: "lim (x,y)→(0,0) (x^2y)/(x^2 + y^2)",
  }

  return (
    <div className="space-y-6">
      <Card className="p-8 shadow-lg border-2 border-border/50">
        <div className="space-y-6">
          <div>
            <Label htmlFor="problem-type" className="text-lg font-semibold mb-3 block">
              Tipo de Problema
            </Label>
            <Select value={problemType} onValueChange={setProblemType}>
              <SelectTrigger id="problem-type" className="h-12 text-base">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="partial-derivatives">Derivadas Parciales</SelectItem>
                <SelectItem value="multiple-integrals">Integrales Múltiples</SelectItem>
                <SelectItem value="gradient">Gradiente y Direccionales</SelectItem>
                <SelectItem value="lagrange">Multiplicadores de Lagrange</SelectItem>
                <SelectItem value="domain-range">Dominio y Rango</SelectItem>
                <SelectItem value="limits">Límites Multivariables</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="math-input" className="text-lg font-semibold mb-3 block">
              Escribe tu problema
            </Label>
            <Textarea
              id="math-input"
              placeholder={`Ejemplo: ${examples[problemType as keyof typeof examples]}`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="min-h-[140px] text-base font-mono resize-none text-foreground placeholder:text-muted-foreground"
            />
          </div>

          <Button onClick={handleSolve} disabled={loading} className="w-full h-14 text-lg" size="lg">
            {loading ? (
              <>
                <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                Resolviendo con IA...
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-6 w-6" />
                Resolver con IA
              </>
            )}
          </Button>
        </div>
      </Card>

      {solution && (
        <Card className="p-8 shadow-lg border-2 border-primary/20">
          <div className="flex items-start justify-between mb-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-foreground mb-2">Solución Paso a Paso</h3>
              <p className="text-base text-muted-foreground">{solution.problem}</p>
            </div>
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="ml-4 bg-transparent">
              {copied ? <Check className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copiado" : "Copiar"}
            </Button>
          </div>

          {solution.domain && (
            <div className="mb-6 p-5 bg-chart-2/10 rounded-xl border-l-4 border-chart-2">
              <p className="text-base font-semibold text-foreground">📐 Dominio: {solution.domain}</p>
              {solution.range && (
                <p className="text-base font-semibold text-foreground mt-2">📊 Rango: {solution.range}</p>
              )}
            </div>
          )}

          <div className="space-y-5">
            {solution.steps.map((step, index) => (
              <div key={step.step} className="group relative">
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-chart-3 rounded-full" />
                <div className="ml-6 p-6 bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl border border-border hover:border-primary/50 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-primary to-chart-3 text-primary-foreground flex items-center justify-center font-bold text-base shadow-lg">
                      {step.step}
                    </div>
                    <div className="flex-1 space-y-3">
                      <h4 className="text-lg font-semibold text-foreground flex items-center gap-2">
                        <ChevronRight className="h-5 w-5 text-primary" />
                        {step.description}
                      </h4>
                      <div className="p-4 bg-background/80 rounded-lg border border-border/50 font-mono text-base overflow-x-auto shadow-inner">
                        {step.equation}
                      </div>
                      <p className="text-base text-muted-foreground leading-relaxed pl-7">{step.explanation}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-8 bg-gradient-to-br from-primary/10 via-chart-3/10 to-chart-2/10 rounded-2xl border-2 border-primary/30 shadow-xl">
            <h4 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-primary" />
              Respuesta Final
            </h4>
            <div className="p-5 bg-background/90 rounded-xl border-2 border-primary/20 shadow-inner">
              <p className="font-mono text-xl text-foreground font-semibold">{solution.finalAnswer}</p>
            </div>
          </div>
        </Card>
      )}

      <Card className="p-6 bg-gradient-to-br from-chart-2/10 to-chart-3/10 border-chart-2/30">
        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-chart-2" />
          Ejemplos de problemas
        </h4>
        <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed">
          <li className="flex items-start gap-2">
            <span className="text-chart-2 font-bold">•</span>
            <span>Derivadas parciales: f(x,y) = x²y³, encontrar ∂f/∂x</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-chart-2 font-bold">•</span>
            <span>Integral doble: ∫∫(xy)dA sobre [0,2]×[0,3]</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-chart-2 font-bold">•</span>
            <span>Gradiente: ∇f para f(x,y) = x²+y² en (1,1)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-chart-2 font-bold">•</span>
            <span>Lagrange: Optimizar xy con x²+y²=1</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}

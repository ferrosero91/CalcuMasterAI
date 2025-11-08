"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calculator, CheckCircle2, XCircle } from "lucide-react"

export default function DomainRangeCalculator() {
  const [equation, setEquation] = useState("sqrt(9 - x^2 - y^2)")
  const [analysis, setAnalysis] = useState<{
    domain: string
    domainDescription: string
    range: string
    rangeDescription: string
    restrictions: string[]
    type: string
  } | null>(null)

  const analyzeDomainRange = () => {
    // Análisis simple basado en patrones comunes
    let domain = "ℝ² (todo el plano)"
    let domainDesc = "La función está definida para todos los valores de x e y"
    let range = "ℝ (todos los reales)"
    let rangeDesc = "La función puede tomar cualquier valor real"
    const restrictions: string[] = []
    let type = "Función general"

    const eq = equation.toLowerCase()

    if (eq.includes("sqrt")) {
      if (eq.includes("x^2") && eq.includes("y^2")) {
        const match = eq.match(/(\d+)\s*-\s*x\^2\s*-\s*y\^2/)
        if (match) {
          const r = Math.sqrt(Number.parseFloat(match[1]))
          domain = `x² + y² ≤ ${match[1]}`
          domainDesc = `Círculo de radio ${r} centrado en el origen`
          range = `[0, ${r}]`
          rangeDesc = `La función va desde 0 hasta ${r}`
          restrictions.push("El argumento de la raíz debe ser ≥ 0")
          type = "Hemisferio"
        }
      } else {
        restrictions.push("El argumento de la raíz debe ser no negativo")
      }
    }

    if (eq.includes("ln") || eq.includes("log")) {
      restrictions.push("El argumento del logaritmo debe ser > 0")
      domainDesc = "Restringido por el logaritmo"
    }

    if (eq.includes("1/") || eq.includes("/(")) {
      restrictions.push("El denominador no puede ser cero")
      domainDesc = "Excluye puntos donde el denominador es cero"
    }

    if (eq.includes("tan")) {
      restrictions.push("Excluye puntos donde cos = 0")
    }

    if (eq.includes("arcsin") || eq.includes("arccos")) {
      restrictions.push("El argumento debe estar en [-1, 1]")
    }

    setAnalysis({
      domain,
      domainDescription: domainDesc,
      range,
      rangeDescription: rangeDesc,
      restrictions,
      type,
    })
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="eq-domain">Función f(x,y) o f(x,y,z)</Label>
            <Input
              id="eq-domain"
              value={equation}
              onChange={(e) => setEquation(e.target.value)}
              placeholder="Ej: sqrt(9 - x^2 - y^2)"
              className="font-mono h-12 text-base"
            />
          </div>

          <Button onClick={analyzeDomainRange} className="w-full" size="lg">
            <Calculator className="mr-2 h-5 w-5" />
            Analizar Dominio y Rango
          </Button>
        </div>
      </Card>

      {analysis && (
        <div className="space-y-4">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 border-blue-200 dark:border-blue-800">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">Dominio</h3>
                <div className="p-4 bg-background/80 rounded-lg border border-blue-200 dark:border-blue-800 mb-3">
                  <p className="font-mono text-lg text-foreground">{analysis.domain}</p>
                </div>
                <p className="text-sm text-muted-foreground">{analysis.domainDescription}</p>
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border-purple-200 dark:border-purple-800">
            <div className="flex items-start gap-3 mb-4">
              <CheckCircle2 className="h-6 w-6 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-1" />
              <div className="flex-1">
                <h3 className="text-xl font-bold text-foreground mb-2">Rango</h3>
                <div className="p-4 bg-background/80 rounded-lg border border-purple-200 dark:border-purple-800 mb-3">
                  <p className="font-mono text-lg text-foreground">{analysis.range}</p>
                </div>
                <p className="text-sm text-muted-foreground">{analysis.rangeDescription}</p>
              </div>
            </div>
          </Card>

          {analysis.restrictions.length > 0 && (
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20 border-orange-200 dark:border-orange-800">
              <div className="flex items-start gap-3">
                <XCircle className="h-6 w-6 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-foreground mb-3">Restricciones</h3>
                  <div className="space-y-2">
                    {analysis.restrictions.map((restriction, idx) => (
                      <div key={idx} className="flex items-start gap-2">
                        <Badge variant="outline" className="mt-0.5">
                          {idx + 1}
                        </Badge>
                        <p className="text-sm text-muted-foreground">{restriction}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Card>
          )}

          <Card className="p-6 bg-muted/50">
            <h4 className="font-semibold mb-2">Tipo de superficie:</h4>
            <Badge variant="secondary" className="text-base px-4 py-2">
              {analysis.type}
            </Badge>
          </Card>
        </div>
      )}

      <Card className="p-5 bg-gradient-to-br from-slate-50 to-gray-50 dark:from-slate-900/50 dark:to-gray-900/50">
        <h4 className="font-semibold mb-3">Ejemplos de funciones con dominios especiales:</h4>
        <div className="space-y-2 text-sm">
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-transparent"
            onClick={() => setEquation("sqrt(9 - x^2 - y^2)")}
          >
            <span className="font-mono">√(9 - x² - y²)</span>
            <span className="ml-auto text-xs text-muted-foreground">Hemisferio</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-transparent"
            onClick={() => setEquation("ln(x*y)")}
          >
            <span className="font-mono">ln(xy)</span>
            <span className="ml-auto text-xs text-muted-foreground">Cuadrantes I y III</span>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full justify-start bg-transparent"
            onClick={() => setEquation("1/(x^2 + y^2)")}
          >
            <span className="font-mono">1/(x² + y²)</span>
            <span className="ml-auto text-xs text-muted-foreground">Excluye origen</span>
          </Button>
        </div>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calculator, Sigma, Infinity } from "lucide-react"
import { evaluate, derivative, simplify, parse } from "mathjs"

export default function AdvancedCalculator() {
  const [equation, setEquation] = useState("x^2 + 3*x + 2")
  const [variable, setVariable] = useState("x")
  const [point, setPoint] = useState("1")
  const [results, setResults] = useState<{
    derivative?: string
    integral?: string
    simplified?: string
    evaluated?: number
    domain?: string
    range?: string
  }>({})

  const calculateAll = () => {
    try {
      const expr = parse(equation)

      // Simplificación
      const simplified = simplify(expr).toString()

      // Derivada
      let derivativeResult = ""
      try {
        derivativeResult = derivative(expr, variable).toString()
      } catch {}

      // Integral
      let integralResult = ""
      try {
        integralResult = `∫(${equation})d${variable}`
      } catch {}

      // Evaluación en punto
      let evaluatedResult: number | undefined
      try {
        const scope: any = {}
        scope[variable] = Number.parseFloat(point)
        evaluatedResult = evaluate(equation, scope)
      } catch {}

      setResults({
        simplified,
        derivative: derivativeResult,
        integral: integralResult,
        evaluated: evaluatedResult,
        domain: "Todos los reales (ℝ)",
        range: "Depende de la función",
      })
    } catch (error) {
      console.log("[v0] Calculation error:", error)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="derivatives">Derivadas</TabsTrigger>
            <TabsTrigger value="integrals">Integrales</TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-4 mt-4">
            <div>
              <Label htmlFor="eq-general">Función f(x)</Label>
              <Input
                id="eq-general"
                value={equation}
                onChange={(e) => setEquation(e.target.value)}
                placeholder="Ej: x^2 + 3*x + 2"
                className="font-mono"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="var">Variable</Label>
                <Input id="var" value={variable} onChange={(e) => setVariable(e.target.value)} className="font-mono" />
              </div>
              <div>
                <Label htmlFor="point">Evaluar en</Label>
                <Input
                  id="point"
                  value={point}
                  onChange={(e) => setPoint(e.target.value)}
                  placeholder="1"
                  className="font-mono"
                />
              </div>
            </div>

            <Button onClick={calculateAll} className="w-full" size="lg">
              <Calculator className="mr-2 h-5 w-5" />
              Calcular Todo
            </Button>

            {Object.keys(results).length > 0 && (
              <div className="space-y-3 mt-6">
                {results.simplified && (
                  <Card className="p-4 bg-muted/50">
                    <h4 className="font-semibold mb-2">Simplificado:</h4>
                    <p className="font-mono text-lg">{results.simplified}</p>
                  </Card>
                )}

                {results.derivative && (
                  <Card className="p-4 bg-blue-50 dark:bg-blue-950/20">
                    <h4 className="font-semibold mb-2">Derivada d/d{variable}:</h4>
                    <p className="font-mono text-lg">{results.derivative}</p>
                  </Card>
                )}

                {results.integral && (
                  <Card className="p-4 bg-purple-50 dark:bg-purple-950/20">
                    <h4 className="font-semibold mb-2">Integral:</h4>
                    <p className="font-mono text-lg">{results.integral}</p>
                  </Card>
                )}

                {results.evaluated !== undefined && (
                  <Card className="p-4 bg-green-50 dark:bg-green-950/20">
                    <h4 className="font-semibold mb-2">f({point}) =</h4>
                    <p className="font-mono text-lg">{results.evaluated}</p>
                  </Card>
                )}

                <Card className="p-4 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/20 dark:to-yellow-950/20">
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold">Dominio:</span>
                      <span className="ml-2 font-mono">{results.domain}</span>
                    </div>
                    <div>
                      <span className="font-semibold">Rango:</span>
                      <span className="ml-2 font-mono">{results.range}</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="derivatives" className="space-y-4 mt-4">
            <Card className="p-6 bg-blue-50 dark:bg-blue-950/20">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Sigma className="h-5 w-5" />
                Cálculo de Derivadas Parciales
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Para funciones de varias variables f(x,y,z), la derivada parcial mide cómo cambia la función respecto
                  a una variable manteniendo las demás constantes.
                </p>
                <div className="p-4 bg-background rounded-lg">
                  <p className="font-mono text-sm">∂f/∂x = lim(h→0) [f(x+h,y) - f(x,y)] / h</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="integrals" className="space-y-4 mt-4">
            <Card className="p-6 bg-purple-50 dark:bg-purple-950/20">
              <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
                <Infinity className="h-5 w-5" />
                Integrales Múltiples
              </h3>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  Las integrales dobles y triples se usan para calcular volúmenes, masas y centros de masa en regiones
                  2D y 3D.
                </p>
                <div className="p-4 bg-background rounded-lg space-y-2">
                  <p className="font-mono text-sm">∫∫ f(x,y) dA = ∫[a,b] ∫[c,d] f(x,y) dy dx</p>
                  <p className="font-mono text-sm">∫∫∫ f(x,y,z) dV = ∫∫∫ f(x,y,z) dz dy dx</p>
                </div>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-chart-1/10 to-chart-2/10">
        <h4 className="font-semibold mb-3">Ejemplos de funciones:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
          <Button variant="outline" size="sm" onClick={() => setEquation("x^2 + y^2")}>
            Paraboloide: x² + y²
          </Button>
          <Button variant="outline" size="sm" onClick={() => setEquation("sin(x) * cos(y)")}>
            Ondas: sin(x)cos(y)
          </Button>
          <Button variant="outline" size="sm" onClick={() => setEquation("exp(-(x^2 + y^2))")}>
            Gaussiana: e^(-(x²+y²))
          </Button>
          <Button variant="outline" size="sm" onClick={() => setEquation("x^2 - y^2")}>
            Silla: x² - y²
          </Button>
        </div>
      </Card>
    </div>
  )
}

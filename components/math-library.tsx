"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { BookOpen, Calculator, Sparkles } from "lucide-react"

const topics = [
  {
    category: "Derivadas Parciales",
    icon: "∂",
    items: [
      "Definición de derivadas parciales",
      "Regla de la cadena multivariable",
      "Derivadas de orden superior",
      "Plano tangente y aproximación lineal",
    ],
  },
  {
    category: "Integrales Múltiples",
    icon: "∫∫",
    items: [
      "Integrales dobles sobre rectángulos",
      "Integrales sobre regiones generales",
      "Cambio de orden de integración",
      "Coordenadas polares, cilíndricas y esféricas",
    ],
  },
  {
    category: "Campos Vectoriales",
    icon: "∇",
    items: [
      "Gradiente y derivadas direccionales",
      "Divergencia y rotacional",
      "Campos conservativos",
      "Teoremas de Green, Stokes y Gauss",
    ],
  },
  {
    category: "Optimización",
    icon: "⚡",
    items: [
      "Puntos críticos y clasificación",
      "Criterio de la segunda derivada",
      "Multiplicadores de Lagrange",
      "Optimización con restricciones",
    ],
  },
]

export default function MathLibrary() {
  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-primary/10 to-chart-3/10 border-primary/20">
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0">
            <BookOpen className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">Biblioteca de Cálculo Multivariable</h2>
            <p className="text-muted-foreground leading-relaxed">
              Explora conceptos, fórmulas y técnicas de cálculo de varias variables. Cada tema incluye teoría, ejemplos
              y ejercicios resueltos con IA.
            </p>
          </div>
        </div>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        {topics.map((topic) => (
          <Card key={topic.category} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-3 mb-4">
              <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-2xl font-bold flex-shrink-0">
                {topic.icon}
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground">{topic.category}</h3>
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              {topic.items.map((item, index) => (
                <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                  <span className="text-primary mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <Button variant="outline" className="w-full bg-transparent">
              <Calculator className="mr-2 h-4 w-4" />
              Ver Ejemplos
            </Button>
          </Card>
        ))}
      </div>

      <Card className="p-6 border-primary/20 bg-primary/5">
        <div className="flex items-start gap-4">
          <Sparkles className="h-6 w-6 text-primary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-bold text-foreground mb-2">Aprende con IA</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Nuestra IA puede resolver cualquier problema de cálculo multivariable paso a paso. Simplemente escribe tu
              problema o sube una foto, y obtén una explicación detallada con visualizaciones interactivas.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

"use client"

import { useState } from "react"
import { Calculator, ImageIcon, Sparkles, BookOpen, Search, Box, Sigma, FunctionSquare } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MathSolver from "@/components/math-solver"
import ImageUpload from "@/components/image-upload"
import Visualization3D from "@/components/visualization-3d"
import MathLibrary from "@/components/math-library"
import AdvancedCalculator from "@/components/advanced-calculator"
import DomainRangeCalculator from "@/components/domain-range-calculator"
import CalculusTools from "@/components/calculus-tools"

export default function Home() {
  const [activeSection, setActiveSection] = useState<
    "solver" | "image" | "3d" | "library" | "advanced" | "domain" | "calculus"
  >("solver")
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-chart-3/5">
      <header className="sticky top-0 z-50 bg-primary/95 backdrop-blur-sm border-b border-primary-foreground/10 shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-primary-foreground/10 backdrop-blur-sm flex items-center justify-center border border-primary-foreground/20">
                <Sparkles className="h-7 w-7 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-primary-foreground text-balance">CalcuMaster AI</h1>
                <p className="text-xs text-primary-foreground/80">Calculadora Multivariable Profesional</p>
              </div>
            </div>

            <nav className="hidden lg:flex items-center gap-2">
              <Button
                variant={activeSection === "solver" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveSection("solver")}
                className={
                  activeSection === "solver"
                    ? "bg-primary-foreground/90 text-primary hover:bg-primary-foreground"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }
              >
                <Calculator className="h-4 w-4 mr-2" />
                Resolver IA
              </Button>
              <Button
                variant={activeSection === "image" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveSection("image")}
                className={
                  activeSection === "image"
                    ? "bg-primary-foreground/90 text-primary hover:bg-primary-foreground"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }
              >
                <ImageIcon className="h-4 w-4 mr-2" />
                Escanear
              </Button>
              <Button
                variant={activeSection === "3d" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveSection("3d")}
                className={
                  activeSection === "3d"
                    ? "bg-primary-foreground/90 text-primary hover:bg-primary-foreground"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }
              >
                <Box className="h-4 w-4 mr-2" />
                Gráficos 3D
              </Button>
              <Button
                variant={activeSection === "advanced" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveSection("advanced")}
                className={
                  activeSection === "advanced"
                    ? "bg-primary-foreground/90 text-primary hover:bg-primary-foreground"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }
              >
                <Sigma className="h-4 w-4 mr-2" />
                Calculadora
              </Button>
              <Button
                variant={activeSection === "domain" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveSection("domain")}
                className={
                  activeSection === "domain"
                    ? "bg-primary-foreground/90 text-primary hover:bg-primary-foreground"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Dominio/Rango
              </Button>
              <Button
                variant={activeSection === "calculus" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveSection("calculus")}
                className={
                  activeSection === "calculus"
                    ? "bg-primary-foreground/90 text-primary hover:bg-primary-foreground"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }
              >
                <FunctionSquare className="h-4 w-4 mr-2" />
                Herramientas
              </Button>
              <Button
                variant={activeSection === "library" ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setActiveSection("library")}
                className={
                  activeSection === "library"
                    ? "bg-primary-foreground/90 text-primary hover:bg-primary-foreground"
                    : "text-primary-foreground hover:bg-primary-foreground/10"
                }
              >
                <BookOpen className="h-4 w-4 mr-2" />
                Biblioteca
              </Button>
            </nav>
          </div>
        </div>
      </header>

      <section className="bg-gradient-to-br from-primary via-primary/95 to-chart-3 text-primary-foreground py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Resuelve cualquier problema matemático</h2>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 text-pretty">
            Con IA avanzada y visualización 3D profesional
          </p>

          <div className="relative max-w-2xl mx-auto">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Ingrese un problema matemático..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-14 text-lg bg-background/95 backdrop-blur-sm border-2 border-transparent focus:border-primary-foreground/20 shadow-xl"
                />
              </div>
              <Button
                size="lg"
                className="h-14 px-8 bg-chart-3 hover:bg-chart-3/90 text-primary-foreground shadow-xl"
                onClick={() => setActiveSection("solver")}
              >
                <Sparkles className="h-5 w-5 mr-2" />
                Resolver
              </Button>
            </div>

            <div className="mt-6 flex flex-wrap gap-2 justify-center">
              {["Derivadas", "Integrales", "Límites", "Matrices", "Ecuaciones"].map((topic) => (
                <Button
                  key={topic}
                  variant="outline"
                  size="sm"
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/20 backdrop-blur-sm"
                >
                  {topic}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {activeSection === "solver" && <MathSolver initialQuery={searchQuery} />}
          {activeSection === "image" && <ImageUpload />}
          {activeSection === "3d" && <Visualization3D />}
          {activeSection === "advanced" && <AdvancedCalculator />}
          {activeSection === "domain" && <DomainRangeCalculator />}
          {activeSection === "calculus" && <CalculusTools />}
          {activeSection === "library" && <MathLibrary />}
        </div>
      </main>

      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-sm border-t border-border shadow-2xl z-50">
        <div className="flex items-center justify-around p-2">
          <Button
            variant={activeSection === "solver" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveSection("solver")}
            className="flex-col h-auto py-2"
          >
            <Calculator className="h-5 w-5 mb-1" />
            <span className="text-xs">IA</span>
          </Button>
          <Button
            variant={activeSection === "image" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveSection("image")}
            className="flex-col h-auto py-2"
          >
            <ImageIcon className="h-5 w-5 mb-1" />
            <span className="text-xs">Foto</span>
          </Button>
          <Button
            variant={activeSection === "3d" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveSection("3d")}
            className="flex-col h-auto py-2"
          >
            <Box className="h-5 w-5 mb-1" />
            <span className="text-xs">3D</span>
          </Button>
          <Button
            variant={activeSection === "calculus" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveSection("calculus")}
            className="flex-col h-auto py-2"
          >
            <FunctionSquare className="h-5 w-5 mb-1" />
            <span className="text-xs">Calc</span>
          </Button>
          <Button
            variant={activeSection === "advanced" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveSection("advanced")}
            className="flex-col h-auto py-2"
          >
            <Sigma className="h-5 w-5 mb-1" />
            <span className="text-xs">Más</span>
          </Button>
          <Button
            variant={activeSection === "library" ? "default" : "ghost"}
            size="sm"
            onClick={() => setActiveSection("library")}
            className="flex-col h-auto py-2"
          >
            <BookOpen className="h-5 w-5 mb-1" />
            <span className="text-xs">Libro</span>
          </Button>
        </div>
      </nav>
    </div>
  )
}

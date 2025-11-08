"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Upload, X, Loader2, Sparkles, ImageIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface SolutionStep {
  step: number
  description: string
  equation: string
  explanation: string
}

interface ImageSolution {
  extractedText: string
  problem: string
  steps: SolutionStep[]
  finalAnswer: string
}

export default function ImageUpload() {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [solution, setSolution] = useState<ImageSolution | null>(null)
  const { toast } = useToast()

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      const droppedFile = e.dataTransfer.files[0]
      if (droppedFile && droppedFile.type.startsWith("image/")) {
        setFile(droppedFile)
        setPreview(URL.createObjectURL(droppedFile))
        setSolution(null)
      } else {
        toast({
          title: "Archivo inválido",
          description: "Por favor sube una imagen",
          variant: "destructive",
        })
      }
    },
    [toast],
  )

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      setPreview(URL.createObjectURL(selectedFile))
      setSolution(null)
    }
  }

  const handleProcess = async () => {
    if (!file) return

    setUploading(true)
    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch("/api/process-image", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) throw new Error("Error al procesar imagen")

      const data = await response.json()
      setSolution(data.solution)

      toast({
        title: "¡Imagen procesada!",
        description: "El problema ha sido extraído y resuelto",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo procesar la imagen",
        variant: "destructive",
      })
      console.error("[v0] Image processing error:", error)
    } finally {
      setUploading(false)
    }
  }

  const clearFile = () => {
    setFile(null)
    setPreview(null)
    setSolution(null)
  }

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary/50 hover:bg-accent/30 transition-all cursor-pointer"
        >
          {!preview ? (
            <div className="flex flex-col items-center gap-4">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                <ImageIcon className="h-10 w-10 text-primary" />
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">Sube una imagen de tu problema</p>
                <p className="text-sm text-muted-foreground mt-1">Arrastra y suelta, o haz clic para seleccionar</p>
              </div>
              <input type="file" accept="image/*" onChange={handleFileSelect} className="hidden" id="file-upload" />
              <Button asChild size="lg">
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="mr-2 h-5 w-5" />
                  Seleccionar Imagen
                </label>
              </Button>
              <p className="text-xs text-muted-foreground">PNG, JPG hasta 10MB</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative inline-block">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="max-h-80 rounded-lg mx-auto border-2 border-border"
                />
                <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={clearFile}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex gap-2 justify-center">
                <Button onClick={handleProcess} disabled={uploading} size="lg">
                  {uploading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Procesando con IA...
                    </>
                  ) : (
                    <>
                      <Sparkles className="mr-2 h-5 w-5" />
                      Resolver con IA
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>

      {solution && (
        <>
          <Card className="p-6 bg-accent/50">
            <h3 className="font-semibold text-foreground mb-3">📝 Texto Extraído</h3>
            <p className="text-sm text-muted-foreground font-mono p-3 bg-background rounded border border-border">
              {solution.extractedText}
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-bold text-foreground mb-4">Solución Paso a Paso</h3>
            <p className="text-sm text-muted-foreground mb-6">{solution.problem}</p>

            <div className="space-y-4">
              {solution.steps.map((step) => (
                <div key={step.step} className="math-step p-4 bg-muted/50 rounded-lg border border-border">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">
                      {step.step}
                    </div>
                    <div className="flex-1 space-y-2">
                      <h4 className="font-semibold text-foreground">{step.description}</h4>
                      <div className="p-3 bg-background rounded border border-border font-mono text-sm overflow-x-auto">
                        {step.equation}
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">{step.explanation}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-6 bg-gradient-to-br from-primary/10 to-chart-3/10 rounded-lg border-2 border-primary/20">
              <h4 className="text-lg font-bold text-foreground mb-2">Respuesta Final</h4>
              <div className="p-4 bg-background rounded-lg border border-border">
                <p className="font-mono text-lg text-foreground">{solution.finalAnswer}</p>
              </div>
            </div>
          </Card>
        </>
      )}

      <Card className="p-4 bg-accent/50 border-accent">
        <h4 className="font-semibold text-accent-foreground mb-2">📸 Consejos para mejores resultados</h4>
        <ul className="text-sm text-accent-foreground/80 space-y-1 leading-relaxed">
          <li>• Asegúrate de que el texto sea legible y esté bien iluminado</li>
          <li>• Evita sombras o reflejos en la imagen</li>
          <li>• Captura solo el problema matemático, sin texto adicional</li>
          <li>• La imagen debe estar enfocada y sin distorsiones</li>
        </ul>
      </Card>
    </div>
  )
}

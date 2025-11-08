"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Upload, X, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

interface ImageUploaderProps {
  onUploadSuccess: (result: {
    extracted_text: string
    extracted_equation: string
    solution_steps: string[]
    final_answer: string
  }) => void
}

export function ImageUploader({ onUploadSuccess }: ImageUploaderProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [preview, setPreview] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }, [])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }, [])

  const handleFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Por favor selecciona una imagen válida")
      return
    }

    // Validate file size (2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("La imagen es demasiado grande. Máximo 2MB")
      return
    }

    setError(null)

    // Create preview
    const reader = new FileReader()
    reader.onload = (e) => {
      setPreview(e.target?.result as string)
    }
    reader.readAsDataURL(file)

    // Upload to API
    setUploading(true)
    const formData = new FormData()
    formData.append("image", file)

    try {
      const response = await fetch("/api/solve-image", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Error al procesar la imagen")
      }

      if (result.success && result.data) {
        onUploadSuccess(result.data)
      } else {
        throw new Error("Respuesta inválida del servidor")
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error desconocido")
      console.error("Upload error:", err)
    } finally {
      setUploading(false)
    }
  }

  const clearPreview = () => {
    setPreview(null)
    setError(null)
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="text-lg font-semibold mb-2">Subir Imagen</h3>
          <p className="text-sm text-muted-foreground">Sube una foto o captura de tu ejercicio matemático</p>
        </div>

        {!preview ? (
          <div
            className={`relative border-2 border-dashed rounded-lg transition-colors ${
              dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <input
              type="file"
              id="file-upload"
              className="sr-only"
              accept="image/*"
              onChange={handleChange}
              disabled={uploading}
            />
            <label htmlFor="file-upload" className="flex flex-col items-center justify-center py-12 cursor-pointer">
              <Upload className="w-12 h-12 mb-4 text-muted-foreground" />
              <p className="text-sm font-medium mb-1">Arrastra y suelta o haz clic para seleccionar</p>
              <p className="text-xs text-muted-foreground">PNG, JPG, JPEG hasta 2MB</p>
            </label>
          </div>
        ) : (
          <div className="relative">
            <div className="relative rounded-lg overflow-hidden border border-border">
              <img
                src={preview || "/placeholder.svg"}
                alt="Preview"
                className="w-full h-auto max-h-64 object-contain bg-muted"
              />
              {!uploading && (
                <Button variant="destructive" size="icon" className="absolute top-2 right-2" onClick={clearPreview}>
                  <X className="w-4 h-4" />
                </Button>
              )}
            </div>
            {uploading && (
              <div className="absolute inset-0 bg-background/80 flex items-center justify-center rounded-lg">
                <div className="text-center">
                  <Loader2 className="w-8 h-8 animate-spin mx-auto mb-2" />
                  <p className="text-sm font-medium">Procesando imagen...</p>
                </div>
              </div>
            )}
          </div>
        )}

        {error && (
          <div className="p-3 rounded-lg bg-destructive/10 border border-destructive/20">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}
      </div>
    </Card>
  )
}

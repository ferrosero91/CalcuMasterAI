"use client"

import { Suspense, useState, useRef, useMemo } from "react"
import { Canvas } from "@react-three/fiber"
import { OrbitControls, PerspectiveCamera, Text, Environment } from "@react-three/drei"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Slider } from "@/components/ui/slider"
import { Play, Pause, RotateCcw, Grid3x3, Eye } from "lucide-react"
import * as THREE from "three"
import { evaluate, derivative, parse } from "mathjs"

function NumberedAxes({ range = 10, step = 1 }: { range?: number; step?: number }) {
  const points = []
  for (let i = -range; i <= range; i += step) {
    if (i !== 0) points.push(i)
  }

  return (
    <group>
      {/* X Axis - Red */}
      <arrowHelper args={[new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), range, 0xff0000, 0.5, 0.3]} />
      <arrowHelper args={[new THREE.Vector3(-1, 0, 0), new THREE.Vector3(0, 0, 0), range, 0xff0000, 0.5, 0.3]} />
      {points.map((x) => (
        <group key={`x-${x}`} position={[x, 0, 0]}>
          <Text fontSize={0.3} color="#ff0000" anchorY="top" position={[0, -0.3, 0]}>
            {x}
          </Text>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.05, 0.2, 0.05]} />
            <meshBasicMaterial color="#ff0000" />
          </mesh>
        </group>
      ))}
      <Text position={[range + 1, 0, 0]} fontSize={0.5} color="#ff0000" fontWeight="bold">
        X
      </Text>

      {/* Y Axis - Green */}
      <arrowHelper args={[new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), range, 0x00ff00, 0.5, 0.3]} />
      <arrowHelper args={[new THREE.Vector3(0, -1, 0), new THREE.Vector3(0, 0, 0), range, 0x00ff00, 0.5, 0.3]} />
      {points.map((y) => (
        <group key={`y-${y}`} position={[0, y, 0]}>
          <Text fontSize={0.3} color="#00ff00" anchorX="right" position={[-0.3, 0, 0]}>
            {y}
          </Text>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.2, 0.05, 0.05]} />
            <meshBasicMaterial color="#00ff00" />
          </mesh>
        </group>
      ))}
      <Text position={[0, range + 1, 0]} fontSize={0.5} color="#00ff00" fontWeight="bold">
        Y
      </Text>

      {/* Z Axis - Blue */}
      <arrowHelper args={[new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), range, 0x0000ff, 0.5, 0.3]} />
      <arrowHelper args={[new THREE.Vector3(0, 0, -1), new THREE.Vector3(0, 0, 0), range, 0x0000ff, 0.5, 0.3]} />
      {points.map((z) => (
        <group key={`z-${z}`} position={[0, 0, z]}>
          <Text fontSize={0.3} color="#0000ff" anchorX="right" position={[-0.3, 0, 0]}>
            {z}
          </Text>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.2, 0.05, 0.05]} />
            <meshBasicMaterial color="#0000ff" />
          </mesh>
        </group>
      ))}
      <Text position={[0, 0, range + 1]} fontSize={0.5} color="#0000ff" fontWeight="bold">
        Z
      </Text>
    </group>
  )
}
// </CHANGE>

function GridPlanes({ range = 10, opacity = 0.1 }: { range?: number; opacity?: number }) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[range * 2, range * 2, range * 2, range * 2]} />
        <meshBasicMaterial color="#94a3b8" wireframe opacity={opacity} transparent side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[0, Math.PI / 2, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[range * 2, range * 2, range * 2, range * 2]} />
        <meshBasicMaterial color="#cbd5e1" wireframe opacity={opacity * 0.5} transparent side={THREE.DoubleSide} />
      </mesh>
      <mesh rotation={[0, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[range * 2, range * 2, range * 2, range * 2]} />
        <meshBasicMaterial color="#e2e8f0" wireframe opacity={opacity * 0.5} transparent side={THREE.DoubleSide} />
      </mesh>
    </group>
  )
}
// </CHANGE>

function MathSurface({
  equation,
  color,
  showGradient,
  range = 5,
  resolution = 50,
}: {
  equation: string
  color: string
  showGradient: boolean
  range?: number
  resolution?: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)

  const { geometry, gradientVectors } = useMemo(() => {
    const vertices: number[] = []
    const indices: number[] = []
    const colors: number[] = []
    const normals: number[] = []
    const gradients: Array<{ position: THREE.Vector3; direction: THREE.Vector3 }> = []

    try {
      const parsedExpr = parse(equation)

      for (let i = 0; i <= resolution; i++) {
        for (let j = 0; j <= resolution; j++) {
          const x = (i / resolution) * range * 2 - range
          const y = (j / resolution) * range * 2 - range

          let z = 0
          try {
            z = evaluate(equation, { x, y })
            if (!isFinite(z)) z = 0
            z = Math.max(-range, Math.min(range, z))
          } catch {
            z = 0
          }

          vertices.push(x, z, y)

          // Color based on height
          const normalizedZ = (z + range) / (range * 2)
          const hue = (1 - normalizedZ) * 240
          const hsl = new THREE.Color().setHSL(hue / 360, 0.8, 0.6)
          colors.push(hsl.r, hsl.g, hsl.b)

          // Calculate gradient vectors at selected points
          if (showGradient && i % 5 === 0 && j % 5 === 0) {
            try {
              const dx = derivative(parsedExpr, "x").evaluate({ x, y })
              const dy = derivative(parsedExpr, "y").evaluate({ x, y })
              if (isFinite(dx) && isFinite(dy)) {
                gradients.push({
                  position: new THREE.Vector3(x, z, y),
                  direction: new THREE.Vector3(dx, 0, dy).normalize().multiplyScalar(0.5),
                })
              }
            } catch {}
          }
        }
      }

      // Create indices for triangles
      for (let i = 0; i < resolution; i++) {
        for (let j = 0; j < resolution; j++) {
          const a = i * (resolution + 1) + j
          const b = a + 1
          const c = a + resolution + 1
          const d = c + 1

          indices.push(a, b, c)
          indices.push(b, d, c)
        }
      }

      const geo = new THREE.BufferGeometry()
      geo.setAttribute("position", new THREE.Float32BufferAttribute(vertices, 3))
      geo.setAttribute("color", new THREE.Float32BufferAttribute(colors, 3))
      geo.setIndex(indices)
      geo.computeVertexNormals()

      return { geometry: geo, gradientVectors: gradients }
    } catch (error) {
      console.log("[v0] Error creating surface:", error)
      return { geometry: new THREE.BufferGeometry(), gradientVectors: [] }
    }
  }, [equation, range, resolution, showGradient])

  return (
    <group>
      <mesh ref={meshRef} geometry={geometry}>
        <meshStandardMaterial
          vertexColors
          side={THREE.DoubleSide}
          metalness={0.2}
          roughness={0.4}
          transparent
          opacity={0.9}
        />
      </mesh>

      {showGradient &&
        gradientVectors.map((grad, idx) => (
          <group key={idx}>
            <arrowHelper
              args={[
                grad.direction.clone().normalize(),
                grad.position,
                grad.direction.length() * 2,
                0xff00ff,
                0.2,
                0.15,
              ]}
            />
          </group>
        ))}
    </group>
  )
}
// </CHANGE>

function VectorField({ equation, range = 5 }: { equation: string; range?: number }) {
  const vectors = useMemo(() => {
    const vecs: Array<{ position: THREE.Vector3; direction: THREE.Vector3 }> = []
    const step = 1

    try {
      for (let x = -range; x <= range; x += step) {
        for (let y = -range; y <= range; y += step) {
          for (let z = -range; z <= range; z += step) {
            try {
              const result = evaluate(equation, { x, y, z })
              if (Array.isArray(result) && result.length === 3) {
                const [dx, dy, dz] = result
                if (isFinite(dx) && isFinite(dy) && isFinite(dz)) {
                  vecs.push({
                    position: new THREE.Vector3(x, y, z),
                    direction: new THREE.Vector3(dx, dy, dz).normalize().multiplyScalar(0.4),
                  })
                }
              }
            } catch {}
          }
        }
      }
    } catch {}

    return vecs
  }, [equation, range])

  return (
    <group>
      {vectors.map((vec, idx) => (
        <arrowHelper
          key={idx}
          args={[vec.direction.clone().normalize(), vec.position, vec.direction.length() * 2, 0x00ffff, 0.15, 0.1]}
        />
      ))}
    </group>
  )
}
// </CHANGE>

export default function Visualization3D() {
  const [equation, setEquation] = useState("x^2 - y^2")
  const [visualizationType, setVisualizationType] = useState<"surface" | "parametric" | "vector">("surface")
  const [autoRotate, setAutoRotate] = useState(false)
  const [colorScheme, setColorScheme] = useState("#6366f1")
  const [showGrid, setShowGrid] = useState(true)
  const [showAxes, setShowAxes] = useState(true)
  const [showGradient, setShowGradient] = useState(false)
  const [range, setRange] = useState(5)
  const [resolution, setResolution] = useState(50)

  const examples = {
    surface: [
      { name: "Paraboloide", eq: "x^2 + y^2" },
      { name: "Silla de montar", eq: "x^2 - y^2" },
      { name: "Ondas", eq: "sin(x) * cos(y)" },
      { name: "Gaussiana", eq: "exp(-(x^2 + y^2))" },
      { name: "Cono", eq: "sqrt(x^2 + y^2)" },
    ],
    vector: [
      { name: "Campo radial", eq: "[x, y, z]" },
      { name: "Rotacional", eq: "[-y, x, 0]" },
      { name: "Campo magnético", eq: "[y, -x, 1]" },
    ],
  }

  return (
    <div className="space-y-6">
      <Card className="p-6 shadow-xl border-2 border-border/50 bg-gradient-to-br from-card to-card/50">
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="equation" className="text-base font-semibold mb-2 block">
                  Función f(x,y) o Campo Vectorial
                </Label>
                <Input
                  id="equation"
                  value={equation}
                  onChange={(e) => setEquation(e.target.value)}
                  placeholder="Ej: x^2 + y^2, sin(x)*cos(y)"
                  className="h-11 text-base font-mono"
                />
              </div>

              <div>
                <Label className="text-base font-semibold mb-2 block">Tipo de Visualización</Label>
                <Select value={visualizationType} onValueChange={(v: any) => setVisualizationType(v)}>
                  <SelectTrigger className="h-11 text-base">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="surface">Superficie 3D</SelectItem>
                    <SelectItem value="parametric">Superficie Paramétrica</SelectItem>
                    <SelectItem value="vector">Campo Vectorial</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base font-semibold mb-3 block">Ejemplos Rápidos</Label>
                <div className="flex flex-wrap gap-2">
                  {(visualizationType === "vector" ? examples.vector : examples.surface).map((ex) => (
                    <Button
                      key={ex.name}
                      variant="outline"
                      size="sm"
                      onClick={() => setEquation(ex.eq)}
                      className="text-xs"
                    >
                      {ex.name}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-base font-semibold mb-3 block">Opciones de Visualización</Label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="axes" className="text-sm">
                      Mostrar Ejes Numerados
                    </Label>
                    <Switch id="axes" checked={showAxes} onCheckedChange={setShowAxes} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="grid" className="text-sm">
                      Mostrar Grid
                    </Label>
                    <Switch id="grid" checked={showGrid} onCheckedChange={setShowGrid} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="gradient" className="text-sm">
                      Mostrar Gradiente (∇f)
                    </Label>
                    <Switch id="gradient" checked={showGradient} onCheckedChange={setShowGradient} />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="rotate" className="text-sm">
                      Rotación Automática
                    </Label>
                    <Switch id="rotate" checked={autoRotate} onCheckedChange={setAutoRotate} />
                  </div>
                </div>
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Rango: ±{range}</Label>
                <Slider value={[range]} onValueChange={(v) => setRange(v[0])} min={3} max={10} step={1} />
              </div>

              <div>
                <Label className="text-sm font-semibold mb-2 block">Resolución: {resolution}</Label>
                <Slider value={[resolution]} onValueChange={(v) => setResolution(v[0])} min={20} max={100} step={10} />
              </div>
            </div>
          </div>
          {/* </CHANGE> */}
        </div>
      </Card>

      <Card className="p-3 shadow-2xl border-2 border-border/50 overflow-hidden bg-gradient-to-br from-card to-muted/20">
        <div className="h-[700px] bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 rounded-lg overflow-hidden relative">
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[range * 1.5, range * 1.5, range * 1.5]} fov={50} />
            <OrbitControls
              enableDamping
              dampingFactor={0.05}
              autoRotate={autoRotate}
              autoRotateSpeed={0.5}
              minDistance={5}
              maxDistance={range * 3}
            />

            <ambientLight intensity={0.6} />
            <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
            <directionalLight position={[-10, -10, -5]} intensity={0.4} />
            <pointLight position={[0, range, 0]} intensity={0.5} />
            <spotLight position={[range, range, range]} angle={0.3} penumbra={1} intensity={0.5} castShadow />

            <Suspense fallback={null}>
              <Environment preset="sunset" />

              {showAxes && <NumberedAxes range={range} step={1} />}
              {showGrid && <GridPlanes range={range} opacity={0.15} />}

              {visualizationType === "surface" && (
                <MathSurface
                  equation={equation}
                  color={colorScheme}
                  showGradient={showGradient}
                  range={range}
                  resolution={resolution}
                />
              )}

              {visualizationType === "vector" && <VectorField equation={equation} range={range} />}
            </Suspense>
          </Canvas>

          <div className="absolute top-4 right-4 bg-card/90 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-border">
            <div className="text-xs space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-sm" />
                <span className="font-mono">Eje X</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-sm" />
                <span className="font-mono">Eje Y</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-sm" />
                <span className="font-mono">Eje Z</span>
              </div>
              {showGradient && (
                <div className="flex items-center gap-2 mt-2 pt-2 border-t">
                  <div className="w-3 h-3 bg-fuchsia-500 rounded-sm" />
                  <span className="font-mono">∇f</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Card>
      {/* </CHANGE> */}

      <Card className="p-5 shadow-lg">
        <div className="flex flex-wrap gap-3">
          <Button onClick={() => setAutoRotate(!autoRotate)} variant={autoRotate ? "default" : "outline"}>
            {autoRotate ? <Pause className="mr-2 h-4 w-4" /> : <Play className="mr-2 h-4 w-4" />}
            {autoRotate ? "Pausar" : "Rotar"}
          </Button>
          <Button variant="outline" onClick={() => setShowAxes(!showAxes)}>
            <Grid3x3 className="mr-2 h-4 w-4" />
            {showAxes ? "Ocultar" : "Mostrar"} Ejes
          </Button>
          <Button variant="outline" onClick={() => setShowGradient(!showGradient)}>
            <Eye className="mr-2 h-4 w-4" />
            {showGradient ? "Ocultar" : "Mostrar"} Gradiente
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setEquation("x^2 - y^2")
              setRange(5)
              setResolution(50)
              setShowAxes(true)
              setShowGrid(true)
              setShowGradient(false)
            }}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Resetear
          </Button>
        </div>
      </Card>

      <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border-blue-200 dark:border-blue-800">
        <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
          <span className="text-xl">📐</span>
          Capacidades del Visualizador 3D
        </h4>
        <ul className="text-sm text-muted-foreground space-y-2 leading-relaxed grid md:grid-cols-2 gap-x-6">
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Ejes coordenados numerados (X, Y, Z)</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Vectores gradiente ∇f en puntos de la superficie</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Planos de referencia XY, XZ, YZ</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Campos vectoriales tridimensionales</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Coloreado por altura con gradiente</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-600 font-bold">✓</span>
            <span>Resolución y rango ajustables</span>
          </li>
        </ul>
      </Card>
    </div>
  )
}

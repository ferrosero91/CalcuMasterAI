import * as math from "mathjs"

export interface Point3D {
  x: number
  y: number
  z: number
}

export interface Domain {
  x: [number, number]
  y: [number, number]
}

/**
 * Evaluate a mathematical expression with given variables
 */
export function evaluateExpression(expression: string, variables: Record<string, number>): number {
  try {
    return math.evaluate(expression, variables) as number
  } catch (error) {
    console.error("Error evaluating expression:", error)
    return 0
  }
}

/**
 * Generate 3D surface data from a function f(x, y)
 */
export function generateSurfaceData(
  func: string,
  domain: Domain,
  resolution = 50,
): { x: number[]; y: number[]; z: number[][] } {
  const xValues: number[] = []
  const yValues: number[] = []
  const zValues: number[][] = []

  const xStep = (domain.x[1] - domain.x[0]) / resolution
  const yStep = (domain.y[1] - domain.y[0]) / resolution

  for (let i = 0; i <= resolution; i++) {
    xValues.push(domain.x[0] + i * xStep)
    yValues.push(domain.y[0] + i * yStep)
  }

  for (let i = 0; i <= resolution; i++) {
    const row: number[] = []
    for (let j = 0; j <= resolution; j++) {
      const x = xValues[j]
      const y = yValues[i]
      try {
        const z = evaluateExpression(func, { x, y })
        row.push(isFinite(z) ? z : 0)
      } catch {
        row.push(0)
      }
    }
    zValues.push(row)
  }

  return { x: xValues, y: yValues, z: zValues }
}

/**
 * Calculate partial derivative numerically
 */
export function partialDerivative(
  func: string,
  variable: "x" | "y",
  point: { x: number; y: number },
  h = 0.0001,
): number {
  const { x, y } = point

  if (variable === "x") {
    const f1 = evaluateExpression(func, { x: x + h, y })
    const f2 = evaluateExpression(func, { x: x - h, y })
    return (f1 - f2) / (2 * h)
  } else {
    const f1 = evaluateExpression(func, { x, y: y + h })
    const f2 = evaluateExpression(func, { x, y: y - h })
    return (f1 - f2) / (2 * h)
  }
}

/**
 * Calculate gradient vector at a point
 */
export function calculateGradient(
  func: string,
  point: { x: number; y: number },
): { dx: number; dy: number; magnitude: number } {
  const dx = partialDerivative(func, "x", point)
  const dy = partialDerivative(func, "y", point)
  const magnitude = Math.sqrt(dx * dx + dy * dy)

  return { dx, dy, magnitude }
}

/**
 * Numerical integration using Simpson's rule
 */
export function doubleIntegral(
  func: string,
  xRange: [number, number],
  yRange: [number, number],
  nPoints = 100,
): number {
  const [xMin, xMax] = xRange
  const [yMin, yMax] = yRange
  const dx = (xMax - xMin) / nPoints
  const dy = (yMax - yMin) / nPoints

  let sum = 0

  for (let i = 0; i <= nPoints; i++) {
    for (let j = 0; j <= nPoints; j++) {
      const x = xMin + i * dx
      const y = yMin + j * dy
      const weight =
        (i === 0 || i === nPoints ? 1 : i % 2 === 0 ? 2 : 4) * (j === 0 || j === nPoints ? 1 : j % 2 === 0 ? 2 : 4)

      sum += weight * evaluateExpression(func, { x, y })
    }
  }

  return (sum * dx * dy) / 9
}

/**
 * Format a number for display
 */
export function formatNumber(num: number, decimals = 4): string {
  return Number.isFinite(num) ? num.toFixed(decimals) : "0"
}

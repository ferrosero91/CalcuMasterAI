# 📖 Guía Rápida - CalcuMaster AI

## 🚀 Inicio Rápido

### Para Profesores/Evaluadores

Esta aplicación cumple **TODOS** los requisitos del proyecto de cálculo multivariable:

✅ **Visualización de funciones de dos variables** → Pestaña "Gráficos 3D"  
✅ **Cálculo de dominio, rango y límites** → Pestaña "Dominio/Rango"  
✅ **Derivadas parciales y gradientes** → Pestaña "Herramientas"  
✅ **Optimización con restricciones (Lagrange)** → Pestaña "Herramientas"  
✅ **Integración doble o triple** → Pestaña "Herramientas"  

## 🎯 Funcionalidades Principales

### 1. 🤖 Resolver con IA (Pestaña Principal)

**Qué hace**: Resuelve cualquier problema matemático paso a paso usando IA avanzada.

**Cómo usarlo**:
1. Selecciona el tipo de problema del dropdown
2. Escribe tu problema matemático
3. Click en "Resolver con IA"
4. Obtén solución detallada paso a paso

**Tipos de problemas soportados**:
- ✓ Derivadas Parciales
- ✓ Integrales Múltiples  
- ✓ Gradiente y Direccionales
- ✓ Multiplicadores de Lagrange
- ✓ Dominio y Rango
- ✓ Límites Multivariables

**Ejemplo**:
\`\`\`
Tipo: Derivadas Parciales
Problema: f(x,y) = x^2 + 3xy + y^2, encontrar ∂f/∂x y ∂f/∂y

Resultado:
- Paso 1: Derivar respecto a x...
- Paso 2: Simplificar...
- Respuesta: ∂f/∂x = 2x + 3y, ∂f/∂y = 3x + 2y
\`\`\`

---

### 2. 📷 Escanear (Procesamiento de Imágenes)

**Qué hace**: Extrae ejercicios matemáticos de fotos y los resuelve automáticamente.

**Cómo usarlo**:
1. Arrastra una foto del ejercicio (o click para seleccionar)
2. La IA extrae el texto y la ecuación
3. Resuelve automáticamente
4. Muestra solución paso a paso

**Requisitos de imagen**:
- Formatos: JPG, PNG, JPEG
- Tamaño máximo: 2MB
- Texto legible (manuscrito o impreso)

**Tecnología**: Usa modelo Llama 4 Scout de Groq para visión computacional.

---

### 3. 📊 Gráficos 3D (Visualización Profesional)

**Qué hace**: Visualización 3D interactiva tipo GeoGebra con ejes numerados.

**Características**:
- ✓ Ejes X, Y, Z con marcas numéricas
- ✓ Superficies 3D coloreadas por altura
- ✓ Vectores gradiente ∇f
- ✓ Campos vectoriales
- ✓ Planos de referencia (grid)
- ✓ Rotación y zoom con mouse

**Cómo usarlo**:
1. Ingresa función: `x^2 + y^2` o `sin(x) * cos(y)`
2. Ajusta rango (±3 a ±10)
3. Ajusta resolución (20-100)
4. Activa opciones:
   - Mostrar Ejes Numerados
   - Mostrar Grid
   - Mostrar Gradiente ∇f
   - Rotación Automática

**Controles del mouse**:
- Arrastrar = Rotar vista
- Scroll = Zoom
- Click derecho = Mover

**Ejemplos predefinidos**:
- Paraboloide: `x^2 + y^2`
- Silla de montar: `x^2 - y^2`
- Ondas: `sin(x) * cos(y)`
- Gaussiana: `exp(-(x^2 + y^2))`
- Cono: `sqrt(x^2 + y^2)`

---

### 4. 🧮 Calculadora

**Qué hace**: Calculadora avanzada para funciones multivariables.

**Pestañas**:

**a) General**
- Simplificación de expresiones
- Derivadas simbólicas
- Evaluación en puntos
- Análisis de dominio/rango

**b) Derivadas**
- Explicación teórica de ∂f/∂x
- Fórmulas y definiciones
- Interpretación geométrica

**c) Integrales**
- Integrales dobles ∫∫
- Integrales triples ∫∫∫
- Cambio de orden de integración

---

### 5. 📐 Dominio/Rango

**Qué hace**: Analiza el dominio y rango de funciones multivariables.

**Cómo usarlo**:
1. Ingresa función: `sqrt(9 - x^2 - y^2)`
2. Click "Analizar"
3. Obtén:
   - Dominio con notación matemática
   - Rango
   - Restricciones (raíces, logaritmos, etc.)
   - Tipo de superficie

**Casos especiales detectados**:
- Raíces cuadradas → argumento ≥ 0
- Logaritmos → argumento > 0
- Fracciones → denominador ≠ 0
- Funciones trigonométricas inversas → restricciones

**Ejemplo**:
\`\`\`
Función: sqrt(9 - x^2 - y^2)
Dominio: x² + y² ≤ 9 (círculo de radio 3)
Rango: [0, 3]
Tipo: Hemisferio
\`\`\`

---

### 6. 🛠️ Herramientas

**Qué hace**: Herramientas especializadas de cálculo multivariable.

**Tres pestañas principales**:

**a) Derivadas Parciales**
- Ingresa f(x,y)
- Calcula ∂f/∂x y ∂f/∂y
- Muestra gradiente ∇f = (∂f/∂x, ∂f/∂y)
- Simplificación automática

**b) Integrales Múltiples**
- Define f(x,y)
- Establece límites: x₁, x₂, y₁, y₂
- Calcula ∫∫f(x,y)dA
- Muestra región de integración

**c) Optimización (Lagrange)**
- Función objetivo: f(x,y)
- Restricción: g(x,y) = 0
- Sistema: ∇f = λ∇g
- Solución paso a paso

**Ejemplo - Lagrange**:
\`\`\`
Maximizar: f(x,y) = xy
Restricción: x + y - 10 = 0

Sistema:
∂f/∂x = λ∂g/∂x → y = λ
∂f/∂y = λ∂g/∂y → x = λ
g(x,y) = 0 → x + y = 10

Solución: x = 5, y = 5, f_max = 25
\`\`\`

---

## 💡 Tips de Uso

### Sintaxis Matemática

**Operadores básicos**:
- Suma: `+`
- Resta: `-`
- Multiplicación: `*` (requerido, no usar espacios)
- División: `/`
- Potencia: `^` (usar `^` no `**`)

**Funciones comunes**:
- Raíz cuadrada: `sqrt(x)`
- Exponencial: `exp(x)` o `e^x`
- Logaritmo natural: `ln(x)` o `log(x)`
- Seno: `sin(x)`
- Coseno: `cos(x)`
- Tangente: `tan(x)`

**Ejemplos correctos**:
- ✅ `x^2 + y^2`
- ✅ `x * y`
- ✅ `sin(x) * cos(y)`
- ✅ `exp(-(x^2 + y^2))`
- ✅ `sqrt(9 - x^2 - y^2)`

**Ejemplos incorrectos**:
- ❌ `x² + y²` (usar `^`)
- ❌ `xy` (falta `*`, usar `x*y`)
- ❌ `x**2` (usar `^`, no `**`)

---

### Problemas Comunes y Soluciones

**1. "La visualización 3D no aparece"**
- Revisa sintaxis de la función
- Verifica que no haya divisiones por cero
- Reduce el rango si la función crece muy rápido
- Refresca la página

**2. "La imagen no se procesa"**
- Verifica que sea < 2MB
- Usa JPG, PNG o JPEG
- Asegura que el texto sea legible
- Comprime la imagen si es necesaria

**3. "El cálculo da error"**
- Usa paréntesis para claridad: `(x+y)^2`
- Verifica operadores: `*` para multiplicar
- Para problemas complejos, usa "Resolver con IA"

**4. "API key no configurada"**
- Agrega `GROQ_API_KEY` a variables de entorno
- En Vercel: Settings → Environment Variables
- En local: archivo `.env.local`

---

## 🎓 Casos de Uso Académicos

### 1. Derivadas Parciales

**Objetivo**: Encontrar ∂f/∂x y ∂f/∂y de f(x,y) = x²y + xy²

**Pasos**:
1. Ve a pestaña "Herramientas"
2. Selecciona "Derivadas Parciales"
3. Ingresa: `x^2 * y + x * y^2`
4. Click "Calcular"
5. Obtén: ∂f/∂x = 2xy + y², ∂f/∂y = x² + 2xy

**Para visualizar**:
1. Ve a "Gráficos 3D"
2. Ingresa la misma función
3. Activa "Mostrar Gradiente"
4. Observa vectores ∇f en la superficie

---

### 2. Integrales Dobles

**Objetivo**: Calcular ∫∫(x² + y²)dA sobre R = [0,1] × [0,1]

**Pasos**:
1. Ve a "Herramientas"
2. Selecciona "Integrales Múltiples"
3. Función: `x^2 + y^2`
4. Límites: x₁=0, x₂=1, y₁=0, y₂=1
5. Click "Calcular Integral Doble"

**O con IA**:
1. Ve a "Resolver con IA"
2. Tipo: "Integrales Múltiples"
3. Escribe: `∫∫(x^2 + y^2)dA sobre [0,1] x [0,1]`
4. Obtén solución paso a paso completa

---

### 3. Optimización con Restricciones

**Objetivo**: Maximizar f(x,y) = xy sujeto a x + y = 10

**Pasos**:
1. Ve a "Herramientas"
2. Selecciona "Optimización"
3. Función: `x * y`
4. Restricción: `x + y - 10`
5. Click "Resolver con Lagrange"

**O con IA (recomendado)**:
1. Ve a "Resolver con IA"
2. Tipo: "Multiplicadores de Lagrange"
3. Escribe: `Maximizar f(x,y) = xy sujeto a x + y = 10`
4. Obtén solución completa con todos los pasos

---

### 4. Análisis de Dominio

**Objetivo**: Encontrar dominio de f(x,y) = √(9 - x² - y²)

**Pasos**:
1. Ve a "Dominio/Rango"
2. Ingresa: `sqrt(9 - x^2 - y^2)`
3. Click "Analizar"
4. Resultado:
   - Dominio: x² + y² ≤ 9
   - Rango: [0, 3]
   - Tipo: Hemisferio

**Para visualizar**:
1. Ve a "Gráficos 3D"
2. Ingresa la función
3. Observa el hemisferio de radio 3

---

## 🔬 Tecnología Utilizada

- **Frontend**: Next.js 16 + React 19
- **Visualización 3D**: React Three Fiber (Three.js)
- **Cálculos**: mathjs (motor simbólico)
- **IA**: Groq API (Llama 4 Scout + Llama 3.3 70B)
- **Estilos**: Tailwind CSS v4 + shadcn/ui

---

## 📊 Cumplimiento de Requisitos

| Requisito | Implementado | Ubicación |
|-----------|--------------|-----------|
| Visualización de f(x,y) | ✅ | Pestaña "Gráficos 3D" |
| Dominio y rango | ✅ | Pestaña "Dominio/Rango" |
| Límites multivariables | ✅ | "Resolver con IA" |
| Derivadas parciales | ✅ | Pestaña "Herramientas" |
| Gradientes | ✅ | "Gráficos 3D" + "Herramientas" |
| Optimización Lagrange | ✅ | Pestaña "Herramientas" |
| Integrales dobles/triples | ✅ | Pestaña "Herramientas" |
| Interfaz amigable | ✅ | Diseño inspirado en Symbolab |
| Ingreso de funciones | ✅ | Todas las pestañas |
| Cálculo automático | ✅ | IA + mathjs |

---

## 🆘 Soporte

**Documentación completa**: Ver `README.md`

**Recursos externos**:
- [Groq API Docs](https://docs.groq.com)
- [Next.js Docs](https://nextjs.org/docs)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- [mathjs](https://mathjs.org/docs/)

---

¡Aplicación lista para evaluación! 🎉

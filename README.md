# 🧮 CalcuMaster AI - Aplicación de Cálculo Multivariable

Aplicación web profesional para resolver, visualizar y analizar problemas de cálculo multivariable con inteligencia artificial avanzada. Incluye procesamiento de imágenes, visualización 3D interactiva tipo GeoGebra, y solución paso a paso estilo Symbolab.

## ✨ Características Principales

### 🤖 Inteligencia Artificial
- **Procesamiento de imágenes**: Sube fotos de ejercicios manuscritos o impresos
- **Solución paso a paso**: Explicaciones detalladas con IA usando Groq/Llama
- **Múltiples tipos de problemas**: Derivadas parciales, integrales múltiples, gradientes, optimización con Lagrange

### 📊 Visualización 3D Profesional (Estilo GeoGebra)
- **Ejes numerados**: Marcas y etiquetas en X, Y, Z
- **Superficies interactivas**: Funciones de dos variables f(x,y)
- **Vectores gradiente**: Visualización de ∇f en puntos específicos
- **Campos vectoriales**: Representación 3D de campos
- **Planos de referencia**: Grid transparente en XY, XZ, YZ
- **Rotación y zoom**: Control completo con mouse/touch
- **Coloreado por altura**: Gradiente de color según valor Z

### 📐 Herramientas Matemáticas Completas
- **Derivadas Parciales**: ∂f/∂x, ∂f/∂y con simplificación simbólica
- **Integrales Múltiples**: Dobles y triples con límites personalizables
- **Gradientes**: Cálculo y visualización de ∇f
- **Optimización**: Multiplicadores de Lagrange
- **Dominio y Rango**: Análisis automático con restricciones
- **Límites**: Evaluación de límites multivariables

### 🎨 Diseño Moderno
- Interfaz inspirada en Symbolab
- Tema claro/oscuro automático
- Responsive (móvil, tablet, desktop)
- Animaciones fluidas
- Notificaciones inteligentes

## 🚀 Stack Tecnológico

- **Framework**: Next.js 16 (App Router) + React 19
- **Lenguaje**: TypeScript
- **Visualización 3D**: React Three Fiber (@react-three/fiber, @react-three/drei)
- **Matemáticas**: mathjs (cálculos simbólicos)
- **IA**: Groq SDK (modelo Llama 4 Scout para imágenes, Llama 3.3 70B para soluciones)
- **Estilos**: Tailwind CSS v4 + shadcn/ui
- **Despliegue**: Vercel

## 📋 Requisitos del Proyecto

Esta aplicación cumple con **todos** los requisitos del proyecto de cálculo multivariable:

### ✅ 1. Tipo de Aplicativo
- ✓ Aplicación web funcional desarrollada en JavaScript/TypeScript
- ✓ Interfaz moderna y profesional
- ✓ Accesible desde cualquier dispositivo con navegador

### ✅ 2. Enfoque Matemático

#### **Visualización de funciones de dos variables**
- ✓ Superficies 3D interactivas con f(x,y)
- ✓ Ejes numerados profesionales
- ✓ Múltiples ejemplos predefinidos
- ✓ Entrada de funciones personalizadas

#### **Cálculo de dominio, rango y límites**
- ✓ Analizador automático de dominio
- ✓ Cálculo de rango con descripción
- ✓ Detección de restricciones (raíces, logaritmos, denominadores)
- ✓ Evaluación de límites multivariables

#### **Derivadas parciales y gradientes**
- ✓ Cálculo de ∂f/∂x y ∂f/∂y
- ✓ Visualización de vectores gradiente ∇f
- ✓ Evaluación en puntos específicos
- ✓ Simplificación simbólica automática

#### **Optimización con restricciones**
- ✓ Multiplicadores de Lagrange
- ✓ Sistema de ecuaciones ∇f = λ∇g
- ✓ Solución paso a paso con IA
- ✓ Ejemplos guiados

#### **Integración doble o triple**
- ✓ Integrales múltiples ∫∫f(x,y)dA
- ✓ Límites de integración personalizables
- ✓ Cálculo de volúmenes y áreas
- ✓ Visualización de regiones de integración

### ✅ 3. Funcionalidades Mínimas

- ✓ **Ingreso de funciones**: Input con validación y ejemplos
- ✓ **Visualización gráfica**: Renderizado 3D profesional con Three.js
- ✓ **Cálculo automático**: Derivadas, integrales, dominio, rango
- ✓ **Interfaz amigable**: Diseño inspirado en Symbolab, navegación intuitiva

## 🔧 Instalación y Configuración

### 1. Clonar el Repositorio

\`\`\`bash
git clone https://github.com/tu-usuario/ia-math-app.git
cd ia-math-app
\`\`\`

### 2. Instalar Dependencias

\`\`\`bash
npm install
\`\`\`

### 3. Configurar Variables de Entorno

Crea un archivo `.env.local` en la raíz:

\`\`\`env
# API Key de Groq (REQUERIDO)
GROQ_API_KEY=tu_clave_de_groq_aqui
\`\`\`

#### Obtener API Key de Groq

1. Visita [console.groq.com](https://console.groq.com)
2. Crea una cuenta gratuita
3. Ve a "API Keys"
4. Genera una nueva key
5. Copia y pega en `.env.local`

### 4. Ejecutar en Desarrollo

\`\`\`bash
npm run dev
\`\`\`

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🌐 Despliegue en Vercel

### Método 1: Deploy Automático

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/tu-usuario/ia-math-app)

### Método 2: Deploy Manual

1. **Sube tu código a GitHub**

2. **Conecta con Vercel**
   - Ve a [vercel.com](https://vercel.com)
   - Click en "New Project"
   - Importa tu repositorio de GitHub

3. **Configura Variables de Entorno**
   - En Vercel: Settings → Environment Variables
   - Agrega `GROQ_API_KEY`

4. **Deploy**
   - Click en "Deploy"
   - Espera 1-2 minutos
   - ¡Tu app estará lista!

## 📖 Guía de Uso

### 1️⃣ Resolver con IA (Pestaña Principal)

1. Selecciona el tipo de problema (derivadas, integrales, gradiente, etc.)
2. Ingresa tu función matemática
3. Click en "Resolver con IA"
4. Obtén la solución paso a paso

**Ejemplo**:
\`\`\`
Tipo: Derivadas Parciales
Input: f(x,y) = x^2 * y + x * y^2
\`\`\`

### 2️⃣ Escanear Imagen

1. Arrastra una foto del ejercicio o haz click para seleccionar
2. La IA extraerá el texto y ecuación
3. Resolverá el problema automáticamente
4. Muestra pasos detallados

**Formatos soportados**: JPG, PNG, JPEG (máx 2MB)

### 3️⃣ Visualización 3D

1. Ingresa una función: `x^2 + y^2`, `sin(x) * cos(y)`, etc.
2. Ajusta el rango y resolución
3. Activa/desactiva:
   - Ejes numerados
   - Grid
   - Vectores gradiente ∇f
   - Rotación automática
4. Interactúa con mouse:
   - Arrastrar para rotar
   - Scroll para zoom
   - Click derecho para mover

### 4️⃣ Herramientas de Cálculo

**Derivadas Parciales**:
- Ingresa f(x,y)
- Calcula ∂f/∂x y ∂f/∂y
- Muestra el gradiente ∇f

**Integrales Múltiples**:
- Define f(x,y) y límites
- Calcula ∫∫f(x,y)dA
- Visualiza región

**Optimización**:
- Función objetivo f(x,y)
- Restricción g(x,y) = 0
- Resuelve con Lagrange

### 5️⃣ Dominio y Rango

1. Ingresa función (ej: `sqrt(9 - x^2 - y^2)`)
2. Analiza automáticamente
3. Muestra:
   - Dominio con notación matemática
   - Rango
   - Restricciones
   - Tipo de superficie

## 🎯 Ejemplos de Problemas

### Derivadas Parciales
\`\`\`
f(x,y) = x^2 + 3xy + y^2
Encontrar ∂f/∂x y ∂f/∂y
\`\`\`

### Integrales Múltiples
\`\`\`
∫∫(x^2 + y^2)dA sobre R = [0,1] x [0,1]
\`\`\`

### Gradiente
\`\`\`
f(x,y) = x^2*y + x*y^2 en el punto (1,2)
Calcular ∇f(1,2)
\`\`\`

### Multiplicadores de Lagrange
\`\`\`
Maximizar f(x,y) = xy
Sujeto a: x + y = 10
\`\`\`

### Dominio y Rango
\`\`\`
f(x,y) = √(9 - x^2 - y^2)
Determinar dominio y rango
\`\`\`

## 🏗️ Arquitectura del Proyecto

\`\`\`
ia-math-app/
├── app/
│   ├── api/
│   │   ├── process-image/
│   │   │   └── route.ts          # Procesa imágenes con IA
│   │   └── solve-math/
│   │       └── route.ts          # Resuelve problemas matemáticos
│   ├── layout.tsx                # Layout con fuentes y metadatos
│   ├── page.tsx                  # Página principal con navegación
│   ├── loading.tsx               # Estado de carga
│   └── globals.css               # Estilos globales + Tailwind config
├── components/
│   ├── ui/                       # Componentes shadcn/ui
│   ├── math-solver.tsx           # Solucionador con IA
│   ├── image-upload.tsx          # Upload de imágenes
│   ├── visualization-3d.tsx      # Visualización 3D con Three.js
│   ├── calculus-tools.tsx        # Herramientas de cálculo
│   ├── advanced-calculator.tsx   # Calculadora avanzada
│   ├── domain-range-calculator.tsx # Análisis dominio/rango
│   └── math-library.tsx          # Biblioteca de fórmulas
├── lib/
│   └── math-utils.ts             # Utilidades matemáticas
├── hooks/
│   └── use-toast.ts              # Hook para notificaciones
└── package.json
\`\`\`

## 🔌 API Endpoints

### POST `/api/process-image`

Procesa imagen y extrae/resuelve ejercicio.

**Request**:
\`\`\`typescript
FormData {
  image: File  // JPG, PNG, JPEG (< 2MB)
}
\`\`\`

**Response**:
\`\`\`json
{
  "solution": {
    "extractedText": "...",
    "problem": "...",
    "steps": [
      {
        "step": 1,
        "description": "...",
        "equation": "...",
        "explanation": "..."
      }
    ],
    "finalAnswer": "..."
  }
}
\`\`\`

### POST `/api/solve-math`

Resuelve problema matemático con IA.

**Request**:
\`\`\`json
{
  "problem": "f(x,y) = x^2 + y^2, encontrar ∂f/∂x",
  "type": "partial-derivatives"
}
\`\`\`

**Response**:
\`\`\`json
{
  "solution": {
    "problem": "...",
    "domain": "...",
    "range": "...",
    "steps": [...],
    "finalAnswer": "..."
  }
}
\`\`\`

## 🐛 Solución de Problemas

### Error: "API key not configured"

**Solución**:
- Verifica que `GROQ_API_KEY` esté en `.env.local`
- En Vercel: Settings → Environment Variables
- Asegúrate de que la variable no tenga espacios ni comillas

### La imagen no se procesa

**Solución**:
- Verifica que el archivo sea < 2MB
- Usa formatos JPG, PNG o JPEG
- Asegúrate de que la imagen tenga texto claro
- Comprime la imagen si es necesario

### Visualización 3D no carga

**Solución**:
- Usa sintaxis correcta: `x^2 + y^2` (no `x**2`)
- Operadores: `*` multiplicación, `^` potencia, `/` división
- Evita divisiones por cero
- Refresca la página si persiste

### Errores de cálculo matemático

**Solución**:
- Verifica la sintaxis de la función
- Usa paréntesis para claridad: `(x+y)^2`
- Para funciones complejas, usa el Solucionador con IA

## 🤝 Contribuir

Las contribuciones son bienvenidas. Para cambios importantes:

1. Fork el repositorio
2. Crea una rama: `git checkout -b feature/nueva-funcionalidad`
3. Haz commit: `git commit -am 'Agrega nueva funcionalidad'`
4. Push: `git push origin feature/nueva-funcionalidad`
5. Abre un Pull Request

## 📝 Licencia

MIT License - consulta el archivo LICENSE para más detalles.

## 🙏 Agradecimientos

- **Groq**: Por la API de IA rápida y potente
- **Vercel**: Por el hosting y Next.js
- **shadcn/ui**: Por los componentes UI elegantes
- **Three.js**: Por el renderizado 3D
- **mathjs**: Por el motor de cálculo simbólico

## 📧 Soporte

¿Problemas o preguntas?

- 📖 [Documentación de Groq](https://docs.groq.com)
- 📖 [Documentación de Next.js](https://nextjs.org/docs)
- 📖 [Documentación de React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- 🐛 Abre un issue en GitHub

---

**Desarrollado con ❤️ para el curso de Cálculo Multivariable**
\`\`\`

```env file="" isHidden
"# CalcuMasterAI" 

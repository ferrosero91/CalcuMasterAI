# ⚙️ Guía de Configuración - CalcuMaster AI

## 📋 Requisitos Previos

- Node.js 18+ instalado
- Cuenta en Groq (gratuita)
- Git (opcional, para clonar)

## 🔑 Configurar API de Groq

### Paso 1: Crear Cuenta en Groq

1. Ve a [console.groq.com](https://console.groq.com)
2. Regístrate con tu email (o usa Google/GitHub)
3. Confirma tu email

### Paso 2: Obtener API Key

1. Inicia sesión en [console.groq.com](https://console.groq.com)
2. Click en "API Keys" en el menú lateral
3. Click en "Create API Key"
4. Dale un nombre (ej: "CalcuMaster")
5. **COPIA LA KEY INMEDIATAMENTE** (solo se muestra una vez)
6. Guárdala en un lugar seguro

La key se ve así:
\`\`\`
gsk_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
\`\`\`

### Paso 3: Configurar en el Proyecto

#### Opción A: Desarrollo Local

Crea archivo `.env.local` en la raíz:

\`\`\`bash
# En la raíz del proyecto
touch .env.local
\`\`\`

Agrega tu key:

\`\`\`env
GROQ_API_KEY=gsk_tu_clave_aqui_pegada_sin_espacios
\`\`\`

**⚠️ IMPORTANTE**: 
- NO incluyas espacios ni comillas
- NO subas este archivo a Git (ya está en .gitignore)
- Guarda el archivo

#### Opción B: Deploy en Vercel

1. Ve a tu proyecto en [vercel.com](https://vercel.com)
2. Click en "Settings"
3. Click en "Environment Variables"
4. Agrega:
   - **Key**: `GROQ_API_KEY`
   - **Value**: Tu API key de Groq
   - **Environment**: Production, Preview, Development (todos)
5. Click "Save"
6. Redeploy tu proyecto

## 🚀 Instalación Local

### Paso 1: Clonar o Descargar

**Opción A: Con Git**
\`\`\`bash
git clone https://github.com/tu-usuario/ia-math-app.git
cd ia-math-app
\`\`\`

**Opción B: Descargar ZIP**
1. Descarga el proyecto como ZIP
2. Extrae en una carpeta
3. Abre terminal en esa carpeta

### Paso 2: Instalar Dependencias

\`\`\`bash
npm install
\`\`\`

Esto instalará:
- Next.js 16
- React 19
- React Three Fiber (visualización 3D)
- mathjs (cálculos)
- Groq SDK
- Tailwind CSS v4
- shadcn/ui components

**Tiempo estimado**: 1-3 minutos

### Paso 3: Configurar Variables de Entorno

Copia el ejemplo y editalo:

\`\`\`bash
cp .env.example .env.local
\`\`\`

Edita `.env.local` con tu editor favorito:

\`\`\`env
GROQ_API_KEY=gsk_tu_clave_real_aqui
\`\`\`

### Paso 4: Iniciar Servidor de Desarrollo

\`\`\`bash
npm run dev
\`\`\`

Verás:

\`\`\`
> ia-math-app@0.1.0 dev
> next dev

  ▲ Next.js 16.0.0
  - Local:        http://localhost:3000

✓ Compiled in XXms
\`\`\`

### Paso 5: Abrir en Navegador

Abre [http://localhost:3000](http://localhost:3000)

¡La aplicación debería estar funcionando! 🎉

## 🌐 Deploy en Vercel (Producción)

### Método 1: Deploy Directo desde GitHub

#### Paso 1: Subir a GitHub

\`\`\`bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/tu-usuario/ia-math-app.git
git push -u origin main
\`\`\`

#### Paso 2: Conectar con Vercel

1. Ve a [vercel.com](https://vercel.com)
2. Click "Add New" → "Project"
3. Importa tu repositorio de GitHub
4. Vercel detectará automáticamente Next.js

#### Paso 3: Configurar Environment Variables

En la pantalla de deploy:

1. Expande "Environment Variables"
2. Agrega:
   - **Key**: `GROQ_API_KEY`
   - **Value**: Tu API key
3. Click "Deploy"

#### Paso 4: Esperar Deploy

- Tiempo estimado: 2-3 minutos
- Vercel construirá y desplegará automáticamente
- Recibirás una URL: `https://tu-proyecto.vercel.app`

### Método 2: Deploy desde CLI

\`\`\`bash
# Instalar Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel

# Seguir prompts interactivos
\`\`\`

## 🧪 Verificar Instalación

### Test 1: Verificar API Key

Prueba si la API key funciona:

1. Ve a la pestaña "Resolver con IA"
2. Escribe: `f(x,y) = x^2 + y^2, encontrar ∂f/∂x`
3. Click "Resolver con IA"
4. Deberías ver la solución en 3-5 segundos

Si ves error "API key not configured":
- Verifica `.env.local`
- Reinicia el servidor (`Ctrl+C` y `npm run dev`)
- Verifica que la key no tenga espacios

### Test 2: Verificar Visualización 3D

1. Ve a "Gráficos 3D"
2. Función: `x^2 + y^2` (default)
3. Deberías ver un paraboloide 3D con ejes numerados
4. Arrastra con el mouse para rotar

Si no se ve:
- Verifica que Three.js se instaló correctamente
- Refresca la página (F5)
- Abre consola del navegador (F12) y busca errores

### Test 3: Verificar Procesamiento de Imágenes

1. Ve a "Escanear"
2. Arrastra una imagen de un ejercicio
3. La IA debería extraer y resolver

Si falla:
- Verifica tamaño < 2MB
- Usa formato JPG, PNG o JPEG
- Asegura que el texto sea legible

## 🔧 Solución de Problemas

### Error: "Cannot find module 'X'"

\`\`\`bash
# Reinstalar dependencias
rm -rf node_modules package-lock.json
npm install
\`\`\`

### Error: "Port 3000 already in use"

\`\`\`bash
# Usar otro puerto
npm run dev -- -p 3001
\`\`\`

O mata el proceso:

\`\`\`bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9
\`\`\`

### Error de Build en Vercel

1. Verifica que `package.json` esté completo
2. Asegura que todas las dependencias estén en `dependencies` (no `devDependencies`)
3. Revisa los logs de build en Vercel

### La visualización 3D es lenta

Reduce la resolución:

1. En "Gráficos 3D"
2. Slider "Resolución" → mover a 30-40
3. La superficie será menos detallada pero más rápida

## 📦 Estructura de Archivos

\`\`\`
ia-math-app/
├── .env.local              # ⚠️ TU API KEY (no subir a Git)
├── .env.example            # Plantilla de variables
├── package.json            # Dependencias
├── next.config.mjs         # Configuración Next.js
├── tailwind.config.js      # (auto-generado en globals.css)
├── tsconfig.json           # Config TypeScript
├── app/
│   ├── layout.tsx          # Layout con fuentes
│   ├── page.tsx            # Página principal
│   ├── globals.css         # Estilos + Tailwind v4
│   └── api/
│       ├── process-image/  # API procesamiento imágenes
│       └── solve-math/     # API solución matemática
├── components/
│   ├── ui/                 # Componentes shadcn/ui
│   ├── math-solver.tsx
│   ├── image-upload.tsx
│   ├── visualization-3d.tsx
│   ├── calculus-tools.tsx
│   ├── advanced-calculator.tsx
│   ├── domain-range-calculator.tsx
│   └── math-library.tsx
├── lib/
│   └── math-utils.ts
└── hooks/
    └── use-toast.ts
\`\`\`

## 🔐 Seguridad

**⚠️ NUNCA compartas tu API key públicamente**

- ❌ No la subas a GitHub
- ❌ No la incluyas en código frontend
- ❌ No la compartas en screenshots
- ✅ Úsala solo en variables de entorno
- ✅ Guárdala en `.env.local` (ya en .gitignore)
- ✅ Si se expone, regenera una nueva en Groq console

## 📞 Soporte

Si tienes problemas:

1. **Revisa la consola del navegador** (F12)
2. **Revisa logs del servidor** (terminal donde corre `npm run dev`)
3. **Consulta documentación**:
   - [Groq API](https://docs.groq.com)
   - [Next.js](https://nextjs.org/docs)
   - [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

---

¡Configuración completa! Ahora estás listo para usar CalcuMaster AI 🚀

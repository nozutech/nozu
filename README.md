# nozutech.dev

Sitio web de **NozuTech** — la marca freelance de [Jonathan Neto](https://github.com/nozutech).
Desarrollo backend, automatización e integraciones con IA.

🌐 **En producción:** [nozutech.dev](https://nozutech.dev)

---

## Qué hay dentro

| Ruta | Descripción |
|---|---|
| `/` | Landing: servicios, proyectos y contacto |
| `/scorecard/` | **Scorecard** — cuestionario de 7 preguntas sí/no que estima si un negocio necesita presencia web y qué le falta. Sin backend: la puntuación se calcula en el cliente |

---

## Stack

```
Framework    Next.js 16 (App Router, export estático)
UI           React 19 · TypeScript · Tailwind CSS 4
Componentes  class-variance-authority · clsx · tailwind-merge
Animación    Framer Motion
Iconos       Lucide
Despliegue   GitHub Actions → GitHub Pages
```

Sin base de datos, sin autenticación y sin servidor: todo el sitio se compila a HTML estático.
Es deliberado — una web corporativa de este tamaño no necesita runtime, y así el coste de
alojamiento es cero y no hay nada que se pueda caer.

---

## Puesta en marcha

```bash
npm install
npm run dev      # http://localhost:3000
```

Otros comandos:

```bash
npm run build    # genera el sitio estático en ./out
npm run start    # sirve la build de producción
npm run lint     # ESLint con la config de Next
```

Requiere **Node 22+** (es la versión que usa el pipeline de despliegue).

---

## Despliegue

Automático: cada `push` a `main` dispara
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml), que compila y publica en
GitHub Pages. También se puede lanzar a mano desde la pestaña *Actions* (`workflow_dispatch`).

La configuración relevante está en `next.config.ts`:

```ts
output: "export"        // exportación estática, sin servidor Node
trailingSlash: true     // URLs con barra final, como espera GitHub Pages
images: { unoptimized: true }   // el optimizador de Next necesita servidor
```

> ⚠️ Al ser un export estático **no están disponibles** las rutas de API, el renderizado en
> servidor, ISR ni el middleware. Todo lo dinámico tiene que resolverse en el cliente o vivir
> en un servicio aparte.

---

## Estructura

```
src/app/
├── page.tsx              # landing
├── scorecard/page.tsx    # cuestionario
└── ...                   # layout, estilos y componentes compartidos
public/                   # estáticos (imágenes, iconos, CNAME)
```

---

*© 2026 Jonathan Neto · NozuTech*

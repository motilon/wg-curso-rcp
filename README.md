# Template OVA · Marca Blanca

> Template para crear Objetos Virtuales de Aprendizaje (OVA) Waygroup.
> A partir de este base salen N cursos. Solo varían: **paleta de colores, logo y contenido**.

---

## ⚡ Quickstart

```bash
# 1. Copiar el template con el nombre del curso
cp -R template-blanco/  curso-mi-tema/
cd curso-mi-tema/

# 2. Elegir paleta (1 de 14 presets)
#    → editar el <link rel="stylesheet" href="..."> en cada .html
#    Ejemplo: cambiar  theme-waygroup.css  →  theme-codigo.css

# 3. Reemplazar logo placeholder
#    → assets/img/placeholders/logo.svg

# 4. Editar contenido del curso
#    → assets/js/course.js  (menú, glosario, créditos, referencias)
#    → cada .html (contenido específico de cada pantalla)

# 5. Abrir index.html · listo
```

---

## 📁 Estructura

```
template-blanco/
├── README.md
├── manual-marca.html         ← 📐 Manual visual navegable
├── presets.html              ← 🎨 Selector visual de las 14 paletas
├── showcase.html             ← 📦 Catálogo completo de componentes UI
│
├── index.html                ← 01 Portada
├── bienvenida.html           ← 02 Bienvenida + ficha técnica
├── tema-1.html               ← 03 Demo: KPIs, acordeón, comparativo, callout
├── tema-2.html               ← 04 Demo: tabs, stepper, checklist, descargas
├── actividad.html            ← 05 Quiz + emparejar + ordenar
├── glosario.html             ← 06 Auto-render desde course.js
├── creditos.html             ← 07 Auto-render desde course.js
│
└── assets/
    ├── css/
    │   ├── core.css          ⛔ NO TOCAR · sistema de diseño universal
    │   ├── theme.css         ✅ EDITAR · las 2 variables base
    │   └── presets/          ← 14 paletas pre-validadas
    │       ├── theme-waygroup.css   ⭐ default · naranja + cyan
    │       ├── theme-casco.css      · SST · amarillo + grafito
    │       ├── theme-vital.css      · Salud
    │       ├── theme-costa.css      · Hotelería
    │       ├── theme-codigo.css     · Software
    │       ├── theme-circuito.css   · Electrónica
    │       ├── theme-forja.css      · Mecánica
    │       ├── theme-voltaje.css    · Energía Eléctrica
    │       ├── theme-motor.css      · Automotor
    │       ├── theme-cimiento.css   · Construcción
    │       ├── theme-ruta.css       · Logística
    │       ├── theme-raiz.css       · Agrícola
    │       ├── theme-capital.css    · Finanzas
    │       └── theme-plaza.css      · Comercio
    ├── js/
    │   ├── core.js           ⛔ NO TOCAR · lógica del template
    │   └── course.js         ✅ EDITAR · datos del curso (menú, glosario, créditos)
    └── img/
        ├── placeholders/
        │   └── logo.svg      ✅ REEMPLAZAR · logo del cliente
        └── ...
```

---

## 🎨 Sistema de color · solo 2 variables

```css
:root {
  --c-acento: #F37021;   /* color principal */
  --c-info:   #38E1FF;   /* color contraste */
}
```

**Eso es todo.** El resto del sistema (sidebar, gradientes, glows, soft surfaces, callouts, hovers) se calcula automáticamente con `color-mix()`.

Ver [`presets.html`](presets.html) para ver las 14 paletas pre-validadas en vivo.

---

## 🌗 3 versiones del template

| Versión | Sidebar | Main | Cuándo |
|---|---|---|---|
| **Híbrida** ⭐ default | Dark navy | Claro | Cursos profesionales · contraste fuerte |
| **Clara** | Blanco | Blanco | Cursos académicos · lectura larga |
| **Oscura** | Dark navy | Dark navy | Simulación · el brand brilla como neón |

Toggle visible en el topbar de todas las pantallas. Preferencia persistida en `localStorage`.

Para fijar una versión default en tu curso:
```html
<html lang="es" data-version="oscura">
```

---

## 🧱 Componentes UI disponibles

Catálogo completo en [`showcase.html`](showcase.html). Resumen:

| Familia | Componentes |
|---|---|
| **Layout** | Portada · Ficha técnica · Sidebar + Topbar |
| **Contenido** | Acordeón · Tabs · Callouts (4) · Comparativo VS · Tabla |
| **Datos** | KPI cards · Stepper · Línea de tiempo |
| **Multimedia** | Audio · Podcast · Figura · Antes/Después · Hotspots · Carrusel |
| **Actividades** | Quiz · Checklist · Drag&Drop · Ordenar · Emparejar · Modal |
| **Material** | Descargas · Botones (4 variantes) |

---

## 📐 Documentación

- [`manual-marca.html`](manual-marca.html) — Manual de marca visual navegable (lineamientos obligatorios)
- [`presets.html`](presets.html) — Galería interactiva de las 14 paletas
- [`showcase.html`](showcase.html) — Catálogo de todos los componentes UI

---

## 🚫 Reglas de oro

1. ⛔ **Nunca tocar** `core.css` ni `core.js` — son universales.
2. ✅ **Sí tocar** `theme.css` (o usar un preset) y `course.js`.
3. 📐 **Respetar** el manual de marca.
4. 🎨 **Usar solo** componentes del showcase — no inventar markup propio.
5. 🏷️ El `id` de cada pantalla en `course.js` debe coincidir con `data-current` en cada `.html`.

---

## 🚢 Distribución

Curso terminado es **autocontenido**: HTML + CSS + JS estáticos. Zippeás y subís a cualquier LMS o servidor estático. **No requiere backend.**

---

**Versión:** 1.0 · **Stack:** HTML5 + CSS3 (`color-mix()`) + JS vanilla + Iconify

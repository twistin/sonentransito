# Sistema de Gestión de Imágenes - Son en Transito

## Estructura de Carpetas

```
sonentransito/
├── assets/images/salidas/
│   ├── 2024-10-costa-da-vela/     ← Salida Octubre 2024
│   │   ├── cover.jpg              ← Imagen principal
│   │   ├── IMG_001.jpg
│   │   ├── IMG_002.jpg
│   │   └── ...
│   ├── 2024-11-cangas-marea/      ← Otra salida
│   │   ├── cover.jpg
│   │   └── ...
│   └── 2025-01-faro-hio/          ← Salida Enero 2025
└── content/posts/
    └── 2024-10-costa-da-vela.md   ← Post con esta salida
```

## Convención de Nombres

**Formato de carpeta:** `YYYY-MM-nombre-ubicacion`
- `2024-10-costa-da-vela`
- `2024-11-cangas-marea-alta`
- `2025-01-faro-hio-noche`

---

## Flujo de Trabajo

### 1. Crear carpeta de la salida

```bash
# Ejemplo: salida a Costa da Vela en Octubre 2024
mkdir -p assets/images/salidas/2024-10-costa-da-vela
```

### 2. Copiar las fotos del día

Copia tus imágenes a la carpeta. Renombralas si quieres o déjalas con el nombre original.
- Una imagen debe llamarse `cover.jpg` (será la portada)

### 3. Crear el post de la salida

Crea un archivo en `content/posts/` con este template:

```markdown
---
title: "Costa da Vela"
date: "2024-10-28"
excerpt: "Capturas binaurales y visuales del litoral de Hío, donde el viento atlántico modula el silencio."
coverImage: "/assets/images/salidas/2024-10-costa-da-vela/cover.jpg"
tags:
  - field-recording
  - costa-da-vela
  - galicia
tools:
  - Binaural
  - Field Recording
  - SuperCollider
series: "Paisajes Sonoros"
gallery:
  - image: "/assets/images/salidas/2024-10-costa-da-vela/IMG_001.jpg"
    caption: "Amanecer sobre los acantilados"
  - image: "/assets/images/salidas/2024-10-costa-da-vela/IMG_002.jpg"
    caption: "Formaciones rocosas erosionadas"
  - image: "/assets/images/salidas/2024-10-costa-da-vela/IMG_003.jpg"
    caption: "El faro de Hío en la niebla"
audio:
  - title: "Costa da Vela - Amanecer"
    context: "Captura binaural de las olas y el viento a las 7am."
    url: "/assets/audio/salidas/2024-10-costa-da-vela/captura-01.mp3"
    platform: "local"
    type: "field-recording"
---

## Notas de campo

[Tu texto descriptivo aquí...]

## Proceso

[Descripción del proceso de grabación/captura...]
```

### 4. Verificar en el navegador

La salida aparecerá automáticamente en:
- **Home** → Sección "Laboratorio" (si es reciente)
- **Gallery** → Galería de imágenes
- **Sounds** → Si tiene audio asociado

---

## Añadir a la Galería Global (Opcional)

Si quieres que imágenes aparezcan en la galería sin crear un post completo, edita `content/media/library.json`:

```json
{
  "gallery": [
    {
      "id": "costa-vela-2024-01",
      "image": "/assets/images/salidas/2024-10-costa-da-vela/cover.jpg",
      "caption": "Litoral de Costa da Vela al amanecer",
      "series": "Paisajes Sonoros"
    }
  ]
}
```

---

## Resumen Rápido

| Acción | Dónde |
|--------|-------|
| Guardar imágenes | `assets/images/salidas/YYYY-MM-nombre/` |
| Crear post | `content/posts/YYYY-MM-nombre.md` |
| Galería directa | `content/media/library.json` |
| Audio local | `assets/audio/salidas/YYYY-MM-nombre/` |

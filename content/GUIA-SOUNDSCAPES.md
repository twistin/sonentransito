# Guía: Publicar Soundscapes

## Estructura de Carpetas

```
sonentransito/
├── content/posts/              ← Posts de salidas (.md)
├── public/assets/
│   ├── audio/salidas/          ← Archivos .mp3
│   └── images/salidas/         ← Fotos .jpg/.jpeg/.png
```

---

## Añadir una Nueva Salida de Campo

### 1. Crear carpetas para los assets

```bash
mkdir -p public/assets/audio/salidas/YYYY-MM-nombre-lugar
mkdir -p public/assets/images/salidas/YYYY-MM-nombre-lugar
```

### 2. Copiar archivos

- Audio: `public/assets/audio/salidas/YYYY-MM-nombre-lugar/paisaje.mp3`
- Fotos: `public/assets/images/salidas/YYYY-MM-nombre-lugar/foto1.jpg`

### 3. Crear el post

Crear archivo `content/posts/YYYY-MM-nombre-lugar.md`:

```yaml
---
title: "Nombre del Lugar"
date: "YYYY-MM-DD"
excerpt: "Descripción breve del paisaje sonoro capturado"
coverImage: "/assets/images/salidas/YYYY-MM-nombre-lugar/cover.jpg"
series: "Paisajes Sonoros"
ambientAudio: "/assets/audio/salidas/YYYY-MM-nombre-lugar/paisaje.mp3"
tags:
  - field-recording
  - galicia
tools:
  - Binaural
  - Field Recording
gallery:
  - image: "/assets/images/salidas/YYYY-MM-nombre-lugar/foto1.jpg"
    caption: "Descripción de la foto 1"
  - image: "/assets/images/salidas/YYYY-MM-nombre-lugar/foto2.jpg"
    caption: "Descripción de la foto 2"
---

## Notas de campo

Describe aquí la experiencia, el lugar, las condiciones de grabación...

## Condiciones

- **Fecha**: DD de mes de YYYY
- **Hora**: 00:00 - 00:00
- **Clima**: Descripción
- **Equipo**: Grabadora, micrófonos...

## Reflexión

Observaciones personales sobre el paisaje sonoro.
```

### 4. Publicar

```bash
git add -A
git commit -m "feat: añadir salida NOMBRE-LUGAR"
git push origin main
```

---

## Campos del Front-Matter

| Campo | Obligatorio | Descripción |
|-------|-------------|-------------|
| `title` | ✅ | Nombre del lugar/salida |
| `date` | ✅ | Fecha (YYYY-MM-DD) |
| `excerpt` | ✅ | Descripción breve |
| `coverImage` | ⭕ | Imagen de portada |
| `ambientAudio` | ⭕ | Audio del paisaje (aparece en Sounds) |
| `series` | ⭕ | Agrupa salidas ("Paisajes Sonoros") |
| `tags` | ⭕ | Etiquetas para filtrar |
| `tools` | ⭕ | Equipo/técnicas usadas |
| `gallery` | ⭕ | Array de imágenes con caption |

---

## Resultado

- ✅ El post aparece en la galería
- ✅ El audio aparece en Sounds → Paisajes Sonoros
- ✅ Las fotos aparecen en Gallery

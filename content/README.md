# Sistema de contenido

Esta carpeta centraliza todo el material editorial del sitio:

- `posts/`: Publicaciones largas en Markdown. Cada archivo usa front‑matter YAML para definir título, fecha, portada, galería y audio asociado.
- `pages/`: Textos estáticos (manifiestos, statements, etc.).
- `media/library.json`: Manifiesto ligero con entradas globales de galería y pistas de audio que no provienen de un post concreto.

## Convenciones

1. Nombra los archivos como `YYYY-MM-slug.md` para mantener orden cronológico.
2. Guarda imágenes, audio o video en `assets/` usando la misma raíz (`assets/images/2025-01-rio/cover.jpg`).
3. Enlaza los assets desde el front‑matter usando rutas absolutas (`/assets/images/...`).
4. Evita caracteres especiales en los slugs, usa `-` y minúsculas.

La aplicación procesa estos archivos en tiempo de build, por lo que cualquier cambio requerirá volver a ejecutar `npm run dev` (modo desarrollo) o `npm run build` (producción).

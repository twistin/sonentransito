

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.


## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`

## Flujo editorial

Todo el contenido vivo se organiza fuera del código React:

- `content/posts/`: entradas en Markdown con front‑matter YAML. Puedes duplicar cualquiera de los archivos de ejemplo (`2025-01-tiempo-kairologico.md`) y actualizar título, fecha y rutas de assets.
- `content/media/library.json`: define imágenes de galería y pistas de audio globales (por ejemplo, incrustaciones de SoundCloud). También almacena la lista de proyectos "Próximamente".
- `assets/{images,audio,video}/`: carpeta física para subir portadas, fragmentos y stems. Usa subcarpetas con el mismo slug que tus posts.

> Consejo: usa rutas absolutas (`/assets/images/...`) en el front‑matter. Vite copiará esos recursos al build final siempre que existan en `assets/`.

### Crear una nueva publicación

1. Copia algún archivo dentro de `content/posts/` y renómbralo como `YYYY-MM-mi-slug.md`.
2. Ajusta los campos del front‑matter:
    ```yaml
    ---
    title: "Nuevo paisaje"
    date: "2025-02-14"
    excerpt: "Descripción breve."
    coverImage: "/assets/images/2025-02-nuevo-paisaje/cover.jpg"
    gallery:
       - image: "/assets/images/2025-02-nuevo-paisaje/fragmento-a.jpg"
          caption: "Notas de captura."
    audio:
       - title: "Improvisación"
          context: "Grabación binaural"
          url: "https://soundcloud.com/usuario/track"
          platform: "soundcloud"
    ---
    ```
3. Guarda los archivos multimedia en `assets/images/...` y `assets/audio/...` usando el mismo slug.
4. Reinicia `npm run dev` para que Vite vuelva a indexar los archivos.

### Añadir sonidos o galería sin post

Edita `content/media/library.json` y agrega nuevos objetos bajo `soundTracks` o `gallery`. Estos datos se renderizan automáticamente en las vistas de "Sounds" y "Gallery".

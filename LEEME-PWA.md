# Habitus · by VIRTUS ARS (PWA)

App instalable desde el navegador, con funcionamiento sin conexión. Una PWA necesita estar en HTTPS; GitHub Pages lo da gratis.

## Publicar en GitHub Pages
1. Crea un repositorio **Public** en github.com, por ejemplo `habitus-pwa`.
2. **Add file > Upload files**: sube TODOS los archivos de esta carpeta (no el zip) a la raíz del repositorio y toca **Commit changes**.
3. Ve a **Settings > Pages**. En **Source** elige **Deploy from a branch**, rama **main**, carpeta **/ (root)** y toca **Save**.
4. En 1 o 2 minutos tu app queda en `https://TU-USUARIO.github.io/habitus-pwa/`.

## Instalar en el celular
- **Android (Chrome):** abre el enlace y toca **Instalar app** (botón al final de la página) o el menú ⋮ > **Instalar app**.
- **iPhone (Safari):** botón Compartir > **Añadir a pantalla de inicio**.

## Actualizar
Cambia los archivos en GitHub y sube el número de versión en `sw.js` (`const V = "habitus-v2"`). Al abrir la app se descarga la versión nueva.

## Notas
- Los datos se guardan en el navegador del dispositivo y no se comparten con la app APK.
- Para la tipografía Inter hace falta internet la primera vez; después queda guardada.

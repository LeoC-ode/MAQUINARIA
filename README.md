# Maintenance Core

Aplicación estática (HTML + Tailwind CDN + JavaScript) para el seguimiento de mantenimiento industrial.
Los datos se guardan en `localStorage` del navegador, así que no necesita backend.

## Estructura

```
.
├── index.html              # Tracker (búsqueda por código)
├── service-details.html    # Detalle del servicio (lee ?code= de la URL)
├── admin.html              # Dashboard con CRUD de servicios
└── assets/
    ├── tailwind-config.js  # Tema compartido de Tailwind
    └── app.js              # Capa de datos + shell común (header, sidebar, footer)
```

## Funcionalidad

- **Tracker** (`index.html`): valida el código y redirige al detalle. Incluye códigos de ejemplo clickeables.
- **Service Details**: lee `?code=` de la URL, muestra los datos, permite añadir notas, ciclar el estado o disparar shutdown.
- **Admin Dashboard**: estadísticas en vivo, búsqueda, filtro por estado, modal de creación/edición y borrado.
- **Reset Data**: botón en admin que restaura los datos sembrados.

## Probar localmente

Cualquier servidor estático sirve. Por ejemplo:

```bash
# Con Python
python -m http.server 8000
# Luego abre http://localhost:8000
```

O simplemente abre `index.html` en el navegador (doble clic).

## Desplegar gratis en GitHub Pages

Tu repositorio se llama **MAQUINARIA**.

1. Crea el repositorio `MAQUINARIA` en GitHub (público, sin README ni .gitignore — ya los tienes locales).
2. Desde la carpeta del proyecto, inicializa el repo y publica:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/<tu-usuario>/MAQUINARIA.git
   git push -u origin main
   ```

3. En GitHub abre el repo → **Settings → Pages**.
4. En *Source* selecciona **Deploy from a branch**.
5. Elige `main` y la carpeta `/ (root)`. Guarda.
6. Espera 1-2 minutos. Tu sitio quedará en:
   `https://<tu-usuario>.github.io/MAQUINARIA/`

> Si prefieres GitHub Actions: Settings → Pages → *Source: GitHub Actions* → elige el workflow oficial **Static HTML**. No hay que modificar nada.

# Vita Comex — Sitio corporativo (Etapa 1)

Sitio one-page bilingüe (ES/EN) del grupo Vita Comex, puerta de entrada a sus tres marcas: **Vita Logistics**, **Vita Gourmet** y **Vita Deko**.

Es un sitio **100% estático y autónomo** — HTML + CSS + JavaScript vanilla, con fuentes, logos e imágenes self-hosted. No requiere build, ni framework, ni `node_modules` para funcionar.

---

## Cómo trabajar localmente

Cloná el repo y levantá un servidor estático (cualquiera sirve; hace falta un servidor por las imágenes y fuentes, no basta con abrir el HTML con doble clic):

```bash
git clone <URL-DEL-REPO>
cd vita
npx serve -l 8321        # o:  python -m http.server 8321
```

Abrí <http://localhost:8321>. Editás los archivos y refrescás el navegador (Ctrl+F5).

---

## Estructura

```
index.html            Página principal (one-page: Inicio, Nosotros, Marcas, Contacto)
privacidad.html       Política de privacidad
assets/
  css/style.css       Sistema de diseño completo
  js/main.js          Motor del planeta de partículas + i18n + wizard de contacto
  fonts/              Saira (self-hosted, .woff2)
  vendor/cobe.js      Librería del globo (bundle self-hosted)
  img/                Máscara del mundo + fotos de ciudades
logos/                Set de logos SVG (Comex + las 3 marcas)
CONTEXT.md            Hoja de hechos del negocio
COPY.md               Todo el copy del sitio (ES/EN), verbatim
DESIGN.md             Sistema de diseño + decision log (D-01 … )
```

Las referencias de diseño (`DESIGN(1-4).md`, `DESIGN(Example)*`) se conservan como material de contexto para continuar el trabajo.

---

## Pendientes del cliente (placeholders en el sitio)

- Email, teléfono/WhatsApp, dirección y dominio de Vita Comex.
- Destino del formulario de contacto (email o CRM) — ver el marcador `[PLACEHOLDER]` en `assets/js/main.js`.
- Razón social y dirección fiscal para la política de privacidad.
- URL del sitio de Vita Gourmet (hoy marcado "próximamente").

---

## Publicar (Vercel)

Es estático, así que no hay build. En Vercel: **Add New → Project → Import** este repo → Deploy. La configuración ya está en `vercel.json`.

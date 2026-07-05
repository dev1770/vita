# CONTEXT.md — Sitio corporativo Vita Comex (Etapa 1)

> Hoja de hechos para construir el sitio. Todo lo verificado proviene del brand book oficial, del catálogo PDF de Vita Gourmet y de los sitios vigentes de Logistics y Deko. Lo no definido está marcado como `[PLACEHOLDER]`. Reglas y assets de marca: ver `VITA_COMEX_brand-reference.md`.

---

## 1. Qué es este sitio

- **Sujeto:** Vita Comex — empresa de importación y exportación internacional; marca paraguas de tres submarcas (Vita Logistics, Vita Gourmet, Vita Deko).
- **Tipo:** sitio corporativo **puerta de entrada** (gateway). Presenta a Vita Comex y deriva a cada submarca.
- **Etapa:** 1 de 2. La etapa 2 (fuera de este build) serán sitios dedicados por submarca.
- **Idiomas:** **bilingüe Español / Inglés**, alternable con un **toggle ES/EN en el hero**. Todo el contenido debe existir en ambos idiomas.
- **Audiencia primaria:** **B2B** — importadores/exportadores, distribuidores y mayoristas, compradores institucionales.
- **Acción principal del visitante:** llegar al **mecanismo de contacto** de Vita Comex y/o descubrir las 3 marcas y entrar al sitio de la que le interesa.

---

## 2. Arquitectura de marca

- Marca principal: **Vita Comex** (monocromática: negro / blanco).
- Submarcas (paleta propia cada una): **Vita Logistics**, **Vita Gourmet**, **Vita Deko**.
- Regla: no recolorear una submarca con la paleta de otra ni con la de Comex.

---

## 3. Vita Comex (empresa madre)

- Importación / exportación internacional. Paraguas de las 3 submarcas.
- Logo: **real** (set SVG Comex, monocromático). Favicon: usar variante círculo (`comex_favicon-circle_*`).
- **Placeholders:** dominio, email, teléfono/WhatsApp, dirección, tagline, año de fundación, textos "sobre nosotros" y propuesta de valor corporativa. → `[PLACEHOLDER]` hasta que el cliente los provea.

---

## 4. Showcase de las 3 marcas

Cada card: logo + descriptor corto + productos/servicios clave + botón al sitio de la marca.

### 4.1 Vita Logistics — *verificado (vitalogistics360.com)*
- **Enlace del card:** https://www.vitalogistics360.com
- Descriptor: logística integral de comercio exterior; conecta importadores y exportadores.
- Servicios clave: **flete oceánico**, **flete terrestre** (flota propia), **flete aéreo**, **servicio integral** (proveedor → entrega final).
- Diferenciales: seguimiento en tiempo real, entregas puntuales, logística personalizada. Equipo fundador con +10 años en comercio exterior.
- Contacto real (referencia): info@vitalogistics360.com · +54 9 3513 25-0855 · Av. Sagrada Familia 1564, Córdoba, Argentina · L-V 8:00–17:00, findes guardia operativa 24 h.
- Paleta: `#426BAD` · `#40A879` · `#58585B`.

### 4.2 Vita Gourmet — *verificado (catálogo PDF)*
- **Enlace del card:** `[PLACEHOLDER]` (aún sin sitio; el catálogo PDF puede servir de recurso provisorio).
- Descriptor: marca internacional de alimentos — abastecimiento y comercialización de productos alimenticios para mercados internacionales.
- Enfoque: calidad constante, desarrollo de marcas para exportación, logística internacional, flexibilidad comercial, soluciones adaptadas a cada mercado.
- Clientes: mayoristas, distribuidores, cadenas comerciales, proyectos institucionales. Opera principalmente en América Latina y Caribe.
- **Productos (presentaciones · variantes/specs · origen):**
  - **Aceite de soja** — 900 cc / 1 L — refinado — Argentina
  - **Arroz** — 1 / 5 / 25 / 50 kg — largo fino, T1, T2 — Argentina / Paraguay / Brasil / Guyana
  - **Azúcar cristal** — 1 / 25 / 50 kg — ICUMSA 45 / ICUMSA 150 — Brasil / Colombia / Argentina
  - **Frijol negro** — 1 / 25 kg + Big Bags — Argentina / Brasil
  - **Harina de trigo** — 1 / 25 / 50 kg — 000, panadera, distintos niveles de gluten — Argentina / Turquía
  - **Leche en polvo** — 1 / 25 kg — distintos % de grasa según necesidad
- Nota de marca: el logo de Gourmet muestra **"by BROKEAR"** — se mantiene intacto. Preferir isotipo o lockup según layout.
- Paleta: `#A3B267` · `#4C4F41`.
- Contacto propio: `[PLACEHOLDER]`.

### 4.3 Vita Deko — *verificado (vitadeko.com)*
- **Enlace del card:** https://www.vitadeko.com
- Descriptor: importación directa y distribución nacional de revestimientos modernos, "sin obra", sin intermediarios.
- Categorías de producto: **Autoadhesivas**, **WPC Interior**, **WPC Exterior**, **Pisos SPC sistema click**, **Placa PVC Símil Mármol**, **Adhesivo profesional (Vita Glue)**.
- Programa de distribuidores: precios mayoristas directos, envíos nacionales, catálogo técnico y fichas, muestras físicas, capacitación.
- Contacto real (referencia): info@vitadeko.com · +54 9 3515 20-9555 · Av. Sagrada Familia 1564, Córdoba CP 5006 · Instagram @vita_deko.
- Paleta: `#C89267` · `#997156` + textura símil madera/mármol.

---

## 5. Elementos obligatorios del sitio

1. **Hero impactante** con el toggle de idioma ES/EN.
2. **SEO + GEO de nivel alto** (ver §7).
3. **Showcase de las 3 marcas** con logos + productos/servicios clave + enlace al sitio de cada una (§4).
4. **Mecanismo de contacto** central de Vita Comex (formulario; datos de destino `[PLACEHOLDER]`).

---

## 6. Sistema de marca (para el build)

- **Tipografías:** Saira (principal, todos los textos) + Mairo (script, solo piezas de Gourmet). Saira disponible en Google Fonts.
- **Logos:** usar el set SVG organizado (`/logos/`). Reglas rápidas:
  - Círculo con iso = **solo favicon/miniatura**.
  - Deko: versiones `_web` (livianas) para el sitio; `_PRINT` (~2 MB) no van en web.
  - Gourmet conserva "by BROKEAR".
- **Área de resguardo:** módulo cuadrado = alto del triángulo superior del isotipo, en los 4 lados.
- **6 usos incorrectos** oficiales (no intercambiar colores marca/submarcas, no alterar las letras "ITA", no deformar, fondos permitidos, legibilidad, no cambiar fuentes). Detalle en `VITA_COMEX_brand-reference.md`.

---

## 7. Insumos de SEO / GEO (entidades y términos reales)

> Base factual para meta tags, headings, schema y respuestas a motores generativos. No son claims inventados: son las entidades, categorías y ubicaciones reales del negocio.

- **Entidades:** Vita Comex, Vita Logistics, Vita Gourmet, Vita Deko.
- **Categorías / temas:** comercio exterior, importación, exportación, logística internacional, flete oceánico/terrestre/aéreo, alimentos para exportación (commodities: arroz, azúcar, aceite de soja, harina de trigo, leche en polvo, frijol negro), revestimientos / placas símil mármol / WPC / SPC.
- **Geografía:** Córdoba, Argentina (sede de las submarcas verificadas); mercados operativos: América Latina y Caribe.
- **Schema sugerido:** `Organization` para Vita Comex con `subOrganization`/`brand` para las 3 submarcas; `Product` para los ítems de Gourmet; `hreflang` es/en por el sitio bilingüe.
- **Metas corporativas de Comex (title, description, tagline):** `[PLACEHOLDER]`.

---

## 8. Índice de PLACEHOLDERS (a completar por el cliente)

- Vita Comex: dominio, email, teléfono/WhatsApp, dirección, tagline, año de fundación, copy "sobre nosotros", propuesta de valor, metas SEO.
- Vita Gourmet: URL de su sitio/recurso para el card, contacto propio.
- Contacto central: destino del formulario (email/CRM).

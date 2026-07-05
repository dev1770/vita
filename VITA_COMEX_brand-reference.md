# VITA COMEX — Brand Reference

> Versión liviana del Brand Book oficial (27 slides, 33 MB) para reutilizar como contexto en builds y prompts sin cargar el PDF. Conserva arquitectura, paletas, tipografías, aplicaciones y reglas de uso. Los logos viven como SVG en `/logos/` (color y transparencia exactos, intactos).
> Fuente: `VITA_COMEX-brandbook.pdf`. Nota: Brokear no se usa como **marca paraguas** (esa es **Vita Comex**), pero el **"by BROKEAR" que aparece dentro del logo de Gourmet se mantiene intacto** como parte del arte del logo.

---

## 1. Arquitectura de marca

- **Marca principal:** VITA COMEX (monocromática: negro o blanco).
- **Submarcas** (cada una con paleta propia):
  - VITA LOGISTICS
  - VITA DEKO
  - VITA GOURMET
- Todas comparten el mismo sistema de isotipo (la "V" con corte diagonal + letras "ITA") y el mismo contenedor tipográfico. La submarca cambia por color y por el descriptor inferior (LOGISTICS / DEKO / gourmet).

---

## 2. Paletas cromáticas (hex oficiales)

| Marca | Color 1 | Color 2 | Neutros de apoyo (de los SVG) |
|---|---|---|---|
| **Vita Comex** | `#000000` (full black) | `#FFFFFF` (full white) | — (marca monocromática) |
| **Vita Logistics** | `#426BAD` azul | `#40A879` verde | `#58585B` gris |
| **Vita Deko** | `#C89267` | `#997156` | `#575756` gris · textura símil madera/mármol (ver §5) |
| **Vita Gourmet** | `#A3B267` verde | `#4C4F41` verde oliva oscuro | `#575756` gris · `#000000` |

Notas:
- Logistics: el brandbook destaca azul + verde como paleta; el gris `#58585B` aparece en el texto/“V”.
- Deko: `#C89267` y `#997156` son los dos anclajes de la textura símil-madera; en los SVG la textura real abarca un degradado de ~300 tonos entre `#A66B48` y `#D19B70`. No es un color plano.
- Gourmet: el script "gourmet" y el isotipo usan el verde `#A3B267`; el texto de apoyo usa `#4C4F41` / gris.

---

## 3. Tipografías

- **Saira** — tipografía principal (toda la marca y submarcas). Variantes en uso: **Black, Bold, Regular, Light, ExtraLight**. Es la fuente del contenedor "ITA" y descriptores.
- **Mairo** — tipografía especial **exclusiva de Vita Gourmet** (el script "gourmet").
- Regla: no sustituir estas fuentes; las letras "ITA" no se alteran nunca (ver §6).

Sugerido para web: Saira está en Google Fonts (pesos 300/400/700/900). Mairo es comercial → cargar como webfont propia o usar solo en assets de Gourmet.

---

## 4. Aplicaciones disponibles por marca (índice de archivos `/logos/`)

Cada logo existe como **lockup** (marca completa horizontal) y como **iso** (solo la "V"). Todos en SVG con fondo transparente.

### Vita Comex — `logos/comex/` (marca monocromática)
| Archivo | Qué es | Uso |
|---|---|---|
| `comex_lockup_black.svg` | Lockup completo negro | Fondos claros |
| `comex_lockup_white.svg` | Lockup completo blanco | Fondos oscuros |
| `comex_iso_black.svg` | Solo isotipo, negro | Espacios reducidos |
| `comex_iso_white.svg` | Solo isotipo, blanco | Espacios reducidos, fondo oscuro |
| `comex_favicon-circle_black.svg` | **Iso dentro de círculo, negro** | ⚠️ Solo miniaturas (favicon, avatar, pestaña) |
| `comex_favicon-circle_white.svg` | **Iso dentro de círculo, blanco** | ⚠️ Solo miniaturas, fondo oscuro |

> ⚠️ Las versiones **círculo con iso adentro** (`favicon-circle`) son EXCLUSIVAS para miniaturas (favicon / avatar / pestaña del navegador). No usar como logo principal.

### Vita Logistics — `logos/logistics/` (azul + verde + gris)
| Archivo | Qué es |
|---|---|
| `logistics_lockup_color.svg` | Lockup a color (fondo claro) |
| `logistics_lockup_color-on-dark.svg` | Lockup a color, texto claro (fondo oscuro) |
| `logistics_lockup_color-alt.svg` | Variante de color (texto azul) |
| `logistics_lockup_gray.svg` | Lockup gris/mono |
| `logistics_lockup_black.svg` | Lockup negro |
| `logistics_lockup_white.svg` | Lockup blanco (fondo oscuro) |
| `logistics_iso_color.svg` | Iso a color |
| `logistics_iso_color-alt.svg` | Iso a color (variante) |
| `logistics_iso_black.svg` | Iso negro |
| `logistics_iso_white.svg` | Iso blanco |

### Vita Gourmet — `logos/gourmet/` (verde + oliva · script Mairo)
| Archivo | Qué es |
|---|---|
| `gourmet_lockup_color.svg` | Lockup a color (fondo claro) |
| `gourmet_lockup_color-alt.svg` | Variante de color |
| `gourmet_lockup_color-on-dark.svg` | Lockup a color, texto blanco (fondo oscuro) |
| `gourmet_lockup_black.svg` | Lockup negro |
| `gourmet_lockup_white.svg` | Lockup blanco (fondo oscuro) |
| `gourmet_iso_green.svg` | Iso verde |
| `gourmet_iso_gray.svg` | Iso gris |
| `gourmet_iso_black.svg` | Iso negro |
| `gourmet_iso_white.svg` | Iso blanco |

> ℹ️ Los **lockups de Gourmet incluyen "by BROKEAR"** por diseño. Aunque Brokear no es la marca paraguas (esa es Vita Comex), **ese "by BROKEAR" es parte del logo y se mantiene intacto** — no se edita ni se elimina. Lockup (con tagline) e isotipo son ambos válidos según el layout.

### Vita Deko — `logos/deko/` (símil madera/mármol + gris)
| Archivo | Qué es | Peso / Web |
|---|---|---|
| `deko_lockup_color-on-dark_web.svg` | Lockup color, texto blanco | ✅ Liviano (web) |
| `deko_lockup_black_web.svg` | Lockup negro | ✅ Liviano (web) |
| `deko_lockup_white_web.svg` | Lockup blanco | ✅ Liviano (web) |
| `deko_iso_color_web.svg` | Iso a color (textura) | ✅ Liviano (web) |
| `deko_iso_black_web.svg` | Iso negro | ✅ Liviano (web) |
| `deko_iso_white_web.svg` | Iso blanco | ✅ Liviano (web) |
| `deko_lockup_color_PRINT.svg` | Lockup color (fondo claro) | ⛔ ~2.5 MB — solo print |
| `deko_lockup_gray_PRINT.svg` | Lockup gris | ⛔ ~2.5 MB — solo print |
| `deko_iso_color-graytri_PRINT.svg` | Iso color, triángulo gris | ⛔ ~2 MB — solo print |
| `deko_iso_color-whitetri_PRINT.svg` | Iso color, triángulo blanco | ⛔ ~2 MB — solo print |

> ⚠️ **Deko a color pesa.** La textura símil-madera está vectorizada como malla de degradado (~2 MB por archivo). Los `_PRINT` no sirven para web. Para el sitio usar los `_web` (incrustan la textura como raster comprimido, pocos KB). Si se necesita el lockup color sobre fondo claro en web, exportar `deko_lockup_color_PRINT.svg` a **WebP/PNG** optimizado.

---

## 5. Área de resguardo (clear space)

- Regla del brandbook ("Área de Resguardo ideal"): mantener alrededor del logo un **módulo cuadrado X** de espacio libre en los 4 lados.
- **X = altura del triángulo superior del isotipo** (el corte de la "V"). Ningún otro elemento invade esa zona.
- Aplica igual a marca principal e isos de submarcas.

---

## 6. Usos incorrectos (prohibiciones oficiales)

1. **No intercambiar los colores** entre la marca principal y las submarcas.
2. **No usar otras tipografías** en las submarcas ni eliminar el contenedor.
3. **No alterar la forma** de los logos ni deformarlos.
4. **No usar fondos de colores** que no estén dentro de los permitidos.
5. **No usar aplicaciones ilegibles** (tamaño/contraste insuficiente).
6. **No alterar las fuentes originales** de las letras "ITA".

---

## 7. Guía rápida para el sitio de Vita Comex (etapa 1)

- **Header / hero:** `comex_lockup_white.svg` sobre fondo oscuro, o `comex_lockup_black.svg` sobre claro.
- **Favicon / pestaña:** `comex_favicon-circle_black.svg` o `_white`.
- **Showcase de submarcas:** usar los **iso** o lockups `_web` de cada submarca respetando su paleta (no recolorear con el color de otra submarca — regla §6.1).
  - Logistics → `logistics_iso_color.svg` / `logistics_lockup_color.svg`
  - Deko → `deko_iso_color_web.svg` / `deko_lockup_color-on-dark_web.svg`
  - Gourmet → `gourmet_iso_green.svg` o `gourmet_lockup_color.svg` (el lockup conserva "by BROKEAR", que se mantiene intacto)
- **Tipografía web:** Saira (Google Fonts). Reservar Mairo solo para piezas de Gourmet.

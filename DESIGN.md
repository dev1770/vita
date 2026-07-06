# DESIGN.md — Vita Comex · Design System (Etapa 1)

> Merged design system for the Vita Comex gateway site.
> **Sources & precedence:** Brand kit (`VITA_COMEX_brand-reference.md`) wins on **colours and fonts**. Reference files win on **layout and feel**, in priority order: `DESIGN(1)` Cosmos Network (hero + background animation, followed near-exactly) → `DESIGN(2)` Atlas Card → `DESIGN(3)` Auros → `DESIGN(4)` Hyperstudio. On any conflict between references, the lower number wins.
> **Theme:** dark mode first. The site ships dark; light mode is a defined inversion, not a separate design.

---

## 1. Design direction (one paragraph)

A near-black institutional canvas where white Saira typography does all the visual work — measured, ceremonial, high-trust (Cosmos). The Vita Comex brand is natively monochrome black/white, so brand and reference align: colour is almost entirely suppressed at the group level, and the **only chromatic moments on the site are the three sub-brand palettes, contained strictly inside each brand's showcase card and logo**. Layout follows Cosmos' disciplined two-column hero and quiet 80px section rhythm; Atlas contributes cinematic restraint and soft gradient transitions; Auros contributes tracked uppercase eyebrows and glowing stat counters; Hyperstudio contributes hairline dividers as section structure.

---

## 2. Colours (dark mode first)

### 2.1 Core system (from Cosmos, re-anchored to Comex black/white)

| Name | Value | Token | Role |
|------|-------|-------|------|
| Void | `#000000` | `--color-void` | Page canvas, section backgrounds (= Comex full black) |
| Carbon | `#181818` | `--color-carbon` | Nav bar, footer surface |
| Graphite | `#1e1f20` | `--color-graphite` | Card surfaces, contact wizard cards, elevated panels |
| Iron | `#333333` | `--color-iron` | Hairline borders, dividers (the structural line work — Hyperstudio pattern, Cosmos value) |
| Slate | `#807f7f` | `--color-slate` | Muted secondary text, inactive nav, metadata |
| Fog | `#999999` | `--color-fog` | Disabled labels, tertiary text |
| Chalk | `#f1f4f4` | `--color-chalk` | Inverted light surface (light-mode canvas) |
| Pure White | `#ffffff` | `--color-white` | Headings, body text, icon strokes, button borders (= Comex full white) — the single chromatic force at group level |

### 2.2 Sub-brand palettes (brand kit — containment rule)

Used **only** inside each brand's showcase card, logo, accent hairline, and hover glow. Never as section backgrounds, never as button fills, never cross-assigned (brand rule §6.1: no recolouring one brand with another's palette).

| Brand | Accent 1 | Accent 2 | Support |
|-------|----------|----------|---------|
| Vita Logistics | `#426BAD` | `#40A879` | `#58585B` |
| Vita Gourmet | `#A3B267` | `#4C4F41` | `#575756` |
| Vita Deko | `#C89267` | `#997156` | `#575756` + wood/marble texture (use `_web` SVG assets only) |

**In-card usage pattern:** logo at natural colours (`*_color-on-dark` / `*_web` variants on the dark canvas) + a 2px accent hairline in Accent 1 at the card top + Accent 1 at ~15% opacity for hover wash. Everything else in the card stays white/slate.

### 2.3 Surfaces & elevation

| Level | Value | Purpose |
|-------|-------|---------|
| 0 | `#000000` | Page canvas |
| 1 | `#181818` | Nav, footer |
| 2 | `#1e1f20` | Cards, wizard panels |

**No shadows, no glows, no gradients between surfaces** (Cosmos + all four references agree). Elevation = surface tone shift only. The single permitted gradient: Atlas' image-to-void fade (`#141414 → #000000`) at the bottom edge of any hero/photographic band, so no hard cuts against the canvas.

### 2.4 Light mode (inversion, secondary)

Comex is monochrome, so light mode is a strict inversion: canvas `#ffffff`/`#f1f4f4`, text `#000000`, borders `#e0e0e0`, cards `#f1f4f4`, logos switch to `*_black` variants. Sub-brand cards use `*_color` (on-light) logo variants. Nothing else changes — spacing, type, and components are theme-independent. Dark is the default and the design target; light is derived.

---

## 3. Fonts (brand wins)

**Saira** (Google Fonts) is the sole web typeface — replacing Cosmos' 'The Future' while keeping its typographic system: **weight 400 everywhere, hierarchy through size + positive tracking + colour de-emphasis, never bold**. Load weights 300/400 only (300 reserved as an optional display refinement; see Decision Log D-08).

**Mairo** (Gourmet script) is never loaded as a webfont — it lives only inside the Gourmet SVG logo assets, which are used as-is.

### Type scale (Cosmos scale, applied to Saira)

| Role | Size | Line height | Letter spacing | Token |
|------|------|-------------|----------------|-------|
| caption | 12px | 1.5 | 0.24px | `--text-caption` |
| body-sm | 14px | 1.43 | 0.28px | `--text-body-sm` |
| body | 16px | 1.6 | 0.4px | `--text-body` |
| subheading | 24px | 1.33 | 0.6px | `--text-subheading` |
| heading-sm | 32px | 1.25 | 0.8px | `--text-heading-sm` |
| heading | 36px | 1.13 | 0.9px | `--text-heading` |
| display | 60px (clamp to ~36px mobile) | 1.13 | 2.4px | `--text-display` |

- **Eyebrow/kicker labels** (Auros pattern): 12px, uppercase, letter-spacing 0.12em, Slate.
- Body copy max-width ~540px in hero context, ~640px in narrative blocks (Atlas).
- ES is the default language; EN swaps via JS toggle — same scale for both.

---

## 4. Spacing, shapes & layout (references win)

- **Base rhythm:** Cosmos spacing scale: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40 / 48 / 80 / 100px (`--spacing-*`).
- **Page max-width:** 1280px, centered, generous outer padding.
- **Section gap:** 80px (Cosmos); sections separated on the same #000000 canvas — **no alternating background bands**. Optional 1px `#333333` hairline rule between major sections (Hyperstudio).
- **Card padding:** 20px (showcase cards) / 32–40px (wizard cards).
- **Radii:** buttons & nav pills **20px** · cards **20px** · large cards/wizard **30px** · images **10px**. Pill geometry is preserved everywhere interactive (Cosmos rule).
- **Density:** comfortable → spacious. Whitespace is a material.

---

## 5. Components

### 5.1 Hero (from DESIGN(1), near-exact)
Two-column split on the #000000 canvas: **left ~55%** — eyebrow `VITA COMEX` (12px uppercase tracked Slate), H1 tagline at 60px Saira 400 white (letter-spacing 2.4px, line-height 1.13), body at 16px Slate-white max-width 540px, then the two ghost pill CTAs side by side («Conocer nuestras marcas» / «Contactar»). **Right ~45%** — the **orbital brand visualization** (see 5.2). The ES/EN toggle sits in the hero's top-right as a small ghost pill (see 5.9). `comex_lockup_white.svg` in the nav above.

### 5.2 Background animation — Orbital brand visualization (from DESIGN(1), near-exact)
Vita's version of Cosmos' globe diagram: a dark-toned globe/sphere rendered in dots or fine strokes, with **concentric circles radiating from a central Vita Comex iso node** (`comex_iso_white.svg`). Three white annotation labels orbit on the rings: **VITA LOGISTICS · VITA GOURMET · VITA DEKO** (12px uppercase tracked). Animation: slow continuous rotation of the rings/particles plus a soft radar-pulse expanding outward from the center node every few seconds — quiet and continuous, never bouncy. Strokes in white at low opacity and `#085556`-style desaturated teal per Cosmos infographic accent. Respects `prefers-reduced-motion` (static diagram fallback). This visualization is the site's defining visual and may faintly persist behind other sections at very low opacity.

### 5.3 Navigation bar
Carbon `#181818`, full-width, ~80px height. Left: `comex_lockup_white.svg` (clear-space rule: free margin = height of the iso's top triangle on all 4 sides). Center: Inicio · Nosotros · Marcas · Contacto at 16px Saira 400 white/Slate. Right: ghost pill CTA «Contactar». 1px `#333333` bottom hairline.

### 5.4 Ghost pill button (canonical action)
Transparent fill, 1px `#ffffff` border, 20px radius, 10px 30px padding, Saira 16px 400, letter-spacing 0.025em, trailing `›`. Hover: white fill at 8% opacity. **No filled buttons at group level** — the ghost pill is the only action surface (Cosmos rule; overrides Atlas' filled sapphire CTA and Hyperstudio's white pill).

### 5.5 Brand showcase card
`#1e1f20` surface, 20px radius, 20px padding, no border/shadow. Top: 2px accent hairline in the brand's Accent 1. Brand lockup (`logistics_lockup_color-on-dark.svg` / `gourmet_lockup_color-on-dark.svg` — "by BROKEAR" intact — / `deko_lockup_color-on-dark_web.svg`) at natural colours. Name at 24px white, descriptor at 16px Slate, small uppercase category tag at bottom (12px, Slate — Cosmos case-study pattern). CTA: ghost pill «Visitar sitio ›»; Gourmet gets a Slate text badge «Sitio próximamente» instead. Hover: Accent 1 wash at ~15% opacity. On the home page the three cards sit in a row (stack on mobile); on /marcas each brand expands to a full two-column section alternating text/visual.

### 5.6 Stat / proof strip (Cosmos structure, Auros emphasis)
Horizontal row below the hero: value at 24–32px white («+10 años», «Operaciones reales», «Alcance internacional») + descriptor at 16px Slate, 30px+ gaps, no dividers.

### 5.7 Contact wizard cards
One card visible at a time, centered, max-width ~640px (Atlas' intimate column). `#1e1f20` surface, **30px radius** (large-card), 32–40px padding. Question at 24px white centered; preset answers as full-width ghost pill options (1px `#333333` border, white text, hover → white border) — selecting one auto-advances with a 250ms slide-left transition. «Otro» expands an inline text field (bottom-hairline style, no box); «Siguiente ›» ghost pill fades in only when text exists. Final card: two hairline inputs (Email*, Teléfono) + «Enviar ›» always visible. Progress «Paso n de 4» at 12px uppercase tracked Slate, top of card; «← Anterior» as 14px Slate text link.

### 5.8 Section header pattern
Eyebrow (12px uppercase tracked Slate) → heading (36px white) → optional intro (16px Slate, max-width 640px). Left-aligned in two-column sections, centered in narrative sections (Nosotros uses Atlas' centered 640px editorial column).

### 5.9 Language toggle (ES/EN)
Small ghost pill in the hero top-right (and persisted in the nav on inner pages): `ES | EN` at 14px, active language white, inactive Slate. Switching swaps copy in place (same URL) and updates `<html lang>`.

### 5.10 Footer
Carbon `#181818`, 1px `#333333` top hairline, generous vertical padding (recessed-well feel from Auros). `comex_lockup_white.svg`, tagline, the three sub-brand names as text links, placeholders for contact data, «Privacidad», copyright line at 12px Slate.

---

## 6. Do's & Don'ts (merged)

**Do**
- Keep the canvas pure `#000000` with `#1e1f20` as the only card elevation.
- Saira 400 everywhere; hierarchy via size, tracking, and Slate de-emphasis.
- Positive letter-spacing on every text element, per the scale.
- 20px radius on all interactive surfaces; 30px on wizard cards.
- Contain sub-brand colour inside its own card; logos always at natural colours, `_web` variants for Deko.
- Respect logo clear space (module = height of the iso's top triangle) and `prefers-reduced-motion`.

**Don't**
- No second typeface (Mairo only inside Gourmet SVG art). No bold, no italics.
- No box-shadows, glows, or surface gradients (only the image-to-void fade).
- No coloured section backgrounds; sub-brand palettes never fill buttons or sections.
- No filled buttons — ghost pill only.
- No default-link blue; links are white with optional underline.
- Never use `favicon-circle` assets as a page logo (miniatures only) or `_PRINT` Deko files on the web.

---

## 7. Decision log

Every design decision gets a row. Newest at the bottom.

| # | Date | Decision | Why | Source/Winner |
|---|------|----------|-----|---------------|
| D-01 | 2026-07-05 | Site structure: Home + Nosotros + Marcas + Contacto + Privacidad | Client choice over one-pager | Client |
| D-02 | 2026-07-05 | Bilingual via JS toggle on one URL, ES default and SEO-primary | Client choice; simpler build accepted over per-language URLs | Client |
| D-03 | 2026-07-05 | Official tagline: «Un grupo internacional. Tres marcas especializadas.» | Chosen from 4 options; brand-architecture-led | Client |
| D-04 | 2026-07-05 | Dark mode first; light mode is a strict monochrome inversion | Client brief; Comex brand is natively black/white | Client + Brand |
| D-05 | 2026-07-05 | Core palette = Cosmos neutral stack re-anchored to Comex black/white; Cosmos' mint/navy/teal accents dropped from UI (teal kept only inside the hero visualization strokes) | Brand wins on colours; Comex is monochrome | Brand > DESIGN(1) |
| D-06 | 2026-07-05 | Sub-brand palettes appear only inside their own showcase cards (hairline + logo + hover wash) | Brand rule §6.1 (no cross-colouring) + Cosmos "no coloured section backgrounds" | Brand + DESIGN(1) |
| D-07 | 2026-07-05 | Saira replaces 'The Future' as sole typeface; Mairo never loaded as webfont | Brand wins on fonts; brand book: Saira principal, Mairo Gourmet-only | Brand |
| D-08 | 2026-07-05 | Single weight 400 + positive tracking for all hierarchy (no bold), despite brand book print usage of Black/Bold | References win on feel; Cosmos' single-weight system is the chosen voice | DESIGN(1) > Brand print usage |
| D-09 | 2026-07-05 | Hero: two-column split (text left ~55%, visualization right ~45%), 60px display, ghost pill CTAs | Followed near-exactly per client instruction | DESIGN(1) |
| D-10 | 2026-07-05 | Background animation: orbital brand visualization — concentric rings + globe around a Comex iso node, annotated with the 3 sub-brands, slow rotation + radar pulse, reduced-motion fallback | Vita adaptation of Cosmos' globe diagram; annotations repurposed for the sub-brands | DESIGN(1) |
| D-11 | 2026-07-05 | Ghost pill (1px white border, 20px radius) is the only button; no filled CTAs | Cosmos canonical action; overrides Atlas filled CTA and Hyperstudio white pill | DESIGN(1) > (2)(4) |
| D-12 | 2026-07-05 | No shadows/glows anywhere; elevation via surface steps; single permitted gradient = image-to-void fade | Unanimous across references; fade from Atlas | All + DESIGN(2) |
| D-13 | 2026-07-05 | Contact wizard: centered 640px cards, 30px radius, preset ghost-pill answers auto-advance, «Otro» reveals inline field + Siguiente, final card Email*+Teléfono+Enviar | Client-designed flow; column width/feel from Atlas, surface from Cosmos | Client + DESIGN(2) |
| D-14 | 2026-07-05 | Eyebrow labels: 12px uppercase 0.12em tracked Slate above every section heading | Instrument-panel labeling feel | DESIGN(3) |
| D-15 | 2026-07-05 | Hairline 1px #333333 rules as optional section separators; no background-band alternation | Structure carved by line, not colour | DESIGN(4) + DESIGN(1) |
| D-16 | 2026-07-05 | Nosotros uses a centered ~640px editorial column | Letter-like narrative reading | DESIGN(2) |
| D-17 | 2026-07-05 | Logo usage: lockup_white in nav/footer, favicon-circle only for favicon, Deko `_web` assets only, Gourmet "by BROKEAR" intact, clear-space module enforced | Brand book rules | Brand |
| D-18 | 2026-07-05 | Mobile optimization layer (§8): desktop specs untouched; below 1024/768px every component follows a defined stacking/scaling adaptation; fluid type via clamp(); ≥44px touch targets; hover states become active states | Client requirement: mobile-optimized without changing desktop | Client |

| D-19 | 2026-07-05 | Saira is self-hosted (woff2 variable font, weights 300–400, in `/assets/fonts/`) instead of hotlinking Google Fonts | Client hard rule: no third-party embeds at runtime | Client |
| D-20 | 2026-07-05 | Reveal-on-scroll animations are gated behind an `html.js` class added by JavaScript | Without JS (crawlers, no-JS users) all content must be visible — SEO-first requirement | Build |

| D-21 | 2026-07-05 | One-page architecture: Inicio/Nosotros/Marcas/Contacto are sections of a single page; nav links fast-scroll (custom-eased, ~0.5–1s) with scrollspy; the Marcas teaser cards were removed — the full brand detail lives on the home page; Privacidad remains a separate legal page | Client: no sub-pages, no duplicated brand content | Client |
| D-22 | 2026-07-05 | Hero follows DESIGN(1) exactly (no logo inside the diagram — canvas-rendered dot globe + concentric rings + white annotations). Hero pins for 280vh: scrolling zooms it toward center while blurring to 20px, copy rises and fades first, then the diagram exits via ring-expansion + fade as the next section slides over it. Reduced-motion gets a static 100vh hero | Client: DESIGN(1) hero verbatim + seamless blur/zoom scroll transition with a designed exit | Client + DESIGN(1) |

| D-23 | 2026-07-05 | Hero animation replaced with a real WebGL dotted-earth globe (cobe v0.6.4 + phenomenon, self-hosted bundle at `assets/vendor/cobe.js`), dark-adapted lighting, drag-to-rotate, markers on the six verified product-origin countries. The reference's polaroid photo markers were rejected (stock photos = invented content + third-party assets). cobe 2.0.1 was tried first but its map texture never rendered in testing; 0.6.4 is the proven build | Client: reference component adopted with adapted lighting; hard rules preserved | Client |
| D-24 | 2026-07-05 | Site-wide ambient background: BackgroundBeams adaptation (same beam geometry, SMIL-animated gradients recolored white→teal, no React/framer-motion) + fixed teal radial vignette. Partially overrides D-12's flat-black rule for the page background — surfaces/cards remain flat | Client: flat black deemed not premium; reference background adopted | Client |
| D-25 | 2026-07-05 | Hero pin shortened 280vh→210vh (185vh mobile), overlap −55vh, exit phase 0.50–0.85: the stat strip slides in while the blurred globe is still fading — no empty-screen moment at any scroll position | Client: transition left too much dead time | Client |
| D-26 | 2026-07-05 | Premium pass: brand blocks get outline ghost numerals (01/02/03), accent-keylined feature groups, panels with accent radial glow + dot grid + gradient hairline; stat values count up on entry; wizard gets a drawn progress bar; Nosotros lead at subheading scale with hairline section marks; footer link micro-interactions | Client: sections too simple | Client |

| D-27 | 2026-07-05 | Globe upgraded: larger (47vw/700px), slower seamless rotation (0.0011 rad/frame) with a breathing tilt oscillation, and the reference's polaroid city cards — 14 cities (reference six + Buenos Aires, São Paulo, La Habana, Ciudad de México, Toronto, Pekín, Nueva Delhi, Moscú), Spanish captions, photos self-hosted (six exact Unsplash images from the reference + Wikipedia lead images), max 4 cards visible, cards fade+blur behind the horizon. Brand-name labels removed from the globe. Cards are desktop-only (mobile globe is a low-opacity backdrop). Marker→screen projection calibrated numerically against cobe's own rendering (readPixels measurement, least-squares fit, ~4px RMS) since cobe 0.6.4 lacks CSS anchor positioning | Client spec for the hero globe | Client |

| D-28 | 2026-07-05 | City cards restyled to the system (graphite surface, iron hairline border, chalk uppercase tracked caption — no more white polaroids); card width now fits the caption (`max-content`, photo stretches) so long names never clip. Mobile hero redesigned: below 1024px the pin is disabled, the hero is a static stack (copy → globe), the globe shows at full opacity with cards enabled (smaller, max 3) | Client: cards must match the aesthetic, names must fit, globe must be visible on mobile | Client |

| D-29 | 2026-07-05 | **v0.2 redesign** per DESIGN(Example) (Dala reference): pure-black void, monumental weight-400 headlines with -0.04em tracking (Saira variable, display up to 104px), weight-200 body, zero panels/borders — everything floats. Reference's violet CTA → filled white pill; amber emphasis → legible teal (#35a29e) eyebrows. Beams background and all graphite surfaces removed | Client-directed deep redesign; v0.1 tagged for rollback | Client + DESIGN(Example) |
| D-30 | 2026-07-05 | Signature visual: persistent canvas field of ~2200 outlined "V" glyphs (the Comex iso gesture, replacing the reference's triangles) coloured in the three sub-brand palettes + teal + white. Sprite-atlas renderer (7 colours × 3 sizes × 16 rotations), twinkle, per-particle spin | Client: shapes must be the brand "V"; colours from the brand | Client + DESIGN(Example) |
| D-31 | 2026-07-05 | Scroll-driven formations, always returning to a planet: hero = rotating planet right → dissolves into a terrain wave (ref 2-transition-3) → starfield behind the Nosotros narrative (ref 3) → re-forms as a great side planet for Marcas (ref 4) → disperses behind Contacto. Timeline keyed to [data-formation] elements with full-viewport cosmos-gap spacers; per-particle staggered morph for the organic dissolve/reform | Client-confirmed formation mapping | Client + DESIGN(Example) |
| D-32 | 2026-07-05 | Header logo enlarged to 54px (40px mobile); nav transparent with top fade, uppercase 600 labels; hero pin removed — the whole page flows and the cosmos reacts to scroll position | Client: bigger logo; reference nav pattern | Client |

| D-33 | 2026-07-05 | Iteration 2 on the redesign: glyphs reverted to the reference's outlined **triangles** (V-glyphs rejected by client); the planet now has **real continents** (particles distributed via the 256×128 world land mask, cos-lat corrected) with regional colour patches, a dim ocean/silhouette layer so the sphere reads at every rotation, ~4600 particles desktop, large ambient triangle accents. Brand cards returned as **glass surfaces** (dark translucent + hairline border + accent gradient top + ghost numerals + keylined features), wizard in a glass card, drawn section rules — defined boundaries restored. Mobile is a faithful adaptation: the planet is the focal element at the top of the hero viewport at full alpha, copy below; brand order randomized per visit | Client corrections after v0.2 first pass | Client + DESIGN(Example) |

| D-34 | 2026-07-05 | Refinement round: type scale reduced across the board (display 84px desktop / 33px mobile, body 16.5/15.5px) for elegance; brand cards enriched (logos at 64–84px with accent drop-glow, dual radial accent light washes inside the card, hover intensifies) and ghost numerals removed; ambient loose triangles cut 15%→7% and dimmed; particle self-rotation ~3× faster with 24 rotation steps (fluid); hero planet rotation +60% (0.082 rad/s) | Client feedback (6 points) | Client |

*(Future decisions append here as D-35, D-36, …)*

---

## 8. Mobile optimization (desktop untouched)

> Principle: everything in §2–§6 describes desktop (≥1024px) and stays exactly as specified. Below that, each component has a defined adaptation. Nothing is redesigned for mobile — it stacks, scales, and gains touch affordances. Dark canvas, monochrome discipline, pill geometry, and the no-shadow rule are identical at every size.

### 9.1 Breakpoints

| Token | Width | Meaning |
|-------|-------|---------|
| `--bp-desktop` | ≥1024px | Full spec as written in §2–§6 |
| `--bp-tablet` | 768–1023px | Two-column sections collapse; nav condenses |
| `--bp-mobile` | <768px | Single column everywhere; fluid type floor |

### 9.2 Fluid type (clamp scale)

Desktop sizes are the `max` of each clamp — unchanged at ≥1024px.

| Role | Rule |
|------|------|
| display | `clamp(34px, 5vw + 16px, 60px)` — tracking scales down proportionally (2.4px → ~1.2px at floor) |
| heading | `clamp(28px, 3vw + 12px, 36px)` |
| heading-sm | `clamp(24px, 2.5vw + 10px, 32px)` |
| subheading | `clamp(20px, 2vw + 8px, 24px)` |
| body / body-sm / caption | fixed — 16/14/12px are already mobile-safe; body line-height 1.6 preserved |

### 9.3 Spacing & layout adaptations

- **Section gap:** 80px → **48px** (<768px). Hairline dividers unchanged.
- **Outer gutter:** 20px minimum on both edges; content never touches the viewport edge.
- **Card padding:** 20px stays; wizard cards 32–40px → **24px**.
- **Narrative columns** (Nosotros, wizard): max-width 640px simply becomes full-width minus gutters — same centered feel.

### 9.4 Component adaptations

| Component | <768px behaviour |
|-----------|------------------|
| **Hero (5.1)** | Columns stack: eyebrow → H1 → body → CTAs (full-width, stacked vertically with 12px gap) → orbital visualization below at reduced scale (~70%), or as a low-opacity backdrop behind the text if vertical space is tight. Text stays left-aligned. ES/EN toggle stays visible top-right of the hero — never buried in a menu. |
| **Orbital animation (5.2)** | Particle/ring count reduced (~50%) for performance; rotation only, radar pulse dropped; `prefers-reduced-motion` static fallback unchanged. Annotation labels remain legible at 12px — rings scale, labels don't. |
| **Nav (5.3)** | Height 64px. Logo left (iso `comex_iso_white.svg` if the lockup crowds clear space), hamburger right. Menu opens as a full-screen Carbon overlay: links at subheading size, stacked, 16px vertical padding each; «Contactar» ghost pill at the bottom. No dropdowns. |
| **Ghost pill buttons (5.4)** | Min-height 44px, full-width in stacked CTA contexts, centered text. Hover wash becomes `:active` wash. |
| **Brand showcase cards (5.5)** | Home: horizontal row → vertical stack, full-width, 16px gap. /marcas: two-column brand sections → single column, text first, visual second. Accent hairline and in-card palette rules identical. |
| **Stat strip (5.6)** | Wraps to a vertical stack (or 1-per-row), left-aligned, 24px gaps; sizes unchanged. |
| **Contact wizard (5.7)** | Full-width card minus gutters, 24px padding, 30px radius kept. Preset answer pills: full-width, min-height 48px, 12px gap — thumb-first targets. Auto-advance transition unchanged (250ms). Inputs at 16px font (prevents iOS zoom). «Enviar»/«Siguiente» full-width. Progress and «← Anterior» stay at the card top. |
| **Section headers (5.8)** | Unchanged pattern; centered variants stay centered. |
| **Language toggle (5.9)** | Persistent in hero and in the mobile menu header; 44px touch target. |
| **Footer (5.10)** | Columns stack left-aligned: lockup → tagline → brand links → contact placeholders → legal. Vertical padding 48px. |

### 9.5 Touch & performance rules

- All interactive elements ≥44×44px; ≥8px between adjacent targets.
- No hover-dependent information — anything revealed on hover must be visible or reachable by tap on mobile.
- Animation: CSS transforms/opacity only, `will-change` sparingly; the orbital visualization pauses when off-viewport (IntersectionObserver).
- Images/logos: SVG everywhere as specced; Deko `_web` assets only — nothing heavier loads on mobile.
- No horizontal scroll, ever; long content wraps inside its container.

---

## 9. Quick start — CSS custom properties

```css
:root {
  /* Colours — core (dark first) */
  --color-void: #000000;
  --color-carbon: #181818;
  --color-graphite: #1e1f20;
  --color-iron: #333333;
  --color-slate: #807f7f;
  --color-fog: #999999;
  --color-chalk: #f1f4f4;
  --color-white: #ffffff;

  /* Colours — sub-brands (contained use only) */
  --logistics-1: #426BAD; --logistics-2: #40A879; --logistics-gray: #58585B;
  --gourmet-1: #A3B267;  --gourmet-2: #4C4F41;  --gourmet-gray: #575756;
  --deko-1: #C89267;     --deko-2: #997156;     --deko-gray: #575756;

  /* Typography */
  --font-saira: 'Saira', ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --text-caption: 12px;    --leading-caption: 1.5;  --tracking-caption: 0.24px;
  --text-body-sm: 14px;    --leading-body-sm: 1.43; --tracking-body-sm: 0.28px;
  --text-body: 16px;       --leading-body: 1.6;     --tracking-body: 0.4px;
  --text-subheading: 24px; --leading-subheading: 1.33; --tracking-subheading: 0.6px;
  --text-heading-sm: 32px; --leading-heading-sm: 1.25; --tracking-heading-sm: 0.8px;
  --text-heading: 36px;    --leading-heading: 1.13; --tracking-heading: 0.9px;
  --text-display: 60px;    --leading-display: 1.13; --tracking-display: 2.4px;
  --font-weight-regular: 400;
  --tracking-eyebrow: 0.12em;

  /* Spacing & layout */
  --spacing-4: 4px; --spacing-8: 8px; --spacing-12: 12px; --spacing-16: 16px;
  --spacing-20: 20px; --spacing-24: 24px; --spacing-32: 32px; --spacing-40: 40px;
  --spacing-48: 48px; --spacing-80: 80px; --spacing-100: 100px;
  --page-max-width: 1280px;
  --section-gap: 80px;
  --card-padding: 20px;
  --narrative-max-width: 640px;

  /* Radii */
  --radius-buttons: 20px;
  --radius-cards: 20px;
  --radius-large-cards: 30px;
  --radius-images: 10px;

  /* Transitions */
  --wizard-advance: 250ms ease;
  --gradient-image-fade: linear-gradient(#141414, #000000);
}
```

**Assets note:** the `/logos/` SVG set referenced throughout lives in `VITA_COMEX_logos+brand-reference.zip` — extract to `/logos/` at build time.

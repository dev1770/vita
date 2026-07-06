/* VITA COMEX — main.js (v0.2 redesign, iteration 2)
   Cosmos engine: thousands of outlined triangle glyphs (reference-faithful) in the
   three sub-brand palettes. Land-mask-driven PLANET with real continents and
   regional colour patches; ambient triangle field around it (with large accents).
   Forms a rotating planet in the hero, dissolves into a terrain wave, drifts as a
   starfield behind Nosotros, re-forms as a great side planet for Marcas, and
   disperses behind Contacto. Full-alpha on mobile — the planet is a focus there too.
   Plus: i18n ES/EN · nav · fast anchor scroll · scrollspy · reveals · wizard. */

(function () {
  'use strict';

  var docEl = document.documentElement;
  docEl.classList.add('js');

  var REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------------- i18n ---------------- */
  var LANG_KEY = 'vita-lang';

  function applyLang(lang) {
    var isEN = lang === 'en';
    document.querySelectorAll('[data-en]').forEach(function (el) {
      if (el.dataset.es === undefined) el.dataset.es = el.textContent;
      el.textContent = isEN ? el.dataset.en : el.dataset.es;
    });
    document.querySelectorAll('[data-en-placeholder]').forEach(function (el) {
      if (el.dataset.esPlaceholder === undefined) el.dataset.esPlaceholder = el.getAttribute('placeholder') || '';
      el.setAttribute('placeholder', isEN ? el.dataset.enPlaceholder : el.dataset.esPlaceholder);
    });
    document.querySelectorAll('[data-en-content]').forEach(function (el) {
      if (el.dataset.esContent === undefined) el.dataset.esContent = el.getAttribute('content') || '';
      el.setAttribute('content', isEN ? el.dataset.enContent : el.dataset.esContent);
    });
    var titleEl = document.querySelector('title');
    if (titleEl && titleEl.dataset.en) {
      if (titleEl.dataset.es === undefined) titleEl.dataset.es = titleEl.textContent;
      titleEl.textContent = isEN ? titleEl.dataset.en : titleEl.dataset.es;
    }
    docEl.setAttribute('lang', isEN ? 'en' : 'es');
    document.querySelectorAll('.lang-toggle .lang').forEach(function (el) {
      el.classList.toggle('is-active', el.dataset.lang === lang);
    });
    try { localStorage.setItem(LANG_KEY, lang); } catch (e) {}
  }

  function currentLang() {
    try { return localStorage.getItem(LANG_KEY) || 'es'; } catch (e) { return 'es'; }
  }

  document.querySelectorAll('.lang-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(currentLang() === 'es' ? 'en' : 'es');
    });
  });
  if (currentLang() === 'en') applyLang('en');

  /* ---------------- Load-in ---------------- */
  window.addEventListener('load', function () {
    requestAnimationFrame(function () { docEl.classList.add('is-loaded'); });
  });
  setTimeout(function () { docEl.classList.add('is-loaded'); }, 1200);

  /* ---------------- Mobile nav ---------------- */
  var burger = document.querySelector('.nav__burger');
  var mobileMenu = document.querySelector('.mobile-menu');
  function closeMenu() {
    if (!mobileMenu) return;
    mobileMenu.classList.remove('is-open');
    if (burger) burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }
  if (burger && mobileMenu) {
    burger.addEventListener('click', function () {
      var open = mobileMenu.classList.toggle('is-open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });
  }

  /* ---------------- Fast smooth anchor scrolling ---------------- */
  function easeInOutCubic(t) { return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  function scrollToY(targetY, cb) {
    if (REDUCED) { window.scrollTo(0, targetY); if (cb) cb(); return; }
    var startY = window.scrollY;
    var dist = targetY - startY;
    if (Math.abs(dist) < 2) { if (cb) cb(); return; }
    var duration = Math.min(1100, 450 + Math.abs(dist) * 0.08);
    var t0 = null;
    function frame(ts) {
      if (t0 === null) t0 = ts;
      var p = Math.min(1, (ts - t0) / duration);
      window.scrollTo(0, startY + dist * easeInOutCubic(p));
      if (p < 1) requestAnimationFrame(frame);
      else if (cb) cb();
    }
    requestAnimationFrame(frame);
  }

  document.querySelectorAll('a[href^="#"], a[href^="index.html#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var hash = a.getAttribute('href').split('#')[1];
      if (!hash) return;
      var target = document.getElementById(hash);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      var y = hash === 'inicio' ? 0 : target.getBoundingClientRect().top + window.scrollY - 40;
      scrollToY(y, function () {
        try { history.replaceState(null, '', '#' + hash); } catch (err) {}
      });
    });
  });

  /* ---------------- Scrollspy + frosted header ---------------- */
  var navEl = document.querySelector('.nav');
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
  var spySections = spyLinks.map(function (a) {
    return document.getElementById(a.getAttribute('href').slice(1));
  });

  function updateNav() {
    if (navEl) navEl.classList.toggle('is-solid', window.scrollY > 30);
    if (!spySections.length) return;
    var marker = window.innerHeight * 0.4;
    var active = 0;
    for (var i = 0; i < spySections.length; i++) {
      if (spySections[i] && spySections[i].getBoundingClientRect().top <= marker) active = i;
    }
    spyLinks.forEach(function (a, i) { a.classList.toggle('is-active', i === active); });
  }

  /* ---------------- Marcas: random order per visit ---------------- */
  (function shuffleBrands() {
    var blocks = Array.prototype.slice.call(document.querySelectorAll('#marcas .brand-card'));
    if (blocks.length < 2) return;
    var parent = blocks[0].parentNode;
    for (var i = blocks.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = blocks[i]; blocks[i] = blocks[j]; blocks[j] = tmp;
    }
    blocks.forEach(function (b) { parent.appendChild(b); });
  })();

  /* ---------------- Reveals (staggered) ---------------- */
  document.querySelectorAll('[data-stagger]').forEach(function (parent) {
    var kids = parent.querySelectorAll('.reveal, .reveal-line');
    kids.forEach(function (el, i) { el.style.setProperty('--rv-delay', (i * 110) + 'ms'); });
  });

  var revealEls = document.querySelectorAll('.reveal, .reveal-line, .section-rule');
  if ('IntersectionObserver' in window && revealEls.length) {
    var revObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          revObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -5% 0px' });
    revealEls.forEach(function (el) { revObs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* ---------------- Stat count-up ---------------- */
  var counters = document.querySelectorAll('[data-countup]');
  if ('IntersectionObserver' in window && counters.length && !REDUCED) {
    var cObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        cObs.unobserve(entry.target);
        var el = entry.target;
        var template = el.textContent;
        var m = template.match(/\d+/);
        if (!m) return;
        var target = parseInt(m[0], 10);
        var t0 = null;
        var tick = function (ts) {
          if (t0 === null) t0 = ts;
          var p = Math.min(1, (ts - t0) / 1400);
          var eased = 1 - Math.pow(1 - p, 3);
          el.textContent = template.replace(m[0], String(Math.round(eased * target)));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    }, { threshold: 0.6 });
    counters.forEach(function (el) { cObs.observe(el); });
  }

  /* ====================================================================
     COSMOS ENGINE — triangle constellation with a real-continent planet
     ==================================================================== */
  (function cosmos() {
    var host = document.querySelector('.cosmos');
    var canvas = host && host.querySelector('canvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    var DPR = Math.min(window.devicePixelRatio || 1, 1.75);
    var vw = 0, vh = 0;
    var isMobile = false;

    /* --- brand spectrum --- */
    var PALETTE = [
      { c: '#ffffff', w: 0.14 },
      { c: '#5a83c4', w: 0.17 }, /* Logistics blue (lifted for glow) */
      { c: '#4fbe8c', w: 0.13 }, /* Logistics green */
      { c: '#b8c876', w: 0.17 }, /* Gourmet green */
      { c: '#d9a271', w: 0.14 }, /* Deko copper */
      { c: '#a87f61', w: 0.09 }, /* Deko brown */
      { c: '#3fb3ae', w: 0.16 }  /* teal */
    ];
    var SIZES = [4.5, 6.5, 9.5, 22]; /* last = large ambient accents only */
    var ROT_STEPS = 48; /* fine steps → continuous, fluid self-rotation */

    function hash(i, salt) {
      var x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
      return x - Math.floor(x);
    }

    /* --- world land mask (256×128) → land point list with real continents --- */
    var LAND = null; /* [{lat,lon}] cos-weighted */

    var maskImg = new Image();
    maskImg.src = 'assets/img/world-mask.png';
    maskImg.onload = function () {
      var mw = maskImg.naturalWidth, mh = maskImg.naturalHeight;
      var oc = document.createElement('canvas');
      oc.width = mw; oc.height = mh;
      var octx = oc.getContext('2d');
      octx.drawImage(maskImg, 0, 0);
      var d = octx.getImageData(0, 0, mw, mh).data;

      /* polarity: land should be the minority of the globe (~30%) */
      var bright = 0;
      for (var q = 0; q < mw * mh; q++) if (d[q * 4] > 127) bright++;
      var landIsBright = bright / (mw * mh) < 0.5;

      LAND = [];
      var k = 0;
      for (var y = 0; y < mh; y++) {
        var lat = 90 - ((y + 0.5) / mh) * 180;
        var w = Math.cos(lat * Math.PI / 180); /* equirectangular density correction */
        for (var x = 0; x < mw; x++) {
          var v = d[(y * mw + x) * 4] > 127;
          if (v !== landIsBright) continue;
          if (hash(k++, 77) > w) continue;
          LAND.push({ lat: lat, lon: ((x + 0.5) / mw) * 360 - 180 });
        }
      }
      buildParticles();
    };

    /* --- particles --- */
    var N = 0;
    var P = [];

    function regionColor(lat, lon, i) {
      /* coarse regional patches like the reference's coloured landmasses */
      var cell = Math.floor((lat + 90) / 26) * 41 + Math.floor((lon + 180) / 26);
      var r = hash(cell, 13);
      if (hash(i, 14) < 0.28) r = hash(i, 15); /* confetti sparkle within regions */
      var acc = 0;
      for (var c = 0; c < PALETTE.length; c++) { acc += PALETTE[c].w; if (r <= acc) return c; }
      return 0;
    }

    function buildParticles() {
      N = vw < 768 ? 2200 : (vw < 1200 ? 4200 : 6400);
      P = [];
      for (var i = 0; i < N; i++) {
        var isAmbient = hash(i, 20) < 0.04;              /* scattered field around the planet (very sparse) */
        var isOcean = !isAmbient && hash(i, 30) < 0.06;  /* faint sphere silhouette — oceans stay nearly empty */
        var la, lo, ci;

        if (isOcean) {
          la = Math.asin(2 * hash(i, 31) - 1) * 180 / Math.PI;
          lo = hash(i, 32) * 360 - 180;
          ci = hash(i, 33) < 0.55 ? 0 : 6; /* white/teal */
        } else if (!isAmbient && LAND && LAND.length) {
          var pick = LAND[Math.floor(hash(i, 21) * LAND.length)];
          la = pick.lat + (hash(i, 22) - 0.5) * 1.1; /* tight jitter → crisp coastlines */
          lo = pick.lon + (hash(i, 23) - 0.5) * 1.1;
          ci = regionColor(pick.lat, pick.lon, i);
        } else if (!isAmbient) {
          /* mask not ready yet — provisional sphere */
          la = Math.asin(2 * hash(i, 24) - 1) * 180 / Math.PI;
          lo = hash(i, 25) * 360 - 180;
          ci = regionColor(la, lo, i);
        } else {
          la = 0; lo = 0;
          ci = hash(i, 26) < 0.5 ? 0 : 6; /* ambient: white/teal */
        }

        var laR = la * Math.PI / 180, loR = lo * Math.PI / 180;

        var sr = hash(i, 2);
        var si = isAmbient
          ? (hash(i, 27) < 0.06 ? 3 : (sr < 0.6 ? 0 : 1))  /* a few large accents */
          : (sr < 0.68 ? 0 : (sr < 0.93 ? 1 : 2)); /* finer grain for continent detail */

        P.push({
          dx: Math.cos(laR) * Math.sin(loR),
          dy: Math.sin(laR),
          dz: Math.cos(laR) * Math.cos(loR),
          ambient: isAmbient,
          ocean: isOcean,
          color: ci, size: isOcean ? 0 : si,
          rot: Math.floor(hash(i, 3) * ROT_STEPS),
          spin: hash(i, 4) < 0.6 ? (hash(i, 5) - 0.5) * 4.4 : 0, /* fluid self-axis rotation */
          twA: hash(i, 6) * Math.PI * 2,
          twS: 0.25 + hash(i, 7) * 0.6, /* slow, breathing twinkle — no flicker */
          h1: hash(i, 8), h2: hash(i, 9), h3: hash(i, 10),
          x: 0, y: 0, seeded: false
        });
      }
    }

    /* --- sprite atlas: outlined triangles (reference glyph) --- */
    var atlas = null, CELL = 0;

    function buildAtlas() {
      var maxSize = SIZES[SIZES.length - 1];
      CELL = Math.ceil((maxSize + 10) * DPR);
      atlas = document.createElement('canvas');
      atlas.width = CELL * ROT_STEPS;
      atlas.height = CELL * PALETTE.length * SIZES.length;
      var a = atlas.getContext('2d');
      for (var c = 0; c < PALETTE.length; c++) {
        for (var s = 0; s < SIZES.length; s++) {
          for (var r = 0; r < ROT_STEPS; r++) {
            var px = r * CELL + CELL / 2;
            var py = (c * SIZES.length + s) * CELL + CELL / 2;
            a.save();
            a.translate(px, py);
            a.rotate((r / ROT_STEPS) * Math.PI * 2);
            var sz = SIZES[s] * DPR;
            a.strokeStyle = PALETTE[c].c;
            a.lineWidth = Math.max(0.9, sz * 0.11);
            a.lineJoin = 'miter';
            a.shadowColor = PALETTE[c].c;
            a.shadowBlur = s >= 2 ? 6 : 3;
            /* outlined triangle */
            a.beginPath();
            a.moveTo(0, -sz * 0.62);
            a.lineTo(sz * 0.55, sz * 0.42);
            a.lineTo(-sz * 0.55, sz * 0.42);
            a.closePath();
            a.stroke();
            a.restore();
          }
        }
      }
    }

    /* --- formations --- */
    function projectSphere(p, rot, cx, cy, R, alphaFront, alphaBack) {
      var cosR = Math.cos(rot), sinR = Math.sin(rot);
      var x = p.dx * cosR + p.dz * sinR;
      var z = -p.dx * sinR + p.dz * cosR;
      return {
        x: cx + x * R,
        y: cy - p.dy * R * 0.97,
        z: z,
        a: z > 0 ? alphaFront + z * (0.97 - alphaFront) : alphaBack
      };
    }

    function ambientField(p, t, dim) {
      return {
        x: p.h1 * vw + Math.sin(t * 0.07 + p.h3 * 6.28) * 16,
        y: p.h2 * vh + Math.cos(t * 0.055 + p.h3 * 4.1) * 12,
        z: p.h2 * 0.4 + 0.15,
        a: dim * (0.07 + p.h3 * 0.18)
      };
    }

    function planetParams(t) {
      return {
        cx: isMobile ? vw * 0.5 : vw * 0.66,
        /* mobile: its TOP edge starts below the header bottom (hard limit) — center
           is pinned to radius + header clearance so the planet never sits under the header */
        cy: isMobile ? (Math.min(vw * 0.52, vh * 0.245) + 92) : vh * 0.55,
        R: isMobile ? Math.min(vw * 0.52, vh * 0.245) : Math.min(vw * 0.30, vh * 0.47),
        rot: t * 0.1025 /* hero planet spin */
      };
    }

    function sidePlanetParams(t) {
      /* the great planet of Marcas — larger than the hero's, edge-anchored */
      return {
        cx: isMobile ? vw * 0.5 : vw * 0.80,
        cy: vh * 0.5,
        R: isMobile ? Math.min(vw * 0.72, vh * 0.44) : Math.min(vw * 0.36, vh * 0.69),
        rot: t * 0.042 + 5.24 /* starts Atlantic-centered: Americas + Africa in view */
      };
    }

    function fPlanet(p, t) {
      if (p.ambient) return ambientField(p, t, 1);
      var pp = planetParams(t);
      var r = projectSphere(p, pp.rot, pp.cx, pp.cy, pp.R, 0.40, 0.10);
      if (p.ocean) r.a *= 0.22;
      return r;
    }

    function fSidePlanet(p, t) {
      if (p.ambient) return ambientField(p, t, 0.8);
      var pp = sidePlanetParams(t);
      var r = projectSphere(p, pp.rot, pp.cx, pp.cy, pp.R, 0.34, 0.08);
      if (p.ocean) r.a *= 0.22;
      return r;
    }

    /* --- trade routes: light pulses traveling between verified origins --- */
    var ROUTES = [
      [[-34.60, -58.38], [23.11, -82.37], 0.0],   /* Argentina → Caribe */
      [[-15.79, -47.88], [39.93, 32.86], 0.44],   /* Brasil → Turquía */
      [[19.43, -99.13], [39.90, 116.40], 0.55],   /* México → Asia (Pacífico Norte) */
      [[35.68, 139.65], [37.78, -122.44], 0.78],  /* Japón → California (Pacífico Norte) */
      [[-33.87, 151.21], [37.78, -122.44], 0.11], /* Sídney → California (Pacífico central) */
      [[-34.60, -58.38], [35.68, 139.65], 0.67],  /* Buenos Aires → Tokio (Pacífico central/sur) */
      [[-34.60, -58.38], [-33.92, 18.42], 0.33],  /* Buenos Aires → Sudáfrica (Atlántico Sur) */
      [[40.71, -74.01], [51.51, -0.13], 0.89]     /* Nueva York → Londres (Atlántico Norte) */
    ].map(function (r) {
      function dir(latlon) {
        var la = latlon[0] * Math.PI / 180, lo = latlon[1] * Math.PI / 180;
        return { dx: Math.cos(la) * Math.sin(lo), dy: Math.sin(la), dz: Math.cos(la) * Math.cos(lo) };
      }
      var A = dir(r[0]), B = dir(r[1]);
      var M = { dx: (A.dx + B.dx) / 2, dy: (A.dy + B.dy) / 2, dz: (A.dz + B.dz) / 2 };
      var len = Math.sqrt(M.dx * M.dx + M.dy * M.dy + M.dz * M.dz) || 1;
      M = { dx: M.dx / len, dy: M.dy / len, dz: M.dz / len };
      return { A: A, B: B, M: M, phase: r[2] };
    });

    /* sample a route in 3D and project — returns screen point + facing z at param u */
    function routePoint(rt, u, pp) {
      var iu = 1 - u;
      /* 3D quadratic bezier over unit dirs, then normalize back to the sphere */
      var vx = iu * iu * rt.A.dx + 2 * iu * u * rt.M.dx + u * u * rt.B.dx;
      var vy = iu * iu * rt.A.dy + 2 * iu * u * rt.M.dy + u * u * rt.B.dy;
      var vz = iu * iu * rt.A.dz + 2 * iu * u * rt.M.dz + u * u * rt.B.dz;
      var len = Math.sqrt(vx * vx + vy * vy + vz * vz) || 1;
      vx /= len; vy /= len; vz /= len;
      var lift = 1.01 + 0.10 * 4 * u * iu; /* hugs the surface, gentle rise mid-route */
      var cosR = Math.cos(pp.rot), sinR = Math.sin(pp.rot);
      var x = vx * cosR + vz * sinR;
      var z = -vx * sinR + vz * cosR;
      var R = pp.R * lift;
      return { x: pp.cx + x * R, y: pp.cy - vy * R * 0.97, z: z };
    }

    var ARC_SAMPLES = 26;

    function drawArcs(pp, w, t) {
      if (w < 0.03) return;
      ctx.strokeStyle = '#3fb3ae';
      ctx.lineWidth = 1.2;
      for (var i = 0; i < ROUTES.length; i++) {
        var rt = ROUTES[i];
        /* stroke only the front-facing sub-segments — routes stay visible
           crossing the open ocean even when their endpoints sit behind the limb */
        var open = false;
        ctx.globalAlpha = w * 0.24;
        ctx.beginPath();
        for (var s = 0; s <= ARC_SAMPLES; s++) {
          var q = routePoint(rt, s / ARC_SAMPLES, pp);
          if (q.z > 0.04) {
            if (!open) { ctx.moveTo(q.x, q.y); open = true; }
            else ctx.lineTo(q.x, q.y);
          } else {
            open = false;
          }
        }
        ctx.stroke();

        /* one traveling vessel per route — slow, hidden behind the limb */
        if (!REDUCED) {
          var u = (t * 0.085 + rt.phase) % 1;
          var q0 = routePoint(rt, u, pp);
          if (q0.z >= 0.12) {
            var q1 = routePoint(rt, Math.min(1, u + 0.02), pp);
            var ang = Math.atan2(q1.y - q0.y, q1.x - q0.x) + Math.PI / 2;
            ctx.save();
            ctx.translate(q0.x, q0.y);
            ctx.rotate(ang);
            ctx.globalAlpha = w * (0.5 + q0.z * 0.5);
            ctx.fillStyle = '#f4fffe';
            ctx.shadowColor = '#bffffb';
            ctx.shadowBlur = 8;
            ctx.beginPath();
            ctx.moveTo(0, -6.2);
            ctx.lineTo(4.4, 4.2);
            ctx.lineTo(-4.4, 4.2);
            ctx.closePath();
            ctx.fill();
            ctx.restore();
          }
        }
      }
      ctx.globalAlpha = 1;
    }

    function fWave(p, t) {
      var u = p.h1, v = p.h2;
      var hill = Math.exp(-Math.pow((u - 0.5) / 0.22, 2)) * (1 - v * 0.45);
      /* a large share goes invisible during this transition so the stat text
         keeps its contrast (they fade out in place, no stray movement) */
      var hidden = p.h3 < (isMobile ? 0.66 : 0.45);
      return {
        x: u * vw + Math.sin(t * 0.28 + p.h3 * 6.28) * 4,
        y: vh * (0.30 + v * 0.62) - hill * vh * 0.36 + Math.sin(u * 11 + t * 0.42 + v * 5) * 4,
        z: 1 - v,
        a: hidden ? 0 : 0.15 + (1 - v) * 0.33
      };
    }

    function fField(p, t) {
      /* starfield behind the narrative — very sparse, only ~1 in 5 particles */
      if (p.h3 < 0.80) {
        return { x: p.h1 * vw, y: vh * 1.4 + p.h2 * vh, z: 0.2, a: 0 };
      }
      return {
        x: p.h1 * vw + Math.sin(t * 0.09 + p.h3 * 6.28) * 14,
        y: p.h2 * vh + Math.cos(t * 0.07 + p.h3 * 4.1) * 10,
        z: p.h2 * 0.5 + 0.2,
        a: 0.12 + (p.h3 - 0.8) * 1.6
      };
    }

    function fSparse(p, t) {
      /* contacto: barely-there constellation — the ring effect carries the scene */
      if (p.h3 > 0.24) {
        return { x: p.h1 * vw, y: vh * 1.4 + p.h2 * vh, z: 0.2, a: 0 };
      }
      return {
        x: p.h1 * vw + Math.sin(t * 0.08 + p.h3 * 6.28) * 12,
        y: p.h2 * vh + Math.cos(t * 0.06 + p.h3 * 4.5) * 9,
        z: p.h2 * 0.4 + 0.2,
        a: 0.12 + p.h3 * 1.1
      };
    }

    var FORMATIONS = { planet: fPlanet, sideplanet: fSidePlanet, wave: fWave, field: fField, sparse: fSparse };

    /* --- timeline from [data-formation] elements --- */
    var keyEls = Array.prototype.slice.call(document.querySelectorAll('[data-formation]'));

    function segmentAt(scrollCenter) {
      var centers = keyEls.map(function (el) {
        var r = el.getBoundingClientRect();
        return { mid: r.top + window.scrollY + r.height / 2, f: FORMATIONS[el.dataset.formation] || fField };
      }).sort(function (a, b) { return a.mid - b.mid; });
      if (scrollCenter <= centers[0].mid) return [centers[0].f, centers[0].f, 0];
      for (var i = 0; i < centers.length - 1; i++) {
        if (scrollCenter < centers[i + 1].mid) {
          var p = (scrollCenter - centers[i].mid) / (centers[i + 1].mid - centers[i].mid);
          return [centers[i].f, centers[i + 1].f, p];
        }
      }
      var last = centers[centers.length - 1];
      return [last.f, last.f, 0];
    }

    function smooth(x) { return x * x * (3 - 2 * x); }

    /* --- animated film grain (texture layer, CSS-animated shift) --- */
    (function buildGrain() {
      var g = document.querySelector('.grain');
      if (!g) return;
      var tile = document.createElement('canvas');
      tile.width = 140; tile.height = 140;
      var tc = tile.getContext('2d');
      var id = tc.createImageData(140, 140);
      for (var i = 0; i < id.data.length; i += 4) {
        var v = Math.floor(Math.random() * 255);
        id.data[i] = v; id.data[i + 1] = v; id.data[i + 2] = v;
        id.data[i + 3] = 26;
      }
      tc.putImageData(id, 0, 0);
      g.style.backgroundImage = 'url(' + tile.toDataURL() + ')';
    })();

    /* --- cartographic dot grid with a traveling luminance wave --- */
    function drawGrid(t) {
      var gap = isMobile ? 46 : 58;
      var ox = (vw % gap) / 2, oy = (vh % gap) / 2;
      for (var gy = oy; gy <= vh; gy += gap) {
        for (var gx = ox; gx <= vw; gx += gap) {
          var wave = Math.sin(t * 0.55 + gx * 0.006 + gy * 0.0045);
          var a = 0.028 + Math.max(0, wave) * 0.075;
          ctx.globalAlpha = a;
          ctx.fillStyle = ((gx + gy) / gap) % 5 < 1 ? '#3fb3ae' : '#ffffff';
          ctx.fillRect(gx, gy, 1.2, 1.2);
        }
      }
      ctx.globalAlpha = 1;
    }

    /* --- nebulae: slow-drifting dark colour clouds behind the particles --- */
    var NEBULAE = [
      { rgb: '18,90,90',   x: 0.16, y: 0.24, r: 1.00, sp: 0.050, ph: 0.0 },  /* teal */
      { rgb: '45,75,135',  x: 0.86, y: 0.68, r: 1.15, sp: 0.040, ph: 2.2 },  /* logistics blue */
      { rgb: '135,92,58',  x: 0.55, y: 0.02, r: 0.85, sp: 0.058, ph: 4.1 },  /* deko copper */
      { rgb: '110,120,70', x: 0.30, y: 0.95, r: 0.95, sp: 0.034, ph: 5.3 }   /* gourmet olive */
    ];
    var nebSprites = NEBULAE.map(function (b) {
      var s = document.createElement('canvas');
      s.width = 256; s.height = 256;
      var g = s.getContext('2d');
      var grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, 'rgba(' + b.rgb + ',0.55)');
      grad.addColorStop(0.55, 'rgba(' + b.rgb + ',0.18)');
      grad.addColorStop(1, 'rgba(' + b.rgb + ',0)');
      g.fillStyle = grad;
      g.fillRect(0, 0, 256, 256);
      return s;
    });

    function drawNebulae(t) {
      for (var i = 0; i < NEBULAE.length; i++) {
        var b = NEBULAE[i];
        var drift = REDUCED ? 0 : 1;
        var nx = (b.x + Math.sin(t * b.sp + b.ph) * 0.07 * drift) * vw;
        var ny = (b.y + Math.cos(t * b.sp * 0.8 + b.ph) * 0.06 * drift) * vh;
        var size = b.r * Math.max(vh, vw * 0.6) * (1 + (REDUCED ? 0 : Math.sin(t * 0.09 + b.ph) * 0.10));
        ctx.globalAlpha = 0.13;
        ctx.drawImage(nebSprites[i], nx - size / 2, ny - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
    }

    /* --- render loop --- */
    var cvh = 0;                       /* canvas drawing height (stable) */
    var lastW = 0, lastH = 0, resizeT = 0;

    function resize() {
      vw = window.innerWidth;
      vh = window.innerHeight;
      isMobile = vw < 1024;
      /* pad the backing store so it stays covered when the mobile URL bar
         hides and grows the viewport — avoids any visible canvas resize */
      cvh = vh + (isMobile ? 140 : 0);
      canvas.width = vw * DPR;
      canvas.height = cvh * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      buildParticles();
      lastW = vw; lastH = vh;
    }
    resize();
    buildAtlas();
    /* re-sync once after the viewport settles (some mobile browsers report a
       different innerWidth just after load) */
    setTimeout(resize, 450);
    /* The pulsing bug: mobile browsers fire resize on every URL-bar show/hide,
       which changes only innerHeight. On touch widths we rebuild ONLY on a large
       width change (orientation) — URL-bar jitter never moves the width, so the
       canvas and header stop pulsing. Desktop stays fully responsive. */
    window.addEventListener('resize', function () {
      var w = window.innerWidth, h = window.innerHeight;
      var significant = (w < 1024)
        ? Math.abs(w - lastW) > 120
        : (Math.abs(w - lastW) > 24 || Math.abs(h - lastH) > 24);
      if (!significant) return;
      clearTimeout(resizeT);
      resizeT = setTimeout(resize, 200);
    });

    var lastTs = 0;
    var running = true;

    document.addEventListener('visibilitychange', function () {
      running = !document.hidden;
      if (running) { lastTs = 0; requestAnimationFrame(draw); }
    });

    function draw(ts) {
      if (!running) return;
      var dt = lastTs ? Math.min((ts - lastTs) / 1000, 0.05) : 0.016;
      lastTs = ts;
      var t = ts / 1000;

      var seg = segmentAt(window.scrollY + vh * 0.5);
      var fA = seg[0], fB = seg[1], segP = seg[2];

      ctx.clearRect(0, 0, vw, cvh || vh);
      drawNebulae(t);
      drawGrid(t);

      var sizeGroup = SIZES.length;
      for (var i = 0; i < N; i++) {
        var p = P[i];
        var ps = smooth(Math.max(0, Math.min(1, (segP - p.h3 * 0.25) / 0.75)));

        var A = fA(p, t);
        var B = fA === fB ? A : fB(p, t);
        var tx = A.x + (B.x - A.x) * ps;
        var ty = A.y + (B.y - A.y) * ps;
        var ta = A.a + (B.a - A.a) * ps;
        var tz = A.z + (B.z - A.z) * ps;

        if (!p.seeded) { p.x = tx; p.y = ty; p.seeded = true; }
        var k = Math.min(1, dt * 3.6);
        p.x += (tx - p.x) * k;
        p.y += (ty - p.y) * k;

        var tw = REDUCED ? 1 : (0.86 + Math.sin(t * p.twS + p.twA) * 0.14);
        var alpha = ta * tw;
        if (alpha < 0.015) continue;
        if (p.x < -30 || p.x > vw + 30 || p.y < -30 || p.y > vh + 30) continue;

        var scale = 0.72 + Math.max(0, tz) * 0.5;
        var rotIdx = (p.rot + (REDUCED ? 0 : Math.floor(t * p.spin * ROT_STEPS / 6.28))) % ROT_STEPS;
        if (rotIdx < 0) rotIdx += ROT_STEPS;

        var sxA = rotIdx * CELL;
        var syA = (p.color * sizeGroup + p.size) * CELL;
        var dSize = (CELL / DPR) * scale;

        ctx.globalAlpha = alpha;
        ctx.drawImage(atlas, sxA, syA, CELL, CELL, p.x - dSize / 2, p.y - dSize / 2, dSize, dSize);
      }
      ctx.globalAlpha = 1;

      /* trade-route arcs ride the planet formations */
      var sm = smooth(segP);
      var wPlanet = (fA === fPlanet ? 1 - sm : 0) + (fB === fPlanet ? sm : 0);
      var wSide = (fA === fSidePlanet ? 1 - sm : 0) + (fB === fSidePlanet ? sm : 0);
      if (wPlanet > 0) drawArcs(planetParams(t), wPlanet, t);
      if (wSide > 0) drawArcs(sidePlanetParams(t), wSide, t);

      /* contacto: quiet expanding rings — simple, elegant closing gesture */
      var wSparse = (fA === fSparse ? 1 - sm : 0) + (fB === fSparse ? sm : 0);
      if (wSparse > 0.03 && !REDUCED) {
        var rcx = vw / 2, rcy = vh * 0.46;
        var maxRing = Math.min(vw, vh) * 0.60;
        for (var rk = 0; rk < 3; rk++) {
          var ru = (t * 0.085 + rk / 3) % 1;
          ctx.globalAlpha = wSparse * (1 - ru) * (1 - ru) * 0.16;
          ctx.strokeStyle = '#3fb3ae';
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.arc(rcx, rcy, 30 + ru * maxRing, 0, 6.2832);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      requestAnimationFrame(draw);
    }
    requestAnimationFrame(draw);
  })();

  /* ---------------- Single scroll handler ---------------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateNav();
      ticking = false;
    });
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll);
  onScroll();

  /* ---------------- Contact wizard ---------------- */
  var wizard = document.querySelector('.wizard');
  if (!wizard) return;

  var steps = Array.prototype.slice.call(wizard.querySelectorAll('.wizard__step'));
  var stepLabel = wizard.querySelector('.wizard__step-label');
  var backBtn = wizard.querySelector('.wizard__back');
  var result = wizard.querySelector('.wizard__result');
  var wizardBar = wizard.querySelector('.wizard__bar span');
  var answers = {};
  var current = 0;

  function showStep(i) {
    current = i;
    steps.forEach(function (s, idx) { s.classList.toggle('is-active', idx === i); });
    if (wizardBar) wizardBar.style.width = (((i + 1) / steps.length) * 100) + '%';
    if (stepLabel) {
      var es = 'Paso ' + (i + 1) + ' de ' + steps.length;
      var en = 'Step ' + (i + 1) + ' of ' + steps.length;
      stepLabel.dataset.en = en;
      delete stepLabel.dataset.es;
      stepLabel.textContent = docEl.lang === 'en' ? en : es;
    }
    if (backBtn) backBtn.hidden = i === 0;
  }

  steps.forEach(function (step, idx) {
    var key = step.dataset.key;
    var otherWrap = step.querySelector('.wizard__other');
    var otherInput = otherWrap ? otherWrap.querySelector('input') : null;
    var nextWrap = step.querySelector('.wizard__next');

    step.querySelectorAll('.option-pill').forEach(function (pill) {
      pill.addEventListener('click', function () {
        step.querySelectorAll('.option-pill').forEach(function (p) { p.classList.remove('is-selected'); });
        pill.classList.add('is-selected');

        if (pill.dataset.other !== undefined) {
          if (otherWrap) {
            otherWrap.hidden = false;
            if (otherInput) otherInput.focus();
            if (nextWrap) nextWrap.hidden = !(otherInput && otherInput.value.trim());
          }
        } else {
          answers[key] = pill.dataset.value || pill.textContent.trim();
          if (otherWrap) otherWrap.hidden = true;
          if (nextWrap) nextWrap.hidden = true;
          setTimeout(function () { showStep(idx + 1); }, 200);
        }
      });
    });

    if (otherInput && nextWrap) {
      otherInput.addEventListener('input', function () {
        nextWrap.hidden = !otherInput.value.trim();
      });
      var nextBtn = nextWrap.querySelector('button');
      var goNext = function () {
        if (!otherInput.value.trim()) return;
        answers[key] = 'Otro: ' + otherInput.value.trim();
        showStep(idx + 1);
      };
      if (nextBtn) nextBtn.addEventListener('click', goNext);
      otherInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') { e.preventDefault(); goNext(); }
      });
    }
  });

  if (backBtn) {
    backBtn.addEventListener('click', function () {
      if (current > 0) showStep(current - 1);
    });
  }

  var form = wizard.querySelector('.wizard__form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var emailField = form.querySelector('#wz-email');
      var emailWrap = emailField.closest('.field');
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(emailField.value.trim());
      emailWrap.classList.toggle('has-error', !valid);
      if (!valid) { emailField.focus(); return; }

      answers.email = emailField.value.trim();
      var phone = form.querySelector('#wz-phone').value.trim();
      if (phone) answers.phone = phone;

      /* [PLACEHOLDER: destino del formulario — email/CRM]
         Wire `answers` to the client-provided endpoint here. */

      steps.forEach(function (s) { s.classList.remove('is-active'); });
      if (backBtn) backBtn.hidden = true;
      if (stepLabel) stepLabel.textContent = '';
      if (wizardBar) wizardBar.style.width = '100%';
      if (result) result.hidden = false;
    });
  }

  showStep(0);
})();

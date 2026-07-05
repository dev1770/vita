/* VITA COMEX — main.js
   Premium one-page build: canvas orbital diagram · scroll-driven hero (zoom → blur → exit)
   i18n ES/EN · fast anchor scrolling · scrollspy · staggered reveals · wizard */

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
  /* fallback if load already fired or hangs */
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
    var duration = Math.min(1000, 450 + Math.abs(dist) * 0.1);
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
      if (!target) return; /* on another page — let it navigate */
      e.preventDefault();
      closeMenu();
      var y = hash === 'inicio' ? 0 : target.getBoundingClientRect().top + window.scrollY - 72;
      scrollToY(y, function () {
        try { history.replaceState(null, '', '#' + hash); } catch (err) {}
      });
    });
  });

  /* ---------------- Nav: solid state + scrollspy ---------------- */
  var nav = document.querySelector('.nav');
  var spyLinks = Array.prototype.slice.call(document.querySelectorAll('.nav__links a[href^="#"]'));
  var spySections = spyLinks.map(function (a) {
    return document.getElementById(a.getAttribute('href').slice(1));
  });

  function updateNav() {
    if (nav) nav.classList.toggle('is-solid', window.scrollY > 40);
    if (!spySections.length) return;
    var marker = window.innerHeight * 0.4;
    var active = 0;
    for (var i = 0; i < spySections.length; i++) {
      /* document-relative position (offsetTop would be relative to .after-hero) */
      if (spySections[i] && spySections[i].getBoundingClientRect().top <= marker) active = i;
    }
    spyLinks.forEach(function (a, i) { a.classList.toggle('is-active', i === active); });
  }

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

  /* ---------------- Hero: Cobe globe (self-hosted, dark-adapted lighting) ---------------- */
  var heroScroll = document.querySelector('.hero-scroll');
  var heroViz = document.querySelector('.hero-viz');
  var vizZoom = document.querySelector('.viz-zoom');
  var heroCopy = document.querySelector('.hero-copy');
  var heroHint = document.querySelector('.hero-hint');
  var canvas = document.querySelector('.hero-viz canvas');
  var heroP = 0;      /* scroll progress 0..1 */
  var globeExit = 0;  /* exit phase 0..1 — accelerates rotation on the way out */

  if (canvas && heroViz && window.createGlobe) {
    var globe = null;
    var phi = 0;
    var basePhi = 0, baseTheta = 0;
    var dragPhi = 0, dragTheta = 0;
    var pointerStart = null;
    var heroInView = true;

    /* world cities — reference set + client additions; captions in Spanish, photos self-hosted */
    var CITIES = [
      { file: 'san-francisco', caption: 'San Francisco', lat: 37.78, lon: -122.44, rot: -5 },
      { file: 'nueva-york', caption: 'Nueva York', lat: 40.71, lon: -74.01, rot: 4 },
      { file: 'tokio', caption: 'Tokio', lat: 35.68, lon: 139.65, rot: -3 },
      { file: 'sidney', caption: 'Sídney', lat: -33.87, lon: 151.21, rot: 6 },
      { file: 'paris', caption: 'París', lat: 48.86, lon: 2.35, rot: -4 },
      { file: 'londres', caption: 'Londres', lat: 51.51, lon: -0.13, rot: 3 },
      { file: 'buenos-aires', caption: 'Buenos Aires', lat: -34.60, lon: -58.38, rot: 5 },
      { file: 'sao-paulo', caption: 'São Paulo', lat: -23.55, lon: -46.63, rot: -6 },
      { file: 'la-habana', caption: 'La Habana', lat: 23.11, lon: -82.37, rot: 3 },
      { file: 'ciudad-de-mexico', caption: 'Ciudad de México', lat: 19.43, lon: -99.13, rot: -4 },
      { file: 'toronto', caption: 'Toronto', lat: 43.65, lon: -79.38, rot: 6 },
      { file: 'pekin', caption: 'Pekín', lat: 39.90, lon: 116.40, rot: -5 },
      { file: 'nueva-delhi', caption: 'Nueva Delhi', lat: 28.61, lon: 77.21, rot: 4 },
      { file: 'moscu', caption: 'Moscú', lat: 55.76, lon: 37.62, rot: -3 }
    ];
    var GLOBE_DEBUG = window.location.search.indexOf('globedebug') !== -1;

    var initGlobe = function () {
      var w = heroViz.clientWidth;
      if (!w) return;
      if (globe) { globe.destroy(); globe = null; }
      var dpr = Math.min(window.devicePixelRatio || 1, 2);
      /* cobe 0.6.x expects physical buffer size (CSS px × dpr) */
      globe = window.createGlobe(canvas, {
        devicePixelRatio: dpr,
        width: w * dpr,
        height: w * dpr,
        phi: 0,
        theta: 0.22,
        dark: 1,
        diffuse: 1.2,
        mapSamples: 22000,
        mapBrightness: 9,
        baseColor: [0.55, 0.57, 0.57],
        markerColor: [0.55, 0.9, 0.85],
        glowColor: [0.12, 0.15, 0.15],
        opacity: 0.85,
        markers: CITIES.map(function (c) { return { location: [c.lat, c.lon], size: 0.035 }; }),
        onRender: function (state) {
          var now = performance.now();
          if (GLOBE_DEBUG) {
            phi = 0.6; /* frozen for projection calibration */
          } else if (!REDUCED && pointerStart === null && heroInView) {
            phi += 0.0011 * (1 + globeExit * 1.2); /* slow, seamless */
          }
          /* gentle breathing tilt */
          var bob = (REDUCED || GLOBE_DEBUG) ? 0 : Math.sin(now * 0.00012) * 0.045;
          var theta = Math.max(-0.85, Math.min(0.85, 0.22 + bob + baseTheta + dragTheta));
          state.phi = phi + basePhi + dragPhi;
          state.theta = theta;
          updateCityCards(phi + basePhi + dragPhi, theta);
        }
      });
      requestAnimationFrame(function () { canvas.classList.add('is-ready'); });
    };

    /* ---- city polaroid cards: projected onto the globe each frame ---- */
    var cardsHost = document.querySelector('.city-cards');
    var cardEls = [];
    if (cardsHost) {
      CITIES.forEach(function (c) {
        var el = document.createElement('div');
        el.className = 'city-card';
        el.innerHTML = '<img src="assets/img/cities/' + c.file + '.jpg" alt="" loading="lazy"><span>' + c.caption + '</span>';
        cardsHost.appendChild(el);
        cardEls.push(el);
        if (GLOBE_DEBUG) {
          var dot = document.createElement('div');
          dot.style.cssText = 'position:absolute;width:6px;height:6px;border-radius:50%;background:#f00;left:0;top:0;z-index:10;';
          dot.dataset.city = c.file;
          cardsHost.appendChild(dot);
          el._debugDot = dot;
        }
      });
    }

    var MAX_CARDS = window.innerWidth < 1024 ? 3 : 4; /* smaller globe → fewer simultaneous cards */
    /* projection constants calibrated against cobe's own marker rendering
       (least-squares fit, ~4px RMS): A = lon + phi + π/2 ; perspective D=8 ; G = 3.0746 × size */
    var PROJ_D = 8;
    var PROJ_G_FACTOR = 3.0746;

    function updateCityCards(phiCur, thetaCur) {
      if (!cardsHost || !cardEls.length) return;
      var size = heroViz.clientWidth;
      var cx = size / 2, cy = size / 2, G = size * PROJ_G_FACTOR;
      var sinT = Math.sin(thetaCur), cosT = Math.cos(thetaCur);
      var scored = [];

      for (var i = 0; i < CITIES.length; i++) {
        var c = CITIES[i];
        var latR = c.lat * Math.PI / 180;
        var a = c.lon * Math.PI / 180 + phiCur + Math.PI / 2;
        var x = Math.cos(latR) * Math.sin(a);
        var y = Math.sin(latR);
        var z = Math.cos(latR) * Math.cos(a);
        var y1 = y * cosT - z * sinT;
        var z1 = y * sinT + z * cosT;
        var persp = G / (PROJ_D - z1);
        var sx = cx + x * persp;
        var sy = cy - y1 * persp;
        scored.push({ idx: i, sx: sx, sy: sy, z: z1 });
      }

      /* front-most 4 cities get cards */
      var sorted = scored.slice().sort(function (a, b) { return b.z - a.z; });
      var visibleSet = {};
      for (var v = 0; v < Math.min(MAX_CARDS, sorted.length); v++) {
        if (sorted[v].z > 0.42) visibleSet[sorted[v].idx] = true;
      }

      for (var k = 0; k < scored.length; k++) {
        var s = scored[k];
        var el = cardEls[s.idx];
        var depth = 0.82 + Math.max(0, s.z) * 0.18;
        el.style.transform = 'translate(' + s.sx.toFixed(1) + 'px,' + s.sy.toFixed(1) + 'px) translate(-50%, -100%) translateY(-12px) rotate(' + CITIES[s.idx].rot + 'deg) scale(' + depth.toFixed(3) + ')';
        el.classList.toggle('is-visible', !!visibleSet[s.idx]);
        if (el._debugDot) {
          el._debugDot.style.transform = 'translate(' + (s.sx - 3).toFixed(1) + 'px,' + (s.sy - 3).toFixed(1) + 'px)';
          el._debugDot.style.opacity = s.z > 0 ? 1 : 0.15;
        }
      }
    }

    initGlobe();

    var resizeT;
    window.addEventListener('resize', function () {
      clearTimeout(resizeT);
      resizeT = setTimeout(initGlobe, 250);
    });

    /* drag to rotate (desktop; canvas is pointer-events:none on mobile) */
    canvas.addEventListener('pointerdown', function (e) {
      pointerStart = { x: e.clientX, y: e.clientY };
      canvas.style.cursor = 'grabbing';
    });
    window.addEventListener('pointermove', function (e) {
      if (!pointerStart) return;
      dragPhi = (e.clientX - pointerStart.x) / 260;
      dragTheta = -(e.clientY - pointerStart.y) / 1000;
    }, { passive: true });
    window.addEventListener('pointerup', function () {
      if (pointerStart) {
        basePhi += dragPhi;
        baseTheta = Math.max(-0.6, Math.min(0.6, baseTheta + dragTheta));
        dragPhi = 0; dragTheta = 0;
      }
      pointerStart = null;
      canvas.style.cursor = 'grab';
    }, { passive: true });

    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) { heroInView = entry.isIntersecting; });
      }, { threshold: 0 }).observe(heroViz);
    }
  }

  /* ---------------- Ambient background beams (adapted, monochrome/teal, SMIL) ---------------- */
  (function buildBeams() {
    var host = document.querySelector('.bg-beams');
    if (!host) return;
    var NS = 'http://www.w3.org/2000/svg';
    var COUNT = window.innerWidth < 768 ? 16 : 28;

    function beamPath(i) {
      var ox = 7 * i, oy = -8 * i;
      return 'M' + (-380 + ox) + ' ' + (-189 + oy) +
        'C' + (-380 + ox) + ' ' + (-189 + oy) + ' ' + (-312 + ox) + ' ' + (216 + oy) + ' ' + (152 + ox) + ' ' + (343 + oy) +
        'C' + (616 + ox) + ' ' + (470 + oy) + ' ' + (684 + ox) + ' ' + (875 + oy) + ' ' + (684 + ox) + ' ' + (875 + oy);
    }

    var svg = document.createElementNS(NS, 'svg');
    svg.setAttribute('viewBox', '0 0 696 316');
    svg.setAttribute('preserveAspectRatio', 'xMidYMid slice');
    svg.setAttribute('fill', 'none');
    var defs = document.createElementNS(NS, 'defs');
    svg.appendChild(defs);

    /* static faint bundle */
    var all = '';
    for (var i = 0; i < COUNT * 2; i++) all += beamPath(i);
    var base = document.createElementNS(NS, 'path');
    base.setAttribute('d', all);
    base.setAttribute('stroke', 'rgba(255,255,255,0.05)');
    base.setAttribute('stroke-width', '0.5');
    svg.appendChild(base);

    /* traveling light beams */
    if (!REDUCED) {
      for (var j = 0; j < COUNT; j++) {
        var gid = 'beam-g-' + j;
        var grad = document.createElementNS(NS, 'linearGradient');
        grad.setAttribute('id', gid);
        [['0%', '#ffffff', '0'], ['6%', '#eafffd', '1'], ['32.5%', '#12888a', '1'], ['100%', '#085556', '0']].forEach(function (s) {
          var st = document.createElementNS(NS, 'stop');
          st.setAttribute('offset', s[0]);
          st.setAttribute('stop-color', s[1]);
          st.setAttribute('stop-opacity', s[2]);
          grad.appendChild(st);
        });
        var dur = (10 + Math.random() * 10).toFixed(1) + 's';
        var begin = (-Math.random() * 16).toFixed(1) + 's';
        [['x1', '0%;100%'], ['x2', '0%;95%'], ['y1', '0%;100%'], ['y2', '0%;' + (93 + Math.random() * 8).toFixed(0) + '%']].forEach(function (a) {
          var an = document.createElementNS(NS, 'animate');
          an.setAttribute('attributeName', a[0]);
          an.setAttribute('values', a[1]);
          an.setAttribute('dur', dur);
          an.setAttribute('begin', begin);
          an.setAttribute('repeatCount', 'indefinite');
          grad.appendChild(an);
        });
        defs.appendChild(grad);

        var p = document.createElementNS(NS, 'path');
        p.setAttribute('d', beamPath(j * 2));
        p.setAttribute('stroke', 'url(#' + gid + ')');
        p.setAttribute('stroke-opacity', '0.4');
        p.setAttribute('stroke-width', '0.5');
        svg.appendChild(p);
      }
    }
    host.appendChild(svg);
  })();

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

  /* ---------------- Hero: scroll choreography (zoom → blur → exit) ---------------- */
  function smoothstep(a, b, x) {
    var t = Math.max(0, Math.min(1, (x - a) / (b - a)));
    return t * t * (3 - 2 * t);
  }

  function updateHero() {
    if (!heroScroll || REDUCED) return;
    /* <1024px the hero is static (no pin) — clear any inline choreography styles */
    if (window.innerWidth < 1024) {
      if (heroCopy && heroCopy.style.opacity !== '') {
        heroCopy.style.opacity = '';
        heroCopy.style.transform = '';
      }
      if (vizZoom && vizZoom.style.opacity !== '') {
        vizZoom.style.transform = '';
        vizZoom.style.filter = '';
        vizZoom.style.opacity = '';
      }
      heroP = 0;
      globeExit = 0;
      return;
    }
    var span = heroScroll.offsetHeight - window.innerHeight;
    heroP = span > 0 ? Math.max(0, Math.min(1, window.scrollY / span)) : 0;

    /* copy: rises and fades first */
    if (heroCopy) {
      var cp = smoothstep(0, 0.28, heroP);
      heroCopy.style.opacity = String(1 - cp);
      heroCopy.style.transform = 'translateY(' + (-70 * cp) + 'px)';
    }
    if (heroHint) heroHint.style.opacity = String(Math.max(0, 0.7 - heroP * 5));

    /* viz: zooms toward viewport center while blurring, then fades on exit
       (exit overlaps with the next section sliding in — no empty frame) */
    if (vizZoom && heroViz) {
      var zoomT = smoothstep(0, 0.68, heroP);
      var exitT = smoothstep(0.5, 0.85, heroP);
      globeExit = exitT;
      var scale = 1 + zoomT * 2.0 + exitT * 0.8;
      var blur = 18 * smoothstep(0.05, 0.5, heroP);
      var rect = heroViz.getBoundingClientRect();
      var toCenterX = (window.innerWidth / 2 - (rect.left + rect.width / 2)) * zoomT;
      vizZoom.style.transform = 'translateX(' + toCenterX / (scale) + 'px) scale(' + scale + ')';
      vizZoom.style.filter = blur > 0.2 ? 'blur(' + blur + 'px)' : 'none';
      vizZoom.style.opacity = String(1 - exitT);
    }
  }

  /* ---------------- Parallax on brand visuals (desktop only) ---------------- */
  var parallaxEls = window.innerWidth >= 1024 && !REDUCED
    ? Array.prototype.slice.call(document.querySelectorAll('.brand-block__visual'))
    : [];

  function updateParallax() {
    var vh = window.innerHeight;
    parallaxEls.forEach(function (el) {
      var r = el.getBoundingClientRect();
      if (r.bottom < 0 || r.top > vh) return;
      var d = (r.top + r.height / 2 - vh / 2) / vh; /* -0.5 .. 0.5 */
      el.style.transform = 'translateY(' + (d * -30).toFixed(1) + 'px)';
    });
  }

  /* ---------------- Single scroll handler (rAF-throttled) ---------------- */
  var ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(function () {
      updateNav();
      updateHero();
      updateParallax();
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
  var answers = {};
  var current = 0;

  var wizardBar = wizard.querySelector('.wizard__bar span');

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

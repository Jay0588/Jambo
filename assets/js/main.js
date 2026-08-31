"use strict";

/* ================================================================
   PAGE TRANSITIONS — fade out on leave, fade in on arrive
   ================================================================ */
document.addEventListener("click", (e) => {
  const link = e.target.closest("a");
  if (!link) return;
  const href = link.getAttribute("href");
  // Only internal page links (.html), not anchors, external, or whatsapp
  if (!href || href.startsWith("#") || href.startsWith("http") ||
      href.startsWith("tel:") || href.startsWith("mailto:") ||
      link.target === "_blank" || !href.endsWith(".html")) return;
  e.preventDefault();
  document.body.classList.add("is-leaving");
  setTimeout(() => { window.location.href = href; }, 260);
});

window.addEventListener("DOMContentLoaded", () => {

  /* ================================================================
     LOADER — disabled. Remove style="display:none" from #loader to re-enable.
     ================================================================ */

  /* ================================================================
     TRANSLATE — works on ALL toggle buttons (desktop + mobile)
     ================================================================ */
  const translateToggles = document.querySelectorAll("[data-translate-toggle]");
  const translateTargets = document.querySelectorAll("[data-translate-target]");
  let currentLang = "en";
  try { currentLang = localStorage.getItem("jww-lang") || "en"; } catch(e) {}

  const setLabels = (lang) => {
    translateTargets.forEach(t => { t.textContent = lang === "sw" ? "EN" : "SW"; });
  };
  setLabels(currentLang);

  const SW = {
    "nav-home":"Nyumbani","nav-hardware":"Vifaa","nav-projects":"Miradi",
    "nav-services":"Huduma","nav-contact":"Mawasiliano","nav-cta":"Pata Bei",
    "h01-label":"Tangu 1984 · Kongowea, Mombasa",
    "h01-h2":"Inatengenezwa kwa mkono.<br><em>Inajengwa kudumu.</em>",
    "h01-p":"Tumekuwa tukitengeneza samani, kuweka jikoni, na kuuza vifaa kutoka karakana yetu ya Kongowea tangu 1984. Mahali pamoja, timu moja, bili moja.",
    "h01-btn1":"Pata Bei Bure","h01-btn2":"Tembelea Vifaa",
    "h01-stat1":"Miaka ya Biashara","h01-stat2":"Usafirishaji wa Bure",
    "h01-stat3":"CNC Inapatikana","h01-stat4":"Biashara ya Familia",
    "h02-label":"Vifaa","h02-h2":"Mbao na Bidhaa",
    "h02-p":"Tuna mbao laini na ngumu, MDF, plywood ya bahari, na zaidi — zinapatikana jumla au rejareja.",
    "h02-btn1":"Tazama Vifaa","h02-btn2":"Omba Bei ya Mbao",
    "h02-badge":"Jumla na Rejareja · Mbao Laini · Mbao Ngumu · MDF · Plywood ya Bahari",
    "h03-label":"Eneo la CNC","h03-h2":"Ukataji wa CNC kwa Usahihi",
    "h03-p":"Una muundo unaohitaji ukataji wa usahihi? Tunakata paneli za mbao, ishara, na vipande vya samani kulingana na mahitaji yako.",
    "h03-btn1":"Pata Bei ya CNC","h03-btn2":"Ona Huduma Zote",
    "h03-badge":"Paneli · Ishara · Vipande vya Samani · Uchongaji · Maumbo Maalum",
    "h04-label":"Eneo la Rangi","h04-h2":"Uchanganyaji wa Rangi kwa Kompyuta",
    "h04-p":"Tuna Sika, Crown Paints, Plascon, Basco, na zaidi. Lete rangi yoyote — mashine yetu itachanganya sehemu hiyo.",
    "h04-btn1":"Tazama Rangi","h04-btn2":"Uliza Kuhusu Uchanganyaji",
    "h04-badge":"Sika · Crown Paints · Plascon · Basco · Rangi Yoyote Inachanganywa Hapa",
    "h05-label":"Useremala","h05-h2":"Kuweka Jikoni na Makabati",
    "h05-p":"Tunapima, tunajenga, na tuweka majiko, makabati, meza za ofisi, na vionyesho.",
    "h05-btn1":"Pata Bei ya Kuweka","h05-btn2":"Ona Huduma Zote",
    "h05-badge":"Majiko · Makabati · Meza za Ofisi · Kaunta za Duka · Vionyesho",
    "h06-label":"Ziara za Tovuti","h06-h2":"Tunakuja Kwako",
    "h06-p":"Hujui unachohitaji au gharama? Tupigie simu na tutakuja kwenye eneo lako, tupima, na tukupe bei ya wazi — bila malipo.",
    "h06-btn1":"Weka Ziara ya Tovuti","h06-btn2":"Piga Simu +254 733 474 216",
    "h06-badge":"Ziara ya Tovuti Bure · Kupima na Bei · Mombasa na Nchi Yote",
    "brands-h2":"Bidhaa tunazohifadhi na kusambaza.",
    "brands-sub":"Hizi ndizo bidhaa utakazozipata kwenye rafu zetu. Zote ni za kweli.",
    "why-label":"Kwa Nini Jambo Wood Works LTD","why-h2":"Miaka 40 ya kazi ya kweli.",
    "why1-h3":"Biashara ya Familia Tangu 1984",
    "why1-p":"Tulianzishwa mwaka 1984 na familia ya Jambo. Wateja wengi wetu wanarudia.",
    "why2-h3":"Vifaa Vizuri","why2-p":"Tunatumia mbao na vifaa vinavyofaa kwa kila kazi. Hakuna njia za mkato.",
    "why3-h3":"Utaridhika au Tunarudi","why3-p":"Kama kuna tatizo, tunarudi kulirekebisha. Hakuna mabishano.",
    "why4-h3":"Bei ya Haki","why4-p":"Tunakupa bei wazi kabla hatujaanza. Hakuna mshangao mwishoni.",
    "about-label":"Kuhusu Sisi","about-h2":"Useremala na vifaa,<br>vilivyofanywa vizuri.",
    "about-p1":"Jambo Wood Works LTD imekuwa ikifanya kazi tangu 1984. Tunafanya aina zote za useremala — milango, madirisha, makabati, majiko, samani za ofisi — pamoja na duka la jumla na rejareja la vifaa.",
    "about-p2":"Tuna karakana kamili ya mbao na duka lenye mbao, rangi, vigae, vifaa vya bomba, kemikali za ujenzi, na zaidi.",
    "about-p3":"Tupate kwenye <strong>Barabara Kuu ya Nyali / Barabara ya Fidel Odinga, Kongowea, Mombasa</strong> — kabla ya mlango wa Soko la Kongowea.",
    "about-badge-span":"Miaka ya Kongowea",
    "proj-label":"Kazi Yetu","proj-h2":"Baadhi ya tulichojenga.",
    "proj-sub":"Miradi michache ya hivi karibuni kote Mombasa na Kenya.",
    "proj-view-all":"Ona miradi yote","proj-cta-btn":"Ona Miradi Yote",
    "contact-label":"Wasiliana Nasi","contact-h2":"Tuambie unachohitaji.<br>Tutakupa bei.",
    "contact-p":"Jaza fomu na tutawasiliana nawe ndani ya masaa 24.",
    "form-name-lbl":"Jina Kamili","form-phone-lbl":"Nambari ya Simu",
    "form-email-lbl":"Anwani ya Barua Pepe","form-svc-lbl":"Unahitaji nini?",
    "form-msg-lbl":"Tuambie kuhusu mradi wako","form-submit-txt":"Tuma Ombi",
    "form-note-txt":"Tutajibu ndani ya masaa 24. Maelezo yako yanabaki siri.",
    "form-success-txt":"Ujumbe umepokelewa. Tutawasiliana nawe ndani ya masaa 24.",
    "form-error-txt":"Kuna hitilafu. Piga simu moja kwa moja +254 733 474 216.",
    "footer-brand-p":"Tumekuwa tukifanya useremala na kuuza vifaa Kongowea, Mombasa tangu 1984.",
    "footer-copyright":"© 2026 Jambo Wood Works LTD. Haki zote zimehifadhiwa.",
    "footer-location":"Kongowea, Mombasa, Kenya",

    // ── Hardware page ─────────────────────────────────────────────
    "hw-label":        "Mkusanyiko wa Vifaa",
    "hw-h1":           "Vifaa vinavyoshikilia<br>kila kitu<br><em>pamoja.</em>",
    "hw-hero-p":       "Kutoka mbao na rangi hadi gundi, vigae na mabomba — kila bidhaa tunayohifadhi imechaguliwa kwa nguvu, udumu na umaliziaji unaodumu.",
    "hw-quote":        "Mbao nzuri inahitaji vifaa bora zaidi.",
    "hw-detail-h":     "Kila kitu<br>ni muhimu",
    "hw-detail-p":     "Tazama bidhaa zetu zote dukani.",
    "hw-cat-label":    "Aina za Bidhaa",
    "hw-cat-h2":       "Kila kitu kwa kazi.",
    "hw-note":         "Hatuna duka la mtandaoni — bei, hesabu ya bidhaa, na upatikanaji hubadilika kila siku. Tupigie simu au uje.",
    "hw-brands-label": "Brand Tunazohifadhi",
    "hw-cta-h2":       "Hujui unachohitaji?",
    "hw-cta-p":        "Tupigie simu au uje — timu yetu itakusaidia kupata vifaa sahihi na kukata ukubwa unaohitajika.",

    // ── Projects page ─────────────────────────────────────────────
    "pr-label":   "Kazi Zilizochaguliwa",
    "pr-h1":      "Tulichojenga.",
    "pr-hero-p":  "Majiko, makabati, vifaa vya duka, kazi ya CNC, samani za ofisi na zaidi — kote Mombasa na Kenya tangu 1984.",
    "pr-cta-h2":  "Una mradi akilini?",
    "pr-cta-p":   "Tutumia vipimo vyako au maelezo mafupi na tutakupa bei ndani ya masaa 24.",

    // ── About page ────────────────────────────────────────────────
    "ab-label":        "Hadithi Yetu",
    "ab-h1":           "Imejengwa kwa shauku.<br><em>Inaongozwa na lengo.</em>",
    "ab-hero-p":       "Jambo Wood Works LTD ilianza mwaka 1984 kwa imani rahisi – kazi nzuri, huduma ya uaminifu, na wateja wenye furaha. Kutoka karakana ndogo Mombasa, tumekua kwa kuaminiwa na vizazi.",
    "ab-stat1-lbl":    "Miaka ya<br>Uzoefu",
    "ab-stat2-lbl":    "Wateja<br>Walioridhika",
    "ab-stat3-lbl":    "Miradi<br>Iliyokamilika",
    "ab-stat4-lbl":    "Ahadi ya<br>Ubora",
    "ab-journey-label":"Safari Yetu",
    "ab-values-label": "Maadili Yetu",
    "ab-values-h":     "Uaminifu. Ubora. Heshima.",
    "ab-values-p":     "Tunaamini katika kufanya mambo kwa njia sahihi — kutumia vifaa bora, ufundi wa hali ya juu, na kumtendea kila mteja kama familia. Hilo ndilo lililotufanya tuendelee kwa miaka zaidi ya 40.",
    "ab-values-sign":  "Familia ya Jambo",
    "ab-story-label":  "Hadithi Yetu",
    "ab-story-h2":     "Useremala na vifaa,<br>vilivyofanywa vizuri.",
    "ab-svc-label":    "Tunachofanya",
    "ab-svc-h2":       "Huduma chini ya paa moja.",
    "ab-cta-h2":       "Uko tayari kufanya kazi pamoja?",
    "ab-cta-p":        "Tupigie simu, WhatsApp, au uje dukani. Tuko wazi Jumatatu hadi Jumamosi, saa mbili asubuhi hadi saa kumi na mbili jioni.",

    // ── Contact page ──────────────────────────────────────────────
    "co-label":    "Tuwasiliane",
    "co-h1":       "Tungependa<br><em>kusikia</em> kutoka kwako.",
    "co-hero-p":   "Una mradi akilini au unahitaji ushauri wa kitaalamu? Timu yetu ipo hapa kukusaidia kufanikisha mawazo yako kwa usahihi na uangalifu.",
    "co-form-h3":  "Wasiliana Nasi",
    "co-form-sub": "Jaza fomu na tutawasiliana nawe ndani ya masaa 24.",
  };

  const storeOriginals = () => {
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      if (!el.dataset.en) el.dataset.en = el.innerHTML;
    });
  };

  const applyLang = (lang) => {
    storeOriginals();
    const map = lang === "sw" ? SW : null;
    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.dataset.i18n;
      el.innerHTML = map ? (map[key] ?? el.dataset.en) : (el.dataset.en ?? el.innerHTML);
    });
    setLabels(lang);
    currentLang = lang;
    document.documentElement.lang = lang === "sw" ? "sw" : "en";
    try { localStorage.setItem("jww-lang", lang); } catch(e) {}
  };

  try {
    const saved = localStorage.getItem("jww-lang");
    if (saved && saved !== "en") applyLang(saved);
  } catch(e) {}

  translateToggles.forEach(btn => {
    btn.addEventListener("click", () => applyLang(currentLang === "en" ? "sw" : "en"));
  });

  /* ================================================================
     HEADER scroll / hide
     ================================================================ */
  const header       = document.querySelector("[data-header]");
  const scrollTopBtn = document.querySelector("[data-scroll-top]");
  let lastY = 0;

  const updateHeader = () => {
    const y = window.scrollY;
    header?.classList.toggle("is-scrolled", y > 30);
    if (y > lastY + 8 && y > 300) header?.classList.add("is-hidden");
    else if (y < lastY - 4 || y < 300) header?.classList.remove("is-hidden");
    scrollTopBtn?.classList.toggle("is-visible", y > 500);
    lastY = y;
  };
  window.addEventListener("scroll", updateHeader, { passive: true });
  updateHeader();

  /* ================================================================
     MOBILE MENU
     ================================================================ */
  const menuToggles = document.querySelectorAll("[data-menu-toggle]");
  const mobileMenu  = document.querySelector("[data-mobile-menu]");

  const closeMenu = () => {
    document.body.classList.remove("menu-open");
    menuToggles.forEach(t => t.setAttribute("aria-expanded", "false"));
  };

  menuToggles.forEach(btn => {
    btn.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("menu-open");
      menuToggles.forEach(t => t.setAttribute("aria-expanded", String(isOpen)));
    });
  });

  mobileMenu?.addEventListener("click", (e) => {
    if (e.target.tagName === "A") closeMenu();
  });

  scrollTopBtn?.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" })
  );

  /* ================================================================
     ACTIVE NAV HIGHLIGHT
     ================================================================ */
  const sections = document.querySelectorAll("section[id]");
  const navLinks  = document.querySelectorAll(".desktop-nav a");

  const highlightNav = () => {
    let cur = "home";
    sections.forEach((s) => {
      if (window.scrollY >= s.offsetTop - 120) cur = s.id;
    });
    navLinks.forEach((a) =>
      a.classList.toggle("active", a.getAttribute("href") === `#${cur}`)
    );
  };
  window.addEventListener("scroll", highlightNav, { passive: true });
  highlightNav();

  /* ================================================================
     FADE-IN ON SCROLL
     ================================================================ */
  const fadeTargets = document.querySelectorAll(
    ".why-card, .about-copy, .about-image-stack, .cta-copy, .cta-actions, .proj-card, .review-card"
  );
  const styleEl = document.createElement("style");
  styleEl.textContent =
    ".fade-ready{opacity:0;transform:translateY(24px);transition:opacity .55s ease,transform .55s ease}" +
    ".fade-ready.is-visible{opacity:1;transform:none}";
  document.head.appendChild(styleEl);
  fadeTargets.forEach((el, i) => {
    el.classList.add("fade-ready");
    el.style.transitionDelay = `${(i % 5) * 0.07}s`;
  });
  const fadeObs = new IntersectionObserver((entries, obs) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { e.target.classList.add("is-visible"); obs.unobserve(e.target); }
    });
  }, { threshold: 0.1 });
  fadeTargets.forEach((el) => fadeObs.observe(el));

  /* ================================================================
     MARQUEE — always running
     ================================================================ */
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.querySelectorAll(".marquee-row").forEach((row) => {
    const track = row.querySelector(".marquee-track");
    if (!track) return;
    if (prefersReduced) track.style.animation = "none";
  });

  /* ================================================================
     WORKSHOP SLIDESHOW
     ================================================================ */
  (function initSlideshow() {
    const wsSection         = document.querySelector("[data-workshop]");
    const wsSlides          = Array.from(document.querySelectorAll(".ws-slide"));
    const wsThumbs          = Array.from(document.querySelectorAll(".ws-dot"));
    const wsPrev            = document.querySelector("[data-ws-prev]");
    const wsNext            = document.querySelector("[data-ws-next]");
    const wsProgress        = document.querySelector("[data-ws-progress]");
    const wsThumbsContainer = document.querySelector("[data-ws-thumbs]");

    if (!wsSlides.length) return; // safe — inside IIFE, won't kill outer scope

    let current = 0, progTimer = null, progPaused = false,
        progStart = null, progElapsed = 0;
    const DURATION = 6000;

    const scrollThumbIntoView = (_idx) => { /* dots — no scroll needed */ };

    const goTo = (idx) => {
      const prev = current;
      current = ((idx % wsSlides.length) + wsSlides.length) % wsSlides.length;
      if (prev === current) return;
      wsSlides[prev].classList.add("is-leaving");
      wsSlides[prev].classList.remove("is-active");
      wsThumbs[prev]?.classList.remove("is-active");
      requestAnimationFrame(() => {
        wsSlides[current].classList.add("is-active");
        wsThumbs[current]?.classList.add("is-active");
        scrollThumbIntoView(current);
      });
      const leaving = wsSlides[prev];
      const onEnd = () => {
        leaving.classList.remove("is-leaving");
        leaving.removeEventListener("transitionend", onEnd);
      };
      leaving.addEventListener("transitionend", onEnd);
      resetProgress();
    };

    const tick = (now) => {
      if (progPaused) return;
      const elapsed = now - progStart;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      if (wsProgress) wsProgress.style.width = pct + "%";
      if (elapsed >= DURATION) {
        goTo(current + 1);
      } else {
        progTimer = requestAnimationFrame(tick);
      }
    };

    const startProgress = () => {
      progStart = performance.now() - progElapsed;
      progPaused = false;
      progTimer = requestAnimationFrame(tick);
    };
    const pauseProgress = () => {
      if (progPaused) return;
      progPaused = true;
      progElapsed = performance.now() - progStart;
      cancelAnimationFrame(progTimer);
    };
    const resumeProgress = () => {
      if (!progPaused) return;
      progPaused = false;
      startProgress();
    };
    const resetProgress = () => {
      cancelAnimationFrame(progTimer);
      progElapsed = 0;
      progPaused = false;
      if (wsProgress) wsProgress.style.width = "0%";
      startProgress();
    };

    wsPrev?.addEventListener("click", () => goTo(current - 1));
    wsNext?.addEventListener("click", () => goTo(current + 1));
    wsThumbs.forEach((t, i) => t.addEventListener("click", () => goTo(i)));

    document.addEventListener("keydown", (e) => {
      if (!wsSection) return;
      const rect = wsSection.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      if (e.key === "ArrowRight") { e.preventDefault(); goTo(current + 1); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); goTo(current - 1); }
    });

    let touchStartX = null, touchStartY = null;
    wsSection?.addEventListener("touchstart", (e) => {
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
    }, { passive: true });
    wsSection?.addEventListener("touchend", (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      const dy = e.changedTouches[0].clientY - touchStartY;
      touchStartX = touchStartY = null;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 50) {
        dx < 0 ? goTo(current + 1) : goTo(current - 1);
      }
    }, { passive: true });

    document.addEventListener("visibilitychange", () => {
      document.hidden ? pauseProgress() : resumeProgress();
    });

    startProgress();
  })();

  /* ================================================================
     GALLERY HERO CAROUSEL
     ================================================================ */
  (function initGalleryHeroCarousel() {
    const stage = document.querySelector("[data-gallery-carousel]");
    if (!stage) return;

    const cards = Array.from(stage.querySelectorAll(".gallery-hero-card"));
    if (cards.length < 3) return;

    const SLOTS = ["is-center", "is-left", "is-right", "is-off-left", "is-off-right"];
    const STEP_DELAY = 2000;
    const total = cards.length;
    let current = 0;

    // Assign each card a slot based on how far it sits from the centred card.
    const layout = () => {
      cards.forEach((card, i) => {
        const offset = (i - current + total) % total;
        let slot;
        if (offset === 0) slot = "is-center";
        else if (offset === 1) slot = "is-right";
        else if (offset === total - 1) slot = "is-left";
        // Everything else waits off-stage on whichever side it will enter from.
        else slot = offset <= total / 2 ? "is-off-right" : "is-off-left";

        SLOTS.forEach((s) => card.classList.toggle(s, s === slot));
      });
    };

    layout();

    const advance = () => {
      current = (current + 1) % total;
      layout();
    };

    let timer = setInterval(advance, STEP_DELAY);
    const stop = () => { clearInterval(timer); timer = null; };
    const start = () => { if (!timer) timer = setInterval(advance, STEP_DELAY); };

    // Don't animate against the user, and don't burn cycles on a hidden tab.
    stage.addEventListener("mouseenter", stop);
    stage.addEventListener("mouseleave", start);
    document.addEventListener("visibilitychange", () => {
      document.hidden ? stop() : start();
    });
  })();

  /* ================================================================
     GALLERY LIGHTBOX
     Click a tile to enlarge; arrows / keyboard / swipe to move between
     images. Only images visible under the current filter are included.
     ================================================================ */
  (function initGalleryLightbox() {
    const TILE = ".proj-item";
    if (!document.querySelector(`${TILE} img`)) return;

    const icon = (d) =>
      `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor"
        stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;

    const box = document.createElement("div");
    box.className = "lb";
    box.setAttribute("role", "dialog");
    box.setAttribute("aria-modal", "true");
    box.setAttribute("aria-label", "Image viewer");
    // No src attribute: an empty src resolves against the page URL and fires a
    // stray request, and reports as a broken image until one is chosen.
    box.innerHTML =
      `<img class="lb-img" alt="" />` +
      `<button class="lb-btn lb-prev" type="button" aria-label="Previous image">${icon('<polyline points="15 18 9 12 15 6"/>')}</button>` +
      `<button class="lb-btn lb-next" type="button" aria-label="Next image">${icon('<polyline points="9 18 15 12 9 6"/>')}</button>` +
      `<button class="lb-btn lb-close" type="button" aria-label="Close viewer">${icon('<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>')}</button>` +
      `<div class="lb-count"></div>`;
    document.body.appendChild(box);

    const imgEl   = box.querySelector(".lb-img");
    const prevBtn = box.querySelector(".lb-prev");
    const nextBtn = box.querySelector(".lb-next");
    const closeBtn= box.querySelector(".lb-close");
    const countEl = box.querySelector(".lb-count");

    let shots = [];      // the currently visible images
    let at = 0;
    let opener = null;   // element to restore focus to on close

    // offsetParent is null when the filter has set display:none on the tile
    const collect = () =>
      Array.from(document.querySelectorAll(`${TILE} img`))
           .filter((im) => im.closest(TILE).offsetParent !== null);

    const preload = (i) => {
      const im = shots[i];
      if (im) { const p = new Image(); p.src = im.currentSrc || im.src; }
    };

    const show = () => {
      const im = shots[at];
      if (!im) return;
      imgEl.src = im.currentSrc || im.src;
      imgEl.alt = im.alt || "";
      countEl.textContent = `${at + 1} / ${shots.length}`;
      const many = shots.length > 1;
      prevBtn.hidden = nextBtn.hidden = !many;
      // fetch neighbours so arrow presses feel instant
      preload((at + 1) % shots.length);
      preload((at - 1 + shots.length) % shots.length);
    };

    const step = (d) => {
      if (!shots.length) return;
      at = (at + d + shots.length) % shots.length;   // wraps at both ends
      show();
    };

    const open = (im) => {
      shots = collect();
      at = shots.indexOf(im);
      if (at < 0) { shots = [im]; at = 0; }
      opener = document.activeElement;
      show();
      box.classList.add("is-open");
      // Lock scroll on <html> only. Setting position:fixed on <body> would
      // break the fixed positioning of this overlay's own children.
      document.documentElement.style.overflow = "hidden";
      closeBtn.focus({ preventScroll: true });
    };

    const close = () => {
      box.classList.remove("is-open");
      document.documentElement.style.overflow = "";
      imgEl.removeAttribute("src");
      if (opener && typeof opener.focus === "function") opener.focus({ preventScroll: true });
    };

    // Delegated: survives filtering, and no per-tile listeners to rebind
    document.addEventListener("click", (e) => {
      if (box.contains(e.target)) return;
      const im = e.target.closest(`${TILE} img`);
      if (!im) return;
      e.preventDefault();
      open(im);
    });

    prevBtn.addEventListener("click", (e) => { e.stopPropagation(); step(-1); });
    nextBtn.addEventListener("click", (e) => { e.stopPropagation(); step(1); });
    closeBtn.addEventListener("click", (e) => { e.stopPropagation(); close(); });

    // Backdrop only — clicks on the image or buttons must not close
    box.addEventListener("click", (e) => { if (e.target === box) close(); });

    document.addEventListener("keydown", (e) => {
      if (!box.classList.contains("is-open")) return;
      if (e.key === "Escape")     { e.preventDefault(); close(); }
      if (e.key === "ArrowLeft")  { e.preventDefault(); step(-1); }
      if (e.key === "ArrowRight") { e.preventDefault(); step(1); }
    });

    // Swipe on touch devices
    let sx = 0, sy = 0, tracking = false;
    box.addEventListener("touchstart", (e) => {
      if (e.touches.length !== 1) { tracking = false; return; }
      sx = e.touches[0].clientX; sy = e.touches[0].clientY; tracking = true;
    }, { passive: true });
    box.addEventListener("touchend", (e) => {
      if (!tracking) return;
      tracking = false;
      const dx = e.changedTouches[0].clientX - sx;
      const dy = e.changedTouches[0].clientY - sy;
      if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
    }, { passive: true });

    // Reopening after a filter change must re-read what is visible
    document.querySelectorAll(".proj-filter").forEach((b) =>
      b.addEventListener("click", () => { if (box.classList.contains("is-open")) close(); })
    );
  })();

  /* ================================================================
     CONTACT FORM
     ================================================================ */
  const contactForm = document.querySelector("[data-contact-form]");
  if (contactForm) {
    const successMsg     = contactForm.querySelector(".form-success");
    const errorMsg       = contactForm.querySelector(".form-error");
    const requiredFields = contactForm.querySelectorAll("[required]");

    const setInvalid = (el, bad) => el.classList.toggle("is-invalid", bad);
    const validate = () => {
      let ok = true;
      requiredFields.forEach((el) => {
        const empty = !el.value.trim();
        setInvalid(el, empty);
        if (empty) ok = false;
      });
      return ok;
    };
    requiredFields.forEach((el) => el.addEventListener("input", () => setInvalid(el, false)));

    /* Opens a prefilled Gmail compose window in the browser. Nothing is sent
       server-side, so no form backend is needed. Gmail-in-the-browser is the
       primary route because it works without an OS mail handler registered —
       a desktop mailto: often fails silently. The success panel still offers
       mailto, clipboard and WhatsApp as alternatives. */
    const COMPANY_EMAIL = "jamboww.ltd@gmail.com";

    const fieldValue = (name) => {
      const el = contactForm.querySelector(`[name="${name}"]`);
      return el && el.value ? el.value.trim() : "";
    };

    const buildEnquiry = () => {
      const name    = fieldValue("name");
      const phone   = fieldValue("phone");
      const email   = fieldValue("email");
      const service = fieldValue("service");
      const message = fieldValue("message");

      const subject = service
        ? `Enquiry: ${service}${name ? ` — ${name}` : ""}`
        : `Website enquiry${name ? ` — ${name}` : ""}`;

      // CRLF keeps line breaks intact across mail clients
      const body = [
        `Name:    ${name || "-"}`,
        `Phone:   ${phone || "-"}`,
        `Email:   ${email || "-"}`,
        `Service: ${service || "-"}`,
        "",
        "Message:",
        message || "-",
        "",
        "— Sent from the Jambo Wood Works LTD website",
      ].join("\r\n");

      return { subject, body };
    };

    const buildGmail = ({ subject, body }) =>
      "https://mail.google.com/mail/?view=cm&fs=1"
      + `&to=${encodeURIComponent(COMPANY_EMAIL)}`
      + `&su=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(body)}`;

    const buildMailto = ({ subject, body }) =>
      `mailto:${COMPANY_EMAIL}`
      + `?subject=${encodeURIComponent(subject)}`
      + `&body=${encodeURIComponent(body)}`;

    const gmailLink  = successMsg && successMsg.querySelector("[data-mail-gmail]");
    const appLink    = successMsg && successMsg.querySelector("[data-mail-app]");
    const copyBtn    = successMsg && successMsg.querySelector("[data-mail-copy]");
    const statusText = successMsg && successMsg.querySelector("[data-mail-status]");

    let lastEnquiry = null;

    if (copyBtn) {
      copyBtn.addEventListener("click", async () => {
        if (!lastEnquiry) return;
        const text = `${lastEnquiry.subject}\r\n\r\n${lastEnquiry.body}`;
        const done = () => {
          const original = copyBtn.textContent;
          copyBtn.textContent = "Copied";
          setTimeout(() => { copyBtn.textContent = original; }, 1800);
        };
        try {
          await navigator.clipboard.writeText(text);
          done();
        } catch {
          // clipboard API needs a secure context; fall back to a temp textarea
          const ta = document.createElement("textarea");
          ta.value = text;
          ta.setAttribute("readonly", "");
          ta.style.position = "fixed";
          ta.style.opacity = "0";
          document.body.appendChild(ta);
          ta.select();
          try { document.execCommand("copy"); done(); } catch {}
          document.body.removeChild(ta);
        }
      });
    }

    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();

      if (successMsg) successMsg.hidden = true;
      if (errorMsg)   errorMsg.hidden = true;

      if (!validate()) {
        const firstBad = contactForm.querySelector(".is-invalid");
        if (firstBad) firstBad.focus();
        return;
      }

      lastEnquiry = buildEnquiry();
      const gmailUrl = buildGmail(lastEnquiry);

      // Keep every route in the panel current so any of them can be used
      if (gmailLink) gmailLink.href = gmailUrl;
      if (appLink)   appLink.href   = buildMailto(lastEnquiry);

      // Submitting is a user gesture, so this should not trip popup blockers
      const win = window.open(gmailUrl, "_blank", "noopener");

      if (!win && statusText) {
        statusText.textContent =
          "Your browser blocked the new tab. Use Open Gmail below, or copy the details.";
      }

      // The form is deliberately left filled in, so nothing is lost if the
      // visitor needs to reach us another way.
      if (successMsg) {
        successMsg.hidden = false;
        successMsg.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    });
  }


});

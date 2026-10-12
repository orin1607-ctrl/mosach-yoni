/* מוסך יוני – פחחות וצבע לרכב | לוגיקת האתר
   כל הפרטים נקראים מקובץ site-config.js – אין צורך לערוך קובץ זה. */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};
  var B = CFG.business || {};
  var ADDR = B.address || {};
  var SHOW_PH = CFG.showPlaceholders !== false;

  document.documentElement.classList.add("js");

  /* ---------- עזרים ---------- */
  function clean(v) { return (v == null ? "" : String(v)).trim(); }
  function digits(v) { return clean(v).replace(/\D/g, ""); }
  // "050-1234567" -> "972501234567"
  function intl(v) {
    var d = digits(v);
    if (!d) return "";
    if (d.indexOf("972") === 0) return d;
    if (d.charAt(0) === "0") return "972" + d.slice(1);
    return d;
  }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

  var phone = clean(B.phone);
  var wa = clean(B.whatsapp);
  var email = clean(B.email);
  var street = clean(ADDR.street);
  var city = clean(ADDR.city);
  var fullAddress = [street, city].filter(Boolean).join(", ");
  var mapsQuery = fullAddress;
  var lat = clean(B.geo && B.geo.lat), lng = clean(B.geo && B.geo.lng);

  var links = {
    call: phone ? "tel:+" + intl(phone) : "",
    whatsapp: wa ? "https://wa.me/" + intl(wa) : "",
    navigate: clean(B.mapsUrl) ||
      (lat && lng ? "https://www.google.com/maps/dir/?api=1&destination=" + lat + "," + lng :
      (mapsQuery ? "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(mapsQuery) : "")),
    waze: lat && lng ? "https://waze.com/ul?ll=" + lat + "," + lng + "&navigate=yes" :
      (fullAddress ? "https://waze.com/ul?q=" + encodeURIComponent(fullAddress) + "&navigate=yes" : ""),
    email: email ? "mailto:" + email : ""
  };

  var missingText = {
    call: "מספר הטלפון יתווסף בקרוב",
    whatsapp: "מספר הוואטסאפ יתווסף בקרוב",
    navigate: "כתובת המוסך תתווסף בקרוב",
    waze: "כתובת המוסך תתווסף בקרוב",
    email: "האימייל יתווסף בקרוב"
  };

  /* ---------- כפתורי פעולה ---------- */
  $all("[data-action]").forEach(function (el) {
    var action = el.getAttribute("data-action");
    var href = links[action];
    if (href && action === "whatsapp") {
      var msg = el.getAttribute("data-wa-text") || B.whatsappMessage || "";
      if (msg) href += "?text=" + encodeURIComponent(msg);
    }
    if (href) {
      el.setAttribute("href", href);
      if (/^https?:/.test(href)) { el.setAttribute("target", "_blank"); el.setAttribute("rel", "noopener"); }
    } else {
      el.removeAttribute("href");
      el.classList.add("is-disabled");
      el.setAttribute("aria-disabled", "true");
      el.setAttribute("title", missingText[action] || "יעודכן בקרוב");
      el.setAttribute("role", "link");
    }
  });
  document.addEventListener("click", function (e) {
    var dis = e.target.closest && e.target.closest(".is-disabled");
    if (dis) e.preventDefault();
  });

  /* ---------- טקסטים מקובץ ההגדרות ---------- */
  var values = {
    phone: phone,
    whatsapp: wa,
    email: email,
    address: fullAddress,
    cityPhrase: city ? " ב" + city : ""
  };
  $all("[data-bind]").forEach(function (el) {
    var key = el.getAttribute("data-bind");
    var val = values[key] || "";
    var fallback = el.getAttribute("data-fallback");
    var ph = el.getAttribute("data-placeholder");
    if (val) { el.textContent = val; return; }
    if (fallback != null) { el.textContent = fallback; return; }
    if (ph && SHOW_PH) { el.innerHTML = ""; var s = document.createElement("span"); s.className = "placeholder"; s.textContent = ph; el.appendChild(s); return; }
    el.textContent = "";
    if (ph) { var card = el.closest(".contact-card, li"); if (card) card.hidden = true; }
  });
  $all("[data-show-if]").forEach(function (el) {
    if (!values[el.getAttribute("data-show-if")]) el.hidden = true;
  });

  /* ---------- שעות פעילות ---------- */
  var hoursList = document.getElementById("hours-list");
  var hours = Array.isArray(B.hours) ? B.hours : [];
  if (hoursList) {
    if (hours.length) {
      hours.forEach(function (h) {
        var li = document.createElement("li");
        var d = document.createElement("span"); d.textContent = clean(h.days);
        var t = document.createElement("span"); t.textContent = clean(h.time);
        li.appendChild(d); li.appendChild(t); hoursList.appendChild(li);
      });
    } else if (SHOW_PH) {
      hoursList.innerHTML = '<li><span class="placeholder">[שעות פעילות – להשלמה]</span></li>';
    } else {
      var hc = hoursList.closest(".contact-card"); if (hc) hc.hidden = true;
    }
  }

  /* ---------- עובדות "אודות" ---------- */
  var factsEl = document.getElementById("about-facts");
  if (factsEl) {
    (CFG.aboutFacts || []).forEach(function (f) {
      var v = clean(f.value);
      if (!v && !SHOW_PH) return;
      var wrap = document.createElement("div"); wrap.className = "fact";
      var dt = document.createElement("dt"); dt.textContent = clean(f.label);
      var dd = document.createElement("dd");
      if (v) dd.textContent = v;
      else { var s = document.createElement("span"); s.className = "placeholder"; s.textContent = "להשלמה"; dd.appendChild(s); }
      wrap.appendChild(dt); wrap.appendChild(dd); factsEl.appendChild(wrap);
    });
    if (!factsEl.children.length) factsEl.hidden = true;
  }

  /* ---------- מפה ---------- */
  var mapBox = document.getElementById("map-box");
  if (mapBox && (mapsQuery || (lat && lng))) {
    var q = lat && lng ? lat + "," + lng : mapsQuery;
    mapBox.innerHTML = "";
    var iframe = document.createElement("iframe");
    iframe.src = "https://maps.google.com/maps?q=" + encodeURIComponent(q) + "&hl=he&z=16&output=embed";
    iframe.title = "מפת הגעה למוסך יוני – " + fullAddress;
    iframe.loading = "lazy";
    iframe.referrerPolicy = "no-referrer-when-downgrade";
    mapBox.appendChild(iframe);
  } else if (mapBox && !SHOW_PH) {
    mapBox.hidden = true;
  }

  /* ---------- גלריה ---------- */
  var UNSPLASH = /^https:\/\/images\.unsplash\.com\//;
  function imgUrl(src, w, h) {
    if (!UNSPLASH.test(src)) return src;
    return src.split("?")[0] + "?auto=format&fit=crop&w=" + w + (h ? "&h=" + h : "") + "&q=70";
  }
  var gallery = (CFG.gallery || []).filter(function (g) { return g && clean(g.src); });
  var grid = document.getElementById("gallery-grid");
  if (grid) {
    gallery.forEach(function (g, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "g-item reveal" + (g.wide ? " wide" : "");
      btn.setAttribute("aria-label", "הגדלת התמונה: " + clean(g.title));
      var img = document.createElement("img");
      img.loading = "lazy"; img.decoding = "async";
      img.alt = clean(g.alt) || clean(g.title);
      img.src = clean(g.thumb) || imgUrl(g.src, g.wide ? 900 : 560, 480);
      if (!clean(g.thumb) && UNSPLASH.test(g.src)) {
        img.srcset = imgUrl(g.src, g.wide ? 900 : 560, 480) + " 1x, " + imgUrl(g.src, g.wide ? 1600 : 1000, 860) + " 2x";
      }
      btn.appendChild(img);
      var tag = document.createElement("span");
      tag.className = "illus-tag" + (g.illustration === false ? " g-real" : "");
      tag.textContent = g.illustration === false ? "עבודה מהמוסך" : "תמונת המחשה";
      btn.appendChild(tag);
      var cap = document.createElement("span"); cap.className = "g-cap"; cap.textContent = clean(g.title);
      btn.appendChild(cap);
      btn.addEventListener("click", function () { openLb(i); });
      grid.appendChild(btn);
    });
    if (!gallery.length) grid.innerHTML = '<p class="section-lead">תמונות יתווספו בקרוב.</p>';
  }

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lb-img");
  var lbCap = document.getElementById("lb-cap");
  var cur = 0, lastFocus = null;
  function showLb(i) {
    cur = (i + gallery.length) % gallery.length;
    var g = gallery[cur];
    lbImg.src = imgUrl(g.src, 1600);
    lbImg.alt = clean(g.alt) || clean(g.title);
    lbCap.textContent = clean(g.title) + (g.illustration === false ? "" : " · תמונת המחשה – אינה עבודה של המוסך");
  }
  function openLb(i) {
    if (!lb || !gallery.length) return;
    lastFocus = document.activeElement;
    showLb(i); lb.hidden = false; document.body.style.overflow = "hidden";
    lb.querySelector(".lb-close").focus();
  }
  function closeLb() {
    lb.hidden = true; document.body.style.overflow = ""; lbImg.removeAttribute("src");
    if (lastFocus) lastFocus.focus();
  }
  if (lb) {
    lb.querySelector(".lb-close").addEventListener("click", closeLb);
    lb.querySelector(".lb-prev").addEventListener("click", function () { showLb(cur - 1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { showLb(cur + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
    document.addEventListener("keydown", function (e) {
      if (lb.hidden) return;
      if (e.key === "Escape") closeLb();
      // RTL: חץ ימינה = הקודמת, חץ שמאלה = הבאה
      else if (e.key === "ArrowLeft") showLb(cur + 1);
      else if (e.key === "ArrowRight") showLb(cur - 1);
      else if (e.key === "Tab") {
        var f = $all("button", lb), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
  }

  /* ---------- תפריט נייד ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("main-nav");
  function setNav(open) {
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "סגירת תפריט" : "פתיחת תפריט");
    nav.classList.toggle("open", open);
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () { setNav(toggle.getAttribute("aria-expanded") !== "true"); });
    $all("a", nav).forEach(function (a) { a.addEventListener("click", function () { setNav(false); }); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape" && nav.classList.contains("open")) { setNav(false); toggle.focus(); } });
  }

  /* ---------- כותרת בגלילה ---------- */
  var header = document.querySelector(".site-header");
  function onScroll() { header.classList.toggle("scrolled", window.scrollY > 30); }
  window.addEventListener("scroll", onScroll, { passive: true }); onScroll();

  /* ---------- אנימציית כניסה ---------- */
  var reveals = $all(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- שנה בתחתית ---------- */
  var y = document.getElementById("year"); if (y) y.textContent = new Date().getFullYear();

  /* נתונים מובנים לגוגל (AutoBodyShop) נמצאים ב-index.html, בתגית application/ld+json */

  /* ---------- מדידת פרסום (רק אם הוגדר מזהה) ---------- */
  var aid = clean(CFG.analyticsId);
  if (/^(G|AW)-[A-Z0-9-]+$/i.test(aid)) {
    var gs = document.createElement("script");
    gs.async = true; gs.src = "https://www.googletagmanager.com/gtag/js?id=" + encodeURIComponent(aid);
    document.head.appendChild(gs);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { window.dataLayer.push(arguments); };
    window.gtag("js", new Date()); window.gtag("config", aid);
    document.addEventListener("click", function (e) {
      var t = e.target.closest && e.target.closest("[data-track]");
      if (t && !t.classList.contains("is-disabled")) {
        window.gtag("event", "contact_click", { method: t.getAttribute("data-action"), placement: t.getAttribute("data-track") });
      }
    });
  }
})();

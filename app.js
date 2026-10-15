/* Captain Arlan Stagg website — shared behavior.
   EDIT HERE once details are approved:
     phone:        e.g. "(415) 555-0123"   (leave "" to hide all phone links)
     email:        e.g. "captain@example.com" (leave "" to hide)
     formEndpoint: a form service URL that accepts POST JSON (e.g. a Formspree form URL).
                   Leave "" and the form honestly says it is not connected yet. */
var SITE = {
  phone: "(415) 302-1910",
  email: "arlanstagg@icloud.com",
  formEndpoint: "https://formsubmit.co/ajax/arlanstagg@icloud.com"
};

(function () {
  var page = document.body.getAttribute("data-page") || "home";
  var PAGES = [["index.html","Home","home"],["about.html","About","about"],["services.html","Services","services"],["gallery.html","Gallery","gallery"],["contact.html","Contact","contact"]];
  var telHref = SITE.phone ? "tel:" + SITE.phone.replace(/[^\d+]/g, "") : "";
  var PHONE_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A5A0B" stroke-width="2.2" aria-hidden="true"><path d="M5 3h4l2 5-3 2a12 12 0 0 0 6 6l2-3 5 2v4a2 2 0 0 1-2 2A18 18 0 0 1 3 5a2 2 0 0 1 2-2z"/></svg>';
  var MAIL_SVG = '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9A5A0B" stroke-width="2.2" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></svg>';
  var LOGO = '<svg viewBox="0 0 40 40" fill="none" stroke="#9A5A0B" stroke-width="2.4" stroke-linecap="round" aria-hidden="true"><circle cx="20" cy="22" r="8"/><path d="M20 6v6M8 12l4 4M32 12l-4 4M4 33c4 0 4-2 8-2s4 2 8 2 4-2 8-2 4 2 8 2"/></svg>';
  function esc(s){return String(s).replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c];});}
  function links(){return PAGES.map(function(p){return '<li><a href="'+p[0]+'"'+(p[2]===page?' aria-current="page"':'')+'>'+p[1]+'</a></li>';}).join("");}

  /* Header */
  var head = document.getElementById("site-head");
  if (head) {
    head.className = "site-head";
    head.innerHTML =
      '<div class="wrap head-in">' +
        '<a class="brand" href="index.html" aria-label="Captain Arlan Stagg, home">' + LOGO + '<span>Captain Arlan Stagg</span></a>' +
        '<nav class="main-nav" aria-label="Main"><ul>' + links() + '</ul>' +
          (SITE.phone ? '<a class="head-phone" href="' + telHref + '">' + PHONE_SVG + esc(SITE.phone) + '</a>' : '') +
          '<a class="btn sm" href="contact.html#consult">Free Consultation</a></nav>' +
        '<button class="menu-btn" type="button" aria-expanded="false" aria-controls="mobile-nav" aria-label="Open menu"><span></span><span></span><span></span></button>' +
      '</div>' +
      '<div class="mobile-nav wrap" id="mobile-nav"><nav aria-label="Mobile"><ul>' + links() + '</ul></nav>' +
        (SITE.phone ? '<a class="btn ghost" href="' + telHref + '">Call ' + esc(SITE.phone) + '</a>' : '') +
        '<a class="btn" href="contact.html#consult">Request a Free 15-Minute Consultation</a></div>';
    var mb = head.querySelector(".menu-btn"), mn = head.querySelector(".mobile-nav");
    mb.addEventListener("click", function () {
      var open = mn.classList.toggle("open");
      mb.setAttribute("aria-expanded", open);
      mb.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    var onScroll = function(){ head.classList.toggle("scrolled", window.scrollY > 10); };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
  }

  /* Footer */
  var foot = document.getElementById("site-foot");
  if (foot) {
    foot.className = "site-foot";
    var contactBits = [];
    if (SITE.phone) contactBits.push('<li><a href="' + telHref + '">' + esc(SITE.phone) + '</a></li>');
    if (SITE.email) contactBits.push('<li><a href="mailto:' + esc(SITE.email) + '">' + esc(SITE.email) + '</a></li>');
    contactBits.push('<li><a href="contact.html#consult">Request a free 15-minute consultation</a></li>');
    foot.innerHTML =
      '<div class="wrap"><div class="foot-grid">' +
        '<div><h2>Captain Arlan Stagg</h2><p style="margin-top:8px">Captain services, yacht management, owner training and wedding ceremonies on San Francisco Bay. Deliveries and select services in the Sacramento–San Joaquin Delta.</p></div>' +
        '<nav aria-label="Footer"><ul>' + PAGES.map(function(p){return '<li><a href="' + p[0] + '">' + p[1] + '</a></li>';}).join("") + '</ul></nav>' +
        '<div><ul>' + contactBits.join("") + '</ul></div>' +
      '</div><p class="foot-small">© ' + new Date().getFullYear() + ' Captain Arlan Stagg · USCG 200-Ton Near Coastal Master</p></div>';
  }

  /* Mobile bottom bar */
  var bar = document.createElement("div");
  bar.className = "mbar";
  bar.innerHTML = (SITE.phone ? '<a class="btn ghost" href="' + telHref + '">Call Captain Arlan</a>' : '') + '<a class="btn" href="contact.html#consult">Free Consultation</a>';
  if (page !== "contact") document.body.appendChild(bar);

  /* Fill in phone/email wherever pages ask for them; hide when not set */
  [].forEach.call(document.querySelectorAll("[data-phone]"), function (el) {
    if (!SITE.phone) { el.hidden = true; return; }
    el.setAttribute("href", telHref); var t = el.querySelector("[data-phone-text]"); if (t) t.textContent = SITE.phone;
  });
  [].forEach.call(document.querySelectorAll("[data-email]"), function (el) {
    if (!SITE.email) { el.hidden = true; return; }
    el.setAttribute("href", "mailto:" + SITE.email); var t = el.querySelector("[data-email-text]"); if (t) t.textContent = SITE.email;
  });
  [].forEach.call(document.querySelectorAll("[data-needs-contact]"), function (el) {
    if (!SITE.phone && !SITE.email) el.hidden = true;
  });

  /* Hero slider */
  var slider = document.querySelector("[data-slider]");
  if (slider) {
    var slides = [].slice.call(slider.querySelectorAll(".slide"));
    var dots = slider.querySelector(".dots"), i = 0, timer = null;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var playing = !reduce, pauseBtn = slider.querySelector(".pause");
    slides.forEach(function (s, k) {
      var b = document.createElement("button");
      b.type = "button"; b.setAttribute("aria-label", "Show slide " + (k + 1) + " of " + slides.length);
      b.addEventListener("click", function () { go(k, true); });
      dots.appendChild(b);
    });
    function go(k, user) {
      slides[i].classList.remove("on"); slides[i].setAttribute("aria-hidden", "true");
      i = (k + slides.length) % slides.length;
      slides[i].classList.add("on"); slides[i].removeAttribute("aria-hidden");
      [].forEach.call(dots.children, function (d, n) { d.setAttribute("aria-current", n === i ? "true" : "false"); });
      if (user) restart();
    }
    function restart() { clearInterval(timer); if (playing) timer = setInterval(function () { go(i + 1); }, 8000); }
    slider.querySelector(".prev").addEventListener("click", function () { go(i - 1, true); });
    slider.querySelector(".next").addEventListener("click", function () { go(i + 1, true); });
    if (pauseBtn) {
      pauseBtn.textContent = playing ? "Pause slideshow" : "Play slideshow";
      pauseBtn.addEventListener("click", function () { playing = !playing; pauseBtn.textContent = playing ? "Pause slideshow" : "Play slideshow"; restart(); });
    }
    slider.addEventListener("mouseenter", function () { clearInterval(timer); });
    slider.addEventListener("mouseleave", restart);
    slider.addEventListener("focusin", function () { clearInterval(timer); });
    slider.addEventListener("focusout", restart);
    slides.forEach(function (s, n) { if (n) s.setAttribute("aria-hidden", "true"); });
    go(0); restart();
  }

  /* Services accordion */
  var items = [].slice.call(document.querySelectorAll(".acc-item"));
  function setOpen(item, open) {
    var b = item.querySelector(".acc-btn"), p = item.querySelector(".acc-panel");
    b.setAttribute("aria-expanded", open ? "true" : "false"); p.hidden = !open;
  }
  items.forEach(function (item) {
    item.querySelector(".acc-btn").addEventListener("click", function () {
      setOpen(item, this.getAttribute("aria-expanded") !== "true");
    });
  });
  function openFromHash() {
    var id = (location.hash || "").slice(1); if (!id) return;
    var t = document.getElementById(id);
    if (t && t.classList.contains("acc-item")) { setOpen(t, true); setTimeout(function(){ t.scrollIntoView({ block: "start" }); }, 30); }
  }
  if (items.length) { openFromHash(); window.addEventListener("hashchange", openFromHash); }

  /* Gallery lightbox */
  var lb = document.getElementById("lightbox");
  if (lb) {
    var tiles = [].slice.call(document.querySelectorAll("[data-tile]")), j = 0, lastFocus = null;
    var frame = lb.querySelector(".lb-frame .ph"), cap = lb.querySelector(".lb-cap");
    function show(k) {
      j = (k + tiles.length) % tiles.length;
      var t = tiles[j], img = t.querySelector("img");
      frame.classList.toggle("has-img", !!img);
      frame.innerHTML = img ? '<img src="' + img.getAttribute("src") + '" alt="' + esc(img.getAttribute("alt") || "") + '">' : '<strong>Photo coming soon</strong><span>' + esc(t.getAttribute("data-title")) + '</span>';
      cap.textContent = t.getAttribute("data-title") + " (" + (j + 1) + " of " + tiles.length + ")";
    }
    function open(k) { lastFocus = document.activeElement; show(k); lb.hidden = false; lb.querySelector(".lb-close").focus(); }
    function close() { lb.hidden = true; if (lastFocus) lastFocus.focus(); }
    tiles.forEach(function (t, k) { t.addEventListener("click", function () { open(k); }); });
    lb.querySelector(".lb-close").addEventListener("click", close);
    lb.querySelector(".lb-prev").addEventListener("click", function () { show(j - 1); });
    lb.querySelector(".lb-next").addEventListener("click", function () { show(j + 1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) close(); });
    lb.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") show(j - 1);
      if (e.key === "ArrowRight") show(j + 1);
    });
  }

  /* Contact form */
  var form = document.getElementById("consult-form");
  if (form) {
    var status = form.querySelector(".status"), sum = form.querySelector("[data-sum]");
    var a = 2 + Math.floor(Math.random() * 7), b2 = 1 + Math.floor(Math.random() * 8);
    sum.textContent = a + " + " + b2;
    if (location.hash === "#wedding") { form.querySelector("#f-service").value = "Wedding Officiant / Wedding Ceremony"; }
    function setStatus(kind, msg, show) { status.className = "status " + kind; status.textContent = msg; status.hidden = false; if (show && status.scrollIntoView) status.scrollIntoView({ block: "center", behavior: "smooth" }); }
    if (!SITE.formEndpoint) setStatus("info", "This form isn't connected to an inbox yet. Please call or email me directly using the details on this page.");
    function fieldError(id, msg) {
      var el = document.getElementById(id), e = document.getElementById(id + "-err");
      el.setAttribute("aria-invalid", msg ? "true" : "false"); e.textContent = msg || "";
    }
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var name = form.elements["name"].value.trim(), email = form.elements["email"].value.trim(), msg = form.elements["message"].value.trim();
      var ok = true;
      fieldError("f-name", name ? "" : "Please enter your name."); ok = ok && !!name;
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      fieldError("f-email", emailOk ? "" : "Please enter a valid email address."); ok = ok && emailOk;
      fieldError("f-message", msg ? "" : "Please tell me a little about what you need."); ok = ok && !!msg;
      var ans = parseInt(form.elements["check"].value, 10);
      fieldError("f-check", ans === a + b2 ? "" : "That answer isn't right. Please try again."); ok = ok && ans === a + b2;
      if (!ok) { setStatus("bad", "Please fix the highlighted fields."); var first = form.querySelector('[aria-invalid="true"]'); if (first) first.focus(); return; }
      if (form.elements["company"].value) return; /* spam trap filled: silently ignore */
      if (!SITE.formEndpoint) { setStatus("info", "Thanks! This form isn't connected to an inbox yet, so your message was not sent. Please call or email me directly."); return; }
      var btn = form.querySelector("button[type=submit]"); btn.disabled = true; setStatus("info", "Sending…", true);
      var service = form.elements["service"].value;
      var data = { name: name, email: email, phone: form.elements["phone"].value.trim(), service: service, message: msg, _replyto: email, _subject: "Website inquiry" + (service ? ": " + service : "") + " (" + name + ")", _template: "table" };
      fetch(SITE.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json", "Accept": "application/json" }, body: JSON.stringify(data) })
        .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || String(j.success) !== "true") throw new Error(j.message || r.status); }); })
        .then(function () { setStatus("ok", "Thank you, " + name + "! Your message was sent. I'll be in touch soon.", true); form.reset(); })
        .catch(function () { setStatus("bad", "Sorry, your message couldn't be sent. Please call or email me directly.", true); })
        .then(function () { btn.disabled = false; });
    });
  }
})();

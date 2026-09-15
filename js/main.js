/* =========================================================================
   Alternativa pro Rajhradice – logika webu
   Data bere z data.js. Každá stránka si zavolá jen to, co potřebuje
   (podle data-page na <body>).
   ========================================================================= */

const ICONS = {
  facebook: '<svg viewBox="0 0 24 24"><path d="M13.5 22v-8.2h2.8l.4-3.3h-3.2V8.4c0-.9.3-1.6 1.6-1.6h1.7V3.9c-.3 0-1.3-.1-2.5-.1-2.5 0-4.2 1.5-4.2 4.3v2.4H7.3v3.3h2.8V22h3.4z"/></svg>',
  instagram: '<svg viewBox="0 0 24 24"><path d="M12 7.3a4.7 4.7 0 1 0 0 9.4 4.7 4.7 0 0 0 0-9.4zm0 7.7a3 3 0 1 1 0-6 3 3 0 0 1 0 6zm5-8.9a1.1 1.1 0 1 0 0 2.2 1.1 1.1 0 0 0 0-2.2zM12 2.2c-2.7 0-3 0-4.1.1-1 0-1.8.2-2.4.5-.7.3-1.2.6-1.8 1.2S2.8 5.1 2.5 5.8c-.3.6-.4 1.4-.5 2.4C2 9.3 2 9.6 2 12.2s0 3 .1 4c0 1 .2 1.8.5 2.4.3.7.6 1.2 1.2 1.8s1.1.9 1.8 1.2c.6.3 1.4.4 2.4.5h4.1c2.7 0 3 0 4-.1 1 0 1.8-.2 2.4-.5.7-.3 1.2-.6 1.8-1.2s.9-1.1 1.2-1.8c.3-.6.4-1.4.5-2.4v-8c0-1-.2-1.8-.5-2.4-.3-.7-.6-1.2-1.2-1.8s-1.1-.9-1.8-1.2c-.6-.3-1.4-.4-2.4-.5H12zm0 1.8c2.7 0 3 0 4 .1.9 0 1.5.2 1.8.3.5.2.8.4 1.1.7.3.3.6.7.7 1.1.1.4.3.9.3 1.8.1 1 .1 1.3.1 4s0 3-.1 4c0 .9-.2 1.5-.3 1.8-.2.5-.4.8-.7 1.1-.3.3-.7.6-1.1.7-.4.1-.9.3-1.8.3-1 .1-1.3.1-4 .1s-3 0-4-.1c-.9 0-1.5-.2-1.8-.3-.5-.2-.8-.4-1.1-.7-.3-.3-.6-.7-.7-1.1-.1-.4-.3-.9-.3-1.8-.1-1-.1-1.3-.1-4s0-3 .1-4c0-.9.2-1.5.3-1.8.2-.5.4-.8.7-1.1.3-.3.7-.6 1.1-.7.4-.1.9-.3 1.8-.3 1-.1 1.3-.1 4-.1z"/></svg>',
  youtube: '<svg viewBox="0 0 24 24"><path d="M23 7.2s-.2-1.6-.9-2.3c-.9-.9-1.9-.9-2.3-1C16.5 3.7 12 3.7 12 3.7s-4.5 0-7.8.2c-.5.1-1.5.1-2.3 1C1.2 5.6 1 7.2 1 7.2S.8 9.1.8 11v1.8c0 1.9.2 3.8.2 3.8s.2 1.6.9 2.3c.9.9 2 .9 2.5 1 1.8.2 7.6.2 7.6.2s4.5 0 7.8-.2c.5-.1 1.5-.1 2.3-1 .7-.7.9-2.3.9-2.3s.2-1.9.2-3.8V11c0-1.9-.2-3.8-.2-3.8zM9.7 15V8.4l6.1 3.3L9.7 15z"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="M6 3.8v16.4c0 .8.9 1.3 1.6.9l13-8.2c.6-.4.6-1.4 0-1.8l-13-8.2C6.9 2.5 6 3 6 3.8z"/></svg>',
  arrow: '<svg class="arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
  phone: '<svg viewBox="0 0 24 24"><path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z"/></svg>',
};

const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const initials = (name) => name.split(/\s+/).filter(Boolean).slice(0, 2).map((w) => w[0]).join("").toUpperCase();
const ytThumb = (id) => `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
const ytThumbHi = (id) => `https://i.ytimg.com/vi/${id}/maxresdefault.jpg`;
const ytEmbed = (id) => `https://www.youtube-nocookie.com/embed/${id}?rel=0&modestbranding=1&color=white`;
const param = (k) => new URLSearchParams(location.search).get(k);
const videoLabel = (v) => (v.typ === "prispevek" ? `Příspěvek č. ${v.cislo}` : VIDEO_TYPY[v.typ] || "");
// texty začínající "Doplnit" jsou poznámky pro redakci, návštěvník je nevidí
const isDraft = (t) => /^\s*doplnit\b/i.test(String(t || ""));
const real = (arr) => (arr || []).filter((t) => t && !isDraft(t));

const avatarHtml = (c, extra = "") =>
  `<div class="avatar ${extra}">${c.foto ? `<img src="${esc(c.foto)}" alt="${esc(c.jmeno)}" loading="lazy">` : esc(initials(c.jmeno))}</div>`;

/* --- společné ------------------------------------------------------------ */

function initNav() {
  const nav = document.querySelector(".nav");
  const burger = nav?.querySelector(".nav__burger");
  burger?.addEventListener("click", () => nav.classList.toggle("is-open"));
  nav?.querySelectorAll(".nav__links a").forEach((a) => a.addEventListener("click", () => nav.classList.remove("is-open")));

  // zvýraznění aktuální stránky
  const page = document.body.dataset.page;
  nav?.querySelectorAll(".nav__links a[data-nav]").forEach((a) => a.classList.toggle("is-active", a.dataset.nav === page));
}

function initReveal() {
  const els = document.querySelectorAll(".reveal");
  if (!("IntersectionObserver" in window)) { els.forEach((e) => e.classList.add("is-in")); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) { en.target.classList.add("is-in"); io.unobserve(en.target); } });
  }, { threshold: .12, rootMargin: "0px 0px -6% 0px" });
  els.forEach((e) => io.observe(e));
}

function renderSocialLinks(container, compact = false, asList = false) {
  if (!container) return;
  container.innerHTML = SOCIALS.map((s) => {
    const a = `<a class="social__link" href="${esc(s.url)}" target="_blank" rel="noopener" aria-label="${esc(s.nazev)}">
      ${ICONS[s.id] || ""}
      ${compact ? "" : `<span>${esc(s.nazev)}<small>${esc(s.handle)}</small></span>`}
    </a>`;
    return asList ? `<li>${a}</li>` : a;
  }).join("");
}

function initCountdown() {
  const els = document.querySelectorAll(".countdown");
  if (!els.length) return;
  const label = document.querySelector(".strip__count .strip__label");
  const tick = () => {
    const { text, html } = countdownState(Date.now());
    if (label) label.textContent = text;
    els.forEach((el) => (el.innerHTML = html));
  };
  tick(); setInterval(tick, 30e3);
}

// tři stavy: před volbami (odpočet) · během voleb · po volbách
function countdownState(now) {
  if (now >= SITE.volbyKonec) {
    return { text: "Volby proběhly", html: `<div class="countdown__msg"><b>Děkujeme za každý hlas.</b><a href="${esc(SITE.vysledkyUrl)}" target="_blank" rel="noopener">Podívejte se na výsledky ↗</a></div>` };
  }
  if (now >= SITE.volby) {
    return { text: "Právě teď", html: `<div class="countdown__msg"><b>Volby probíhají!</b><span>Pátek 14–22 h, sobota 8–14 h. Přijďte k urnám.</span></div>` };
  }
  const diff = SITE.volby - now;
  const d = Math.floor(diff / 864e5), h = Math.floor(diff / 36e5) % 24, m = Math.floor(diff / 6e4) % 60;
  return { text: "Do voleb zbývá", html: [[d, "dní"], [h, "hod"], [m, "min"]].map(([v, l]) => `<div><b>${String(v).padStart(2, "0")}</b><small>${l}</small></div>`).join("") };
}

async function renderHeroVideo() {
  const box = document.querySelector("#hero-video");
  if (!box) return;
  const known = Object.fromEntries(VIDEOS.map((v) => [v.yt, v]));
  const live = await fetchLatestVideos(1);
  let v;
  if (live && live[0]) {
    const k = known[live[0].yt];
    v = k ? { yt: k.yt, titul: k.titul, label: videoLabel(k), sub: isDraft(k.shrnuti) ? "" : k.shrnuti, href: `videa.html?v=${k.id}` }
          : { yt: live[0].yt, titul: cleanYtTitle(live[0].titul), label: ytLabelFromTitle(live[0].titul), sub: "", href: `videa.html?yt=${live[0].yt}` };
  } else {
    const k = [...VIDEOS].sort((a, b) => b.datum.localeCompare(a.datum))[0];
    v = { yt: k.yt, titul: k.titul, label: videoLabel(k), sub: isDraft(k.shrnuti) ? "" : k.shrnuti, href: `videa.html?v=${k.id}` };
  }
  box.href = v.href;
  box.querySelector(".hero__thumb").innerHTML = `<img src="${ytThumbHi(v.yt)}" onerror="this.onerror=null;this.src='${ytThumb(v.yt)}'" alt=""><span class="hero__play">${ICONS.play}</span>`;
  box.querySelector(".hero__vtag").innerHTML = `<i class="mark"></i>Nejnovější video · ${esc(v.label)}`;
  box.querySelector(".hero__vtitle").textContent = v.titul;
  if (v.sub) box.querySelector(".hero__vinfo").insertAdjacentHTML("beforeend", `<span class="hero__vsub">${esc(v.sub)}</span>`);
}

/* --- homepage ------------------------------------------------------------ */

// hero: mozaika kandidátů v pořadí kandidátky (1, 2, 3 … a znovu), dlaždice 4:5
function renderHeroMosaic() {
  const box = document.querySelector("#hero-mosaic");
  if (!box) return;
  const list = [...CANDIDATES].sort((a, b) => a.poradi - b.poradi);
  const tile = (c) => `assets/img/tym/mozaika/${String(c.poradi).padStart(2, "0")}-${c.id}.webp`;
  const build = () => {
    const sec = box.parentElement, W = sec.clientWidth, H = sec.clientHeight;
    // cca 4 sloupce na notebooku, 5–6 na velkém monitoru, 2 na mobilu
    const cols = Math.max(2, Math.round(W / 400)), cell = W / cols, rows = Math.ceil(H / (cell * 5 / 4));
    box.style.setProperty("--cols", cols); box.style.setProperty("--cell", cell + "px");
    const key = cols + "x" + rows;
    if (box.dataset.key === key) return;
    box.dataset.key = key;
    box.innerHTML = Array.from({ length: cols * rows }, (_, i) => {
      const c = list[i % list.length];
      return `<figure style="animation-delay:${(i % cols) * 50 + Math.floor(i / cols) * 90}ms"><img src="${esc(tile(c))}" width="480" height="600" alt="" ${i < cols * 2 ? 'fetchpriority="high"' : 'loading="lazy"'}></figure>`;
    }).join("");
  };
  build();
  addEventListener("resize", build);
}

function renderTeam() {
  const grid = document.querySelector("#team-grid");
  if (!grid) return;
  const n = Number(grid.dataset.limit) || CANDIDATES.length;
  const sorted = [...CANDIDATES].sort((a, b) => a.poradi - b.poradi).slice(0, n);
  const rest = CANDIDATES.length - sorted.length;
  document.querySelectorAll("[data-team-rest]").forEach((el) => (el.textContent = rest > 0 ? `Všech ${CANDIDATES.length} kandidátů` : "Celá kandidátka"));
  grid.innerHTML = sorted.map((c, i) => {
    const lead = c.poradi === 1;
    return `
    <a class="member ${lead ? "member--lead" : ""} reveal" data-delay="${(i % 3) + 1}" href="kandidati.html?k=${esc(c.id)}">
      <span class="member__num">${c.poradi}</span>
      ${avatarHtml(c)}
      <div>
        <div class="member__name">${esc(c.jmeno)}</div>
        ${lead ? `<div class="member__role">${esc(c.role)}</div>` : ""}
      </div>
      <div class="member__prof">${esc(c.profese || "")}</div>
      <div class="member__age">${c.vek ? `${c.vek} let` : ""}</div>
      <span class="member__go">${ICONS.arrow}</span>
    </a>`;
  }).join("");
}

// program: časová osa tří období, u každého prvních 5 témat + "dalších N"
function renderProgramTimeline() {
  const box = document.querySelector("#program-timeline");
  if (!box) return;
  box.innerHTML = PROGRAM.map((p, i) => `
    <div class="tl__item">
      <div class="tl__year"><small>Část ${i + 1}</small>Rajhradice ${esc(p.roky)}</div>
      <div class="tl__sub">${esc(p.sub)}</div>
      <div class="tl__list">
        ${p.kapitoly.slice(0, 5).map(([id, n]) => `<a href="program.html#${esc(id)}">${esc(n)}</a>`).join("")}
        ${p.kapitoly.length > 5 ? `<a class="more" href="program.html#${esc(p.id)}">+ dalších ${p.kapitoly.length - 5}</a>` : ""}
      </div>
    </div>`).join("");
}

/* --- podstránka: program – obsah vpravo se sledováním scrollu ------------ */

function initProgramNav() {
  const main = document.querySelector("main.prose");
  if (!main) return;
  const heads = [...main.querySelectorAll("h2[id], h3[id]")];
  if (!heads.length) return;

  // obsah textu zabalit, vedle něj dát postranní navigaci
  const body = document.createElement("div"); body.className = "prose__body";
  while (main.firstChild) body.appendChild(main.firstChild);
  main.appendChild(body);
  const aside = document.createElement("aside");
  aside.className = "pnav"; aside.setAttribute("aria-label", "Obsah programu");
  aside.innerHTML = `
    <div class="pnav__bar"><i></i></div>
    <div class="pnav__title">Obsah</div>
    <ol class="pnav__list">
      ${heads.map((h) => `<li class="pnav__${h.tagName.toLowerCase()}"><a href="#${esc(h.id)}">${esc(h.querySelector("span")?.textContent || h.lastChild.textContent.trim())}</a></li>`).join("")}
    </ol>
    <a class="pnav__top" href="#uvod">↑ Zpět nahoru</a>`;
  main.appendChild(aside);
  main.classList.add("has-pnav");
  const links = new Map([...aside.querySelectorAll("a[href^='#']")].map((a) => [a.getAttribute("href").slice(1), a]));
  const bar = aside.querySelector(".pnav__bar i");

  // aktivní kapitola = poslední nadpis nad třetinou obrazovky; průběh čtení = pruh
  let ticking = false;
  const update = () => {
    ticking = false;
    const line = innerHeight * 0.33;
    let cur = heads[0];
    for (const h of heads) { if (h.getBoundingClientRect().top <= line) cur = h; else break; }
    links.forEach((a, id) => a.classList.toggle("is-active", id === cur.id));
    links.get(cur.id)?.scrollIntoView({ block: "nearest" });
    const r = body.getBoundingClientRect();
    bar.style.transform = `scaleY(${Math.min(1, Math.max(0, (line - r.top) / r.height))})`;
  };
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(update); } }, { passive: true });
  addEventListener("resize", update);
  update();
}

/* --- nejnovější videa z YouTube ------------------------------------------
   1) YouTube Data API v3 (když je v data.js ytApiKey)
   2) jinak veřejný RSS kanálu přes rss2json.com (bez klíče)
   3) když nic nejde, seznam z data.js
   Výsledek se 30 minut drží v sessionStorage. */

async function fetchLatestVideos(n) {
  const key = "yt-latest-" + SITE.ytChannelId;
  try {
    const c = JSON.parse(sessionStorage.getItem(key) || "null");
    if (c && Date.now() - c.t < 30 * 60e3) return c.items.slice(0, n);
  } catch {}

  let items = null;
  try {
    if (SITE.ytApiKey) {
      const pl = "UU" + SITE.ytChannelId.slice(2);           // playlist "uploads"
      const r = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=${n}&playlistId=${pl}&key=${SITE.ytApiKey}`);
      const d = await r.json();
      items = d.items.map((it) => ({ yt: it.snippet.resourceId.videoId, titul: it.snippet.title, datum: it.snippet.publishedAt }));
    } else {
      const rss = `https://www.youtube.com/feeds/videos.xml?channel_id=${SITE.ytChannelId}`;
      const r = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rss)}`);
      const d = await r.json();
      if (d.status !== "ok") throw new Error(d.message);
      items = d.items.map((it) => ({ yt: it.guid.replace("yt:video:", ""), titul: it.title, datum: it.pubDate }));
    }
    items.sort((a, b) => new Date(b.datum) - new Date(a.datum));
    sessionStorage.setItem(key, JSON.stringify({ t: Date.now(), items }));
  } catch (e) {
    console.warn("YouTube se nepodařilo načíst, beru seznam z data.js", e);
    return null;
  }
  return items.slice(0, n);
}

// očistí název z YouTube ("Alternativa pro Rajhradice – kampaň | Příspěvek č. 7 – Chodníky")
function cleanYtTitle(t) {
  return t.replace(/^Alternativa pro Rajhradice\s*[-–|]\s*(kampaň\s*[|–-]\s*)?/i, "").trim();
}
function ytLabelFromTitle(t) {
  const m = t.match(/Příspěvek č\.\s*(\d+)/i);
  return m ? `Příspěvek č. ${m[1]}` : "Video";
}

async function renderVideoTeasers() {
  const grid = document.querySelector("#video-grid");
  if (!grid) return;
  const n = SITE.ytLatestCount || 4;
  grid.innerHTML = Array.from({ length: n }, () => `<div class="vcard vcard--skeleton"><div class="vcard__thumb"></div><div class="vcard__body"></div></div>`).join("");

  const live = await fetchLatestVideos(n * 3);
  const known = Object.fromEntries(VIDEOS.map((v) => [v.yt, v]));
  const all = live
    ? live.map((it) => {
        const v = known[it.yt];
        return v
          ? { ...v, href: `videa.html?v=${v.id}` }
          : { yt: it.yt, titul: cleanYtTitle(it.titul), typ: ytLabelFromTitle(it.titul) === "Video" ? "ostatni" : "prispevek", shrnuti: "", delka: "", label: ytLabelFromTitle(it.titul), href: `videa.html?yt=${it.yt}` };
      })
    : [...VIDEOS].sort((a, b) => b.datum.localeCompare(a.datum)).map((v) => ({ ...v, href: `videa.html?v=${v.id}` }));
  // přednostně kampaňové příspěvky (songy mají všechny stejný náhled), zbytek jen na doplnění
  const list = [...all.filter((v) => v.typ === "prispevek"), ...all.filter((v) => v.typ !== "prispevek")].slice(0, n);

  grid.innerHTML = list.map((v, i) => `
    <a class="vcard reveal" data-delay="${(i % 4) + 1}" href="${esc(v.href)}">
      <div class="vcard__thumb">
        <img src="${ytThumbHi(v.yt)}" onerror="this.onerror=null;this.src='${ytThumb(v.yt)}'" alt="" loading="lazy">
        <div class="vcard__play"><i>${ICONS.play}</i></div>
        <span class="vcard__tag">${esc(v.label || videoLabel(v))}</span>
        ${v.delka ? `<span class="vcard__len">${esc(v.delka)}</span>` : ""}
      </div>
      <div class="vcard__body">
        <div class="vcard__title">${esc(v.titul)}</div>
        ${v.shrnuti && !isDraft(v.shrnuti) ? `<p class="vcard__sum">${esc(v.shrnuti)}</p>` : ""}
      </div>
    </a>`).join("");
  initReveal();
}

function initContact() {
  const form = document.querySelector("#contact-form");
  if (!form) return;
  const status = form.querySelector(".form__status");
  const btn = form.querySelector("button[type=submit]");
  const done = form.querySelector(".form__done");
  form.querySelector("input[name=access_key]").value = SITE.formKey;

  // překryv se rozlije z místa tlačítka "Odeslat"
  const showDone = (html, off = false) => {
    const f = form.getBoundingClientRect(), b = btn.getBoundingClientRect();
    done.style.setProperty("--ox", `${((b.left + b.width / 2 - f.left) / f.width) * 100}%`);
    done.style.setProperty("--oy", `${((b.top + b.height / 2 - f.top) / f.height) * 100}%`);
    done.classList.toggle("form__done--off", off);
    done.innerHTML = `<div>${html}</div>`;
    done.hidden = false;
    done.getBoundingClientRect();
    done.classList.add("is-in");
    form.classList.add("is-done");
  };
  const showOff = () => showDone(`
    <img src="assets/img/normal-darkBG.svg" alt="Alternativa pro Rajhradice">
    <b>Momentálně mimo provoz</b>
    <p>Formulář má pro tento měsíc vyčerpanou kapacitu. Děkujeme za pochopení – napište nám na <a href="mailto:${esc(SITE.email)}">${esc(SITE.email)}</a> nebo zavolejte na <a href="${esc(SITE.telefonHref)}">${esc(SITE.telefon)}</a>.</p>`, true);

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    status.className = "form__status";
    if (form.querySelector("input[name=botcheck]").checked) return;
    if (!SITE.formKey || SITE.formKey.startsWith("DOPLNIT")) {
      status.textContent = "Formulář ještě není zapojený – v js/data.js chybí Web3Forms access key.";
      status.classList.add("err"); return;
    }
    btn.disabled = true; btn.querySelector("span").textContent = "Odesílám…";
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST", headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      const data = await res.json().catch(() => ({}));
      // vyčerpaný měsíční limit Web3Forms → černý překryv "mimo provoz"
      if (res.status === 429 || /limit|quota|exceed/i.test(data.message || "")) { showOff(); return; }
      if (!res.ok || !data.success) throw new Error(data.message || "Odeslání se nepovedlo");
      form.reset();
      showDone(`<b>Díky! Zpráva dorazila.</b><p>Ozveme se vám na uvedený e-mail.</p>`);
    } catch (err) {
      status.textContent = "Nepovedlo se odeslat. Zkuste to znovu, nebo nám zavolejte.";
      status.classList.add("err");
    } finally {
      btn.disabled = false; btn.querySelector("span").textContent = "Odeslat zprávu";
    }
  });
}

/* --- podstránka: kandidáti ---------------------------------------------- */

function initKandidati() {
  const side = document.querySelector("#side-list");
  const detail = document.querySelector("#detail");
  if (!side || !detail) return;
  const list = [...CANDIDATES].sort((a, b) => a.poradi - b.poradi);

  side.innerHTML = list.map((c) => `
    <button class="sidebar__item" data-id="${esc(c.id)}">
      <span class="sidebar__num">${c.poradi}.</span>
      <span class="sidebar__name">${esc(c.jmeno)}<small>${esc(c.poradi === 1 ? c.role : c.profese || "")}</small></span>
    </button>`).join("");

  const show = (id, push = true) => {
    const i = Math.max(0, list.findIndex((c) => c.id === id));
    const c = list[i], prev = list[i - 1], next = list[i + 1];
    side.querySelectorAll(".sidebar__item").forEach((b) => b.classList.toggle("is-active", b.dataset.id === c.id));
    detail.innerHTML = `
      <article class="detail__card">
        <div class="detail__top cand__top">
          ${avatarHtml(c)}
          <div>
            <div class="cand__num">${c.poradi === 1 ? "Lídr kandidátky" : "Kandidát č. " + c.poradi}</div>
            <h1 class="cand__name">${esc(c.jmeno)}</h1>
            ${c.profese ? `<div class="cand__prof">${esc(c.profese)}${c.vek ? `, ${c.vek} let` : ""}</div>` : ""}
          </div>
        </div>
        <div class="detail__body cand__body">
          ${c.medailonek ? `<figure class="cand__card" tabindex="0" role="button" aria-label="Zvětšit medailonek" data-zoom="${esc(c.medailonek)}"><img src="${esc(c.medailonek)}" width="900" height="1125" alt="Medailonek: ${esc(c.jmeno)}, kandidát č. ${c.poradi}" loading="lazy" decoding="async"></figure>` : ""}
          ${c.claim || real(c.text).length || c.temata?.length ? `<div class="cand__text">
            ${c.claim ? `<p class="cand__claim">„${esc(c.claim)}“</p>` : ""}
            ${real(c.text).map((p) => `<p>${esc(p)}</p>`).join("")}
            ${c.temata?.length ? `<div><div class="points__title">Věnuje se</div><div class="tags">${c.temata.map((t) => `<span class="tag">${esc(t)}</span>`).join("")}</div></div>` : ""}
          </div>` : ""}
        </div>
      </article>
      <div class="detail__nav">
        ${prev ? `<button class="btn btn--ghost" data-go="${esc(prev.id)}">← ${esc(prev.jmeno)}</button>` : "<span></span>"}
        ${next ? `<button class="btn" data-go="${esc(next.id)}"><span>${esc(next.jmeno)}</span>${ICONS.arrow}</button>` : ""}
      </div>`;
    document.title = `${c.jmeno} · Kandidáti · ${SITE.nazev}`;
    if (push) history.pushState({ id: c.id }, "", `?k=${c.id}`);
    const active = side.querySelector(".is-active");
    active?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };

  side.addEventListener("click", (e) => { const b = e.target.closest("[data-id]"); if (b) { show(b.dataset.id); scrollToDetail(); } });
  detail.addEventListener("click", (e) => {
    const z = e.target.closest("[data-zoom]");
    if (z) { openLightbox(z); return; }
    const b = e.target.closest("[data-go]"); if (b) { show(b.dataset.go); scrollToDetail(); }
  });
  detail.addEventListener("keydown", (e) => { const z = e.target.closest("[data-zoom]"); if (z && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); openLightbox(z); } });
  window.addEventListener("popstate", () => show(param("k") || list[0].id, false));
  show(param("k") || list[0].id, false);
  initListKeys(() => list.map((c) => c.id), () => side.querySelector(".is-active")?.dataset.id, show);
}

/* šipky na klávesnici: ←/↑ předchozí, →/↓ další položka v seznamu */
function initListKeys(ids, current, show) {
  document.addEventListener("keydown", (e) => {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (document.querySelector(".lightbox")) return;
    const t = e.target;
    if (t.matches("input, textarea, select, [contenteditable]")) return;
    const d = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!d) return;
    const all = ids(), i = all.indexOf(current());
    const next = all[i + d];
    if (!next) return;
    e.preventDefault();
    show(next);
  });
}

/* zvětšení medailonku: obrázek "vyletí" z karty do středu obrazovky a při zavření se vrátí zpět (FLIP) */
function openLightbox(card) {
  if (document.querySelector(".lightbox")) return;
  const src = card.dataset.zoom, thumb = card.querySelector("img");
  const lb = document.createElement("div");
  lb.className = "lightbox"; lb.setAttribute("role", "dialog"); lb.setAttribute("aria-label", "Zvětšený medailonek");
  lb.innerHTML = `<img src="${esc(src)}" alt="${esc(thumb?.alt || "")}"><button class="lightbox__close" aria-label="Zavřít">×</button>`;
  const img = lb.querySelector("img");
  document.body.appendChild(lb); document.body.classList.add("has-lightbox");

  // transformace z pozice karty do cílové pozice
  const fromRect = thumb.getBoundingClientRect();
  const flip = () => {
    const to = img.getBoundingClientRect();
    return `translate(${fromRect.left - to.left}px, ${fromRect.top - to.top}px) scale(${fromRect.width / to.width}, ${fromRect.height / to.height})`;
  };
  img.style.transition = "none";
  img.style.transform = flip();
  img.getBoundingClientRect();                  // reflow, aby se výchozí stav uplatnil
  img.style.transition = "";
  card.classList.add("is-zoomed");
  requestAnimationFrame(() => { lb.classList.add("is-open"); img.style.transform = "none"; });

  let closing = false;
  const close = () => {
    if (closing) return; closing = true;
    document.removeEventListener("keydown", onKey);
    lb.classList.remove("is-open");
    img.style.transform = flip();
    const done = () => { lb.remove(); card.classList.remove("is-zoomed"); document.body.classList.remove("has-lightbox"); card.focus?.({ preventScroll: true }); };
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) done();
    else { img.addEventListener("transitionend", done, { once: true }); setTimeout(done, 700); }
  };
  const onKey = (e) => { if (e.key === "Escape") close(); };
  lb.addEventListener("click", close);
  document.addEventListener("keydown", onKey);
  lb.querySelector(".lightbox__close").focus({ preventScroll: true });
}

/* --- podstránka: videa --------------------------------------------------- */

function initVidea() {
  const side = document.querySelector("#side-list");
  const detail = document.querySelector("#detail");
  if (!side || !detail) return;
  const list = [...VIDEOS].sort((a, b) => b.datum.localeCompare(a.datum));
  // video z YouTube, které ještě nemá záznam v data.js (?yt=ID) – ukáže se jen přehrávač
  const extra = param("yt");
  if (extra && !list.some((v) => v.yt === extra)) {
    list.unshift({ id: "yt-" + extra, yt: extra, typ: "ostatni", titul: "Nové video", podtitul: "Popis doplníme", datum: "", text: [], body: [] });
  }

  // seskupit podle typu, v pořadí z VIDEO_TYPY
  side.innerHTML = Object.entries(VIDEO_TYPY).map(([typ, label]) => {
    const items = list.filter((v) => v.typ === typ);
    if (!items.length) return "";
    return `
      <div class="sidebar__group">
        <div class="sidebar__title">${esc(label)}</div>
        <div class="sidebar__list">
          ${items.map((v) => `
            <button class="sidebar__item" data-id="${esc(v.id)}">
              <span class="sidebar__num">${v.typ === "prispevek" ? "#" + v.cislo : "♪"}</span>
              <span class="sidebar__name">${esc(v.titul)}${v.delka ? `<small>${esc(v.delka)}</small>` : ""}</span>
            </button>`).join("")}
        </div>
      </div>`;
  }).join("");

  const show = (id, push = true) => {
    const i = Math.max(0, list.findIndex((v) => v.id === id));
    const v = list[i];
    // šipky chodí jen v rámci skupiny (příspěvky zvlášť, songy zvlášť), ve stejném pořadí jako seznam vlevo
    const group = list.filter((x) => x.typ === v.typ);
    const gi = group.findIndex((x) => x.id === v.id);
    const prev = group[gi - 1], next = group[gi + 1];
    side.querySelectorAll(".sidebar__item").forEach((b) => b.classList.toggle("is-active", b.dataset.id === v.id));
    detail.innerHTML = `
      <article class="detail__card">
        <div class="detail__top">
          <div class="vid__num">${esc(videoLabel(v))}${v.datum ? ` · ${new Date(v.datum).toLocaleDateString("cs-CZ")}` : ""}</div>
          <h1 class="vid__name">${esc(v.titul)}</h1>
          ${v.podtitul ? `<div class="vid__sub">${esc(v.podtitul)}</div>` : ""}
        </div>
        <div class="detail__body">
          <div class="player" data-yt="${esc(v.yt)}" data-title="${esc(v.titul)}">${playerHtml(v.yt, v.titul)}</div>
          <div class="vid__link">Nejde video přehrát? <a href="https://www.youtube.com/watch?v=${esc(v.yt)}" target="_blank" rel="noopener">Otevřít na YouTube ↗</a></div>
          ${real(v.text).map((p) => `<p>${esc(p)}</p>`).join("")}
          ${real(v.body).length ? `<div><div class="points__title">Co navrhujeme</div><ul class="points">${real(v.body).map((b) => `<li>${esc(b)}</li>`).join("")}</ul></div>` : ""}
          ${v.dokumenty?.length ? `<div><div class="points__title">Ke stažení</div>${v.dokumenty.map((d) => `
            <a class="doc" href="${esc(d.soubor)}" target="_blank" rel="noopener">
              <span class="doc__thumb">${d.nahled ? `<img src="${esc(d.nahled)}" alt="" loading="lazy">` : ""}</span>
              <span><span class="doc__kind">Celý návrh · PDF</span><span class="doc__name">${esc(d.nazev)}</span>${d.popis ? `<span class="doc__meta">${esc(d.popis)}</span>` : ""}</span>
              <span class="btn"><span>Otevřít</span>${ICONS.arrow}</span>
            </a>`).join("")}</div>` : ""}
        </div>
      </article>
      <div class="detail__nav">
        ${prev ? `<button class="btn btn--ghost" data-go="${esc(prev.id)}">← ${esc(prev.titul)}</button>` : "<span></span>"}
        ${next ? `<button class="btn" data-go="${esc(next.id)}"><span>${esc(next.titul)}</span>${ICONS.arrow}</button>` : ""}
      </div>`;
    document.title = `${v.titul} · Videa · ${SITE.nazev}`;
    if (push) history.pushState({ id: v.id }, "", v.id.startsWith("yt-") ? `?yt=${v.yt}` : `?v=${v.id}`);
    side.querySelector(".is-active")?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  };

  side.addEventListener("click", (e) => { const b = e.target.closest("[data-id]"); if (b) { show(b.dataset.id); scrollToDetail(); } });
  detail.addEventListener("click", (e) => { const b = e.target.closest("[data-go]"); if (b) { show(b.dataset.go); scrollToDetail(); } });
  const initial = () => (param("yt") ? "yt-" + param("yt") : param("v") || list[0].id);
  window.addEventListener("popstate", () => show(initial(), false));
  show(initial(), false);
  // šipky jdou po seznamu vlevo (přes skupiny), tlačítka pod videem jen v rámci skupiny
  const order = () => [...side.querySelectorAll(".sidebar__item")].map((b) => b.dataset.id);
  initListKeys(order, () => side.querySelector(".is-active")?.dataset.id, show);
}

function scrollToDetail() {
  if (window.matchMedia("(max-width: 880px)").matches) {
    const top = document.querySelector("#detail").getBoundingClientRect().top + scrollY - 90;
    scrollTo({ top, behavior: "smooth" });
  }
}

/* --- cookies a souhlas s YouTube -----------------------------------------
   Web sám žádné sledovací cookies neukládá. Jediná třetí strana je YouTube
   (přehrávač). Bez souhlasu se místo přehrávače ukáže náhled s tlačítkem;
   kliknutím uživatel souhlasí s načtením obsahu z YouTube. */

const CONSENT_KEY = "apr-consent";     // "all" | "necessary"
const consent = {
  get: () => { try { return localStorage.getItem(CONSENT_KEY); } catch { return null; } },
  set: (v) => { try { localStorage.setItem(CONSENT_KEY, v); } catch {} },
  youtube: () => consent.get() === "all",
};

function playerHtml(yt, title) {
  if (consent.youtube()) {
    return `<iframe src="${ytEmbed(yt)}" title="${esc(title)}" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen loading="lazy"></iframe>`;
  }
  return `
    <div class="player__consent">
      <img src="${ytThumbHi(yt)}" onerror="this.onerror=null;this.src='${ytThumb(yt)}'" alt="">
      <div>
        <i class="mark" style="width:36px;height:36px"></i>
        <strong>Video se přehrává z YouTube</strong>
        <p>Po kliknutí se načte přehrávač YouTube (Google), který může ukládat cookies. <a href="gdpr.html" style="color:var(--brick);text-decoration:underline">Více informací</a></p>
        <button class="btn btn--brick" data-yt-consent><span>Přehrát video</span></button>
      </div>
    </div>`;
}

function reloadPlayers() {
  document.querySelectorAll(".player[data-yt]").forEach((p) => { p.innerHTML = playerHtml(p.dataset.yt, p.dataset.title); });
}

function initConsent() {
  // kliknutí na "Přehrát video" = souhlas s YouTube
  document.addEventListener("click", (e) => {
    const b = e.target.closest("[data-yt-consent]");
    if (!b) return;
    consent.set("all");
    document.querySelector(".cookie")?.remove();
    reloadPlayers();
  });

  if (consent.get()) return;
  const bar = document.createElement("div");
  bar.className = "cookie"; bar.setAttribute("role", "dialog"); bar.setAttribute("aria-label", "Cookies");
  bar.innerHTML = `
    <p><strong>Cookies.</strong> Tenhle web sám nic nesleduje. Jediná třetí strana je YouTube, ze kterého přehráváme videa – a ten si cookies ukládat může. Rozhodněte, jestli mu to dovolíte. <a href="gdpr.html">Podrobnosti</a></p>
    <div class="cookie__btns">
      <button class="btn btn--brick" data-consent="all"><span>Povolit i YouTube</span></button>
      <button class="btn btn--ghost" data-consent="necessary"><span>Jen nezbytné</span></button>
    </div>`;
  bar.addEventListener("click", (e) => {
    const b = e.target.closest("[data-consent]");
    if (!b) return;
    consent.set(b.dataset.consent);
    bar.classList.remove("is-visible");
    setTimeout(() => bar.remove(), 500);
    if (b.dataset.consent === "all") reloadPlayers();
  });
  document.body.appendChild(bar);
  requestAnimationFrame(() => setTimeout(() => bar.classList.add("is-visible"), 600));
}

/* --- start ---------------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initConsent();
  initCountdown();
  renderSocialLinks(document.querySelector("#social-list"));
  renderSocialLinks(document.querySelector("#footer-social"), true);
  document.querySelectorAll("[data-phone]").forEach((el) => { el.textContent = SITE.telefon; el.closest("a") && (el.closest("a").href = SITE.telefonHref); });
  document.querySelectorAll("[data-email]").forEach((el) => {
    const a = el.closest("a") || el;
    if (!SITE.email) { a.hidden = true; return; }
    el.textContent = SITE.email; a.href = "mailto:" + SITE.email;
  });
  document.querySelectorAll("[data-year]").forEach((el) => (el.textContent = new Date().getFullYear()));

  switch (document.body.dataset.page) {
    case "home": renderHeroMosaic(); renderHeroVideo(); renderTeam(); renderProgramTimeline(); renderVideoTeasers(); initContact(); break;
    case "program": initProgramNav(); break;
    case "kandidati": initKandidati(); break;
    case "videa": initVidea(); break;
  }
  initReveal();
});

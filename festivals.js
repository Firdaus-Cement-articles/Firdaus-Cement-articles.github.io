// ===== Festival greetings — works every year automatically =====
// Hindu festivals are worked out from the Moon and Sun (panchang tithi + month),
// Islamic festivals from the Hijri calendar, and fixed-date ones from the date.
// Preview any festival: add ?fest=<id> to the website link, e.g. ?fest=diwali
// Check dates for a year: add ?festlist=2030 and open the browser console.

const FEST_LOOK = {
  newyear:     { name: "Happy New Year",                     e: "🎉",   c: ["#1E1B4B", "#7C3AED"] },
  sankranti:   { name: "Happy Makar Sankranti",              e: "🪁",   c: ["#0369A1", "#F59E0B"] },
  republic:    { name: "Happy Republic Day",                 e: "🇮🇳",  c: ["#EA580C", "#15803D"] },
  shivaratri:  { name: "Happy Maha Shivaratri",              e: "🔱",   c: ["#1E3A8A", "#4338CA"] },
  holi:        { name: "Happy Holi",                         e: "🎨",   c: ["#DB2777", "#7C3AED"] },
  ugadi:       { name: "Ugadi Habbada Shubhashayagalu",      e: "🌿",   c: ["#166534", "#CA8A04"] },
  ramnavami:   { name: "Happy Ram Navami",                   e: "🚩",   c: ["#C2410C", "#F59E0B"] },
  mahavir:     { name: "Happy Mahavir Jayanti",              e: "🙏",   c: ["#92400E", "#F59E0B"] },
  ramadan:     { name: "Ramadan Mubarak",                    e: "🌙",   c: ["#064E3B", "#0F766E"] },
  eid:         { name: "Eid Mubarak",                        e: "🌙",   c: ["#064E3B", "#16A34A"] },
  bakrid:      { name: "Eid al-Adha Mubarak",                e: "🌙",   c: ["#064E3B", "#16A34A"] },
  milad:       { name: "Eid Milad-un-Nabi Mubarak",          e: "🌙",   c: ["#064E3B", "#0F766E"] },
  independence:{ name: "Happy Independence Day",             e: "🇮🇳",  c: ["#EA580C", "#15803D"] },
  rakhi:       { name: "Happy Raksha Bandhan",               e: "🪢",   c: ["#BE185D", "#F59E0B"] },
  janmashtami: { name: "Happy Janmashtami",                  e: "🦚",   c: ["#1E40AF", "#0891B2"] },
  ganesh:      { name: "Happy Ganesh Chaturthi",             e: "🐘",   c: ["#C2410C", "#DC2626"] },
  gandhi:      { name: "Gandhi Jayanti",                     e: "🕊️",   c: ["#334155", "#64748B"] },
  navratri:    { name: "Happy Navratri",                     e: "🪔",   c: ["#8E0E3C", "#E2482D"] },
  dussehra:    { name: "Happy Dussehra",                     e: "🏹",   c: ["#9A3412", "#F59E0B"] },
  diwali:      { name: "Happy Deepavali",                    e: "🪔",   c: ["#4A1D0B", "#D97706"] },
  rajyotsava:  { name: "Kannada Rajyotsava Shubhashayagalu", e: "💛❤️", c: ["#B91C1C", "#EAB308"] },
  gurunanak:   { name: "Happy Guru Nanak Jayanti",           e: "🙏",   c: ["#1E3A8A", "#F59E0B"] },
  christmas:   { name: "Merry Christmas",                    e: "🎄",   c: ["#14532D", "#B91C1C"] },
};

const Fest = (function () {
  const R = Math.PI / 180, DAY = 86400000, IST = 5.5 * 3600000;
  const n360 = x => ((x % 360) + 360) % 360;
  const jd = ms => ms / DAY + 2440587.5;

  function sunLong(ms) {
    const T = (jd(ms) - 2451545) / 36525;
    const L0 = 280.46646 + 36000.76983 * T, M = (357.52911 + 35999.05029 * T) * R;
    const C = (1.914602 - 0.004817 * T) * Math.sin(M) + (0.019993 - 0.000101 * T) * Math.sin(2 * M) + 0.000289 * Math.sin(3 * M);
    return n360(L0 + C - 0.00569 - 0.00478 * Math.sin((125.04 - 1934.136 * T) * R));
  }
  function moonLong(ms) {
    const T = (jd(ms) - 2451545) / 36525;
    const L = 218.3164477 + 481267.88123421 * T;
    const D = (297.8501921 + 445267.1114034 * T) * R, M = (357.5291092 + 35999.0502909 * T) * R;
    const m = (134.9633964 + 477198.8675055 * T) * R, F = (93.272095 + 483202.0175233 * T) * R;
    const E = 1 - 0.002516 * T, s = Math.sin;
    const sum = 6288774 * s(m) + 1274027 * s(2 * D - m) + 658314 * s(2 * D) + 213618 * s(2 * m)
      - 185116 * E * s(M) - 114332 * s(2 * F) + 58793 * s(2 * D - 2 * m) + 57066 * E * s(2 * D - M - m)
      + 53322 * s(2 * D + m) + 45758 * E * s(2 * D - M) - 40923 * E * s(M - m) - 34720 * s(D)
      - 30383 * E * s(M + m) + 15327 * s(2 * D - 2 * F) - 12528 * s(m + 2 * F) + 10980 * s(m - 2 * F)
      + 10675 * s(4 * D - m) + 10034 * s(3 * m) + 8548 * s(4 * D - 2 * m) - 7888 * E * s(2 * D + M - m)
      - 6766 * E * s(2 * D + M) - 5163 * s(D - m) + 4987 * E * s(D + M) + 4036 * E * s(2 * D - M + m);
    return n360(L + sum / 1e6);
  }
  const ayanamsa = ms => 23.853 + ((ms / DAY + 2440587.5 - 2451545) / 365.25) * 0.013969; // Lahiri
  const sidSun = ms => n360(sunLong(ms) - ayanamsa(ms));
  const elong = ms => n360(moonLong(ms) - sunLong(ms));
  function newMoonNear(ms) {           // the new moon closest to ms
    let t = ms;
    for (let i = 0; i < 6; i++) { let e = elong(t); if (e > 180) e -= 360; t -= e / 12.1907 * DAY; }
    return t;
  }
  // tithi 1..30 (1–15 shukla, 16–30 krishna) and amanta month 0..11 (0 = Chaitra) at a moment
  function panchang(ms) {
    const tithi = Math.floor(elong(ms) / 12) + 1;
    const start = newMoonNear(ms - elong(ms) / 12.1907 * DAY);
    const next = newMoonNear(start + 29.53 * DAY);
    const s0 = Math.floor(sidSun(start) / 30), s1 = Math.floor(sidSun(next) / 30);
    return { tithi, month: (s0 + 1) % 12, adhik: s0 === s1 };
  }
  // ms for a date (y, m 1-12, d) at an IST hour
  const at = (y, m, d, h) => Date.UTC(y, m - 1, d) + h * 3600000 - IST;
  const iso = ms => new Date(ms + IST).toISOString().slice(0, 10);
  const addDays = (s, n) => iso(Date.parse(s + "T00:00:00Z") - IST + n * DAY + 12 * 3600000);

  // first day in year y whose tithi (checked at IST hour h) is `tithi` in amanta month `month`
  function lunarDay(y, month, tithi, h) {
    let fallback = null;
    for (let k = 0; k < 400; k++) {
      const ms = at(y, 1, 1, h) + k * DAY, p = panchang(ms);
      if (p.adhik || p.month !== month) continue;
      if (p.tithi === tithi) return iso(ms);
      if (!fallback && p.tithi === tithi % 30 + 1) fallback = iso(ms); // tithi skipped (kshaya)
    }
    return fallback;
  }
  function sankranti(y) {              // sidereal Sun enters Capricorn (270°)
    let t = at(y, 1, 10, 12);
    for (let i = 0; i < 5; i++) { let d = sidSun(t) - 270; if (d > 180) d -= 360; t -= d / 0.9856 * DAY; }
    return iso(t);
  }
  // Hijri (Umm al-Qura) → Gregorian dates in year y
  function hijri(y, hm, hd) {
    let f; try { f = new Intl.DateTimeFormat("en-u-ca-islamic-umalqura", { timeZone: "Asia/Kolkata", month: "numeric", day: "numeric" }); } catch (e) { return []; }
    const out = [];
    for (let k = 0; k < 366; k++) {
      const ms = at(y, 1, 1, 12) + k * DAY;
      const p = Object.fromEntries(f.formatToParts(new Date(ms)).map(x => [x.type, x.value]));
      if (+p.month === hm && +p.day === hd) out.push(iso(ms));
    }
    return out;
  }
  const span = (id, from, to) => from ? { id, from, to: to || from } : null;
  // lunar dates can differ by a day between panchangs, so show one day either side
  const wide = (id, from, to) => from ? { id, from: addDays(from, -1), to: addDays(to || from, 1) } : null;

  function forYear(y) {
    const L = (mo, t, h) => lunarDay(y, mo, t, h);
    const list = [
      span("newyear", y + "-01-01"),
      span("sankranti", sankranti(y), addDays(sankranti(y), 1)),
      span("republic", y + "-01-26"),
      wide("shivaratri", L(10, 29, 23.5)),                       // Magha krishna 14, night
      (() => { const d = L(11, 15, 19); return d && span("holi", d, addDays(d, 1)); })(), // Phalguna purnima + Dhulandi
      wide("ugadi", L(0, 1, 6.25)),                              // Chaitra shukla 1
      wide("ramnavami", L(0, 9, 12)),
      wide("mahavir", L(0, 13, 6.25)),
      span("independence", y + "-08-15"),
      wide("rakhi", L(4, 15, 12)),                               // Shravana purnima
      wide("janmashtami", L(4, 23, 23.5)),                       // Shravana krishna 8, midnight
      wide("ganesh", L(5, 4, 12)),                               // Bhadrapada shukla 4
      span("gandhi", y + "-10-02"),
      (() => { const a = L(6, 1, 6.25), b = L(6, 9, 6.25); return a && span("navratri", addDays(a, -1), b); })(),            // Ashvin shukla 1–9
      span("dussehra", L(6, 10, 13)),
      (() => { const d = L(6, 30, 19); return d && span("diwali", addDays(d, -1), addDays(d, 2)); })(), // Naraka Chaturdashi → Balipadyami
      span("rajyotsava", y + "-11-01"),
      wide("gurunanak", L(7, 15, 6.25)),                         // Kartika purnima
      span("christmas", y + "-12-24", y + "-12-25"),
      span("newyear", y + "-12-31"),
    ];
    // Islamic dates follow the moon sighting; India is often a day after the Saudi calendar
    for (const d of hijri(y, 9, 1)) list.push(span("ramadan", d, addDays(d, 1)));
    for (const d of hijri(y, 10, 1)) list.push(span("eid", d, addDays(d, 2)));
    for (const d of hijri(y, 12, 10)) list.push(span("bakrid", d, addDays(d, 2)));
    for (const d of hijri(y, 3, 12)) list.push(span("milad", d, addDays(d, 1)));
    return list.filter(Boolean).sort((a, b) => a.from < b.from ? -1 : 1);
  }
  return { forYear, today: () => iso(Date.now()) };
})();

(function () {
  if (typeof document === "undefined") return;
  const q = new URLSearchParams(location.search);
  if (q.get("festlist")) console.table(Fest.forYear(+q.get("festlist")));
  const today = Fest.today(), y = +today.slice(0, 4);
  const preview = q.get("fest");
  let hit = null;
  if (preview && FEST_LOOK[preview]) hit = { id: preview };
  else {
    try {
      // also look at last year's list, for New Year's Eve running into 1 January
      // if two overlap (e.g. Navratri and Dussehra), the one that started later wins
      hit = [...Fest.forYear(y - 1), ...Fest.forYear(y)].filter(f => today >= f.from && today <= f.to)
        .sort((a, b) => a.from < b.from ? 1 : -1)[0];
    } catch (e) { return; }
  }
  if (!hit) return;
  const f = FEST_LOOK[hit.id];
  try { if (!preview && sessionStorage.getItem("fest-closed") === hit.id + y) return; } catch (e) {}

  const css = document.createElement("style");
  css.textContent = `
.fest{position:relative;overflow:hidden;color:#fff;text-align:center;padding:22px 48px 24px;background:linear-gradient(120deg,${f.c[0]},${f.c[1]})}
.fest b{display:block;font-family:var(--head);font-size:clamp(1.7rem,5vw,2.6rem);line-height:1.05;text-shadow:0 2px 10px rgba(0,0,0,.35)}
.fest .fe{font-size:clamp(1.8rem,5vw,2.4rem);display:inline-block;animation:festPop 1.6s ease-in-out infinite alternate}
.fest span.fs{display:block;margin-top:6px;opacity:.95;font-weight:500}
.fest .fx{position:absolute;top:8px;right:10px;background:rgba(0,0,0,.25);border:0;color:#fff;width:32px;height:32px;border-radius:50%;font-size:1.2rem;cursor:pointer}
.fest i{position:absolute;top:-30px;font-style:normal;font-size:20px;opacity:.85;animation:festFall linear infinite;pointer-events:none}
@keyframes festPop{from{transform:scale(1)}to{transform:scale(1.15)}}
@keyframes festFall{to{transform:translateY(220px) rotate(360deg);opacity:0}}
@media (prefers-reduced-motion:reduce){.fest i{display:none}.fest .fe{animation:none}}`;
  document.head.appendChild(css);

  const name = hit.id === "newyear" ? `Happy New Year ${today.slice(5) === "12-31" ? y + 1 : y}` : f.name;
  const box = document.createElement("section");
  box.className = "fest"; box.setAttribute("aria-label", name);
  box.innerHTML = `<button class="fx" aria-label="Close greeting">×</button>
<div class="fe" aria-hidden="true">${f.e}</div>
<b>${name}!</b>
<span class="fs">Warm wishes to you and your family from Firdaus Cement Articles</span>`;
  const first = [...f.e][0];
  for (let k = 0; k < 14; k++) {
    const p = document.createElement("i"); p.setAttribute("aria-hidden", "true"); p.textContent = k % 2 ? "✨" : first;
    p.style.left = (k * 7 + Math.random() * 5) + "%";
    p.style.animationDuration = (4 + Math.random() * 4) + "s";
    p.style.animationDelay = (-Math.random() * 6) + "s";
    box.appendChild(p);
  }
  box.querySelector(".fx").onclick = () => { box.remove(); try { sessionStorage.setItem("fest-closed", hit.id + y); } catch (e) {} };
  const main = document.querySelector("main");
  main.insertBefore(box, main.firstChild);
})();

if (typeof module !== "undefined") module.exports = Fest;

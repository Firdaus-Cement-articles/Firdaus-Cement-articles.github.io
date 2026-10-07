// ===== Festival greetings =====
// Banner shows automatically between "from" and "to" (both dates included, India time).
// To add a festival: copy a line, change name, dates, emoji and colours.
// Preview any festival: add ?fest=<id> to the website link, e.g. ?fest=diwali
const FESTIVALS = [
  // 2026
  { id: "navratri",   name: "Happy Navratri",              from: "2026-10-11", to: "2026-10-19", e: "🪔", c: ["#8E0E3C", "#E2482D"] },
  { id: "dussehra",   name: "Happy Dussehra",              from: "2026-10-20", to: "2026-10-20", e: "🏹", c: ["#9A3412", "#F59E0B"] },
  { id: "rajyotsava", name: "Kannada Rajyotsava Shubhashayagalu", from: "2026-11-01", to: "2026-11-01", e: "💛❤️", c: ["#B91C1C", "#EAB308"] },
  { id: "diwali",     name: "Happy Deepavali",             from: "2026-11-07", to: "2026-11-10", e: "🪔", c: ["#4A1D0B", "#D97706"] },
  { id: "gurunanak",  name: "Happy Guru Nanak Jayanti",    from: "2026-11-24", to: "2026-11-24", e: "🙏", c: ["#1E3A8A", "#F59E0B"] },
  { id: "christmas",  name: "Merry Christmas",             from: "2026-12-24", to: "2026-12-25", e: "🎄", c: ["#14532D", "#B91C1C"] },
  { id: "newyear",    name: "Happy New Year 2027",         from: "2026-12-31", to: "2027-01-01", e: "🎉", c: ["#1E1B4B", "#7C3AED"] },
  // 2027
  { id: "sankranti",  name: "Happy Makar Sankranti",       from: "2027-01-14", to: "2027-01-15", e: "🪁", c: ["#0369A1", "#F59E0B"] },
  { id: "republic",   name: "Happy Republic Day",          from: "2027-01-26", to: "2027-01-26", e: "🇮🇳", c: ["#EA580C", "#15803D"] },
  { id: "ramadan",    name: "Ramadan Mubarak",             from: "2027-02-08", to: "2027-02-10", e: "🌙", c: ["#064E3B", "#0F766E"] },
  { id: "shivaratri", name: "Happy Maha Shivaratri",       from: "2027-03-05", to: "2027-03-06", e: "🔱", c: ["#1E3A8A", "#4338CA"] },
  { id: "eid",        name: "Eid Mubarak",                 from: "2027-03-10", to: "2027-03-12", e: "🌙", c: ["#064E3B", "#16A34A"] },
  { id: "holi",       name: "Happy Holi",                  from: "2027-03-21", to: "2027-03-22", e: "🎨", c: ["#DB2777", "#7C3AED"] },
  { id: "ugadi",      name: "Ugadi Habbada Shubhashayagalu", from: "2027-04-07", to: "2027-04-07", e: "🌿", c: ["#166534", "#CA8A04"] },
  { id: "ramnavami",  name: "Happy Ram Navami",            from: "2027-04-15", to: "2027-04-15", e: "🚩", c: ["#C2410C", "#F59E0B"] },
  { id: "mahavir",    name: "Happy Mahavir Jayanti",       from: "2027-04-18", to: "2027-04-19", e: "🙏", c: ["#92400E", "#F59E0B"] },
  { id: "bakrid",     name: "Eid al-Adha Mubarak",         from: "2027-05-16", to: "2027-05-18", e: "🌙", c: ["#064E3B", "#16A34A"] },
  { id: "independence", name: "Happy Independence Day",    from: "2027-08-15", to: "2027-08-15", e: "🇮🇳", c: ["#EA580C", "#15803D"] },
  { id: "milad",      name: "Eid Milad-un-Nabi Mubarak",   from: "2027-08-16", to: "2027-08-16", e: "🌙", c: ["#064E3B", "#0F766E"] },
  { id: "rakhi",      name: "Happy Raksha Bandhan",        from: "2027-08-17", to: "2027-08-17", e: "🪢", c: ["#BE185D", "#F59E0B"] },
  { id: "janmashtami", name: "Happy Janmashtami",          from: "2027-08-25", to: "2027-08-25", e: "🦚", c: ["#1E40AF", "#0891B2"] },
  { id: "ganesh",     name: "Happy Ganesh Chaturthi",      from: "2027-09-03", to: "2027-09-04", e: "🐘", c: ["#C2410C", "#DC2626"] },
  { id: "navratri27", name: "Happy Navratri",              from: "2027-09-30", to: "2027-10-08", e: "🪔", c: ["#8E0E3C", "#E2482D"] },
  { id: "dussehra27", name: "Happy Dussehra",              from: "2027-10-09", to: "2027-10-09", e: "🏹", c: ["#9A3412", "#F59E0B"] },
  { id: "diwali27",   name: "Happy Deepavali",             from: "2027-10-28", to: "2027-10-31", e: "🪔", c: ["#4A1D0B", "#D97706"] },
  { id: "rajyotsava27", name: "Kannada Rajyotsava Shubhashayagalu", from: "2027-11-01", to: "2027-11-01", e: "💛❤️", c: ["#B91C1C", "#EAB308"] },
  { id: "gurunanak27", name: "Happy Guru Nanak Jayanti",   from: "2027-11-14", to: "2027-11-14", e: "🙏", c: ["#1E3A8A", "#F59E0B"] },
  { id: "christmas27", name: "Merry Christmas",            from: "2027-12-24", to: "2027-12-25", e: "🎄", c: ["#14532D", "#B91C1C"] },
  { id: "newyear28",  name: "Happy New Year 2028",         from: "2027-12-31", to: "2028-01-01", e: "🎉", c: ["#1E1B4B", "#7C3AED"] },
];

(function () {
  const preview = new URLSearchParams(location.search).get("fest");
  // today's date in India, as YYYY-MM-DD
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Kolkata" }).format(new Date());
  const f = preview ? FESTIVALS.find(x => x.id === preview)
                    : FESTIVALS.find(x => today >= x.from && today <= x.to);
  if (!f) return;
  try { if (!preview && sessionStorage.getItem("fest-closed") === f.id) return; } catch (e) {}

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

  const box = document.createElement("section");
  box.className = "fest"; box.setAttribute("aria-label", f.name);
  box.innerHTML = `<button class="fx" aria-label="Close greeting">×</button>
<div class="fe" aria-hidden="true">${f.e}</div>
<b>${f.name}!</b>
<span class="fs">Warm wishes to you and your family from Firdaus Cement Articles</span>`;
  const first = [...f.e][0];
  for (let k = 0; k < 14; k++) {
    const p = document.createElement("i"); p.setAttribute("aria-hidden", "true"); p.textContent = k % 2 ? "✨" : first;
    p.style.left = (k * 7 + Math.random() * 5) + "%";
    p.style.animationDuration = (4 + Math.random() * 4) + "s";
    p.style.animationDelay = (-Math.random() * 6) + "s";
    box.appendChild(p);
  }
  box.querySelector(".fx").onclick = () => { box.remove(); try { sessionStorage.setItem("fest-closed", f.id); } catch (e) {} };
  const main = document.querySelector("main");
  main.insertBefore(box, main.firstChild);
})();

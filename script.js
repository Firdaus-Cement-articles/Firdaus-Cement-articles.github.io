// WhatsApp number for orders: country code + number, digits only (e.g. 919876543210)
const WHATSAPP = "910000000000";

const products = [
  { n: "Rohu", c: "fresh", e: "🐟", d: "Popular freshwater fish, soft and tasty. Whole or curry cut." },
  { n: "Catla", c: "fresh", e: "🐟", d: "Big-head carp with rich flavour, ideal for curry and fry." },
  { n: "Mrigal", c: "fresh", e: "🐟", d: "Light, mild carp, good value for daily cooking." },
  { n: "Pangasius (Basa)", c: "fresh", e: "🐠", d: "Boneless white fillets, perfect for fry and restaurants." },
  { n: "Tilapia", c: "fresh", e: "🐠", d: "Firm, mild fish, great grilled or fried." },
  { n: "Hilsa", c: "fresh", e: "🐟", d: "Seasonal favourite with a rich, unique taste." },
  { n: "Pomfret", c: "sea", e: "🐡", d: "White and black pomfret, best for tawa fry." },
  { n: "Seer Fish (Surmai)", c: "sea", e: "🐟", d: "Premium steaks with few bones." },
  { n: "Prawns / Shrimp", c: "sea", e: "🦐", d: "Small, medium and jumbo sizes, cleaned on request." },
  { n: "Crab", c: "sea", e: "🦀", d: "Fresh mud crabs for curry and masala." },
  { n: "Frozen Fish Fillets", c: "frozen", e: "🧊", d: "IQF fillets, vacuum packed, long shelf life." },
  { n: "Frozen Prawns", c: "frozen", e: "🦐", d: "Peeled and deveined, ready to cook." },
  { n: "Dried Bombay Duck", c: "dried", e: "🐟", d: "Sun-dried bombil, cleaned and packed." },
  { n: "Dried Prawns", c: "dried", e: "🦐", d: "Small dried prawns for chutney and curry." },
  { n: "Fish Feed Pellets", c: "feed", e: "🌾", d: "Floating and sinking feed for carp, tilapia and pangasius." },
  { n: "Fish Meal", c: "feed", e: "🌾", d: "High-protein fish meal for feed makers and farms." },
];
const labels = { fresh: "Fresh Fish", sea: "Sea Food", frozen: "Frozen", dried: "Dried", feed: "Fish Feed" };

const wa = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

const grid = document.getElementById("grid");
function render(f) {
  grid.innerHTML = products
    .filter((p) => f === "all" || p.c === f)
    .map((p) => `<article class="p">
      <div class="p-img" aria-hidden="true">${p.e}</div>
      <div class="p-body">
        <small>${labels[p.c]}</small>
        <h3>${p.n}</h3>
        <p>${p.d}</p>
        <a href="${wa("Hi, I want to order " + p.n)}" target="_blank" rel="noopener">Order on WhatsApp →</a>
      </div>
    </article>`)
    .join("");
}
render("all");

document.querySelectorAll(".chip").forEach((b) =>
  b.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((x) => x.classList.toggle("on", x === b));
    render(b.dataset.f);
  })
);

const menuBtn = document.querySelector(".menu-btn");
const links = document.querySelector(".links");
menuBtn.addEventListener("click", () => {
  const open = links.classList.toggle("open");
  menuBtn.setAttribute("aria-expanded", open);
});
links.addEventListener("click", (e) => { if (e.target.tagName === "A") links.classList.remove("open"); });

document.querySelector(".wa-float").href = wa("Hi, I want to order fish");
document.querySelector(".wa-float").target = "_blank";

document.getElementById("orderForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const d = new FormData(e.target);
  window.open(wa(`Hi, I am ${d.get("name")}. ${d.get("msg")}`), "_blank");
});

document.getElementById("yr").textContent = new Date().getFullYear();

// ============================================================
// الميزان — منطق النسخة الفاخرة
// شريط تقدم ذهبي + قائمة صفحة كاملة + حاسبة الهدر
// + أكورديون الشهادة الأسئلة + ظهور تدريجي
// ============================================================
const $  = (q, el = document) => el.querySelector(q);
const $$ = (q, el = document) => [...el.querySelectorAll(q)];

$("#yr").textContent = new Date().getFullYear();

// ===== شريط التقدم الذهبي =====
const pbar = $("#pbar");
window.addEventListener(
  "scroll",
  () => {
    const h = document.documentElement;
    const done = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
    pbar.style.width = `${done * 100}%`;
  },
  { passive: true }
);

// ===== قائمة الموبايل (صفحة كاملة) =====
const navBtn = $("#navBtn");
const navLinks = $("#navLinks");

navBtn.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  navBtn.classList.toggle("x", open);
  document.body.style.overflow = open ? "hidden" : "";
});
$$("#navLinks a").forEach((a) =>
  a.addEventListener("click", () => {
    navLinks.classList.remove("open");
    navBtn.classList.remove("x");
    document.body.style.overflow = "";
  })
);

// ===== حاسبة الهدر الذهبية =====
const opts = $$("#cOpts button");
const outL = $("#cLiters");
const outM = $("#cMeters");

function calc(lpd) {
  const month = lpd * 30;
  const from = parseInt(outL.textContent.replace(/[^\u0660-\u0669\d]/g, "").replace(/[\u0660-\u0669]/g, d => d.charCodeAt(0) - 0x0660), 10) || 0;
  const steps = 14;
  let i = 0;
  const tick = setInterval(() => {
    i++;
    const v = Math.round(from + (month - from) * (i / steps));
    outL.textContent = v.toLocaleString("ar-EG");
    if (i >= steps) clearInterval(tick);
  }, 26);
  outM.textContent = (month / 1000).toLocaleString("ar-EG", {
    maximumFractionDigits: 1,
  });
}

opts.forEach((btn) => {
  btn.addEventListener("click", () => {
    opts.forEach((o) => o.classList.remove("on"));
    btn.classList.add("on");
    calc(parseInt(btn.dataset.lpd, 10));
  });
});

// ===== أكورديون الأسئلة =====
const items = $$("#fList .f-item");

items.forEach((item) => {
  $(".f-q", item).addEventListener("click", () => {
    const wasOpen = item.classList.contains("open");
    items.forEach((it) => {
      it.classList.remove("open");
      $(".f-q", it).setAttribute("aria-expanded", "false");
    });
    if (!wasOpen) {
      item.classList.add("open");
      $(".f-q", item).setAttribute("aria-expanded", "true");
    }
  });
});

// افتح الأول افتراضياً
items[0]?.classList.add("open");
items[0]?.querySelector(".f-q")?.setAttribute("aria-expanded", "true");

// ===== ظهور تدريجي متدرج =====
const io = new IntersectionObserver(
  (entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add("vis");
        io.unobserve(e.target);
      }
    }
  },
  { threshold: 0.08 }
);

$$(".svc-card, .calc-box, .w-path li, .r-quotes blockquote, .f-item").forEach((el, i) => {
  el.classList.add("rise");
  el.style.setProperty("--d", `${(i % 4) * 0.07}s`);
  io.observe(el);
});

// ===== لمعان ذهبي متحرك على العنوان الرئيسي =====
const h1em = $(".overture h1 em");
if (h1em) h1em.classList.add("shimmer-text");

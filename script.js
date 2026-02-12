const $ = (s) => document.querySelector(s);

const toast = $("#toast");
const hamburger = $("#hamburger");
const mobileNav = $("#mobileNav");
const htmlRoot = document.getElementById("htmlRoot");

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => toast.classList.remove("show"), 1700);
}

// Mobile menu
hamburger.addEventListener("click", () => {
  const expanded = hamburger.getAttribute("aria-expanded") === "true";
  hamburger.setAttribute("aria-expanded", String(!expanded));
  mobileNav.style.display = expanded ? "none" : "block";
  mobileNav.setAttribute("aria-hidden", String(expanded));
});

// Close mobile nav on click
mobileNav.querySelectorAll("a").forEach(a => {
  a.addEventListener("click", () => {
    hamburger.setAttribute("aria-expanded", "false");
    mobileNav.style.display = "none";
    mobileNav.setAttribute("aria-hidden", "true");
  });
});

// Copy address buttons
let currentLang = localStorage.getItem("lang") || "en";

async function copyAddress() {
  const address = "1374 Marine Dr, North Vancouver, BC V7P 1T4";
  try {
    await navigator.clipboard.writeText(address);
    showToast(currentLang === "fa" ? "آدرس کپی شد ✅" : "Address copied ✅");
  } catch {
    const ta = document.createElement("textarea");
    ta.value = address;
    document.body.appendChild(ta);
    ta.select();
    document.execCommand("copy");
    ta.remove();
    showToast(currentLang === "fa" ? "آدرس کپی شد ✅" : "Address copied ✅");
  }
}

const b1 = $("#copyAddressBtn");
if (b1) b1.addEventListener("click", copyAddress);

const b2 = $("#copyAddressBtn2");
if (b2) b2.addEventListener("click", copyAddress);

// Smooth scroll for anchors
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener("click", (e) => {
    const id = a.getAttribute("href");
    if (!id || id === "#") return;
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* -----------------------
   i18n (EN / FA)
------------------------ */
const dict = {
  en: {
    brandName: "Chiman Banoo Bakery",
    brandTag: "Persian Bakery • North Vancouver",

    navTop: "Top",
    navGallery: "Gallery",
    navPopular: "Popular",
    navLocation: "Location",
    navHours: "Hours",
    navContact: "Contact",

    chipText: "Fresh • Fast • Fair",

    heroTitleA: "Persian style bakery",
    heroTitleB: "delicious, clean, and premium.",
    heroSub: "Local store selling Persian style bread in the heart of Marine Drive. Here, we don’t just sell bread we give people love and good health.",

    callNow: "Call Now",
    getDirections: "Get Directions",
    copyAddress: "Copy Address",

    labelAddress: "Address",
    labelPhone: "Phone",
    labelHours: "Hours",
    labelDirections: "Directions",
    labelPrice: "Price",

    hoursValue: "Open 3:00 AM • Closes 9:00 PM",
    hoursTitle: "Hours",
    hoursSub: "We open early and stay open late.",
    daily: "Daily",
    hoursRange: "3:00 AM – 9:00 PM",

    reportedBy: "Reported by 4 people",
    scroll: "Scroll",

    galleryTitle: "Gallery",
    gallerySub: "Drop as many photos as you want — this layout stays clean on every device.",

    popularTitle: "Popular Picks",

    p1Title: "Barbari bread",
    p1Text: "Daily baked breads with the perfect crust and soft inside.",
    p2Title: "Taftoon bread",
    p2Text: "Soft taftoon bread that hit different with tea or coffee.",
    p3Title: "Sangak bread",
    p3Text: "Traditional Iranian, whole wheat sourdough flatbread.",
    p4Title: "Nini barbari",
    p4Text: "a smaller, individual-sized version of the traditional Iranian yeast-leavened flatbread",

    locationTitle: "Location",
    locationSub: "Easy to find on Marine Drive — quick stop, quick service.",
    openInMaps: "Open in Google Maps →",

    contactTitle: "Contact",
    contactSub: "Call us or get directions — that’s it.",

    footerLine: "1374 Marine Dr, North Vancouver, BC V7P 1T4 • (604) 341-8400 • 3:00 AM – 9:00 PM",

    videoLabel: "Bakery Video 1"
  },

  fa: {
    brandName: "نانکده چیمن بانو",
    brandTag: "نان و شیرینی ایرانی • نورث ونکوور",

    navTop: "بالا",
    navGallery: "گالری",
    navPopular: "محبوب‌ها",
    navLocation: "موقعیت",
    navHours: "ساعت کاری",
    navContact: "تماس",

    chipText: "همیشه تازه • سریع • منصف",

    heroTitleA: "حال و هوای نان ایرانی —",
    heroTitleB: "روشن، تمیز و خیلی شیک.",
    heroSub: "هر روز نان و شیرینی ایرانی تازه. هم برای نان‌های کلاسیک، هم آیتم‌های خاصمون به ما سر بزن.",

    callNow: "تماس",
    getDirections: "مسیر‌یابی",
    copyAddress: "کپی آدرس",

    labelAddress: "آدرس",
    labelPhone: "تلفن",
    labelHours: "ساعت کاری",
    labelDirections: "مسیر",
    labelPrice: "قیمت",

    hoursValue: "باز از ۳ صبح • تا ۹ شب",
    hoursTitle: "ساعت کاری",
    hoursSub: "صبح زود بازیم و تا شب کنار شماییم.",
    daily: "همه‌روزه",
    hoursRange: "۳:۰۰ صبح تا ۹:۰۰ شب",

    reportedBy: "گزارش‌شده توسط ۴ نفر",
    scroll: "اسکرول",

    galleryTitle: "گالری",
    gallerySub: "هر تعداد عکس خواستی اضافه کن — روی همه دستگاه‌ها مرتب می‌مونه.",

    popularTitle: "محبوب‌ها",
    popularSub: "ظاهر شیک و تمیز — بعداً هم می‌تونی برای هر آیتم عکس اضافه کنی.",

    p1Title: "نان تازه",
    p1Text: "هر روز نان تازه با پوسته عالی و بافت نرم.",
    p2Title: "شیرینی",
    p2Text: "شیرینی‌های خوشمزه که با چای و قهوه عالی می‌شن.",
    p3Title: "آیتم‌های ویژه",
    p3Text: "آیتم‌های خاص و فصلی — داخل فروشگاه بپرس.",
    p4Title: "یه توقف خانوادگی",
    p4Text: "سرویس سریع، فضای گرم، و غذای تازه برای همه.",

    locationTitle: "موقعیت",
    locationSub: "روی مارین درایو راحت پیداش می‌کنی — سریع بیا، سریع بگیر.",
    openInMaps: "باز کردن در گوگل‌مپ →",

    contactTitle: "تماس",
    contactSub: "یا زنگ بزن یا مسیر رو باز کن — همین.",

    footerLine: "۱۳۷۴ مارین درایو، نورث ونکوور، BC V7P 1T4 • (۶۰۴) ۳۴۱-۸۴۰۰ • ۳ صبح تا ۹ شب",

    videoLabel: "ویدیو نانوایی ۱"
  }
};

function applyLang(lang) {
  currentLang = lang;
  localStorage.setItem("lang", lang);

  if (lang === "fa") {
    htmlRoot.setAttribute("lang", "fa");
    htmlRoot.setAttribute("dir", "rtl");
  } else {
    htmlRoot.setAttribute("lang", "en");
    htmlRoot.setAttribute("dir", "ltr");
  }

  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.getAttribute("data-i18n");
    const val = dict[lang][key];
    if (typeof val === "string") el.textContent = val;
  });

  document.querySelectorAll(".langBtn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.lang === lang);
  });

  showToast(lang === "fa" ? "زبان فارسی فعال شد" : "English enabled");
}

document.querySelectorAll(".langBtn").forEach(btn => {
  btn.addEventListener("click", () => applyLang(btn.dataset.lang));
});

applyLang(currentLang);

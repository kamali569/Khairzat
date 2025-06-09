// تعداد خبر در هر صفحه
const NEWS_PER_PAGE = 9;
let currentPage = 1;
let currentCategory = "all";

// داده ۴۰ خبر نمونه
const newsData = [
  // ترتیب: جهان، فوتبال، ایران، فناوری، لپ‌تاپ، موبایل، حوادث، پیش‌بینی آینده
  { title: "تعمیق بحران انرژی در اروپا", summary: "بحران گاز طبیعی تشدید شده و قیمت‌ها رکورد می‌زنند.", content: "با افزایش تنش‌های سیاسی، تامین گاز از روسیه کاهش یافته و کشورهای اروپایی به دنبال منابع جایگزین هستند...", category: "جهان", date: "2025-06-08", probability: 85 },
  { title: "قهرمانی آرژانتین در جام جهانی فوتبال", summary: "آرژانتین بار دیگر فاتح جام جهانی شد.", content: "با درخشش مسی و نمایش قدرتمند دفاعی، آرژانتین در فینال یکی از به‌یادماندنی‌ترین بازی‌ها را به نام خود ثبت کرد...", category: "فوتبال", date: "2025-06-05", probability: 95 },
  { title: "انتخابات ریاست‌جمهوری ایران ۱۴۰۴", summary: "نامزدها رقابتی نزدیک داشتند.", content: "در نهایت، کاندیدای اصولگرا با اختلاف کم پیروز شد و وعده‌های اقتصادی متعددی مطرح کرد...", category: "ایران", date: "2025-06-02", probability: 75 },
  { title: "معرفی پردازنده جدید اینتل Core Ultra", summary: "معماری جدید با مصرف انرژی کم.", content: "این تراشه با لیتوگرافی ۵ نانومتر عملکرد تک‌هسته‌ای و چند‌هسته‌ای را بهبود داده است...", category: "فناوری", date: "2025-06-07", probability: 90 },
  { title: "لپ‌تاپ‌های گیمینگ ۲۰۲۵: افزایش قدرت و خنک‌سازی", summary: "جدیدترین مدل‌ها با نورپردازی RGB.", content: "سری جدید لپ‌تاپ‌های MSI و Asus با خنک‌کننده مبتنی بر مایع و کارت گرافیک RTX 50 معرفی شدند...", category: "لپ‌تاپ", date: "2025-06-01", probability: 80 },
  { title: "آنر Magic V2 با دوربین ۲۰۰ مگاپیکسلی", summary: "پرچمدار جدید با صفحه تاشو.", content: "این موبایل با نمایشگر LTPO 120 هرتز و شارژ سریع ۸۰ واتی معرفی شد...", category: "موبایل", date: "2025-06-04", probability: 88 },
  { title: "زلزله ۶.۲ ریشتری در استان کرمانشاه", summary: "خسارات جانی و مالی سنگین گزارش شد.", content: "این زلزله در عمق ۱۰ کیلومتری رخ داد و بیش از ۳۰ نفر کشته و صدها مصدوم برجای گذاشت...", category: "حوادث", date: "2025-06-03", probability: 60 },
  { title: "پیش‌بینی هوش مصنوعی درباره جنگ‌های آینده", summary: "استفاده از ربات‌ها و پهپادهای جنگی.", content: "طبق گزارش مؤسسه RAND، تا سال ۲۰۳۰ نقش هوش مصنوعی در تصمیم‌گیری‌های نظامی بسیار پررنگ خواهد شد...", category: "پیش‌بینی آینده", date: "2025-06-06", probability: 70 },

  // … اینجا ۳۲ خبر دیگر با همین فرمت اضافه کنید …
  
  // نمونه ایجاد مابقی با کد
  ...Array.from({ length: 32 }, (_, i) => {
    const cats = ["جهان","فوتبال","ایران","فناوری","لپ‌تاپ","موبایل","حوادث","پیش‌بینی آینده"];
    return {
      title: `خبر شماره ${i+9} (${cats[i%cats.length]})`,
      summary: `خلاصه خبر شماره ${i+9} در دسته ${cats[i%cats.length]}.`,
      content: `این متن کامل خبر شماره ${i+9} است. جزئیات بیشتر در این قسمت آورده می‌شود...`,
      category: cats[i%cats.length],
      date: `2025-06-${String((i%28)+1).padStart(2,"0")}`,
      probability: Math.floor(Math.random()*51)+50  // احتمال ۵۰–۱۰۰٪
    };
  })
];

// ارجاع به المان‌ها
const listEl = document.getElementById("news-list");
const catFilterEl = document.querySelector(".category-filter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

// ساخت دکمه‌های دسته
function buildCategories() {
  const counts = { all: newsData.length };
  newsData.forEach(n => counts[n.category] = (counts[n.category]||0)+1);

  Object.keys(counts).forEach(cat => {
    if (cat === "all") return;
    const btn = document.createElement("button");
    btn.setAttribute("data-category", cat);
    btn.innerHTML = `${cat} <span class="count">${counts[cat]}</span>`;
    catFilterEl.appendChild(btn);
  });
  catFilterEl.querySelector("[data-category='all'] .count").textContent = counts.all;
}

// دریافت آرایه فیلترشده و مرتب‌شده
function getFiltered() {
  let arr = currentCategory==="all" ? newsData : newsData.filter(n=>n.category===currentCategory);
  return arr.sort((a,b)=> new Date(b.date) - new Date(a.date));
}

// رندر صفحه
function render() {
  const all = getFiltered();
  const totalPages = Math.ceil(all.length/NEWS_PER_PAGE);
  if(currentPage>totalPages) currentPage=totalPages||1;

  const start=(currentPage-1)*NEWS_PER_PAGE, pageNews=all.slice(start,start+NEWS_PER_PAGE);

  listEl.innerHTML = "";
  pageNews.forEach(n => {
    const card = document.createElement("div");
    card.className = "news-card";
    card.innerHTML = `
      <div class="news-header">
        <div class="news-title">${n.title}</div>
        <div class="news-prob">${n.probability}%</div>
      </div>
      <div class="news-meta">${new Date(n.date).toLocaleDateString('fa-IR')} | ${n.category}</div>
      <div class="news-summary">${n.summary}</div>
      <div class="news-content">${n.content}</div>
    `;
    card.addEventListener("click", ()=> {
      const c = card.querySelector(".news-content");
      c.style.display = c.style.display==="block" ? "none" : "block";
    });
    listEl.appendChild(card);
  });

  pageInfo.textContent = `${currentPage} / ${totalPages||1}`;
  prevBtn.disabled = currentPage===1;
  nextBtn.disabled = currentPage===totalPages;
}

// رویدادها
catFilterEl.addEventListener("click", e=>{
  if(e.target.tagName!=="BUTTON") return;
  catFilterEl.querySelectorAll("button").forEach(b=>b.classList.remove("active"));
  e.target.classList.add("active");
  currentCategory = e.target.getAttribute("data-category");
  currentPage = 1;
  render();
});
prevBtn.addEventListener("click", ()=>{ currentPage>1 && currentPage--; render(); });
nextBtn.addEventListener("click", ()=>{ currentPage++; render(); });

// اجرا
buildCategories();
render();

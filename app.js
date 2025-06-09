// app.js

const NEWS_PER_PAGE = 9;
let currentPage = 1;
let currentCategory = "all";

// ۴۰ خبر متنوع در دسته‌های جهان، فوتبال، ایران، فناوری، لپ‌تاپ، موبایل، حوادث و پیش‌بینی آینده
const newsData = [
  // دسته «جهان»
  {
    title: "گسترش درگیری‌ها در غزه",
    summary: "نبرد میان نیروهای حماس و اسرائیل وارد مرحله جدیدی شد.",
    content: "با شعله‌ور شدن درگیری‌های اخیر و بمباران مواضع، صدها غیرنظامی مجروح و کشته شدند. آژانس‌های امدادی از کمبود امکانات و محاصره شدید در نوار غزه خبر می‌دهند...",
    category: "جهان",
    date: "2025-06-09",
    probability: 92
  },
  {
    title: "اعتراضات گسترده در فرانسه",
    summary: "گسترش اعتراضات کارگری علیه اصلاحات بازنشستگی.",
    content: "ساعت‌ها ترافیک سنگین و برخوردهای خشونت‌آمیز میان پلیس و معترضان در چندین شهر گزارش شده است. دولت متعهد شد بحث‌های مجدد را آغاز کند...",
    category: "جهان",
    date: "2025-06-08",
    probability: 88
  },
  {
    title: "انتخابات سراسری آلمان برگزار شد",
    summary: "حضور رکورد ۸۵٪ در انتخابات فدرال.",
    content: "نزدیک به نیمی از آرا به احزاب سبز و لیبرال رسید و ائتلاف معلق میان حزب سوسیال دموکرات و ائتلاف سبزها در حال شکل‌گیری است...",
    category: "جهان",
    date: "2025-06-07",
    probability: 90
  },
  {
    title: "شکست مذاکرات هسته‌ای با ایران",
    summary: "توافق تازه‌ای حاصل نشد و تحریم‌ها ادامه دارد.",
    content: "مذاکرات در وین پس از ۱۲ روز به دلیل اختلاف بر سر سقف غنی‌سازی متوقف شد. کارشناسان پیش‌بینی می‌کنند تنش‌ها در ماه‌های آینده افزایش یابد...",
    category: "جهان",
    date: "2025-06-06",
    probability: 75
  },
  {
    title: "افزایش قیمت نفت به ۱۱۰ دلار",
    summary: "قیمت نفت خام برنت به بالاترین رقم سال رسید.",
    content: "به دنبال کاهش عرضه اوپک و قطع صادرات از لیبی، قیمت نفت برنت با رشد ۵ درصدی به ۱۱۰ دلار در هر بشکه رسید...",
    category: "جهان",
    date: "2025-06-05",
    probability: 82
  },

  // دسته «فوتبال»
  {
    title: "قهرمانی رئال مادرید در لیگ قهرمانان اروپا",
    summary: "رئال مادرید با پیروزی ۲-۱ مقابل بایرن مونیخ فاتح شد.",
    content: "گل پیروزی‌بخش را وینیسیوس جونیور در دقیقه ۸۷ زد. رونالدو بار دیگر بهترین گلزن تورنمنت شد...",
    category: "فوتبال",
    date: "2025-06-04",
    probability: 95
  },
  {
    title: "لیگ برتر ایران؛ پرسپولیس صدرنشین ماند",
    summary: "پرسپولیس با دو گل پیروزی مقابل فولاد، بالاتر ایستاد.",
    content: "در هفته بیست‌و پنجم، پرسپولیس با شوت از راه دور امید عالیشاه و پنالتی علیپور توانست به برتری دست یابد...",
    category: "فوتبال",
    date: "2025-06-03",
    probability: 90
  },
  {
    title: "شروع جام ملت‌های آسیا در قطر",
    summary: "۱۶ تیم از سراسر قاره در رقابت شرکت کردند.",
    content: "مسابقات با بازی افتتاحیه میان ایران و ژاپن آغاز شد که با تساوی ۱-۱ به پایان رسید. ورزشگاه لوسیل پر از تماشاگر بود...",
    category: "فوتبال",
    date: "2025-06-02",
    probability: 85
  },
  {
    title: "انتقال نیمار به منچستر یونایتد",
    summary: "نیمار با قراردادی ۱۸۰ میلیون یورویی به اولدترافورد آمد.",
    content: "این انتقال رکورد گران‌ترین بازیکن را در تاریخ باشگاه جابه‌جا کرد و هواداران یونایتد در فرچ یونایتد جشنی برپا کردند...",
    category: "فوتبال",
    date: "2025-06-01",
    probability: 80
  },
  {
    title: "صدرنشینی منچستر سیتی در لیگ برتر",
    summary: "سیتی با اختلاف ۵ امتیاز بالاتر از لیورپول قرار گرفت.",
    content: "شهرخودرو با گل‌های هالند و دی‌بروینه موفق شد اورتون را ۳-۰ شکست دهد و فاصله‌اش را با تعقیب‌کننده‌ها افزایش دهد...",
    category: "فوتبال",
    date: "2025-05-31",
    probability: 88
  },

  // دسته «ایران»
  {
    title: "بودجه ۱۴۰۴ کل کشور تصویب شد",
    summary: "بودجه با رشد ۱۲ درصدی درآمدهای نفتی بسته شد.",
    content: "در مجلس شورای اسلامی، نمایندگان با الحاق ۳ بند برای حمایت از صنعت خودرو رای مثبت دادند...",
    category: "ایران",
    date: "2025-05-30",
    probability: 78
  },
  {
    title: "افتتاح آزادراه تهران–شمال پس از ۱۰ سال",
    summary: "بزرگراه جدید سرعت سفر را به نصف کاهش داد.",
    content: "این پروژه ۲۰ میلیارد دلاری شامل ۲۰ تونل و ۱۵ پل بزرگ است و هم‌اکنون تردد خودروها از آن آغاز شده...",
    category: "ایران",
    date: "2025-05-29",
    probability: 85
  },
  {
    title: "رکورد کرونا در ایران؛ ۵۰۰۰ مورد جدید",
    summary: "بیشترین آمار روزانه از موج چهارم ثبت شد.",
    content: "مسئولان بهداشت هشدار دادند که در صورت عدم رعایت پروتکل‌ها، موج پنجم در راه است...",
    category: "ایران",
    date: "2025-05-28",
    probability: 65
  },
  {
    title: "توقف ساخت مترو در اصفهان",
    summary: "پیمانکار ترک کنسرسیوم را رها کرد.",
    content: "به دلیل مشکلات مالی و اختلاف با شهرداری، کار ساخت ایستگاه‌های جدید فعلا متوقف شد...",
    category: "ایران",
    date: "2025-05-27",
    probability: 70
  },
  {
    title: "افزایش نرخ بیکاری به ۱۵٪",
    summary: "آمار رسمی مرکز آمار ایران اعلام شد.",
    content: "بیکاری در میان جوانان ۱۸ تا ۲۵ ساله به ۲۵٪ رسیده و دولت برنامه‌های اشتغال‌زایی جدیدی را مطرح کرده...",
    category: "ایران",
    date: "2025-05-26",
    probability: 75
  },

  // دسته «فناوری»
  {
    title: "تولید تراشه ۲ نانومتری توسط سامسونگ",
    summary: "سامسونگ پیشرفته‌ترین لیتوگرافی را معرفی کرد.",
    content: "این تراشه با مصرف کم و راندمان بالا به‌زودی در سرورها و گوشی‌های پرچمدار استفاده می‌شود...",
    category: "فناوری",
    date: "2025-05-25",
    probability: 92
  },
  {
    title: "هوش مصنوعی گوگل قادر به نوشتن کد خودکار شد",
    summary: "نسخه جدید «کپ‌پیتان» مهارت برنامه‌نویسی دارد.",
    content: "این مدل می‌تواند برنامه‌های ساده وب و موبایل را تنها با توصیف زبان طبیعی تولید کند...",
    category: "فناوری",
    date: "2025-05-24",
    probability: 88
  },
  {
    title: "رونمایی از هدست VR بی‌سیم اپل", summary: "هدست Apple Vision Air معرفی شد.", content: "این دستگاه با پردازشگر M2، نمایشگر ۸K و عمر باتری ۸ ساعته، بازار واقعیت مجازی را متحول می‌کند...", category: "فناوری", date: "2025-05-23", probability: 90
  },
  {
    title: "نفوذ به شبکه بانکی اروپا با باج‌افزار جدید",
    summary: "باج‌افزار «فین‌هک» صدها سرور را آلوده کرد.",
    content: "مهاجمان با استفاده از حفره امنیتی در نرم‌افزار رایج، به سیستم‌های بانک‌ها دسترسی پیدا کردند...",
    category: "فناوری",
    date: "2025-05-22",
    probability: 70
  },
  {
    title: "اکوسیستم ۶G توسط چین بررسی شد",
    summary: "آزمایشگاه‌های چینی فرکانس‌های بالا را تست کردند.",
    content: "با انتقال داده در باند ۲۴ گیگاهرتز و پایین‌تر، سرعت تا ۱۰ گیگابیت بر ثانیه افزایش یافت...",
    category: "فناوری",
    date: "2025-05-21",
    probability: 65
  },

  // دسته «لپ‌تاپ»
  {
    title: "عرضه MacBook Pro M4 با نمایشگر OLED",
    summary: "اپل کیفیت تصویر و عمر باتری را بهبود داد.",
    content: "این مدل با چیپ M4 و رم یک ترابایت، بهترین گزینه برای تدوینگرهای حرفه‌ای است...",
    category: "لپ‌تاپ",
    date: "2025-05-20",
    probability: 85
  },
  {
    title: "لپ‌تاپ گیمینگ Razer Blade 16 معرفی شد",
    summary: "کارت RTX 5090 و رفرش ریت ۳۰۰ هرتز.",
    content: "این لپ‌تاپ با کیبورد مکانیکی و خنک‌کننده مایع، تجربه گیمینگ را به سطح جدیدی برده است...",
    category: "لپ‌تاپ",
    date: "2025-05-19",
    probability: 88
  },
  {
    title: "نوآوری در لپ‌تاپ‌های تاشو هواوی",
    summary: "MateBook X دو نمایشگر OLED دارد.",
    content: "با حالت‌های تبلت، لپ‌تاپ و استند، این دستگاه برای طراحی گرافیکی ایده‌آل است...",
    category: "لپ‌تاپ",
    date: "2025-05-18",
    probability: 80
  },
  {
    title: "لنوو از سری ThinkPad X1 Carbon نسل ۱۱ رونمایی کرد",
    summary: "باریک‌تر و سبک‌تر از همیشه.",
    content: "این مدل با وزن ۱.۰۵ کیلو و ضخامت ۱۴ میلی‌متر، باتری ۲۰ ساعته و امنیت پیشرفته عرضه شده است...",
    category: "لپ‌تاپ",
    date: "2025-05-17",
    probability: 82
  },
  {
    title: "دل XPS 13 پلاستیکی به بازار بازگشت",
    summary: "نسخه اقتصادی با بدنه بادوام.",
    content: "با قیمت کمتر و کیفیت ساخت مناسب، این مدل برای دانشجویان و مدیران مالی جذاب است...",
    category: "لپ‌تاپ",
    date: "2025-05-16",
    probability: 78
  },

  // دسته «موبایل»
  {
    title: "گوگل Pixel 9 با دوربین سه‌گانه معرفی شد",
    summary: "حسگر اصلی ۵۰ مگاپیکسلی دارد.",
    content: "این موبایل با اندروید ۱۵ و پشتیبانی از ۵G mmWave، عملکرد دوربین شب و هوش مصنوعی قوی ارائه می‌دهد...",
    category: "موبایل",
    date: "2025-05-15",
    probability: 89
  },
  {
    title: "شیائومی 14 اولترا سریع‌ترین شارژ دنیا را دارد",
    summary: "شارژ ۱۰۰ واتی تنها در ۲۰ دقیقه.",
    content: "این دستگاه با باتری ۵۰۰۰ میلی‌آمپرساعتی و نمایشگر ۱۲۰ هرتز، گزینه‌ای محبوب در بازار به شمار می‌آید...",
    category: "موبایل",
    date: "2025-05-14",
    probability: 85
  },
  {
    title: "سامسونگ گلکسی Z Fold 6 با لولای بازطراحی‌شده",
    summary: "لولا ۴۰٪ باریک‌تر و مقاومت بالاتر.",
    content: "این نسل جدید دوام بیشتری در برابر خم شدن دارد و با قلم S Pen سازگار است...",
    category: "موبایل",
    date: "2025-05-13",
    probability: 87
  },
  {
    title: "OnePlus Nord CE 4 با قیمت مقرون‌به‌صرفه",
    summary: "چیپست میان‌رده و نمایشگر AMOLED.",
    content: "این موبایل با طراحی ساده و عمر باتری بالا، عرضه شده و از 5G و NFC پشتیبانی می‌کند...",
    category: "موبایل",
    date: "2025-05-12",
    probability: 80
  },
  {
    title: "هواوی P60 Pro تحت تحریم‌های جدید قرار گرفت",
    summary: "محدودیت دسترسی به چیپست‌های آمریکایی.",
    content: "این تحریم احتمالا عرضه مدل‌های جدید را تا ۶ ماه به تأخیر می‌اندازد و هواوی به دنبال جایگزین‌های داخلی است...",
    category: "موبایل",
    date: "2025-05-11",
    probability: 65
  },

  // دسته «حوادث»
  {
    title: "آتش‌سوزی گسترده در جنگل‌های آمازون", summary: "هزاران هکتار جنگل نابود شد.", content: "دمای بالا و بهره‌برداری غیرمجاز از زمین‌ها باعث تشدید آتش‌سوزی شده و تلاش‌های بین‌المللی برای مهار ادامه دارد...", category: "حوادث", date: "2025-05-10", probability: 70
  },
  {
    title: "رانش زمین در ایتالیا جان ۱۲ نفر را گرفت", summary: "روستایی در شمال کشور زیر گل و لای رفت.", content: "ساکنان بدون هشدار قبلی گرفتار رانش شده و امدادگران در تلاش برای یافتن مفقودین هستند...", category: "حوادث", date: "2025-05-09", probability: 60
  },
  {
    title: "انفجار گاز در کارخانه پتروشیمی هند", summary: "بیش از ۳۰ مصدوم و چندین کشته.", content: "طبق بیانیه رسمی، نشت گاز قبل از انفجار مهار نشد و آتش‌نشانان هنوز مشغول اطفای حریق هستند...", category: "حوادث", date: "2025-05-08", probability: 75
  },
  {
    title: "سیل بی‌سابقه در پاکستان", summary: "میلیون‌ها نفر بی‌خانمان شدند.", content: "بارش‌های استوایی و ذوب زودهنگام برف کوهستان‌ها منجر به بالاآمدن سطح رودخانه‌ها و سیل گسترده شده است...", category: "حوادث", date: "2025-05-07", probability: 80
  },
  {
    title: "تصادف خونین قطار مسافری در آلمان", summary: "دو قطار با یکدیگر برخورد کردند.", content: "مصدومیت ۱۵۰ نفر و بسته شدن خطوط ریلی تا اطلاع ثانوی گزارش شده است...", category: "حوادث", date: "2025-05-06", probability: 65
  },

  // دسته «پیش‌بینی آینده»
  {
    title: "نفوذ اینترنت ماهواره‌ای تا سال ۲۰۳۰", summary: "اتصال پرسرعت در مناطق دورافتاده.", content: "شرکت‌های خصوصی قصد دارند با راه‌اندازی صدها ماهواره، اینترنت جهانی را بهبود بخشند...", category: "پیش‌بینی آینده", date: "2025-05-05", probability: 85
  },
  {
    title: "اتومبیل‌های خودران در جاده‌ها رایج می‌شوند", summary: "تا ۲۰۳۰ بازار خودرو را متحول می‌کنند.", content: "پیش‌بینی می‌شود بیشتر فروشندگان بزرگ به تولید مدل‌های سطح ۴ و ۵ خودران روی آورند...", category: "پیش‌بینی آینده", date: "2025-05-04", probability: 80
  },
  {
    title: "شهرهای هوشمند با انرژی صفر", summary: "پروژه‌های نمونه در اروپا آغاز شده.", content: "این شهرها با ترکیب انرژی خورشیدی، بادی و بازیافت، تعادل کربنی صفر را هدف‌گذاری کرده‌اند...", category: "پیش‌بینی آینده", date: "2025-05-03", probability: 75
  },
  {
    title: "پزشکی ژنتیک تا ۲۰۴۰ رایج می‌شود", summary: "درمان‌های سفارشی برای بیماری‌های ارثی.", content: "تحقیقات در زمینه ویرایش ژن با CRISPR نویدبخش درمان‌های جدید برای بیماری‌های نادر است...", category: "پیش‌بینی آینده", date: "2025-05-02", probability: 70
  },
  {
    title: "زندگی روی مریخ تا سال ۲۰۵۰ ممکن است", summary: "برنامه‌های ناسا و اسپیس‌ایکس تشریح شد.", content: "ایجاد زیستگاه‌های پایدار و تولید اکسیژن از خاک مریخ از اهداف مهم این مأموریت اعلام شده است...", category: "پیش‌بینی آینده", date: "2025-05-01", probability: 65
  }
];

// ارجاع به المان‌های صفحه
const listEl = document.getElementById("news-list");
const catFilterEl = document.querySelector(".category-filter");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const pageInfo = document.getElementById("pageInfo");

// ساخت دکمه‌های دسته‌بندی
function buildCategories() {
  const counts = { all: newsData.length };
  newsData.forEach(n => counts[n.category] = (counts[n.category] || 0) + 1);

  Object.keys(counts).forEach(cat => {
    const btn = document.createElement("button");
    btn.dataset.category = cat;
    btn.classList.toggle("active", cat === "all");
    btn.innerHTML = `${cat} <span class="count">${counts[cat]}</span>`;
    catFilterEl.appendChild(btn);
  });
}

// دریافت آرایه فیلترشده و مرتب‌شده
function getFiltered() {
  let arr = currentCategory === "all"
    ? newsData
    : newsData.filter(n => n.category === currentCategory);
  return arr.sort((a, b) => new Date(b.date) - new Date(a.date));
}

// رندر صفحه فعلی
function render() {
  const all = getFiltered();
  const totalPages = Math.ceil(all.length / NEWS_PER_PAGE);
  if (currentPage > totalPages) currentPage = totalPages || 1;

  const start = (currentPage - 1) * NEWS_PER_PAGE;
  const pageNews = all.slice(start, start + NEWS_PER_PAGE);

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
    card.addEventListener("click", () => {
      const c = card.querySelector(".news-content");
      c.style.display = c.style.display === "block" ? "none" : "block";
    });
    listEl.appendChild(card);
  });

  pageInfo.textContent = `${currentPage} / ${totalPages || 1}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;
}

// رویدادهای کاربر
catFilterEl.addEventListener("click", e => {
  if (e.target.tagName !== "BUTTON") return;
  catFilterEl.querySelectorAll("button").forEach(b => b.classList.remove("active"));
  e.target.classList.add("active");
  currentCategory = e.target.dataset.category;
  currentPage = 1;
  render();
});
prevBtn.addEventListener("click", () => {
  if (currentPage > 1) currentPage--, render();
});
nextBtn.addEventListener("click", () => {
  const totalPages = Math.ceil(getFiltered().length / NEWS_PER_PAGE);
  if (currentPage < totalPages) currentPage++, render();
});

// اجرای اولیه
buildCategories();
render();

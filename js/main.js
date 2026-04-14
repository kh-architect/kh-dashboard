// --- TRANSLATION DATA ---
const translations = {
    en: {
        view: "VIEW",
        overview: "Overview",
        projects: "Projects",
        profile: "Profile",
        contact: "Contact",
        scroll: "Scroll",
        selected_projects: "SELECTED PROJECTS",
        bio: "Architectural Designer & 3D Artist. Transforming abstract concepts into tangible realities through form, void, and vision.",
        connect: "Connect",
        location: "Cairo, Egypt",
        resources: "Resources",
        download_cv: "Download Resume / CV",
        portfolio_pdf: "Portfolio PDF",
        quote: "Get a Quote",
        copyright: "© 2026 KHALID Al-Bdawy. All Rights Reserved.",
        designed_by: "Designed with Vision.",
        stepInto: "Step Into Your Vision",
        popupSub: "Let's craft reality together."
    },
    ar: {
        view: "عرض",
        overview: "نبذة",
        projects: "المشاريع",
        profile: "حسابي",
        contact: "تواصل",
        scroll: "تصفح",
        selected_projects: "مشاريع مختارة",
        bio: "مصمم معماري وفنان ثلاثي الأبعاد. أحول المفاهيم المجردة إلى واقع ملموس من خلال الشكل والفراغ والرؤية.",
        connect: "تواصل معنا",
        location: "القاهرة، مصر",
        resources: "روابط هامة",
        download_cv: "تحميل السيرة الذاتية",
        portfolio_pdf: "ملف الأعمال (PDF)",
        quote: "اطلب عرض سعر",
        copyright: "© 2026 KHALID Al-Bdawy. جميع الحقوق محفوظة.",
        designed_by: "صمم برؤية وشغف.",
        stepInto: "اخط نحو رؤيتك",
        popupSub: "دعنا نصنع الواقع معًا.",
        home: "الرئيسية",
        details: "التفاصيل",
        gallery: "المعرض",
        view3d: "عرض ثلاثي الأبعاد",
        cat: "مشروع إظهار معماري",
        title: "واقعية فائقة<br>تصميم داخلي<span style='color:var(--accent)'>.</span>",
        sub: "جودة سينمائية تمحو الخط الفاصل بين الريندر والواقع. واقعية فائقة باستخدام Unreal Engine 5.",
        loc: "الموقع", locVal: "القاهرة، مصر", year: "السنة", area: "الحالة", statusVal: "تصميم", type: "النوع", typeVal: "داخلي", tools: "الأدوات التقنية",
        p1: "يعرض هذا المشروع تصورا داخليا فائق الواقعية تم إنشاؤه باستخدام Unreal Engine 5. الهدف كان تحقيق جودة سينمائية تمحو الخط الفاصل بين الريندر والواقع، مع التركيز على تفاعل الضوء مع الأسطح الداخلية والأثاث.",
        concept: "نبذة عامة",
        p2: "من خلال الاستفادة من تقنيات الوقت الفعلي، يستكشف هذا المشروع إمكانات الإظهار المعماري الغامر، مما يسمح بتغذية راجعة فورية حول الإضاءة والمواد والتكوين المكاني دون أوقات عرض طويلة.",
        features: "أبرز الجوانب التقنية",
        f1: "<strong>إضاءة داخلية سينمائية:</strong> استخدام تقنية Lumen للإضاءة الشاملة في الوقت الفعلي، لالتقاط الضوء الطبيعي المتدفق عبر النوافذ وانعكاسه على الجدران الداخلية.",
        f2: "<strong>خامات دقيقة التفاصيل:</strong> تطبيق خامات PBR عالية الدقة للأقمشة والأخشاب والمعادن لضمان أن يبدو كل سطح ملموسا وواقعيا.",
        f3: "<strong>حركة الكاميرا:</strong> جولات سينمائية سلسة وبطيئة تبرز التدفق المكاني وتفاصيل التصميم الداخلي.",
        f4: "<strong>ظلال وانعكاسات ديناميكية:</strong> انعكاسات دقيقة بتتبع الأشعة (Ray-traced) على الزجاج والأسطح المصقولة لتعزيز عمق التصميم الداخلي.",
        network: "الشبكة", points: "نقاط",
        next: "المشروع التالي"
    }
};

// --- LIST OF PROJECTS (MANUAL LIST) ---
const MY_PROJECTS = [
    { file: "001_Ultra-Real_UE5_Interior_Rendering.jpg", folder: "interior" },
    { file: "002_Faculty_of_Architecture_&_AI.jpg", folder: "faculty" },
    { file: "003_Arabic-Crafts-Forum-Modeling&-render.jpg", folder: "forum" },
    { file: "004_rhino_Modeling_&_AI_Render_Existing_Concept.jpg", folder: "concept" },
    { file: "005_Landscape_Design.jpg", folder: "landscape" },
    { file: "006_chair_no_02_03.jpg", folder: "chair" }
];

// --- DATA PROCESSING & SAVING ---
let SORTED_PROJECTS = [];

function processProjects(items) {
    return items.map(item => {
        const file = typeof item === 'string' ? item : item.file;
        const folder = typeof item === 'string' ? file.replace(/\.[^/.]+$/, "") : item.folder;
        const nameWithoutExt = file.replace(/\.[^/.]+$/, "");
        const numberMatch = nameWithoutExt.match(/\d+/);
        const order = numberMatch ? parseInt(numberMatch[0]) : 999;
        let title = nameWithoutExt.replace(/^\d+[\s_-]*/, '').replace(/[_-]/g, ' ').trim();

        return {
            filename: file,
            cleanName: nameWithoutExt,
            folder: folder,
            title: title || "Untitled",
            order: order
        };
    }).sort((a, b) => a.order - b.order);
}

SORTED_PROJECTS = processProjects(MY_PROJECTS);
localStorage.setItem('kh_projects_data', JSON.stringify(SORTED_PROJECTS));

// --- SITE LOGIC (Standard) ---
let siteOpened = false;
let isLightMode = document.body.classList.contains('light-mode');
let isNoiseOff = document.body.classList.contains('no-noise');
let isArabic = document.body.classList.contains('rtl-mode');

let explosionTriggered = false;
let explosionScale = 0.1;
let cubesTriggered = false;
let cubesScaleFactor = 0;

const themeIcon = document.querySelector('#theme-btn i');
const langText = document.querySelector('.lang-text');

if (isLightMode && themeIcon) {
    themeIcon.classList.remove('fa-sun');
    themeIcon.classList.add('fa-moon');
}
if (isArabic && langText) {
    langText.innerText = "EN";
    applyLanguage('ar');
} else if (langText) {
    langText.innerText = "AR";
}

// Global coordinates for JS/Canvas interaction
window.globalX = -100;
window.globalY = -100;

const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    window.globalX = posX;
    window.globalY = posY;
    if (cursorDot) {
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;
    }
    if (cursorOutline) {
        cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
    }
});

function cursorHover() { document.body.classList.add('hover-active'); }
function cursorLeave() { document.body.classList.remove('hover-active'); }
function cursorView() { document.body.classList.add('view-active'); }
function cursorUnview() { document.body.classList.remove('view-active'); }

// Expose to window for inline onmouseenter/onmouseleave
window.cursorHover = cursorHover;
window.cursorLeave = cursorLeave;
window.cursorView = cursorView;
window.cursorUnview = cursorUnview;

function toggleTheme() {
    triggerShutter(() => {
        isLightMode = !isLightMode;
        localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
        document.body.classList.toggle('light-mode');
        if (isLightMode) {
            if (themeIcon) { themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon'); }
        } else {
            if (themeIcon) { themeIcon.classList.remove('fa-moon'); themeIcon.classList.add('fa-sun'); }
        }
        if (typeof update3DTheme === 'function') update3DTheme();
    });
}
window.toggleTheme = toggleTheme;

function toggleLanguage() {
    triggerShutter(() => {
        isArabic = !isArabic;
        localStorage.setItem('lang', isArabic ? 'ar' : 'en');
        if (isArabic) {
            document.body.classList.add('rtl-mode');
            if (langText) langText.innerText = "EN";
            applyLanguage('ar');
        } else {
            document.body.classList.remove('rtl-mode');
            if (langText) langText.innerText = "AR";
            applyLanguage('en');
        }
    });
}
window.toggleLanguage = toggleLanguage;

function applyLanguage(lang) {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.innerText = translations[lang][key];
    });

    const h1 = document.getElementById('hero-title');
    if (h1) {
        if (lang === 'ar') h1.innerHTML = `حجر<br>الأساس<span style="color:var(--accent)">.</span>`;
        else h1.innerHTML = `ORIGIN<br>POINT<span style="color:var(--accent)">.</span>`;
    }
}

function triggerShutter(callback) {
    const shutter = document.getElementById('shutter-layer');
    if (shutter) {
        shutter.classList.add('active');
        setTimeout(() => {
            callback();
            setTimeout(() => shutter.classList.remove('active'), 200);
        }, 600);
    } else {
        callback();
    }
}
window.triggerShutter = triggerShutter;

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobile-nav');
    if (mobileNav) mobileNav.classList.toggle('active');
}
window.toggleMobileMenu = toggleMobileMenu;

function openSite() {
    if (siteOpened) return;
    siteOpened = true;
    
    // Trigger 3D states
    window.explosionTriggered = !isLightMode;
    window.cubesTriggered = isLightMode;

    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('slide-up');
        setTimeout(() => {
            const nav = document.querySelector('nav');
            if (nav) nav.style.opacity = '1';
            const h1 = document.querySelector('h1');
            if (h1) { h1.style.opacity = '1'; h1.style.transform = 'translateY(0)'; }
            const btn = document.querySelector('.cta-btn');
            if (btn) { btn.style.opacity = '1'; btn.style.transform = 'translateY(0)'; }
        }, 500);
    }
}
window.addEventListener('load', () => setTimeout(openSite, 1800));
setTimeout(openSite, 3500);

// --- GRID GENERATION ---
const gridContainer = document.getElementById('projects-grid');
if (gridContainer) {
    const projectCountEl = document.getElementById('project-count');
    if (projectCountEl) projectCountEl.innerText = `(${SORTED_PROJECTS.length.toString().padStart(2, '0')})`;

    SORTED_PROJECTS.forEach((project, index) => {
        const linkWrapper = document.createElement('a');
        linkWrapper.href = `./${project.folder}/`;
        linkWrapper.className = 'project-card-link';
        if (index % 2 !== 0) { linkWrapper.classList.add('staggered-margin'); }

        linkWrapper.addEventListener('mouseenter', cursorView);
        linkWrapper.addEventListener('mouseleave', cursorUnview);

        const card = document.createElement('div');
        card.className = 'project-card';

        card.innerHTML = `
            <div class="img-container" style="background-color: #1a1a1a; display: flex; align-items: center; justify-content: center;">
                <img src="./${project.filename}" alt="${project.title}" loading="eager" 
                     onerror="this.style.opacity='0';">
                <div style="position: absolute; color: #333; font-size: 3rem; opacity: 0.1; font-weight: 800; z-index: 0;">IMG</div>
            </div>
            <div class="card-scrim"></div>
            <div class="card-info"><div class="project-title">${project.title.replace(" ", "<br>")}</div></div>
        `;
        linkWrapper.appendChild(card);
        gridContainer.appendChild(linkWrapper);
    });
}

// --- Interactions ---
const scrollInd = document.getElementById('scroll-ind');

let ticking = false;
function updateLoop() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const cards = document.querySelectorAll('.project-card');

    if (scrollInd) {
        if (scrollY > 50) scrollInd.style.opacity = '0'; else scrollInd.style.opacity = '1';
    }

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        if (rect.top < windowHeight && rect.bottom > 0) {
            const imgContainer = card.querySelector('.img-container');
            if (imgContainer) {
                const distFromCenter = rect.top - (windowHeight / 2);
                imgContainer.style.transform = `translate3d(0, ${distFromCenter * 0.1}px, 0)`;
            }
        }
        if (window.globalX >= rect.left && window.globalX <= rect.right && window.globalY >= rect.top && window.globalY <= rect.bottom) {
            card.classList.add('force-hover');
        } else {
            card.classList.remove('force-hover');
        }
    });
    ticking = false;
}

window.addEventListener('scroll', () => { if (!ticking) { window.requestAnimationFrame(updateLoop); ticking = true; } });
window.addEventListener('mousemove', () => { if (!ticking) { window.requestAnimationFrame(updateLoop); ticking = true; } });
window.addEventListener('touchmove', () => { if (!ticking) { window.requestAnimationFrame(updateLoop); ticking = true; } });

// --- Popup Logic ---
function openContactPopup(e) {
    if (e) e.preventDefault();
    const popup = document.getElementById('contact-popup');
    if (popup && !popup.classList.contains('active')) {
        popup.classList.add('active');
        history.pushState({ popupOpen: true }, '', '');
    }
}
window.openContactPopup = openContactPopup;

function closeContactPopup(fromPopState) {
    const popup = document.getElementById('contact-popup');
    if (popup && popup.classList.contains('active')) {
        popup.classList.remove('active');
        if (fromPopState !== true && history.state && history.state.popupOpen) {
            history.back();
        }
    }
}
window.closeContactPopup = closeContactPopup;

document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById('contact-popup');
    if (popup) {
        popup.addEventListener('click', function (e) {
            if (e.target === this) closeContactPopup();
        });
    }
});

window.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeContactPopup();
});

window.addEventListener('popstate', function (e) {
    closeContactPopup(true);
});
// --- Gyroscope / Device Orientation Handling ---
let gyroActive = false;
function requestGyroPermission() {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        DeviceOrientationEvent.requestPermission()
            .then(permissionState => {
                if (permissionState === 'granted') {
                    initGyro();
                } else {
                    alert("Motion permission denied.");
                }
            })
            .catch(err => {
                console.error("Gyro Permission Error:", err);
            });
    } else {
        // Non-iOS or older devices
        initGyro();
    }
}
window.requestGyroPermission = requestGyroPermission;

function initGyro() {
    gyroActive = true;
    const gyroBtn = document.getElementById('gyro-btn');
    if (gyroBtn) gyroBtn.classList.add('hidden');
    
    window.addEventListener('deviceorientation', (e) => {
        if (!e.beta || !e.gamma) return;
        
        // Beta: -180 to 180 (front/back), Gamma: -90 to 90 (left/right)
        // Sensitivity: Medium
        const sensitivity = 15; 
        
        // Centering around holding the phone normally (e.g., beta 45 degrees)
        const targetBeta = e.beta - 45; // Adjust for typical reading angle
        const targetGamma = e.gamma;
        
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Map degrees to pixel offset
        window.globalX = centerX + (targetGamma * sensitivity);
        window.globalY = centerY + (targetBeta * sensitivity);
    });
}

// Auto-init if permission not required (Android/Desktop simulation)
if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission !== 'function') {
    // We still wait for a user interaction to be safe or just listen
    window.addEventListener('deviceorientation', (e) => {
        if (!gyroActive && e.beta && e.gamma) {
            initGyro();
        }
    });
}

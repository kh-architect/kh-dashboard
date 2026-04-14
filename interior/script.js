// --- INITIAL THEME/LANG (inline in HTML runs first, this handles the rest) ---

// --- EMBEDDED DATA FROM RHINO / GRASSHOPPER ---
// --- 3D DATA LOADED LAZILY ON DEMAND ---
let RAW_RHINO_DATA = null;
let rhinoDataPromise = null;
function loadRhinoData() {
    if (rhinoDataPromise) return rhinoDataPromise;
    rhinoDataPromise = fetch('rhino_data.txt')
        .then(r => r.text())
        .then(text => { RAW_RHINO_DATA = text; return text; });
    return rhinoDataPromise;
}

// --- Data Parsing ---
function parseRhinoData(str) {
    const cleanData = str.replace(/"/g, ' ').replace(/,/g, ' ').split(/\s+/);
    const numbers = [];
    for (let i = 0; i < cleanData.length; i++) {
        const val = cleanData[i].trim();
        if (val !== '' && !isNaN(val)) {
            numbers.push(parseFloat(val));
        }
    }
    return numbers;
}

// EMBEDDED_MODEL_DATA is computed lazily inside createHeroBuilding() after fetch

// --- TRANSLATIONS ---
const translations = {
    en: {
        home: "Home", overview: "Overview", details: "Details", gallery: "Gallery",
        view3d: "View 3D",
        cat: "Visualization Project",
        title: "ULTRA-REAL<br>INTERIOR<span style='color:var(--accent)'>.</span>",
        sub: "Cinematic quality blurring the line between rendering and reality. High-end photorealism in Unreal Engine 5.",
        loc: "Location", locVal: "Cairo, Egypt", year: "Year", area: "Status", statusVal: "Concept", type: "Type", typeVal: "Interior", tools: "Technical Tools",
        p1: "This project showcases a high-end Photorealistic Interior Visualization created in Unreal Engine 5. The goal was to achieve a cinematic quality that blurs the line between rendering and reality, focusing on light interaction with interior surfaces and furniture.",
        concept: "Overview",
        p2: "By leveraging real-time technologies, this project explores the potential of immersive architectural visualization, allowing for instant feedback on lighting, materials, and spatial composition without long render times.",
        features: "Technical Highlights",
        f1: "<strong>Cinematic Interior Lighting:</strong> Utilizing Lumen for real-time global illumination, capturing natural light streaming through windows and its bounce off interior walls.",
        f2: "<strong>Micro-Detail Materials:</strong> Applying high-fidelity PBR textures for fabrics, wood, and metals to ensure every surface looks tactile and realistic.",
        f3: "<strong>Camera Animation:</strong> Smooth, slow-paced cinematic walkthroughs that highlight the spatial flow and interior design details.",
        f4: "<strong>Dynamic Shadows & Reflections:</strong> Precise ray-traced reflections on glass and polished surfaces to enhance the interior's depth.", "network": "Network", "points": "Points",
        next: "Next Project", contact: "Contact", stepInto: "Step Into Your Vision", popupSub: "Let\'s craft reality together."
    },
    ar: {
        home: "الرئيسية", overview: "نظرة عامة", details: "التفاصيل", gallery: "المعرض",
        view3d: "عرض ثلاثي الأبعاد",
        cat: "مشروع إظهار معماري",
        title: "واقعية فائقة<br>تصميم داخلي<span style='color:var(--accent)'>.</span>",
        sub: "جودة سينمائية تمحو الخط الفاصل بين الريندر والواقع. واقعية فائقة باستخدام Unreal Engine 5.",
        loc: "الموقع", locVal: "القاهرة، مصر", year: "السنة", area: "الحالة", statusVal: "تصميم", type: "النوع", typeVal: "داخلي", tools: "الأدوات التقنية",
        p1: "يعرض هذا المشروع تصوراً داخلياً فائق الواقعية تم إنشاؤه باستخدام Unreal Engine 5. الهدف كان تحقيق جودة سينمائية تمحو الخط الفاصل بين الريندر والواقع، مع التركيز على تفاعل الضوء مع الأسطح الداخلية والأثاث.",
        concept: "نبذة عامة",
        p2: "من خلال الاستفادة من تقنيات الوقت الفعلي، يستكشف هذا المشروع إمكانات الإظهار المعماري الغامر، مما يسمح بتغذية راجعة فورية حول الإضاءة والمواد والتكوين المكاني دون أوقات عرض طويلة.",
        features: "أبرز الجوانب التقنية",
        f1: "<strong>إضاءة داخلية سينمائية:</strong> استخدام تقنية Lumen للإضاءة الشاملة في الوقت الفعلي، لالتقاط الضوء الطبيعي المتدفق عبر النوافذ وانعكاسه على الجدران الداخلية.",
        f2: "<strong>خامات دقيقة التفاصيل:</strong> تطبيق خامات PBR عالية الدقة للأقمشة والأخشاب والمعادن لضمان أن يبدو كل سطح ملموساً وواقعياً.",
        f3: "<strong>حركة الكاميرا:</strong> جولات سينمائية سلسة وبطيئة تبرز التدفق المكاني وتفاصيل التصميم الداخلي.",
        f4: "<strong>ظلال وانعكاسات ديناميكية:</strong> انعكاسات دقيقة بتتبع الأشعة (Ray-traced) على الزجاج والأسطح المصقولة لتعزيز عمق التصميم الداخلي.", "network": "الشبكة", "points": "نقاط",
        next: "المشروع التالي", contact: "تواصل", stepInto: "اخطُ نحو رؤيتك", popupSub: "دعنا نصنع الواقع معًا."
    }
};

let currentLang = localStorage.getItem('lang') || 'en';
if (currentLang === 'ar') {
    document.body.classList.add('rtl-mode');
    document.querySelector('.lang-text').innerText = 'EN';
} else {
    document.querySelector('.lang-text').innerText = 'AR';
}

// --- MOUSE CURSOR ---
function cursorHover() { document.body.classList.add('hover-active'); }
function cursorLeave() { document.body.classList.remove('hover-active'); }

function toggleLang() {
    triggerShutter(() => {
        currentLang = currentLang === 'en' ? 'ar' : 'en';
        localStorage.setItem('lang', currentLang);
        applyLang();
    });
}

function applyLang() {
    const t = translations[currentLang];
    document.body.classList.toggle('rtl-mode', currentLang === 'ar');
    document.querySelector('.lang-text').innerText = currentLang === 'en' ? 'AR' : 'EN';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key]) el.innerHTML = t[key];
    });

    const pBtn = document.querySelector('.mc-btn[onclick*="points"]');
    const nBtn = document.querySelector('.mc-btn[onclick*="network"]');
    if (pBtn) pBtn.innerText = t.points;
    if (nBtn) nBtn.innerText = t.network;
}
applyLang();

function triggerShutter(callback) {
    const shutter = document.getElementById('shutter-layer');
    shutter.classList.add('active');
    setTimeout(() => { callback(); setTimeout(() => shutter.classList.remove('active'), 200); }, 600);
}

                        // --- NAVIGATION LOGIC ---
let savedProjects = JSON.parse(localStorage.getItem('kh_projects_data') || '[]');

if (savedProjects.length === 0 || !savedProjects[0].folder) {
    const MY_PROJECTS = [
        { file: "001_Ultra-Real_UE5_Interior_Rendering.jpeg", folder: "interior" },
        { file: "002_Faculty_of_Architecture_&_AI.jpg", folder: "faculty" }, 
        { file: "003_Arabic Crafts Forum Modeling& render.png", folder: "forum" },
        { file: "004_rhino_Modeling_&_AI_Render_Existing_Concept.png", folder: "concept" },
        { file: "005_Landscape_Design.jpg", folder: "landscape" },
        { file: "006_chair_no_02_03.jpg", folder: "chair" }
    ];
    savedProjects = MY_PROJECTS.map(item => {
        const file = item.file;
        const nameWithoutExt = file.replace(/\.[^/.]+$/, "");
        const numberMatch = nameWithoutExt.match(/\d+/);
        const order = numberMatch ? parseInt(numberMatch[0]) : 999;
        let title = nameWithoutExt.replace(/^\d+[\s_-]*/, '').replace(/[_-]/g, ' ').trim();
        return {
            filename: file,
            cleanName: nameWithoutExt,
            folder: item.folder,
            title: title || "Untitled",
            order: order
        };
    }).sort((a, b) => a.order - b.order);
    localStorage.setItem('kh_projects_data', JSON.stringify(savedProjects));
}

if (savedProjects.length > 0) {
    // Find current project index by matching the URL path against folders
    let currIndex = savedProjects.findIndex(p => window.location.href.includes('/' + p.folder + '/'));
    if (currIndex === -1 && typeof CURRENT_PROJECT_KEY !== 'undefined') {
        currIndex = savedProjects.findIndex(p => p.cleanName.includes(CURRENT_PROJECT_KEY) || p.title.includes(CURRENT_PROJECT_KEY));
    }
    if (currIndex === -1) currIndex = 0;

    const nextIndex = (currIndex + 1) % savedProjects.length;
    const nextProj = savedProjects[nextIndex];
    const nextFolder = nextProj.folder || nextProj.cleanName;

    document.getElementById('next-title').innerText = nextProj.title;
    document.getElementById('next-project-container').onclick = () => {
        triggerShutter(() => {
            window.location.href = `../${nextFolder}/index.html`;
        });
    };
}

// --- GALLERY ---
const gallery = document.getElementById('gallery-cont');
const dotsContainer = document.getElementById('dots-container');
const thumbsContainer = document.getElementById('lb-thumbs-container');
const maxImages = 15;
let mediaItems = [];
let curIndex = 0;
let isDown = false, startX, scrollLeft, isDragging = false;

async function loadImages() {
    gallery.innerHTML = '';
    mediaItems = [];
    for (let i = 1; i <= maxImages; i++) {
        const card = document.createElement('div');
        card.className = 'gallery-card';
        card.style.display = 'none';
        card.id = `card-${i}`;
        gallery.appendChild(card);
        findAndLoadMedia(i, card);
    }
}

function findAndLoadMedia(index, card) {
    const variations = [
        { ext: '.mp4', type: 'video' }, { ext: '.webm', type: 'video' },
        { ext: '.webp', type: 'image' }, { ext: '.jpg', type: 'image' },
        { ext: '.png', type: 'image' }, { ext: '.jpeg', type: 'image' }
    ];

    function getFilenames(idx, extension) {
        return [
            `${idx}${extension}`,
            `${idx.toString().padStart(2, '0')}${extension}`,
            `${idx.toString().padStart(3, '0')}${extension}`
        ];
    }

    let queue = [];
    variations.forEach(v => {
        const names = getFilenames(index, v.ext);
        names.forEach(name => queue.push({ name: name, type: v.type }));
    });

    let attempt = 0;

    function tryNext() {
        if (attempt >= queue.length) { card.remove(); updateDots(); return; }
        const item = queue[attempt];
        const filename = item.name;
        const fileType = item.type;

        if (fileType === 'image') {
            const img = new Image();
            img.src = filename;
            img.onload = () => { renderCardContent(card, index, filename, 'image'); };
            img.onerror = () => { attempt++; tryNext(); };
        } else {
            const vid = document.createElement('video');
            vid.preload = 'metadata';
            vid.src = filename;
            vid.onloadeddata = () => { renderCardContent(card, index, filename, 'video'); };
            vid.onerror = () => { attempt++; tryNext(); };
        }
    }

    tryNext();
}

function renderCardContent(card, index, src, type) {
    const displayNum = index.toString().padStart(2, '0');
    let contentHtml = '';

    if (type === 'image') {
        contentHtml = `<img src="${src}" alt="Project Image">`;
    } else {
        contentHtml = `<video src="${src}" muted loop autoplay playsinline style="object-fit: cover; width: 100%; height: 100%; pointer-events: none;"></video>`;
    }

    card.innerHTML = `
        ${contentHtml}
        <div class="card-label"><div class="card-num">${displayNum.substring(1)}</div></div>
        <div class="expand-icon"><i class="fas fa-expand-alt"></i></div>
    `;

    const openAction = () => {
        if (!isDragging) {
            const visibleCards = Array.from(document.querySelectorAll('.gallery-card')).filter(c => c.style.display !== 'none');
            const myIndex = visibleCards.indexOf(card);
            if (myIndex !== -1) openLightbox(myIndex);
        }
    };
    card.querySelector('.expand-icon').onclick = (e) => { e.stopPropagation(); openAction(); };
    card.onclick = openAction;

    card.onmouseenter = () => { document.body.classList.add('hover-active'); };
    card.onmouseleave = () => document.body.classList.remove('hover-active');

    card.style.display = 'block';
    setTimeout(() => rebuildMediaArray(), 50);
}

                        function rebuildMediaArray() {
    mediaItems = [];
    const cards = document.querySelectorAll('.gallery-card');
    if (typeof thumbsContainer !== 'undefined') thumbsContainer.innerHTML = '';
    cards.forEach(c => {
        if (c.style.display !== 'none') {
            const img = c.querySelector('img');
            const vid = c.querySelector('video');
            let src = '', type = '';
            if (img) { type = 'image'; src = img.src; }
            else if (vid) { type = 'video'; src = vid.src; }
            
            if (src) {
                mediaItems.push({ type, src });
                if (typeof thumbsContainer !== 'undefined') {
                    const thumb = document.createElement(type === 'video' ? 'video' : 'img');
                    thumb.src = src;
                    thumb.className = 'lb-thumb';
                    const itemIndex = mediaItems.length - 1;
                    thumb.onclick = () => { curIndex = itemIndex; updateLightbox(); };
                    thumbsContainer.appendChild(thumb);
                }
            }
        }
    });
    updateDots();
}

function updateDots() {
    const visibleCards = Array.from(document.querySelectorAll('.gallery-card')).filter(c => c.style.display !== 'none');
    const count = visibleCards.length;
    dotsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const dot = document.createElement('div');
        dot.className = 'dot' + (i === 0 ? ' active' : '');
        dot.onclick = () => {
            if (visibleCards[i]) {
                const centerPos = visibleCards[i].offsetLeft - (window.innerWidth / 2) + (visibleCards[i].offsetWidth / 2);
                gallery.scrollTo({ left: centerPos, behavior: 'smooth' });
            }
        };
        dotsContainer.appendChild(dot);
    }
}

function scrollGallery(dir) {
    const card = document.querySelector('.gallery-card');
    if (card) {
        const w = card.offsetWidth + 30;
        if (document.body.classList.contains('rtl-mode')) dir = -dir;
        gallery.scrollBy({ left: dir * w, behavior: 'smooth' });
    }
}

gallery.addEventListener('mousedown', (e) => { isDown = true; isDragging = false; gallery.style.scrollSnapType = 'none'; startX = e.pageX - gallery.offsetLeft; scrollLeft = gallery.scrollLeft; });
gallery.addEventListener('mouseleave', () => { isDown = false; gallery.style.scrollSnapType = 'x mandatory'; });
gallery.addEventListener('mouseup', () => { isDown = false; gallery.style.scrollSnapType = 'x mandatory'; setTimeout(() => isDragging = false, 50); });
gallery.addEventListener('mousemove', (e) => { if (!isDown) return; e.preventDefault(); const x = e.pageX - gallery.offsetLeft; const walk = (x - startX) * 2; gallery.scrollLeft = scrollLeft - walk; if (Math.abs(walk) > 5) isDragging = true; });

gallery.addEventListener('scroll', () => {
    const center = gallery.scrollLeft + window.innerWidth / 2;
    const cards = document.querySelectorAll('.gallery-card');
    const dots = document.querySelectorAll('.dot');
    cards.forEach((c, i) => {
        const cCenter = c.offsetLeft + c.offsetWidth / 2;
        if (Math.abs(center - cCenter) < c.offsetWidth / 2) {
            dots.forEach(d => d.classList.remove('active'));
            if (dots[i]) dots[i].classList.add('active');
        }
    });
});

loadImages();

// --- LIGHTBOX ---
function openLightbox(idx) { curIndex = idx; document.getElementById('lightbox').classList.add('active'); document.body.classList.add('in-lightbox'); updateLightbox(); }
function closeLightbox() { document.getElementById('lightbox').classList.remove('active'); document.body.classList.remove('in-lightbox'); const container = document.getElementById('lightbox-content-wrapper'); const vid = container.querySelector('video'); if (vid) vid.pause(); }
function changeImage(dir) { curIndex += dir; if (curIndex < 0) curIndex = mediaItems.length - 1; if (curIndex >= mediaItems.length) curIndex = 0; updateLightbox(); }
                        function updateLightbox() {
    const container = document.getElementById('lightbox-content-wrapper');
    container.innerHTML = '';
    const item = mediaItems[curIndex];
    if (!item) return;

    if (item.type === 'video') {
        const vid = document.createElement('video');
        vid.src = item.src;
        vid.className = 'lightbox-media';
        vid.controls = true;
        vid.autoplay = true;
        container.appendChild(vid);
    } else {
        const img = document.createElement('img');
        img.src = item.src;
        img.className = 'lightbox-media';
        container.appendChild(img);
    }
    
    if (typeof thumbsContainer !== 'undefined') {
        const thumbs = thumbsContainer.querySelectorAll('.lb-thumb');
        thumbs.forEach((t, i) => {
            if (i === curIndex) {
                t.classList.add('active');
                t.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
            } else {
                t.classList.remove('active');
            }
        });
    }}
document.addEventListener('keydown', (e) => {
    if (document.body.classList.contains('in-lightbox')) { if (e.key === 'Escape') closeLightbox(); if (e.key === 'ArrowLeft') changeImage(-1); if (e.key === 'ArrowRight') changeImage(1); }
});

// --- 3D SCENE CONFIG ---
let isLight = document.body.classList.contains('light-mode');
let bgScene, bgCamera, bgRenderer, bgParticles, bgStructures;
let heroScene, heroCamera, heroRenderer, heroModel;

let introTriggered = false; let explosionProgress = 0;
let globalX = 0, globalY = 0;
let targetX = 0, targetY = 0;

// Transitions Variables
let isExploding = false;
let explosionTime = 0;
let originalPositionsAttr;
let targetPositionsAttr;
let randomDelaysAttr;

let drawRangeCount = 0;
let targetDrawRangeCount = 0;

let heroPointsMesh = null;
let heroNetworkMesh = null;
let currentMode = 'points';

const explosionDuration = 2.5;

// --- Visibility Tracking (stop rendering off-screen scenes) ---
let bgVisible = true;
let heroVisible = true;

function lerp(start, end, t) { return start * (1 - t) + end * t; }

// 1. BACKGROUND SCENE
function initBackground3D() {
    const container = document.getElementById('canvas-container');
    bgScene = new THREE.Scene();
    bgScene.fog = new THREE.FogExp2(isLight ? 0xf4f4f7 : 0x080808, 0.02);
    bgCamera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    bgCamera.position.z = 20;

    const isMobileDevice = window.innerWidth < 768;
    bgRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobileDevice });
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    bgRenderer.setPixelRatio(isMobileDevice ? 1 : Math.min(window.devicePixelRatio, 2));
    bgRenderer.setClearColor(isLight ? 0xf4f4f7 : 0x080808);
    container.appendChild(bgRenderer.domElement);

    const pGeo = new THREE.BufferGeometry();
    const isMobile = window.innerWidth < 768;
    const pCount = isMobile ? 1500 : 3000;
    const pPos = new Float32Array(pCount * 3);
    const pTarget = new Float32Array(pCount * 3);
    for (let i = 0; i < pCount * 3; i += 3) {
        pTarget[i] = (Math.random() - 0.5) * 70; pTarget[i + 1] = (Math.random() - 0.5) * 40; pTarget[i + 2] = (Math.random() - 0.5) * 50;
        pPos[i] = 0; pPos[i + 1] = 0; pPos[i + 2] = 0;
    }
    pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
    pGeo.setAttribute('targetPos', new THREE.BufferAttribute(pTarget, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.06, color: 0xd9c38c, transparent: true, opacity: 0.7 });
    bgParticles = new THREE.Points(pGeo, pMat);
    bgScene.add(bgParticles);

    bgStructures = new THREE.Group();
    const baseGeo = new THREE.IcosahedronGeometry(3, 1);
    const edgesGeo = new THREE.EdgesGeometry(baseGeo);
    const lineMat = new THREE.LineBasicMaterial({ color: 0x888888, transparent: true, opacity: 0.4 });
    for (let i = 0; i < 20; i++) {
        const s = new THREE.LineSegments(edgesGeo, lineMat);
        s.userData = { tx: (Math.random() - 0.5) * 60, ty: (Math.random() - 0.5) * 40, tz: (Math.random() - 0.5) * 30, ts: Math.random() * 1 + 0.5 };
        s.scale.set(0, 0, 0); s.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
        bgStructures.add(s);
    }
    bgScene.add(bgStructures);

    bgParticles.visible = !isLight;
    bgStructures.visible = isLight;
}

// 2. HERO MODEL SCENE
function initHero3D() {
    const container = document.getElementById('hero-model-container');
    const w = container.offsetWidth;
    const h = container.offsetHeight;

    heroScene = new THREE.Scene();
    heroCamera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000);
    heroCamera.position.set(0, 10, 50);
    heroCamera.lookAt(0, 0, 0);

    const isMobileHero = window.innerWidth < 768;
    heroRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: !isMobileHero });
    heroRenderer.setSize(w, h);
    heroRenderer.setPixelRatio(isMobileHero ? 1 : Math.min(window.devicePixelRatio, 2));
    heroRenderer.setClearColor(0x000000, 0);
    container.insertBefore(heroRenderer.domElement, container.firstChild);
}

async function triggerLoadModel() {
    const btn = document.getElementById('load-model-btn');
    const originalHTML = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i><span>Loading...</span>';
    btn.style.pointerEvents = 'none';
    try {
        RAW_RHINO_DATA = await loadRhinoData();
        btn.classList.add('hidden');
        setTimeout(() => {
            createHeroBuilding();
            document.getElementById('model-controls').classList.add('active');
            isExploding = true;
            explosionTime = 0;
        }, 400);
    } catch (err) {
        console.error('Failed to load 3D data:', err);
        btn.innerHTML = '<i class="fas fa-exclamation-triangle"></i><span>Error - Use Live Server</span>';
        btn.style.pointerEvents = 'auto';
        setTimeout(() => {
            btn.innerHTML = originalHTML;
            rhinoDataPromise = null;
        }, 3000);
    }
}

function createHeroBuilding() {
    heroModel = new THREE.Group();
    heroScene.add(heroModel);

    const EMBEDDED_MODEL_DATA = parseRhinoData(RAW_RHINO_DATA);
    const vertices = [];
    if (EMBEDDED_MODEL_DATA.length === 0) { console.warn("No Model Data Found!"); return; }

    for (let i = 0; i < EMBEDDED_MODEL_DATA.length; i += 3) {
        const x = EMBEDDED_MODEL_DATA[i];
        const y = EMBEDDED_MODEL_DATA[i + 2];
        const z = -EMBEDDED_MODEL_DATA[i + 1];
        if (!isNaN(x) && !isNaN(y) && !isNaN(z)) vertices.push(x, y, z);
    }

    let minX = Infinity, minY = Infinity, minZ = Infinity;
    let maxX = -Infinity, maxY = -Infinity, maxZ = -Infinity;
    for (let i = 0; i < vertices.length; i += 3) {
        if (vertices[i] < minX) minX = vertices[i]; if (vertices[i] > maxX) maxX = vertices[i];
        if (vertices[i + 1] < minY) minY = vertices[i + 1]; if (vertices[i + 1] > maxY) maxY = vertices[i + 1];
        if (vertices[i + 2] < minZ) minZ = vertices[i + 2]; if (vertices[i + 2] > maxZ) maxZ = vertices[i + 2];
    }
    const centerX = (minX + maxX) / 2;
    const centerY = (minY + maxY) / 2;
    const centerZ = (minZ + maxZ) / 2;

    for (let i = 0; i < vertices.length; i += 3) {
        vertices[i] -= centerX;
        vertices[i + 1] -= centerY;
        vertices[i + 2] -= centerZ;
    }

    const maxDim = Math.max(maxX - minX, maxY - minY, maxZ - minZ);
    const scaleFactor = 25 / maxDim;
    for (let i = 0; i < vertices.length; i++) vertices[i] *= scaleFactor;

    const startPositions = [];
    const randomDelays = [];
    for (let i = 0; i < vertices.length; i += 3) {
        startPositions.push(0, 0, 0);
        randomDelays.push(Math.random());
    }

    const geometry = new THREE.BufferGeometry();
    const currentPositions = new Float32Array(startPositions);
    const finalPositions = new Float32Array(vertices);

    geometry.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
    targetPositionsAttr = finalPositions;
    originalPositionsAttr = new Float32Array(startPositions);
    randomDelaysAttr = new Float32Array(randomDelays);

    const pMat = new THREE.PointsMaterial({
        size: 0.15,
        color: isLight ? 0x555555 : 0xd9c38c,
        transparent: true, opacity: 1.0,
        sizeAttenuation: true
    });

    heroPointsMesh = new THREE.Points(geometry, pMat);
    heroModel.add(heroPointsMesh);

    const netVertices = [];
    const vCount = vertices.length / 3;
    for (let i = 0; i < vCount; i++) {
        const x1 = vertices[i * 3];
        const y1 = vertices[i * 3 + 1];
        const z1 = vertices[i * 3 + 2];
        const checkLimit = Math.min(vCount, i + 30);
        for (let j = i + 1; j < checkLimit; j++) {
            const x2 = vertices[j * 3];
            const y2 = vertices[j * 3 + 1];
            const z2 = vertices[j * 3 + 2];
            const dist = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2));
            if (dist < 1.8) {
                netVertices.push(x1, y1, z1);
                netVertices.push(x2, y2, z2);
            }
        }
    }

    const netGeometry = new THREE.BufferGeometry();
    netGeometry.setAttribute('position', new THREE.Float32BufferAttribute(netVertices, 3));
    const netMat = new THREE.LineBasicMaterial({
        color: varColor(1),
        transparent: true,
        opacity: 0.4,
        blending: THREE.AdditiveBlending
    });
    heroNetworkMesh = new THREE.LineSegments(netGeometry, netMat);
    heroNetworkMesh.geometry.setDrawRange(0, 0);
    targetDrawRangeCount = 0;
    heroModel.add(heroNetworkMesh);
}

function updateModelStyle(style) {
    document.querySelectorAll('.mc-btn').forEach(b => b.classList.remove('active'));
    const clickedBtn = document.querySelector(`.mc-btn[onclick*="${style}"]`);
    if (clickedBtn) clickedBtn.classList.add('active');

    currentMode = style;
    if (style === 'points') {
        targetDrawRangeCount = 0;
    } else if (style === 'network') {
        if (heroNetworkMesh) targetDrawRangeCount = heroNetworkMesh.geometry.attributes.position.count;
    }
    if (heroPointsMesh) heroPointsMesh.material.color.setHex(isLight ? 0x555555 : 0xd9c38c);
    if (heroNetworkMesh) heroNetworkMesh.material.color.setHex(varColor(1));
}

function varColor(type) {
    if (isLight) return type === 0 ? 0x333333 : 0x000000;
    return type === 0 ? 0xd9c38c : 0x4dd0e1;
}

const clock = new THREE.Clock();
function easeOutCubic(x) { return 1 - Math.pow(1 - x, 3); }

function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    const normalizedX = (globalX / window.innerWidth) - 0.5;
    const normalizedY = (globalY / window.innerHeight) - 0.5;
    targetX = lerp(targetX, normalizedX, 0.05);
    targetY = lerp(targetY, normalizedY, 0.05);

    if (introTriggered) {
        explosionProgress += (1 - explosionProgress) * 0.04;
        if (bgParticles.visible) {
            const pos = bgParticles.geometry.attributes.position.array;
            const tgt = bgParticles.geometry.attributes.targetPos.array;
            for (let i = 0; i < pos.length; i++) pos[i] += (tgt[i] - pos[i]) * 0.05;
            bgParticles.geometry.attributes.position.needsUpdate = true;
        }
        if (bgStructures.visible) {
            bgStructures.children.forEach(s => {
                s.position.x += (s.userData.tx - s.position.x) * 0.05;
                s.position.y += (s.userData.ty - s.position.y) * 0.05;
                s.position.z += (s.userData.tz - s.position.z) * 0.05;
                const scale = s.userData.ts * explosionProgress;
                s.scale.set(scale, scale, scale);
            });
        }
    }
    if (bgParticles.visible) {
        bgParticles.rotation.y = targetX * 0.2;
        bgParticles.rotation.x = targetY * 0.2;
    }
    if (bgStructures.visible) {
        bgStructures.rotation.y = targetX * 0.2;
        bgStructures.rotation.x = targetY * 0.2;
        bgStructures.children.forEach(s => { s.rotation.x += 0.002; s.rotation.y += 0.002; });
    }
    if (bgVisible) bgRenderer.render(bgScene, bgCamera);

    if (heroModel) {
        heroModel.rotation.y = targetX * 1.8;
        heroModel.rotation.x = targetY * 0.5;

        if (isExploding && heroPointsMesh) {
            explosionTime += delta;
            const rawT = Math.min(1, explosionTime / explosionDuration);
            const positions = heroPointsMesh.geometry.attributes.position.array;
            const count = positions.length / 3;

            for (let i = 0; i < count; i++) {
                const delay = randomDelaysAttr[i] * 0.5;
                let localT = (rawT - delay) / (1 - 0.5);
                localT = Math.max(0, Math.min(1, localT));
                const t = easeOutCubic(localT);
                positions[i * 3] = targetPositionsAttr[i * 3] * t;
                positions[i * 3 + 1] = targetPositionsAttr[i * 3 + 1] * t;
                positions[i * 3 + 2] = targetPositionsAttr[i * 3 + 2] * t;
            }
            heroPointsMesh.geometry.attributes.position.needsUpdate = true;
            if (rawT >= 1) isExploding = false;
        }

        if (heroNetworkMesh) {
            const speed = 0.02;
            drawRangeCount += (targetDrawRangeCount - drawRangeCount) * speed;
            const drawCount = Math.floor(drawRangeCount);
            heroNetworkMesh.geometry.setDrawRange(0, drawCount - (drawCount % 2));
            if (heroPointsMesh) {
                const targetOp = (currentMode === 'network') ? 0.3 : 1.0;
                heroPointsMesh.material.opacity = lerp(heroPointsMesh.material.opacity, targetOp, 0.05);
            }
        }
    }
    if (heroVisible) heroRenderer.render(heroScene, heroCamera);
}

// --- CACHED DOM ELEMENTS (avoid repeated querySelector calls) ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const navElement = document.querySelector('nav');
const scrollIndElement = document.getElementById('scroll-ind');

document.addEventListener('DOMContentLoaded', () => {
    initBackground3D();
    initHero3D();
    animate();
    setTimeout(() => introTriggered = true, 500);

    // --- Intersection Observer: pause off-screen 3D rendering ---
    const observerOptions = { threshold: 0.01 };

    const bgContainer = document.getElementById('canvas-container');
    if (bgContainer) {
        const bgObserver = new IntersectionObserver((entries) => {
            bgVisible = entries[0].isIntersecting;
        }, observerOptions);
        bgObserver.observe(bgContainer);
    }

    const heroContainer = document.getElementById('hero-model-container');
    if (heroContainer) {
        const heroObserver = new IntersectionObserver((entries) => {
            heroVisible = entries[0].isIntersecting;
        }, observerOptions);
        heroObserver.observe(heroContainer);
    }

    // --- Intersection Observer: Apple-style gallery controls animation ---
    const controlsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show-controls');
                controlsObserver.unobserve(entry.target); // Only animate once
            }
        });
    }, { threshold: 0.1, rootMargin: "0px 0px 0px 0px" });

    const galleryControls = document.querySelector('.gallery-controls');
    if (galleryControls) {
        controlsObserver.observe(galleryControls);
    }
});

window.addEventListener('mousemove', (e) => {
    cursorDot.style.left = `${e.clientX}px`;
    cursorDot.style.top = `${e.clientY}px`;
    cursorOutline.style.left = `${e.clientX}px`;
    cursorOutline.style.top = `${e.clientY}px`;
    globalX = e.clientX; globalY = e.clientY;

    // Hover detection moved here from scroll (much cheaper than elementFromPoint on scroll)
    const hoverable = e.target.closest('.gallery-card, .next-project, .back-link, .nav-links, .lang-btn, .load-3d-btn, .mc-btn');
    if (hoverable) {
        document.body.classList.add('hover-active');
    } else {
        document.body.classList.remove('hover-active');
    }
});

window.addEventListener('resize', () => {
    bgCamera.aspect = window.innerWidth / window.innerHeight;
    bgCamera.updateProjectionMatrix();
    bgRenderer.setSize(window.innerWidth, window.innerHeight);
    const hc = document.getElementById('hero-model-container');
    if (hc && hc.offsetWidth > 0) {
        heroCamera.aspect = hc.offsetWidth / hc.offsetHeight;
        heroCamera.updateProjectionMatrix();
        heroRenderer.setSize(hc.offsetWidth, hc.offsetHeight);
    }
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) navElement.classList.add('scrolled');
    else navElement.classList.remove('scrolled');

    // Hide scroll indicator smoothly on scroll
    if (scrollIndElement) {
        if (window.scrollY > 5) {
            scrollIndElement.classList.add('hidden');
        } else {
            scrollIndElement.classList.remove('hidden');
        }
    }
});

// FIXED TOGGLE THEME FUNCTION
function toggleTheme() {
    triggerShutter(() => {
        isLight = !isLight;
        document.body.classList.toggle('light-mode');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');

        // Update Icon
        const tIcon = document.querySelector('.theme-toggle i');
        if (isLight) { tIcon.classList.remove('fa-sun'); tIcon.classList.add('fa-moon'); }
        else { tIcon.classList.remove('fa-moon'); tIcon.classList.add('fa-sun'); }

        // Force Scene Update
        const bg = isLight ? 0xf4f4f7 : 0x080808;
        if (bgScene) bgScene.fog.color.setHex(bg);
        if (bgRenderer) bgRenderer.setClearColor(bg);

        if (bgParticles) bgParticles.visible = !isLight;
        if (bgStructures) bgStructures.visible = isLight;

        // Reset bg animation scales to ensure visibility
        if (isLight && bgStructures) bgStructures.children.forEach(s => s.scale.set(1, 1, 1));

        updateModelStyle(currentMode);
    });
}

// Initial Icon Set
const themeIcon = document.querySelector('.theme-toggle i');
if (isLight) { themeIcon.classList.remove('fa-sun'); themeIcon.classList.add('fa-moon'); }
else { themeIcon.classList.remove('fa-moon'); themeIcon.classList.add('fa-sun'); }

// --- CONTACT POPUP ---
function openContactPopup(e) {
    if (e) e.preventDefault();
    const popup = document.getElementById('contact-popup');
    if (popup && !popup.classList.contains('active')) {
        popup.classList.add('active');
        history.pushState({ popupOpen: true }, '', '');
    }
}
function closeContactPopup(fromPopState) {
    const popup = document.getElementById('contact-popup');
    if (popup && popup.classList.contains('active')) {
        popup.classList.remove('active');
        if (fromPopState !== true && history.state && history.state.popupOpen) {
            history.back();
        }
    }
}
document.addEventListener('DOMContentLoaded', function() {
    const popup = document.getElementById('contact-popup');
    if (popup) {
        popup.addEventListener('click', function(e) {
            if (e.target === this) closeContactPopup();
        });
    }
});
window.addEventListener('keydown', function(e) {
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
        globalX = centerX + (targetGamma * sensitivity);
        globalY = centerY + (targetBeta * sensitivity);
    });
}

// Auto-init if permission not required (Android/Desktop simulation)
if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission !== 'function') {
    window.addEventListener('deviceorientation', (e) => {
        if (!gyroActive && e.beta && e.gamma) {
            initGyro();
        }
    });
}

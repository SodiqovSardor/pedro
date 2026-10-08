/* Avto Yuvish — umumiy kod. Barcha sahifalar bitta skriptni ulaydi,
   shuning uchun har bir sahifada faqat o'ziga xos elementlar bo'ladi.
   Har bir topilma null bo'lishi mumkin — shuning uchun himoyalangan. */

const $ = id => document.getElementById(id);

const AVTOMOBIL_MODELLARI = [
  'Chevrolet Spark','Chevrolet Nexia 1','Chevrolet Nexia 2','Chevrolet Nexia 3',
  'Chevrolet Lacetti','Chevrolet Cobalt','Chevrolet Malibu','Chevrolet Malibu 2',
  'Chevrolet Captiva','Chevrolet Tracker','Chevrolet Equinox','Chevrolet Traverse',
  'Chevrolet Tahoe','Chevrolet Suburban','Chevrolet Trailblazer','Chevrolet Damas',
  'Chevrolet Labo','Chevrolet Orlando','Chevrolet Aveo','Chevrolet Cruze',
  'Chevrolet Trax','Chevrolet Blazer',
  'Daewoo Matiz','Daewoo Tico','Daewoo Nexia','Daewoo Espero',
  'Daewoo Nubira','Daewoo Leganza','Daewoo Lanos',
  'Hyundai Accent','Hyundai Elantra','Hyundai Sonata','Hyundai Tucson',
  'Hyundai Santa Fe','Hyundai Creta','Hyundai i10','Hyundai i20','Hyundai i30',
  'Hyundai Palisade','Hyundai Venue','Hyundai Kona','Hyundai Genesis',
  'Hyundai Grand Starex','Hyundai Porter',
  'Kia Rio','Kia Cerato','Kia Sportage','Kia Sorento','Kia K5','Kia Stinger',
  'Kia Telluride','Kia Carnival','Kia Picanto','Kia Stonic','Kia Seltos',
  'Kia EV6','Kia Mohave',
  'Toyota Corolla','Toyota Camry','Toyota Camry 70','Toyota Land Cruiser 100',
  'Toyota Land Cruiser 200','Toyota Land Cruiser 300','Toyota Land Cruiser Prado',
  'Toyota RAV4','Toyota Highlander','Toyota Yaris','Toyota Venza','Toyota Fortuner',
  'Toyota Rush','Toyota Hilux','Toyota Avensis','Toyota Auris','Toyota C-HR',
  'Nissan Sunny','Nissan Almera','Nissan Tiida','Nissan X-Trail','Nissan Qashqai',
  'Nissan Patrol','Nissan Juke','Nissan Murano','Nissan Pathfinder',
  'Nissan Navara','Nissan Teana','Nissan Leaf',
  'Mitsubishi Outlander','Mitsubishi ASX','Mitsubishi Eclipse Cross',
  'Mitsubishi Pajero','Mitsubishi Pajero Sport','Mitsubishi L200',
  'Mitsubishi Galant','Mitsubishi Lancer',
  'Honda Accord','Honda Civic','Honda CR-V','Honda Pilot','Honda HR-V',
  'Honda Jazz','Honda Fit','Honda Passport',
  'Mercedes-Benz C180','Mercedes-Benz C200','Mercedes-Benz C220',
  'Mercedes-Benz E200','Mercedes-Benz E220','Mercedes-Benz E300',
  'Mercedes-Benz S350','Mercedes-Benz S500','Mercedes-Benz GLC',
  'Mercedes-Benz GLE','Mercedes-Benz GLS','Mercedes-Benz GLK',
  'Mercedes-Benz ML','Mercedes-Benz Vito','Mercedes-Benz Sprinter',
  'BMW 316i','BMW 318i','BMW 320i','BMW 325i','BMW 328i','BMW 330i',
  'BMW 520i','BMW 525i','BMW 528i','BMW 530i','BMW 730i','BMW 740i',
  'BMW X3','BMW X5','BMW X6','BMW X7','BMW M3','BMW M5',
  'Audi A4','Audi A6','Audi A8','Audi Q3','Audi Q5','Audi Q7','Audi Q8',
  'Audi A3','Audi TT','Audi R8',
  'Lexus ES250','Lexus ES300h','Lexus IS250','Lexus IS300',
  'Lexus RX300','Lexus RX350','Lexus GX460','Lexus LX570','Lexus LX600',
  'Lexus NX200','Lexus NX300',
  'Volkswagen Polo','Volkswagen Golf','Volkswagen Passat','Volkswagen Tiguan',
  'Volkswagen Touareg','Volkswagen Jetta','Volkswagen Caddy','Volkswagen Transporter',
  'Skoda Octavia','Skoda Rapid','Skoda Superb','Skoda Kodiaq','Skoda Karoq',
  'Skoda Fabia',
  'Subaru Outback','Subaru Forester','Subaru Impreza','Subaru Legacy',
  'Subaru XV','Subaru Tribeca',
  'Mazda 3','Mazda 6','Mazda CX-5','Mazda CX-9','Mazda CX-30',
  'Mazda 626','Mazda 323',
  'Ford Focus','Ford Mondeo','Ford Explorer','Ford Expedition','Ford Escape',
  'Ford Ranger','Ford F-150','Ford Transit',
  'Chery Tiggo 4','Chery Tiggo 7','Chery Tiggo 8','Chery Arrizo 5',
  'Geely Atlas','Geely Coolray','Geely Tugella','Geely Emgrand',
  'Haval H6','Haval Jolion','Haval F7','Haval H9',
  'JAC S3','JAC S4','JAC S7','JAC T6',
  'BYD Atto 3','BYD Han','BYD Tang','BYD Seal',
  'Great Wall Wingle','Great Wall Hover',
  'Changan CS35','Changan CS55','Changan CS75','Changan Uni-T',
  'Omoda C5','Omoda C9',
  'Lada Vesta','Lada Granta','Lada Largus','Lada Niva','Lada Niva Travel',
  'Lada 2107','Lada 2106','Lada 2114','Lada 2115',
  'UAZ Patriot','UAZ Hunter','UAZ 469','UAZ Буханка',
  'Mercedes-Benz Viano','Kia Bongo','Hyundai H1','Toyota Hiace',
  'Volkswagen Multivan','Ford Transit Custom',
  'Tesla Model 3','Tesla Model Y','Tesla Model S','Tesla Model X',
  'Hyundai Ioniq 5','Kia EV6','BMW iX','BYD Atto 3',
].sort();

const PLATE_API_URL = 'https://api.platerecognizer.com/v1/plate-reader/';
const PLATE_API_KEY = 'd13a7635b6b61d049ab99b073bd24e34818a2353';
const VALYUTA = "so'm";

/* To'lov usuli: naqd yoki karta. Ular o'zaro almashtiriladi (biriga ayni
   vaqtda ikkalasi ham tegmaydi), shuning uchun alohida tugma-patent. */
const TOLOV_USULLARI = { naqd: 'Naqd', karta: 'Karta' };
const FILTRLAR = [
  { id: 'barchasi', nom: 'Barchasi' },
  { id: 'naqd', nom: 'Naqd' },
  { id: 'karta', nom: 'Karta' },
  { id: 'olinmagan', nom: 'Pul olinmadan' },
];
let tolovFiltr = 'barchasi';
let tahrirlanayotganNarx = null;

// Eski mashinalarda tolovUsuli yo'q — ular avtomatik "Naqd" bo'lib ko'rinadi.
function tolovUsuli(a) {
  return TOLOV_USULLARI[a.tolovUsuli] ? a.tolovUsuli : 'naqd';
}

function tolovUsulNomi(a) {
  return TOLOV_USULLARI[tolovUsuli(a)];
}

/* Narx: avval mashinaning o'z narxi (a.narx), yo'q bo'lsa xizmat narxi.
   null = "xizmat narxi bilan birga", demak xizmat narxi o'zgarganda ham
   mashina narxi avtomatik o'zgaradi. */
function xizmatNarxi(xizmatIndex) {
  return (xizmatlar[xizmatIndex] || { narx: 0 }).narx;
}

function mashinaNarxi(a) {
  return a.narx != null ? a.narx : xizmatNarxi(a.xizmatIndex);
}

function formatPlate(raw) {
  const s = (raw || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!s) return '';

  const digits2 = s.slice(0, 2);
  const rest = s.slice(2);
  if (!rest) return digits2;

  // Belgilarni tiplar bo'yicha ajratamiz va hech narsani tashlamaymiz.
  const tokenlar = rest.match(/[A-Z]+|\d+/g) || [];
  if (!tokenlar.length) return [digits2, rest].join(' ');

  const qismlar = [];
  let i = 0;
  if (/^[A-Z]/.test(tokenlar[0])) { qismlar.push(tokenlar[0]); i = 1; }
  if (tokenlar[i]) { qismlar.push(tokenlar[i]); i++; }
  while (i < tokenlar.length) { qismlar.push(tokenlar[i]); i++; }

  return [digits2].concat(qismlar).join(' ');
}

function narxFormat(n) {
  return Number(n).toLocaleString('uz-UZ') + ' ' + VALYUTA;
}

/* Inline SVG ikonkalar — emoji ishlatilmaydi. */
const IKONALAR = {
  quyosh: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4.5"/><path d="M12 1.5v2.5M12 20v2.5M1.5 12H4M20 12h2.5M4.6 4.6l1.8 1.8M17.6 17.6l1.8 1.8M4.6 19.4l1.8-1.8M17.6 6.4l1.8-1.8"/></svg>',
  oy: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>',
  hamyon: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H18a2 2 0 0 1 2 2v1"/><path d="M3 7.5V17a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2"/><path d="M21 10v5h-4a2.5 2.5 0 0 1 0-5z"/></svg>',
  bekor: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M6 6l12 12M18 6L6 18"/></svg>',
  plus: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></svg>',
  naqd: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="2.5"/></svg>',
  karta: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="5" width="20" height="14" rx="2"/><path d="M2 10h20"/></svg>',
  ruyxat: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M8.5 6h12M8.5 12h12M8.5 18h12"/><circle cx="4" cy="6" r="1.2"/><circle cx="4" cy="12" r="1.2"/><circle cx="4" cy="18" r="1.2"/></svg>',
  chek: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="2.5" width="14" height="19" rx="2"/><path d="M9 8h6M9 12h6M9 16h3.5"/></svg>',
  teg: '<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.5 12.5l-8 8-9-9V4h7.5z"/><circle cx="8.5" cy="8.5" r="1.4"/></svg>'
};

function ikon(nomi) {
  return IKONALAR[nomi] || '';
}

function vaqtniFormatlash(vaqt) {
  if (!vaqt) return '';
  const d = new Date(vaqt);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(-2);
  return '\u200E' + dd + '/' + mm + '/' + yy + ' da qo\u0027shilgan';
}

/* ---------- Ma'lumot (localStorage) ---------- */

let xizmatlar = JSON.parse(localStorage.getItem('cw_xizmatlar') || 'null') || [
  { nom: 'Oddiy Yuvish', narx: 15000 },
  { nom: "To'liq Yuvish", narx: 30000 },
  { nom: 'Premium Tozalash', narx: 60000 },
];

let avtomobillar = JSON.parse(localStorage.getItem('cw_avtomobillar') || '[]');
let foiz = parseFloat(localStorage.getItem('cw_foiz')) || 0;

function saqlash() {
  try {
    localStorage.setItem('cw_xizmatlar', JSON.stringify(xizmatlar));
    localStorage.setItem('cw_avtomobillar', JSON.stringify(avtomobillar));
    localStorage.setItem('cw_foiz', String(foiz));
  } catch (e) {
    alert("Saqlash uchun joy yetarli emas. Rasmlar juda katta.\nAvvalgi mashinalarni o'chirib, qayta urinib ko'ring.");
    console.error('Saqlash xatosi:', e);
  }
}

function jamiHisoblash() {
  return avtomobillar.reduce((sum, a) => sum + mashinaNarxi(a), 0);
}

/* Faqat to'lanmagan mashinalar hisobga olinadi — to'lanmagan usul pul
   kassada yoki terminalda yo'q. */
function tolovUsuliBoYicha() {
  const natija = { naqd: { sum: 0, soni: 0 }, karta: { sum: 0, soni: 0 } };
  avtomobillar.forEach(a => {
    if (!a.pulOlingan) return;
    const usul = tolovUsuli(a);
    natija[usul].sum += mashinaNarxi(a);
    natija[usul].soni++;
  });
  return natija;
}

function foizniKorsatish() {
  return Number.isInteger(foiz) ? String(foiz) : String(Math.round(foiz * 100) / 100);
}

function foizniYangilash() {
  const el = $('receipt-foiz');
  if (!el) return;
  if (foiz <= 0) { el.style.display = 'none'; return; }

  const jami = jamiHisoblash();
  const qoldiqFoiz = Math.round((100 - foiz) * 100) / 100;
  $('foiz-label').textContent = foizniKorsatish() + '%';
  $('foiz-sum').textContent = narxFormat(Math.round(jami * foiz) / 100);
  $('qoldiq-label').textContent = qoldiqFoiz + '%';
  $('qoldiq-sum').textContent = narxFormat(Math.round(jami * qoldiqFoiz) / 100);
  el.style.display = 'flex';
}

/* Naqd va karta summalari — kassadagi naqd pulni tekshirish uchun. */
function usulniYangilash() {
  const el = $('receipt-usul');
  if (!el) return;
  const t = tolovUsuliBoYicha();
  if (t.naqd.soni + t.karta.soni === 0) { el.style.display = 'none'; return; }

  $('naqd-label').textContent = 'Naqd (' + t.naqd.soni + ' ta)';
  $('naqd-sum').textContent = narxFormat(t.naqd.sum);
  $('karta-label').textContent = 'Karta (' + t.karta.soni + ' ta)';
  $('karta-sum').textContent = narxFormat(t.karta.sum);
  el.style.display = 'flex';
}

/* ---------- Mavzu ---------- */

function mavzuniQolish(mavzu) {
  document.documentElement.setAttribute('data-theme', mavzu);
  // Alohida saqlanadi: mashina rasmlari kvota to'lganda ham mavzu saqlanib qoladi.
  try { localStorage.setItem('cw_mavzu', mavzu); } catch (e) {}
  const btn = $('theme-toggle');
  if (btn) {
    btn.innerHTML = ikon(mavzu === 'dark' ? 'quyosh' : 'oy');
    btn.classList.toggle('quyosh-ikon', mavzu === 'dark');
  }
}

function mavzuniAlmashtir() {
  const hozirgi = document.documentElement.getAttribute('data-theme');
  mavzuniQolish(hozirgi === 'dark' ? 'light' : 'dark');
}

/* ---------- Chap yon menyu (drawer) ---------- */

function menyuniAlmashtir() {
  const oyna = $('nav-menu');
  const scrim = $('drawer-scrim');
  const burger = $('burger');
  if (!oyna || !burger) return;
  const ochiq = oyna.classList.toggle('open');
  if (scrim) scrim.classList.toggle('show', ochiq);
  burger.classList.toggle('open', ochiq);
  burger.setAttribute('aria-expanded', ochiq ? 'true' : 'false');
  burger.setAttribute('aria-label', ochiq ? 'Menyuni yopish' : 'Menyuni ochish');
  oyna.setAttribute('aria-hidden', ochiq ? 'false' : 'true');
  document.body.classList.toggle('drawer-open', ochiq);
}

function menyuniYopish() {
  const oyna = $('nav-menu');
  const scrim = $('drawer-scrim');
  const burger = $('burger');
  if (!oyna || !burger) return;
  oyna.classList.remove('open');
  if (scrim) scrim.classList.remove('show');
  burger.classList.remove('open');
  burger.setAttribute('aria-expanded', 'false');
  burger.setAttribute('aria-label', 'Menyuni ochish');
  oyna.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('drawer-open');
}

document.addEventListener('click', e => {
  const oyna = $('nav-menu');
  if (!oyna || !oyna.classList.contains('open')) return;
  if (e.target.closest('.drawer') || e.target.closest('#burger')) return;
  menyuniYopish();
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') menyuniYopish();
});

/* ---------- Xizmatlar ---------- */

/* Qo'shish sahifasidagi katta xizmat kartalari. tanlanganXizmat — joriy
   tanlov indeksi; xizmat o'chirilganda xavfsiz qiymatga tushadi. */
let tanlanganXizmat = 0;

function xizmatKartalariniYangilash() {
  const box = $('service-cards');
  if (!box) return;
  if (tanlanganXizmat >= xizmatlar.length) tanlanganXizmat = 0;
  if (!xizmatlar.length) {
    box.innerHTML = "<p class='service-empty'>Avval Xizmatlar sahifasida narx qo'shing.</p>";
    return;
  }
  box.innerHTML = xizmatlar.map((x, i) => {
    const on = tanlanganXizmat === i;
    return `<button type="button" role="radio" aria-checked="${on}"
      class="service-card ${on ? 'on' : ''}" onclick="xizmatTanlash(${i})">
      <span class="service-card-nom">${x.nom || 'Nomsiz xizmat'}</span>
      <span class="service-card-narx">${narxFormat(x.narx)}</span>
    </button>`;
  }).join('');
}

function xizmatTanlash(i) {
  if (!xizmatlar[i]) return;
  tanlanganXizmat = i;
  xizmatKartalariniYangilash();
}

function xizmatlarKorsatish() {
  const list = $('price-list');
  if (!list) return;
  list.innerHTML = '';
  xizmatlar.forEach((x, i) => {
    const row = document.createElement('div');
    row.className = 'price-row';
    row.innerHTML = `
      <input type="text" placeholder="Xizmat nomi" value="${x.nom}"
        oninput="xizmatlar[${i}].nom = this.value; saqlash(); xizmatKartalariniYangilash()" />
      <input type="number" placeholder="Narx" value="${x.narx}" min="0"
        inputmode="numeric"
        oninput="xizmatlar[${i}].narx = parseFloat(this.value)||0; saqlash(); xizmatKartalariniYangilash()" />
      <button class="remove-btn" aria-label="Xizmatni o'chirish" onclick="xizmatOchirish(${i})">${ikon('bekor')}</button>
    `;
    list.appendChild(row);
  });
  xizmatKartalariniYangilash();
}

function xizmatQoshish() {
  xizmatlar.push({ nom: '', narx: 0 });
  saqlash();
  xizmatlarKorsatish();
}

// Xizmat o'chirilganda mashinalardagi indekslar ham siljiydi.
function xizmatOchirish(i) {
  xizmatlar.splice(i, 1);
  avtomobillar.forEach(a => {
    if (a.xizmatIndex > i) a.xizmatIndex--;
    else if (a.xizmatIndex === i) a.xizmatIndex = 0;
  });
  if (tanlanganXizmat >= xizmatlar.length) tanlanganXizmat = 0;
  saqlash();
  xizmatlarKorsatish();
  avtomobillarKorsatish();
}

/* ---------- Rasm va raqamni aniqlash ---------- */

let stream = null;
let tanlanganRasm = '';
let aniqlanganRaqam = '';
let aniqlanganEgasi = '';

function startCamera() {
  const video = $('cam-preview');
  if (!video) return;
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert("Kamera brauzerda qo'llab-quvvatlanmaydi. HTTPS yoki localhost dan foydalaning.");
    return;
  }
  navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    .then(s => {
      stream = s;
      video.srcObject = s;
      video.style.display = 'block';
    })
    .catch(err => alert('Kamera ochilmadi: ' + err.message));
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
  }
  const video = $('cam-preview');
  if (video) {
    video.srcObject = null;
    video.style.display = 'none';
  }
}

function takePhoto() {
  const video = $('cam-preview');
  const canvas = $('cam-canvas');
  if (!video || !canvas || !stream || !video.videoWidth) {
    alert('Avval kamerani yoqing.');
    return;
  }
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  canvas.getContext('2d').drawImage(video, 0, 0);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
  stopCamera();
  rasmniKorsatish(dataUrl);
  raqamniAniqlash(dataUrl);
}

function rasmniKorsatish(dataUrl) {
  tanlanganRasm = dataUrl;
  const img = $('photo-preview');
  if (img) {
    img.src = dataUrl;
    img.style.display = 'block';
  }
}

function dataUrlniBlobga(dataUrl) {
  const parts = dataUrl.split(',');
  const body = parts[1] || '';
  const head = parts[0] || '';
  const mime = (head.match(/:(.*?);/) || [null, 'image/jpeg'])[1];
  const bin = atob(body);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

function engYaxshiNatijaniTanla(data) {
  const results = data && Array.isArray(data.results) ? data.results : [];
  const toliq = results.filter(r => r && r.plate && r.plate.replace(/[^A-Z0-9]/gi, '').length >= 7);
  const saralgan = (toliq.length ? toliq : results.filter(r => r && r.plate))
    .slice()
    .sort((a, b) => (b.score || 0) - (a.score || 0));
  return saralgan[0] || null;
}

function rasmlarniKichiklashtirish(dataUrl, maxTomon) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => {
      const w = img.naturalWidth, h = img.naturalHeight;
      const scale = Math.min(1, maxTomon / Math.max(w, h));
      if (scale >= 1 && (dataUrl.length / 1024) < 900) { resolve(dataUrl); return; }
      const canvas = document.createElement('canvas');
      canvas.width = Math.round(w * scale);
      canvas.height = Math.round(h * scale);
      canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL('image/jpeg', 0.9));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

function raqamniAniqlash(dataUrl) {
  const out = $('ocr-result');
  if (!out) return;
  out.textContent = 'Raqam aniqlanmoqda...';

  rasmlarniKichiklashtirish(dataUrl, 1600)
    .then(kichik => {
      const form = new FormData();
      form.append('upload', dataUrlniBlobga(kichik), 'photo.jpg');
      return fetch(PLATE_API_URL, {
        method: 'POST',
        headers: { 'Authorization': 'Token ' + PLATE_API_KEY },
        body: form
      });
    })
    .then(async r => {
      const text = await r.text();
      let data;
      try { data = JSON.parse(text); } catch (e) { data = null; }
      if (!r.ok) {
        const msg = (data && (data.error || data.detail || data.message)) || text.slice(0, 200) || r.status;
        throw new Error(r.status + ' — ' + msg);
      }
      return data;
    })
    .then(data => {
      const natija = engYaxshiNatijaniTanla(data);
      aniqlanganRaqam = natija ? formatPlate(natija.plate) : '';
      aniqlanganEgasi = (data && data.owner) || '';

      const xom = data && data.results
        ? data.results.map(r => r.plate + '(' + Math.round((r.score || 0) * 100) + '%)').join(', ')
        : '';

      out.textContent = aniqlanganRaqam
        ? 'Aniqlangan raqam: ' + aniqlanganRaqam
        : 'Raqam topilmadi.';
      out.textContent += xom ? '  |  API: ' + xom : '';
      console.log('Plate API javobi:', data);
    })
    .catch(err => {
      aniqlanganRaqam = '';
      out.textContent = 'Xatolik: ' + err.message;
      console.error('Plate API:', err);
    });
}

/* ---------- Avtomobillar ---------- */

function avtomobilQoshish() {
  const modelEl = $('model');
  if (!modelEl) return;

  const model = modelEl.value.trim();
  const xi = tanlanganXizmat;

  if (!model) { alert('Iltimos, avtomobil modelini kiriting.'); return; }
  if (!xizmatlar[xi]) { alert("Iltimos, kamida bitta xizmat qo'shing."); return; }

  // Rasm bo'lmasa — raqamni qo'lda kiritish modali ochiladi.
  if (!tanlanganRasm) { raqamModalOchish(); return; }

  const kichik = tanlanganRasm
    ? rasmlarniKichiklashtirish(tanlanganRasm, 900)
    : Promise.resolve('');
  kichik.then(img => mashinaYozish(model, xi, img || ''));
}

function mashinaYozish(model, xi, img) {
  avtomobillar.push({
    egasi: aniqlanganEgasi || '',
    raqam: aniqlanganRaqam || 'Aniqlanmagan',
    model,
    xizmatIndex: xi,
    vaqt: new Date().toISOString(),
    img: img || ''
  });
  saqlash();
  avtomobillarKorsatish();

  const modelEl = $('model');
  if (modelEl) modelEl.value = '';
  const upload = $('upload-img');
  if (upload) upload.value = '';
  const fileName = $('file-name');
  if (fileName) fileName.textContent = '';
  const prev = $('photo-preview');
  if (prev) prev.style.display = 'none';
  const ocr = $('ocr-result');
  if (ocr) ocr.textContent = '';
  tanlanganRasm = '';
  aniqlanganRaqam = '';
  aniqlanganEgasi = '';
}

/* ---------- Raqam kiritish modali ---------- */

function raqamModalOchish() {
  const scrim = $('raqam-scrim');
  if (!scrim) return;
  const input = $('raqam-input');
  if (input) input.value = '';
  const err = $('raqam-error');
  if (err) err.textContent = '';
  scrim.classList.add('open');
  document.body.classList.add('drawer-open');
  if (input) input.focus();
}

function raqamModalYopish() {
  const scrim = $('raqam-scrim');
  if (scrim) scrim.classList.remove('open');
  document.body.classList.remove('drawer-open');
}

// Yozayotganda avtomatik formatlaydi: 01A123AA → 01 A 123 AA, 01123AAA → 01 123 AAA.
// Kursor o'rni saqlanadi, maksimal 8 belgi (ikkala UZ formati ham 8).
function raqamKiritishFormatlash(el) {
  if (!el) return;
  const pos = el.selectionStart || 0;
  const oldAlpha = (el.value.slice(0, pos).match(/[A-Za-z0-9]/g) || []).length;
  const raw = (el.value.toUpperCase().match(/[A-Z0-9]/g) || []).join('').slice(0, 8);
  const fmt = formatPlate(raw);
  el.value = fmt;
  let newPos = fmt.length;
  if (oldAlpha === 0) { newPos = 0; }
  else {
    let seen = 0;
    for (let k = 0; k < fmt.length; k++) {
      if (/[A-Z0-9]/.test(fmt[k]) && ++seen === oldAlpha) { newPos = k + 1; break; }
    }
  }
  try { el.setSelectionRange(newPos, newPos); } catch (e) {}
}

function raqamBilanQoshish() {
  const input = $('raqam-input');
  const err = $('raqam-error');
  const raw = (((input && input.value) || '').toUpperCase().match(/[A-Z0-9]/g) || []).join('');
  if (!/^\d{2}[A-Z0-9]{6}$/.test(raw)) {
    if (err) err.textContent = "Raqam to'liq emas. Masalan: 01 A 123 AA";
    if (input) input.focus();
    return;
  }
  aniqlanganRaqam = formatPlate(raw);
  raqamModalYopish();
  const modelEl = $('model');
  if (!modelEl) return;
  mashinaYozish(modelEl.value.trim(), tanlanganXizmat, '');
}

function avtomobilOchirish(i) {
  avtomobillar.splice(i, 1);
  saqlash();
  avtomobillarKorsatish();
}

function avtomobillarKorsatish() {
  const el = $('car-list');
  if (!el) return;
  filtrlarniKorsatish();

  const qatorlar = filtrgaMos();
  const jami = $('filter-total');

  if (!qatorlar.length) {
    el.innerHTML = `<p class='empty-state'>${avtomobillar.length ? "Bu filtrga mos avtomobil yo'q." : "Hali avtomobil qo'shilmagan."}</p>`;
    if (jami) jami.textContent = '';
    return;
  }

  el.innerHTML = qatorlar.map(({ a, i }) => {
    const x = xizmatlar[a.xizmatIndex] || { nom: "Noma'lum", narx: 0 };
    return `
      <div class="car-item">
        <div class="car-info">
          <div class="plate">${a.raqam}</div>
          <div class="details">${a.egasi ? a.egasi + ' &middot; ' : ''}${a.model} &nbsp;<span class="tag">${x.nom}</span> &nbsp;<span style="font-size:0.7rem;color:var(--muted)">${vaqtniFormatlash(a.vaqt)}</span></div>
          ${a.img ? `<img src="${a.img}" alt="${a.raqam} rasmi" />` : ''}
          <div class="pay-row">
            <button type="button" class="pay-chip small ${a.pulOlingan ? 'paid' : ''}" onclick="pulHolatiniAlmashtir(${i})">${ikon('hamyon')} ${a.pulOlingan ? 'Pul olingan' : 'Pul olinmadi'}</button>
            ${a.pulOlingan ? methodSwitchHtml(i, a) : ''}
          </div>
        </div>
        <div class="car-right">
          ${narxHujjasi(i, a)}
          <button class="car-remove" aria-label="Avtomobilni o'chirish" onclick="avtomobilOchirish(${i})">${ikon('bekor')}</button>
        </div>
      </div>
    `;
  }).join('');

  if (jami) {
    const summa = qatorlar.reduce((s, { a }) => s + mashinaNarxi(a), 0);
    jami.textContent = qatorlar.length + ' ta avtomobil · Jami ' + narxFormat(summa);
  }
}

/* Narxga bosilganda maydon ochiladi. Bo'sh qoldirilsa yoki bekor qilinsa
   mashina yana xizmat narxiga qaytadi. */
function narxHujjasi(i, a) {
  if (tahrirlanayotganNarx === i) {
    return `<span class="narx-edit">
      <input type="number" id="narx-input" class="narx-input" min="0" step="100" inputmode="numeric"
        value="${mashinaNarxi(a)}" aria-label="Narxni tahrirlash"
        onkeydown="if(event.key==='Enter'){narxniSaqlash(${i},this.value);}else if(event.key==='Escape'){narxniBekorQilish();}"
        onblur="narxniSaqlash(${i},this.value)" />
      <button type="button" class="narx-cancel" aria-label="Narxni tahrirlashdan chiqish" onclick="narxniBekorQilish()">${ikon('bekor')}</button>
    </span>`;
  }

  const maxsus = a.narx != null;
  const sarlavha = maxsus
    ? `O'zgartirilgan narx. Xizmat narxi: ${narxFormat(xizmatNarxi(a.xizmatIndex))}. Bosib qayta tiklang yoki bo'sh qoldiring.`
    : "Bosib narxni o'zgartiring";
  return `<button type="button" class="car-price ${maxsus ? 'maxsus' : ''}" onclick="narxniTahrirlash(${i})"
    title="${sarlavha}">${narxFormat(mashinaNarxi(a))}</button>`;
}

function narxniTahrirlash(i) {
  if (!avtomobillar[i]) return;
  tahrirlanayotganNarx = i;
  avtomobillarKorsatish();
  const el = $('narx-input');
  if (el) { el.focus(); el.select(); }
}

function narxniBekorQilish() {
  if (tahrirlanayotganNarx === null) return;
  tahrirlanayotganNarx = null;
  avtomobillarKorsatish();
}

function narxniSaqlash(i, qiymat) {
  if (tahrirlanayotganNarx !== i) return;
  const a = avtomobillar[i];
  if (a) {
    const n = parseFloat(qiymat);
    a.narx = isNaN(n) || n < 0 ? null : Math.round(n * 100) / 100;
  }
  tahrirlanayotganNarx = null;
  saqlash();
  avtomobillarKorsatish();
}

/* Stepper tugmalari (±1000): har bosishda darhol saqlanadi, tahrir rejimi
   ochiq qoladi — qo'lqop bilan klaviaturasiz narxni to'g'rilash uchun. */
/* Filtr qatorlari asl indeksni saqlaydi — onclick uchun kerak. */
function filtrgaMos() {
  return avtomobillar.map((a, i) => ({ a, i })).filter(({ a }) => {
    if (tolovFiltr === 'barchasi') return true;
    if (tolovFiltr === 'olinmagan') return !a.pulOlingan;
    return a.pulOlingan && tolovUsuli(a) === tolovFiltr;
  });
}

function filtrlarniKorsatish() {
  const el = $('filter-chips');
  if (!el) return;
  el.innerHTML = FILTRLAR.map(f => {
    const on = tolovFiltr === f.id;
    return `<button type="button" class="filter-chip ${on ? 'on' : ''}" aria-pressed="${on}"
      onclick="filtrniAlmashtir('${f.id}')">${f.nom}</button>`;
  }).join('');
}

function filtrniAlmashtir(id) {
  if (!FILTRLAR.some(f => f.id === id)) return;
  tolovFiltr = id;
  avtomobillarKorsatish();
}

function pulHolatiniAlmashtir(i) {
  const a = avtomobillar[i];
  if (!a) return;
  a.pulOlingan = !a.pulOlingan;
  saqlash();
  avtomobillarKorsatish();
}

function methodSwitchHtml(i, a) {
  const joriy = tolovUsuli(a);
  return `<span class="method-switch">
    <button type="button" class="method-btn ${joriy === 'naqd' ? 'on' : ''}" aria-pressed="${joriy === 'naqd'}"
      onclick="tolovUsuliniAlmashtir(${i},'naqd')">${ikon('naqd')} Naqd</button>
    <button type="button" class="method-btn ${joriy === 'karta' ? 'on' : ''}" aria-pressed="${joriy === 'karta'}"
      onclick="tolovUsuliniAlmashtir(${i},'karta')">${ikon('karta')} Karta</button>
  </span>`;
}

function tolovUsuliniAlmashtir(i, usul) {
  const a = avtomobillar[i];
  if (!a || !TOLOV_USULLARI[usul]) return;
  if (tolovUsuli(a) === usul) return;
  a.tolovUsuli = usul;
  saqlash();
  avtomobillarKorsatish();
}

/* ---------- Hisob ---------- */

function hisobYaratish() {
  const rows = $('receipt-rows');
  if (!rows) return;

  if (!avtomobillar.length) {
    rows.innerHTML = "<p class='empty-state'>Hali avtomobil qo'shilmagan.</p>";
    $('receipt-total').textContent = narxFormat(0);
    foizniYangilash();
    usulniYangilash();
    return;
  }

  const jami = jamiHisoblash();
  rows.innerHTML = avtomobillar.map(a => {
    const x = xizmatlar[a.xizmatIndex] || { nom: "Noma'lum", narx: 0 };
    return `
      <div class="receipt-row">
        <span>
          <strong>${a.raqam}</strong>${a.egasi ? ' (' + a.egasi + ')' : ''} — ${a.model}
          <span class="tag">${x.nom}</span><br>
          <span style="font-size:0.72rem;color:var(--muted)">${vaqtniFormatlash(a.vaqt)}</span>
          ${a.img ? `<img src="${a.img}" alt="${a.raqam} rasmi" />` : ''}
          <span class="pay-label ${a.pulOlingan ? 'paid' : ''}">${ikon('hamyon')} ${a.pulOlingan ? 'Pul olingan · ' + tolovUsulNomi(a) : 'Pul olinmadi'}</span>
        </span>
        <span>${narxFormat(mashinaNarxi(a))}</span>
      </div>
    `;
  }).join('');

  $('receipt-total').textContent = narxFormat(jami);
  foizniYangilash();
  usulniYangilash();

  const hozir = new Date();
  const receiptDate = hozir.toLocaleDateString('uz-UZ', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const receiptTime = hozir.toLocaleTimeString('uz-UZ', {
    hour: '2-digit', minute: '2-digit'
  });
  $('receipt-date').textContent = receiptDate + ' — ' + receiptTime + ' da';
}

/* ---------- Sahifaga xos ishga tushirish ---------- */

function sahifaniTayyorla() {
  // Service worker (PWA offline) — faqat https yoki localhost da.
  if ('serviceWorker' in navigator &&
      (location.protocol === 'https:' || location.hostname === 'localhost' || location.hostname === '127.0.0.1')) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('sw.js').catch(err => console.warn('SW:', err));
    });
  }

  // Mavzu tugmasi holatini mavzuga moslab qo'yamiz
  const themeBtn = $('theme-toggle');
  if (themeBtn) {
    themeBtn.innerHTML = ikon(document.documentElement.getAttribute('data-theme') === 'dark' ? 'quyosh' : 'oy');
    themeBtn.classList.toggle('quyosh-ikon', document.documentElement.getAttribute('data-theme') === 'dark');
  }

  // "Xizmat qo'shish" tugmasi ikonkasi
  const iconSlot = document.querySelector('.icon-slot');
  if (iconSlot) iconSlot.innerHTML = ikon('plus');

  // Chap menyudagi havolalar ikonkalari (data-ikon atributi orqali)
  document.querySelectorAll('[data-ikon]').forEach(el => {
    el.insertAdjacentHTML('afterbegin', ikon(el.getAttribute('data-ikon')));
  });

  // Model ro'yxati
  const dl = $('car-models-list');
  if (dl) {
    AVTOMOBIL_MODELLARI.forEach(m => {
      const opt = document.createElement('option');
      opt.value = m;
      dl.appendChild(opt);
    });
  }

  // Xizmatlar ro'yxati
  const narxList = $('price-list');
  if (narxList) xizmatlarKorsatish();
  xizmatKartalariniYangilash();

  // Foiz maydoni
  const foizInput = $('foiz-input');
  if (foizInput) {
    foizInput.value = foiz || '';
    foizInput.addEventListener('input', function () {
      foiz = Math.min(100, Math.max(0, parseFloat(this.value) || 0));
      saqlash();
      foizniYangilash();
    });
  }

  // Fayl tanlash
  const upload = $('upload-img');
  if (upload) {
    upload.addEventListener('change', e => {
      const file = e.target.files[0];
      if (!file) return;
      const nameEl = $('file-name');
      if (nameEl) nameEl.textContent = 'Tanlangan: ' + file.name;
      const reader = new FileReader();
      reader.onload = evt => {
        rasmniKorsatish(evt.target.result);
        raqamniAniqlash(evt.target.result);
      };
      reader.readAsDataURL(file);
    });
  }

  // Mashinalar ro'yxati
  if ($('car-list')) avtomobillarKorsatish();

  // Hisob sahifasi
  if ($('receipt-rows')) hisobYaratish();
}

sahifaniTayyorla();
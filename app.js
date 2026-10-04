function updateDateTime() {
  const now = new Date();
  const dateStr = now.toLocaleDateString('uz-UZ', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const timeStr = now.toLocaleTimeString('uz-UZ', {
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  });
  document.getElementById('date-time-display').textContent = `${dateStr} — ${timeStr}`;
}

updateDateTime();
setInterval(updateDateTime, 1000);

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

const dl = document.getElementById('car-models-list');
AVTOMOBIL_MODELLARI.forEach(m => {
  const opt = document.createElement('option');
  opt.value = m;
  dl.appendChild(opt);
});

const VALYUTA = "so'm";

function narxFormat(n) {
  return Number(n).toLocaleString('uz-UZ') + ' ' + VALYUTA;
}

function vaqtniFormatlash(vaqt) {
  if (!vaqt) return '';
  const d = new Date(vaqt);
  const dd = String(d.getDate()).padStart(2, '0');
  const mm = String(d.getMonth() + 1).padStart(2, '0');
  const yy = String(d.getFullYear()).slice(-2);
  return '\u200E' + dd + '/' + mm + '/' + yy + ' da qo\u0027shilgan';
}

let xizmatlar = JSON.parse(localStorage.getItem('cw_xizmatlar') || 'null') || [
  { nom: 'Oddiy Yuvish', narx: 15000 },
  { nom: "To'liq Yuvish", narx: 30000 },
  { nom: 'Premium Tozalash', narx: 60000 },
];

let avtomobillar = JSON.parse(localStorage.getItem('cw_avtomobillar') || '[]');
let foiz = parseFloat(localStorage.getItem('cw_foiz')) || 0;

function saqlash() {
  localStorage.setItem('cw_xizmatlar', JSON.stringify(xizmatlar));
  localStorage.setItem('cw_avtomobillar', JSON.stringify(avtomobillar));
  localStorage.setItem('cw_foiz', String(foiz));
}

function jamiHisoblash() {
  return avtomobillar.reduce((sum, a) => {
    const x = xizmatlar[a.xizmatIndex] || { narx: 0 };
    return sum + x.narx;
  }, 0);
}

function foizniKorsatish() {
  return Number.isInteger(foiz) ? String(foiz) : String(Math.round(foiz * 100) / 100);
}

const foizInput = document.getElementById('foiz-input');
foizInput.value = foiz || '';
foizInput.addEventListener('input', function () {
  foiz = Math.min(100, Math.max(0, parseFloat(this.value) || 0));
  saqlash();
  foizniYangilash();
});

function foizniYangilash() {
  const jami = jamiHisoblash();
  const el = document.getElementById('receipt-foiz');
  if (!el) return;

  if (foiz <= 0) {
    el.style.display = 'none';
    return;
  }

  const qoldiqFoiz = Math.round((100 - foiz) * 100) / 100;
  document.getElementById('foiz-label').textContent = foizniKorsatish() + '%';
  document.getElementById('foiz-sum').textContent = narxFormat(Math.round(jami * foiz) / 100);
  document.getElementById('qoldiq-label').textContent = qoldiqFoiz + '%';
  document.getElementById('qoldiq-sum').textContent = narxFormat(Math.round(jami * qoldiqFoiz) / 100);
  el.style.display = 'flex';
}

function xizmatlarKorsatish() {
  const list = document.getElementById('price-list');
  list.innerHTML = '';
  xizmatlar.forEach((x, i) => {
    const row = document.createElement('div');
    row.className = 'price-row';
    row.innerHTML = `
      <input type="text" placeholder="Xizmat nomi" value="${x.nom}"
        oninput="xizmatlar[${i}].nom = this.value; saqlash(); selectYangilash()" />
      <input type="number" placeholder="Narx" value="${x.narx}" min="0"
        inputmode="numeric"
        oninput="xizmatlar[${i}].narx = parseFloat(this.value)||0; saqlash(); selectYangilash()" />
      <button class="remove-btn" onclick="xizmatOchirish(${i})">✕</button>
    `;
    list.appendChild(row);
  });
  selectYangilash();
}

function xizmatQoshish() {
  xizmatlar.push({ nom: '', narx: 0 });
  saqlash();
  xizmatlarKorsatish();
}

function xizmatOchirish(i) {
  xizmatlar.splice(i, 1);
  saqlash();
  xizmatlarKorsatish();
  avtomobillarKorsatish();
}

function selectYangilash() {
  const sel = document.getElementById('service-select');
  const oldingi = sel.value;
  sel.innerHTML = xizmatlar.map((x, i) =>
    `<option value="${i}">${x.nom} — ${narxFormat(x.narx)}</option>`
  ).join('');
  if (oldingi) sel.value = oldingi;
}

/* ---------- Rasm va raqamni aniqlash ---------- */

let stream = null;
let tanlanganRasm = '';
let aniqlanganRaqam = '';
let aniqlanganEgasi = '';

function startCamera() {
  const video = document.getElementById('cam-preview');
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
    .catch(err => {
      alert('Kamera ochilmadi: ' + err.message);
    });
}

function stopCamera() {
  if (stream) {
    stream.getTracks().forEach(t => t.stop());
    stream = null;
  }
  const video = document.getElementById('cam-preview');
  if (video) {
    video.srcObject = null;
    video.style.display = 'none';
  }
}

function takePhoto() {
  const video = document.getElementById('cam-preview');
  if (!stream || !video.videoWidth) {
    alert('Avval kamerani yoqing.');
    return;
  }
  const canvas = document.getElementById('cam-canvas');
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
  const img = document.getElementById('photo-preview');
  img.src = dataUrl;
  img.style.display = 'block';
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
  const out = document.getElementById('ocr-result');
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

      if (aniqlanganRaqam) {
        out.textContent = 'Aniqlangan raqam: ' + aniqlanganRaqam;
      } else {
        out.textContent = 'Raqam topilmadi.';
      }
      out.textContent += xom ? '  |  API: ' + xom : '';
      console.log('Plate API javobi:', data);
    })
    .catch(err => {
      aniqlanganRaqam = '';
      out.textContent = 'Xatolik: ' + err.message;
      console.error('Plate API:', err);
    });
}

document.getElementById('upload-img').addEventListener('change', e => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = evt => {
    rasmniKorsatish(evt.target.result);
    raqamniAniqlash(evt.target.result);
  };
  reader.readAsDataURL(file);
});

/* ---------- Avtomobillar ---------- */

function avtomobilQoshish() {
  const model = document.getElementById('model').value.trim();
  const xi = parseInt(document.getElementById('service-select').value);

  if (!model) { alert('Iltimos, avtomobil modelini kiriting.'); return; }
  if (isNaN(xi)) { alert("Iltimos, kamida bitta xizmat qo'shing."); return; }

  avtomobillar.push({
    egasi: aniqlanganEgasi || '',
    raqam: aniqlanganRaqam || 'Aniqlanmagan',
    model,
    xizmatIndex: xi,
    vaqt: new Date().toISOString(),
    img: tanlanganRasm || ''
  });
  saqlash();
  avtomobillarKorsatish();

  document.getElementById('model').value = '';
  document.getElementById('upload-img').value = '';
  document.getElementById('photo-preview').style.display = 'none';
  document.getElementById('ocr-result').textContent = '';
  tanlanganRasm = '';
  aniqlanganRaqam = '';
  aniqlanganEgasi = '';
}

function avtomobilOchirish(i) {
  avtomobillar.splice(i, 1);
  saqlash();
  avtomobillarKorsatish();
}

function avtomobillarKorsatish() {
  const el = document.getElementById('car-list');
  if (!avtomobillar.length) {
    el.innerHTML = "<p class='empty-state'>Hali avtomobil qo'shilmagan.</p>";
    return;
  }
  el.innerHTML = avtomobillar.map((a, i) => {
    const x = xizmatlar[a.xizmatIndex] || { nom: "Noma'lum", narx: 0 };
    return `
      <div class="car-item">
        <div class="car-info">
          <div class="plate">${a.raqam}</div>
          <div class="details">${a.egasi ? a.egasi + ' &middot; ' : ''}${a.model} &nbsp;<span class="tag">${x.nom}</span> &nbsp;<span style="font-size:0.7rem;color:var(--muted)">${vaqtniFormatlash(a.vaqt)}</span></div>
          ${a.img ? `<img src="${a.img}" alt="${a.raqam} rasmi" />` : ''}
        </div>
        <div class="car-right">
          <span class="car-price">${narxFormat(x.narx)}</span>
          <button class="car-remove" onclick="avtomobilOchirish(${i})">✕</button>
        </div>
      </div>
    `;
  }).join('');
}

/* ---------- Hisob ---------- */

function hisobYaratish() {
  if (!avtomobillar.length) { alert("Hali avtomobil qo'shilmagan."); return; }

  const rows = document.getElementById('receipt-rows');
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
        </span>
        <span>${narxFormat(x.narx)}</span>
      </div>
    `;
  }).join('');

  document.getElementById('receipt-total').textContent = narxFormat(jami);
  foizniYangilash();
  const hozir = new Date();
  const receiptDate = hozir.toLocaleDateString('uz-UZ', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  const receiptTime = hozir.toLocaleTimeString('uz-UZ', {
    hour: '2-digit', minute: '2-digit'
  });
  document.getElementById('receipt-date').textContent = receiptDate + ' — ' + receiptTime + ' da';

  document.getElementById('receipt').style.display = 'block';
  document.getElementById('receipt').scrollIntoView({ behavior: 'smooth' });
}

function hisobYopish() {
  document.getElementById('receipt').style.display = 'none';
}

xizmatlarKorsatish();
avtomobillarKorsatish();
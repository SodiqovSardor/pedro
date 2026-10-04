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

const PLATE_API_KEY = "YOUR_PLATE_RECOGNIZER_KEY";

function formatPlate(raw) {
  const s = raw.replace(/[^A-Z0-9]/g, '').toUpperCase();
  if (!s) return '';

  const digits2 = s.slice(0, 2);
  const rest = s.slice(2);

  if (!rest) return digits2;

  if (/[A-Z]/.test(rest[0])) {
    let out = digits2;
    const letter1 = rest.slice(0, 1);
    const nums    = rest.slice(1, 4);
    const letter2 = rest.slice(4, 6);
    if (letter1) out += ' ' + letter1;
    if (nums)    out += ' ' + nums;
    if (letter2) out += ' ' + letter2;
    return out;
  } else {
    let out = digits2;
    const nums    = rest.slice(0, 3);
    const letters = rest.slice(3, 6);
    if (nums)    out += ' ' + nums;
    if (letters) out += ' ' + letters;
    return out;
  }
}


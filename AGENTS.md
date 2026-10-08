# AGENTS.md — Avto Yuvish (Car Wash Tracker)

Static multi-page web app for car-wash workers. No build system, no package manager, no server. Open `index.html` (redirects to `qoshish.html`) directly in browser.

## Commands
- No build/test/deploy commands exist. Edit HTML/CSS/JS, reload browser.
- JS syntax: `node --check app.js`. CSS: brace-balance check.
- jsdom harnesses live in /tmp (not in repo): payment switches, per-car price override, drawer/service-cards, rendered contrast both themes.
- Print receipt: open `hisob.html` → `window.print()`; `.no-print` hidden via `@media print`.

## Architecture
- `index.html` — redirect only (→ `qoshish.html`, the worker landing page)
- `qoshish.html` — add car: model + photo/camera + OCR plate + big service cards + sticky CTA
- `bugungi.html` — today's list: filter chips, paid toggle, Naqd/Karta switch, inline price edit
- `hisob.html` — printable receipt: rows, total, commission split, Naqd/Karta subtotals
- `xizmatlar.html` — service/price editor + commission % (`foiz-input`)
- `app.js` — all logic; every page loads it, each section guarded by element presence (`if ($(...)` / early return)
- `styles.css` — Qum theme tokens (`--bg`, `--surface`, `--surface-2`, `--border`, `--accent`, `--accent-strong`, `--accent-text`, `--accent-light`, `--accent-hover`, `--text`, `--muted`, `--danger`, …), drawer, worker-scale components, print styles

## Navigation
- Left slide-in drawer (`#nav-menu` + `#drawer-scrim`), markup duplicated in all 5 pages. Order: Qo'shish, Bugungi, Hisob, Xizmatlar. Icons injected via `data-ikon` in `sahifaniTayyorla()`.
- `menyuniAlmashtir()` / `menyuniYopish()` toggle drawer + scrim + `body.drawer-open` (scroll lock). Outside-click (not in `.drawer`/`#burger`) and Escape close it.

## Key Patterns / Gotchas
- All state in memory arrays persisted to `localStorage`: `cw_xizmatlar`, `cw_avtomobillar`, `cw_foiz`, `cw_mavzu`.
- Uzbek locale (`uz-UZ`) everywhere: dates, numbers, currency (`so'm`), plate formatting.
- Car: `{egasi, raqam, model, xizmatIndex, vaqt, img, pulOlingan, tolovUsuli, narx}`. `tolovUsuli` = `'naqd'|'karta'` (legacy → `'naqd'` via `tolovUsuli(a)` getter). `narx` = per-car override; `null`/absent = follows service price (`mashinaNarxi(a)` is the single price source for list, filter total, receipt, commission, method subtotals).
- Service selection on Qo'shish is big radio cards (`#service-cards`, `tanlanganXizmat`), NOT a `<select>`. `xizmatKartalariniYangilash()` re-renders them; called from service edits and init. `xizmatOchirish()` clamps `tanlanganXizmat` and remaps car indices (deleted service → index 0).
- `avtomobilQoshish()` skips image shrink when no photo (`Promise.resolve('')`); shrink is async so the button needs no double-tap guard yet — known gap.
- No photo → plate modal (`#raqam-scrim`): manual entry, live-formatted by `raqamKiritishFormatlash()` reusing `formatPlate()` (both UZ shapes, cap 8 alphanumerics, cursor preserved). Confirm requires `^\d{2}[A-Z0-9]{6}$`, else inline error. Photo path skips the modal. Shared writer: `mashinaYozish(model, xi, img)`.
- Filter chips keep ORIGINAL indices (`filtrgaMos()` returns `{a, i}` pairs) so `onclick` handlers hit the right car.
- Receipt rows show read-only `Pul olingan · Naqd` text so method prints in PDF; switches stay interactive only in the car list.
- Incomplete test-harness note: jsdom never settles `new Image()` load/error (no canvas pkg) — photo path can't be covered headlessly.
- No framework; pure DOM + `innerHTML` templates + inline `onclick`. User strings are interpolated unescaped (known XSS/robustness gap, local-only).
- `formatPlate()` handles `01 A 123 AA` and `01 123 AAA` shapes. Plate API key is hardcoded in `app.js` (`PLATE_API_KEY`) — known leak, needs proxy + rotation.
- `bugungi.html` shows ALL cars (no date filter); `vaqt` stored but unused for filtering. No clear-history action.

## Data Flow
`xizmatTanlash()` → `tanlanganXizmat` → `avtomobilQoshish()` pushes to `avtomobillar` → `saqlash()` to localStorage → `avtomobillarKorsatish()` renders list → `hisobYaratish()` builds receipt + `usulniYangilash()` subtotals.

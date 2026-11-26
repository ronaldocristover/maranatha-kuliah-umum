# Pertemuan 2 — Demo Functional Test: Toko Kopi Kampus

Proyek mini untuk demo kuliah (unit + tes API + E2E Playwright) dengan aturan dari draf materi. Aplikasi Express 5 (ESM), data di memori, satu halaman HTML sederhana. Disemai dengan bug untuk didemokan.

## Persyaratan

- Node.js 22 LTS (>= 22.12.0)
- Peramban Playwright Chromium sudah diunduh (sekali saja): `npx playwright install`

## Menjalankan

```bash
cd pertemuan-2
npm install
npm run start
# buka http://localhost:3000
```

## Tes

```bash
# Unit + API (Vitest)
npx vitest run

# E2E (Playwright, chromium saja, headed)
npx playwright test e2e/checkout-kupon.spec.js --project=chromium --headed
```

## Bug untuk demo

1. CK-03 (perender): total halaman/struk memakai `subtotal + shipping` (lupa `- discount`). Dua Tubruk + `KOPI20` menampilkan `Total bayar: Rp 120.000` padahal seharusnya `Rp 100.000`. Inilah yang ditangkap E2E.
2. Cadangan TS-03 (toggle): kupon dianggap terpakai meski bayar gagal (tidak dipakai di tes, ada `store.flags.bugTs03Enabled`).

Catatan: Agar E2E fokus ke bug perender, di cabang `pertemuan-2` fungsi kupon dan pengecekan stok SUDAH diperbaiki. Jika ingin mendemokan unit/API yang gagal lebih dulu, checkout commit awal `a5a8835` sementara, lalu kembali lagi.

Tes yang disertakan (cabang `pertemuan-2`):

- `src/applyCoupon.test.js`: hijau (batas kupon sudah benar, >= 100.000).
- `src/cart.test.js`: hijau (qty > stok ditolak).
- `src/api.test.js`: hijau (kasus stok via HTTP).
- `e2e/checkout-kupon.spec.js`: menangkap bug #3 di perender (total salah).

## Naskah demo singkat

1. Buka aturan KU-02 dan ST-02 di draf. Tunjukkan `applyCoupon.js` dan `cart.js` (jangan sebut “bug” dulu).
2. Jalankan `npx vitest run` (harus hijau: kupon & stok sudah benar untuk fokus E2E).
3. Jalankan `npx playwright test e2e/checkout-kupon.spec.js --project=chromium --headed`. Tes GAGAL karena total masih `Rp 120.000` (bug perender).
4. Pindah ke cabang solusi (lihat di bawah) atau perbaiki `view.js` (rumus total), lalu jalankan lagi sampai hijau.

## Cabang solusi

- Cabang demo (bug ada): `pertemuan-2`
- Cabang solusi (bug #1–#3 diperbaiki): `pertemuan-2-solusi`

Di solusi:

- `applyCoupon`: ganti `>` menjadi `>=`.
- `addToCart`: tolak jika qty akhir melebihi stok.
- `view`: total = `subtotal - discount + shipping` (perbaiki juga di struk).

## Troubleshooting

- Playwright belum terpasang: jalankan `npx playwright install`.
- Porta 3000 sudah terpakai: set `PORT=3001` dan ubah `use.baseURL`/`webServer.url` di `playwright.config.js` (atau jalankan server manual dan biarkan `reuseExistingServer` memakainya).
- Locale Rupiah: `toLocaleString('id-ID')` dipakai. Jika format tampilan berbeda, sesuaikan ekspektasi di tes.
- Node < 22.12: perbarui Node. Vitest/Playwright terbaru mengharuskan Node modern.

## Struktur

```
pertemuan-2/
  src/
    app.js, server.js, store.js
    applyCoupon.js, cart.js
    *.test.js (Vitest)
  e2e/
    checkout-kupon.spec.js (Playwright)
  vitest.config.js
  playwright.config.js
  package.json / package-lock.json
```

## Langkah demo dengan tag

Gunakan tag berikut untuk melompat ke setiap langkah:

- p2-langkah-0-semua-bug — Unit/API: 3 gagal; E2E gagal (kupon 100.000 ditolak).
- p2-langkah-1-fix-kupon — Unit kupon hijau; stok/API masih gagal; E2E gagal (total 120.000).
- p2-langkah-2-fix-stok — Unit+API hijau; E2E gagal (total 120.000).
- p2-langkah-3-fix-total — Semua tes hijau.

Perintah umum di tiap langkah:

```bash
git checkout <tag>
npx vitest run
npx playwright test e2e/checkout-kupon.spec.js --project=chromium --headed
```

Catatan: jika ada server lama yang masih berjalan, Playwright akan memakainya (konfigurasi reuseExistingServer). Pastikan tidak ada server lokal berjalan sebelum menjalankan tes.

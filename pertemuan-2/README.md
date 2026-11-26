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

## Bug yang disemai (harus TERLIHAT gagal di cabang demo)

1. KU-02 (nilai batas): fungsi `applyCoupon` memakai `>` alih-alih `>=`. Subtotal 100.000 ditolak padahal seharusnya diterima.
2. ST-02 (stok): `addToCart` tidak menolak qty > stok. `tumbler` stok 2 masih menerima qty 3.
3. CK-03 (perender): total halaman/struk memakai `subtotal + shipping` (lupa `- discount`). Dua Tubruk + `KOPI20` menampilkan `Total bayar: Rp 120.000` padahal seharusnya `Rp 100.000`.
4. Cadangan TS-03 (toggle): kupon dianggap terpakai meski bayar gagal (tidak dipakai di tes, ada `store.flags.bugTs03Enabled`).

Tes yang disertakan:

- `src/applyCoupon.test.js`: menangkap bug #1 (BVA 100.000).
- `src/cart.test.js`: menangkap bug #2 (qty 3 pada stok 2).
- `src/api.test.js`: ulang kasus #2 lewat HTTP (listen(0) + fetch).
- `e2e/checkout-kupon.spec.js`: menangkap bug #3 di perender (total salah).

## Naskah demo singkat

1. Buka aturan KU-02 dan ST-02 di draf. Tunjukkan `applyCoupon.js` dan `cart.js` (jangan sebut “bug” dulu).
2. Jalankan `npx vitest run`. Tunjukkan: tes batas kupon dan stok gagal sesuai naskah.
3. Jalankan `npx playwright test e2e/checkout-kupon.spec.js --project=chromium --headed`. Tunjukkan total masih `Rp 120.000` (gagal).
4. Pindah ke cabang solusi (lihat di bawah), perbaiki satu per satu, jalankan lagi sampai hijau.

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

# Kuliah Umum — Pemrograman Terapan

Repo materi dan demo kuliah umum Pemrograman Terapan di Universitas Kristen Maranatha.

- Dosen: Ronaldo Cristover  
  Situs: [ronaldodev.com](https://ronaldodev.com) · LinkedIn: [linkedin.com/in/ronaldocristover](https://www.linkedin.com/in/ronaldocristover) · GitHub: [github.com/ronaldocristover](https://github.com/ronaldocristover)

## Daftar Pertemuan

- Pertemuan 2 — Functional testing: studi kasus “Toko Kopi Kampus”
  - Cabang demo: [`pertemuan-2`](https://github.com/ronaldocristover/maranatha-kuliah-umum/tree/pertemuan-2)
  - Cabang solusi: [`pertemuan-2-solusi`](https://github.com/ronaldocristover/maranatha-kuliah-umum/tree/pertemuan-2-solusi)
  - Langkah bertahap (tag):
    - [`p2-langkah-0-semua-bug`](https://github.com/ronaldocristover/maranatha-kuliah-umum/tree/p2-langkah-0-semua-bug): semua bug tanam aktif (1 kupon pakai `>`, 2 stok tidak dicek, 3 total UI salah, 4 toggle TS-03).
    - [`p2-langkah-1-fix-kupon`](https://github.com/ronaldocristover/maranatha-kuliah-umum/tree/p2-langkah-1-fix-kupon): perbaiki batas kupon; stok & renderer masih bug.
    - [`p2-langkah-2-fix-stok`](https://github.com/ronaldocristover/maranatha-kuliah-umum/tree/p2-langkah-2-fix-stok): kupon & stok benar; renderer masih bug (total tetap 120.000).
    - [`p2-langkah-3-fix-total`](https://github.com/ronaldocristover/maranatha-kuliah-umum/tree/p2-langkah-3-fix-total): semua bug diperbaiki; semua tes hijau.

## Prasyarat

- Node.js LTS ≥ 22.12.0
- Git

## Quick start (demo Pertemuan 2)

```bash
git clone https://github.com/ronaldocristover/maranatha-kuliah-umum.git
cd maranatha-kuliah-umum
git checkout pertemuan-2
cd pertemuan-2
npm ci
npx playwright install chromium
npx vitest run
npx playwright test e2e/checkout-kupon.spec.js --project=chromium --headed
```

## Panduan lengkap demo

Ikuti naskah lengkap di [`pertemuan-2/README.md`](pertemuan-2/README.md) — berisi langkah tes unit, tes API, dan E2E Playwright, beserta skenario bug → perbaikan.
# maranatha-kuliah-umum

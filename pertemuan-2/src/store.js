export function createStore() {
  return {
    // Seed akun demo
    user: { email: 'siswa@kampus.test', usedCoupons: new Set() },
    // Zona waktu/now contoh untuk memastikan kupon masih berlaku
    now: new Date('2026-06-01T12:00:00+07:00'),
    // Katalog contoh
    products: [
      { id: 'tubruk-250', name: 'Kopi Tubruk 250g', shortName: 'Tubruk', price: 50_000, stock: 10 },
      { id: 'susu-botol', name: 'Kopi Susu Botol', shortName: 'Susu Botol', price: 25_000, stock: 5 },
      { id: 'tumbler', name: 'Tumbler', shortName: 'Tumbler', price: 80_000, stock: 2 },
    ],
    // Keranjang & kupon terpasang
    cart: [],
    coupon: null,
    // Toggle bug cadangan TS-03 (default: aktif untuk kelas)
    flags: {
      bugTs03Enabled: true,
    },
  }
}

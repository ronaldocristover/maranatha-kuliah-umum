// Aturan contoh kelas untuk kupon KOPI20
export const KOPI20 = {
  minSubtotal: 100_000,
  rate: 0.2,
  cap: 50_000,
  expiresAt: new Date('2026-12-31T23:59:59+07:00'),
}

export function applyCoupon(subtotal, code, now = new Date()) {
  if (code !== 'KOPI20') return { accepted: false, discount: 0 }
  if (now > KOPI20.expiresAt) return { accepted: false, discount: 0 }

  // Perbaikan bug 1: batas minimum harus inklusif
  if (subtotal >= KOPI20.minSubtotal) {
    const discount = Math.min(Math.floor(subtotal * KOPI20.rate), KOPI20.cap)
    return { accepted: true, discount }
  }
  return { accepted: false, discount: 0 }
}

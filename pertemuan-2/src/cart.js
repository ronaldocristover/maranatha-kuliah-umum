export function addToCart(cart, product, qty) {
  if (!Number.isInteger(qty) || qty < 1) {
    return { ok: false, reason: 'qty-invalid', cart }
  }

  // BUG 2 (sengaja ditanam): stok tidak diperiksa
  // Seharusnya menolak jika qty akhir melebihi product.stock
  const existing = cart.find((line) => line.productId === product.id)
  if (existing) {
    existing.qty += qty
  } else {
    cart.push({ productId: product.id, qty, price: product.price })
  }
  return { ok: true, cart }
}

export function addToCart(cart, product, qty) {
  if (!Number.isInteger(qty) || qty < 1) {
    return { ok: false, reason: 'qty-invalid', cart }
  }

  // FIX langkah-2: tolak jika qty akhir melebihi stok
  const existing = cart.find((line) => line.productId === product.id)
  const finalQty = existing ? existing.qty + qty : qty
  if (finalQty > product.stock) {
    return { ok: false, reason: 'exceeds-stock', cart }
  }
  if (existing) existing.qty = finalQty
  else cart.push({ productId: product.id, qty, price: product.price })
  return { ok: true, cart }
}

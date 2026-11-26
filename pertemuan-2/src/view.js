export function formatRupiah(n) {
  return `Rp ${n.toLocaleString('id-ID')}`
}

export function renderCartPage(store) {
  const { cart, products, coupon, user } = store
  const subtotal = cart.reduce((s, line) => s + line.price * line.qty, 0)
  const discount = coupon?.accepted ? coupon.discount : 0
  const shipping = subtotal >= 150_000 ? 0 : 20_000
  // FIX langkah-3: total = subtotal - discount + shipping
  const total = subtotal - discount + shipping

  const productButtons = products
    .map(
      (p) =>
        `<button type="submit" name="productId" value="${p.id}">Tambah ${p.shortName}</button>`,
    )
    .join('')

  return `<!doctype html>
<html lang="id">
  <head><meta charset="utf-8"><title>Toko Kopi Kampus</title></head>
  <body>
    <h1>Toko Kopi Kampus</h1>
    <p>Masuk sebagai ${user.email}</p>
    <h2>Katalog</h2>
    <form method="post" action="/cart/items">${productButtons}</form>
    <h2>Keranjang</h2>
    <p>Subtotal: ${formatRupiah(subtotal)}</p>
    <form method="post" action="/coupon">
      <label for="kode-kupon">Kode kupon</label>
      <input id="kode-kupon" name="code" type="text">
      <button type="submit">Terapkan kupon</button>
    </form>
    <p>Potongan: ${formatRupiah(discount)}</p>
    <p>Ongkir: ${formatRupiah(shipping)}</p>
    <p>Total bayar: ${formatRupiah(total)}</p>
    <form method="post" action="/checkout">
      <button type="submit">Bayar</button>
    </form>
  </body>
</html>`
}

export function renderReceipt(store) {
  const { cart, coupon } = store
  const subtotal = cart.reduce((s, line) => s + line.price * line.qty, 0)
  const discount = coupon?.accepted ? coupon.discount : 0
  const shipping = subtotal >= 150_000 ? 0 : 20_000
  // FIX langkah-3 juga di struk
  const total = subtotal - discount + shipping
  return `<!doctype html>
<html lang="id">
  <head><meta charset="utf-8"><title>Struk</title></head>
  <body>
    <h1>Struk</h1>
    <p>Subtotal: ${formatRupiah(subtotal)}</p>
    <p>Potongan: ${formatRupiah(discount)}</p>
    <p>Ongkir: ${formatRupiah(shipping)}</p>
    <p>Total bayar: ${formatRupiah(total)}</p>
    <p>Terima kasih.</p>
  </body>
</html>`
}

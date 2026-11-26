import express from 'express'
import { addToCart } from './cart.js'
import { applyCoupon } from './applyCoupon.js'
import { renderCartPage, renderReceipt } from './view.js'

export function createApp(store) {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))

  // API katalog sederhana
  app.get('/products', (req, res) => {
    res.json(store.products)
  })

  // Halaman utama
  app.get('/', (req, res) => {
    res.type('html').send(renderCartPage(store))
  })

  // Tambah item ke keranjang (mendukung JSON atau form urlencoded)
  app.post('/cart/items', (req, res) => {
    const { productId, qty } = parseAddItemBody(req)
    const product = store.products.find((p) => p.id === productId)
    if (!product) {
      return respond(req, res, 404, { ok: false, reason: 'not-found' })
    }
    const result = addToCart(store.cart, product, qty)
    const status = result.ok ? 200 : 400
    return respond(req, res, status, result)
  })

  // Terapkan kupon (form)
  app.post('/coupon', (req, res) => {
    const subtotal = store.cart.reduce((s, line) => s + line.price * line.qty, 0)
    const result = applyCoupon(subtotal, req.body.code, store.now)
    // Simpan status kupon terpasang
    store.coupon = result.accepted ? { code: req.body.code, ...result } : null
    // API JSON?
    if (isJson(req)) {
      const status = result.accepted ? 200 : 400
      return res.status(status).json({ ok: result.accepted, coupon: result })
    }
    // Halaman
    return res.redirect('/')
  })

  // Checkout (halaman demonstrasi)
  app.post('/checkout', (req, res) => {
    // Simulasi pembayaran berhasil selalu (bisa dikembangkan jika perlu)
    res.type('html').send(renderReceipt(store))
  })

  return app
}

function parseAddItemBody(req) {
  // JSON: { productId, qty }
  // Form: name="productId" , qty di form default 1
  if (isJson(req)) {
    const qty = Number(req.body.qty ?? 1)
    return { productId: req.body.productId, qty }
  }
  return { productId: req.body.productId, qty: 1 }
}

function isJson(req) {
  return (req.headers['content-type'] || '').includes('application/json')
}

function respond(req, res, status, body) {
  if (isJson(req)) return res.status(status).json(body)
  return res.redirect('/')
}

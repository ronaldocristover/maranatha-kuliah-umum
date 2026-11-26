import { expect, test } from 'vitest'
import { addToCart } from './cart.js'

const tumbler = { id: 'tumbler', price: 80_000, stock: 2 }

test('ST-02: qty 2 pada Tumbler stok 2 diterima', () => {
  const result = addToCart([], tumbler, 2)
  expect(result.ok).toBe(true)
  expect(result.cart[0].qty).toBe(2)
})

test('ST-02: qty 3 pada Tumbler stok 2 ditolak, keranjang tetap kosong', () => {
  const result = addToCart([], tumbler, 3)
  expect(result.ok).toBe(false)
  expect(result.cart).toEqual([])
})

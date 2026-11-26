import { expect, test } from 'vitest'
import { applyCoupon } from './applyCoupon.js'

const now = new Date('2026-06-01T12:00:00+07:00')

test('KOPI20: subtotal 150000 mendapat potongan 30000', () => {
  const result = applyCoupon(150_000, 'KOPI20', now)
  expect(result.accepted).toBe(true)
  expect(result.discount).toBe(30_000)
})

test('KOPI20: subtotal 99999 ditolak (partisi di bawah minimum)', () => {
  const result = applyCoupon(99_999, 'KOPI20', now)
  expect(result.accepted).toBe(false)
  expect(result.discount).toBe(0)
})

test('KOPI20: subtotal 100000 diterima (nilai batas minimum)', () => {
  const result = applyCoupon(100_000, 'KOPI20', now)
  expect(result.accepted).toBe(true)
  expect(result.discount).toBe(20_000)
})

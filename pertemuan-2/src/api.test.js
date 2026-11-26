import { expect, test, beforeAll, afterAll } from 'vitest'
import { createApp } from './app.js'
import { createStore } from './store.js'

let server
let baseUrl

beforeAll(async () => {
  const app = createApp(createStore())
  server = app.listen(0)
  await new Promise((resolve, reject) => {
    server.once('listening', resolve)
    server.once('error', reject)
  })
  const { port } = server.address()
  baseUrl = `http://127.0.0.1:${port}`
})

afterAll(async () => {
  await new Promise((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()))
  })
})

test('POST /cart/items: qty 3 pada Tumbler stok 2 ditolak', async () => {
  const res = await fetch(`${baseUrl}/cart/items`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ productId: 'tumbler', qty: 3 }),
  })
  expect(res.status).toBe(400)
  const body = await res.json()
  expect(body.ok).toBe(false)
})

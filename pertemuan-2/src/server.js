import { createApp } from './app.js'
import { createStore } from './store.js'

const port = Number(process.env.PORT) || 3000
const app = createApp(createStore())

app.listen(port, () => {
  console.log(`Toko Kopi Kampus berjalan di http://localhost:${port}`)
})

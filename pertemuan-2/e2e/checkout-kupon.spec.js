import { test, expect } from '@playwright/test'

test('dua Tubruk + KOPI20: total bayar setelah potongan dan ongkir adalah Rp 100.000', async ({ page }) => {
  await page.goto('/')
  await page.getByRole('button', { name: 'Tambah Tubruk' }).click()
  await page.getByRole('button', { name: 'Tambah Tubruk' }).click()
  await page.getByRole('textbox', { name: 'Kode kupon' }).fill('KOPI20')
  await page.getByRole('button', { name: 'Terapkan kupon' }).click()
  await expect(page.getByText('Potongan: Rp 20.000')).toBeVisible()
  await page.getByRole('button', { name: 'Bayar' }).click()
  await expect(page.getByText('Total bayar: Rp 100.000')).toBeVisible()
})

import test from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:3000')
})

test('should have a nav component', async ({ page }) => {
  await page.locator('#navigation').click()

  page.locator('#navigation').isVisible()
})

test('should have a cart component', async ({ page }) => {
  await page.locator('#cart-button').isVisible()
  await page.locator('#cart-button').click()

  await page.getByLabel('Your Shopping Bag').click()
  await page.getByRole('button', { name: 'Close' }).click()
})

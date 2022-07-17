import { test } from '@playwright/test';

test('should be able to search for and view assets', async ({ page }) => {

  // Go to http://localhost:3000/
  await page.goto('http://localhost:3000/');

  // Click [placeholder="Search\.\.\."]
  await page.locator('[placeholder="Search\\.\\.\\."]').click();

  // Fill [placeholder="Search\.\.\."]
  await page.locator('[placeholder="Search\\.\\.\\."]').fill('aapl');

  // Click text=fetch stonk chart data
  await page.locator('text=fetch stonk chart data').click();

  // Click canvas
  await page.locator('canvas').click({
    position: {
      x: 553,
      y: 233
    }
  });

});
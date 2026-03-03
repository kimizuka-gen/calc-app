import { test, expect } from '@playwright/test';

test.describe('基本的な四則演算', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('足し算: 3 + 5 = 8', async ({ page }) => {
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByLabel('計算結果')).toContainText('8');
  });

  test('引き算: 9 - 4 = 5', async ({ page }) => {
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '-' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByLabel('計算結果')).toContainText('5');
  });

  test('掛け算: 6 × 7 = 42', async ({ page }) => {
    await page.getByRole('button', { name: '6' }).click();
    await page.getByRole('button', { name: '×' }).click();
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByLabel('計算結果')).toContainText('42');
  });

  test('割り算: 8 ÷ 2 = 4', async ({ page }) => {
    await page.getByRole('button', { name: '8' }).click();
    await page.getByRole('button', { name: '÷' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByLabel('計算結果')).toContainText('4');
  });

  test('整数除算（切り捨て）: 7 ÷ 2 = 3', async ({ page }) => {
    await page.getByRole('button', { name: '7' }).click();
    await page.getByRole('button', { name: '÷' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByLabel('計算結果')).toContainText('3');
  });

  test('演算子の優先順位: 2 + 3 × 4 = 14', async ({ page }) => {
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '×' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByLabel('計算結果')).toContainText('14');
  });

  test('計算結果に続けて演算子を押すと連続計算できる', async ({ page }) => {
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '=' }).click();
    // 結果 5 に続けて + 1
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByLabel('計算結果')).toContainText('6');
  });
});

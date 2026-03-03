import { test, expect } from '@playwright/test';

test.describe('AC・Del ボタンの動作', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('AC を押すと入力がすべてクリアされる', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: 'AC' }).click();
    await expect(page.getByLabel('計算式')).toContainText('0');
  });

  test('AC を押すと計算結果もクリアされる', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByLabel('計算結果')).toBeVisible();
    await page.getByRole('button', { name: 'AC' }).click();
    await expect(page.getByLabel('計算式')).toContainText('0');
    await expect(page.getByLabel('計算結果')).not.toBeVisible();
  });

  test('Del を押すと最後の入力が1文字削除される', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: 'Del' }).click();
    await expect(page.getByLabel('計算式')).toContainText('12');
    await expect(page.getByLabel('計算式')).not.toContainText('123');
  });

  test('Del を押すと演算子も削除される', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: 'Del' }).click();
    await expect(page.getByLabel('計算式')).toContainText('5');
    await expect(page.getByLabel('計算式')).not.toContainText('+');
  });

  test('計算結果表示中に Del を押すと結果がクリアされる', async ({ page }) => {
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByLabel('計算結果')).toBeVisible();
    await page.getByRole('button', { name: 'Del' }).click();
    await expect(page.getByLabel('計算結果')).not.toBeVisible();
  });
});

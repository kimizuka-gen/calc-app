import { test, expect } from '@playwright/test';

test.describe('ディスプレイ表示', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('初期状態では計算式エリアに "0" が表示される', async ({ page }) => {
    await expect(page.getByLabel('計算式')).toContainText('0');
  });

  test('数字ボタンを押すと計算式エリアに入力が反映される', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await expect(page.getByLabel('計算式')).toContainText('123');
  });

  test('演算子を押すと計算式エリアに表示される', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await expect(page.getByLabel('計算式')).toContainText('5+');
  });

  test('= を押すと計算結果エリアに結果が表示される', async ({ page }) => {
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '6' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByLabel('計算結果')).toBeVisible();
    await expect(page.getByLabel('計算結果')).toContainText('10');
  });

  test('計算後に数字を押すと新しい計算が始まる', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();
    // 新しい数字を押す
    await page.getByRole('button', { name: '9' }).click();
    await expect(page.getByLabel('計算式')).toContainText('9');
    await expect(page.getByLabel('計算結果')).not.toBeVisible();
  });
});

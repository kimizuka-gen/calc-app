import { test, expect } from '@playwright/test';

test.describe('エラーハンドリング', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ゼロ除算でエラーメッセージが表示される', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '÷' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    await expect(page.getByRole('alert')).toContainText('ゼロ');
  });

  test('ゼロ除算エラー後、しばらくすると自動でクリアされる', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '÷' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByRole('alert')).toBeVisible();
    // エラーが自動クリアされるまで待つ（タイムアウトは2秒 + 余裕分）
    await expect(page.getByRole('alert')).not.toBeVisible({ timeout: 4000 });
    await expect(page.getByLabel('計算式')).toContainText('0');
  });

  test('連続演算子入力はブロックされる', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    // もう一度 + を押しても入力されないこと
    await page.getByRole('button', { name: '+' }).click();
    await expect(page.getByLabel('計算式')).not.toContainText('++');
  });

  test('先頭に演算子を入力できない', async ({ page }) => {
    await page.getByRole('button', { name: '+' }).click();
    await expect(page.getByLabel('計算式')).toContainText('0');
    await expect(page.getByLabel('計算式')).not.toContainText('+');
  });
});

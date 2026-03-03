import { test, expect } from '@playwright/test';

test.describe('括弧を使った計算', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('(2 + 3) × 4 = 20', async ({ page }) => {
    await page.getByRole('button', { name: '(' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: ')' }).click();
    await page.getByRole('button', { name: '×' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByLabel('計算結果')).toContainText('20');
  });

  test('10 ÷ (2 + 3) = 2', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '0' }).click();
    await page.getByRole('button', { name: '÷' }).click();
    await page.getByRole('button', { name: '(' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: ')' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByLabel('計算結果')).toContainText('2');
  });

  test('ネストした括弧: (1 + (2 × 3)) = 7', async ({ page }) => {
    await page.getByRole('button', { name: '(' }).click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '(' }).click();
    await page.getByRole('button', { name: '2' }).click();
    await page.getByRole('button', { name: '×' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: ')' }).click();
    await page.getByRole('button', { name: ')' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByLabel('計算結果')).toContainText('7');
  });

  test('閉じ括弧は未対応の開き括弧がない場合は入力不可', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: ')' }).click();
    // 閉じ括弧が無効なので式は "5" のまま
    await expect(page.getByLabel('計算式')).toContainText('5');
    await expect(page.getByLabel('計算式')).not.toContainText(')');
  });
});

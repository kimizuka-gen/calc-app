import { test, expect } from '@playwright/test';

test.describe('キーボード入力', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // キーボードイベントが確実に受け付けられるようページ本体にフォーカスを当てる
    await page.locator('body').click();
  });

  test('数字キーで入力できる', async ({ page }) => {
    await page.keyboard.press('1');
    await page.keyboard.press('2');
    await page.keyboard.press('3');
    await expect(page.getByLabel('計算式')).toContainText('123');
  });

  test('Enter キーで計算が実行される', async ({ page }) => {
    await page.keyboard.press('4');
    await page.keyboard.press('+');
    await page.keyboard.press('6');
    await page.keyboard.press('Enter');
    await expect(page.getByLabel('計算結果')).toContainText('10');
  });

  test('Escape キーで全クリアされる', async ({ page }) => {
    await page.keyboard.press('5');
    await page.keyboard.press('5');
    await page.keyboard.press('Escape');
    await expect(page.getByLabel('計算式')).toContainText('0');
  });

  test('Backspace キーで1文字削除される', async ({ page }) => {
    await page.keyboard.press('7');
    await page.keyboard.press('8');
    await page.keyboard.press('Backspace');
    await expect(page.getByLabel('計算式')).toContainText('7');
    await expect(page.getByLabel('計算式')).not.toContainText('78');
  });

  test('* キーで掛け算演算子が入力される', async ({ page }) => {
    await page.keyboard.press('3');
    await page.keyboard.press('*');
    await page.keyboard.press('4');
    await page.keyboard.press('Enter');
    await expect(page.getByLabel('計算結果')).toContainText('12');
  });

  test('/ キーで割り算演算子が入力される', async ({ page }) => {
    await page.keyboard.press('9');
    await page.keyboard.press('/');
    await page.keyboard.press('3');
    await page.keyboard.press('Enter');
    await expect(page.getByLabel('計算結果')).toContainText('3');
  });

  test('括弧キーで括弧が入力される', async ({ page }) => {
    await page.keyboard.press('(');
    await page.keyboard.press('2');
    await page.keyboard.press('+');
    await page.keyboard.press('3');
    await page.keyboard.press(')');
    await page.keyboard.press('*');
    await page.keyboard.press('2');
    await page.keyboard.press('Enter');
    await expect(page.getByLabel('計算結果')).toContainText('10');
  });
});

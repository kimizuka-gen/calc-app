import { test, expect } from '@playwright/test';

test.describe('計算履歴', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // 履歴をクリアして初期状態にする
    await page.evaluate(() => localStorage.removeItem('calc-history'));
    await page.reload();
  });

  test('初期状態では「履歴はありません」が表示される', async ({ page }) => {
    await expect(page.getByText('履歴はありません')).toBeVisible();
  });

  test('計算後に履歴が追加される', async ({ page }) => {
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '4' }).click();
    await page.getByRole('button', { name: '=' }).click();
    await expect(page.getByText('履歴はありません')).not.toBeVisible();
    await expect(page.getByRole('list')).toContainText('7');
  });

  test('複数回計算すると複数の履歴が表示される', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await page.getByRole('button', { name: 'AC' }).click();

    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '3' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const items = page.getByRole('listitem');
    await expect(items).toHaveCount(2);
  });

  test('最新の計算が履歴の先頭に表示される', async ({ page }) => {
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '1' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await page.getByRole('button', { name: 'AC' }).click();

    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '9' }).click();
    await page.getByRole('button', { name: '=' }).click();

    const firstItem = page.getByRole('listitem').first();
    await expect(firstItem).toContainText('18');
  });

  test('クリアボタンを押すと履歴がすべて削除される', async ({ page }) => {
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '+' }).click();
    await page.getByRole('button', { name: '5' }).click();
    await page.getByRole('button', { name: '=' }).click();

    await expect(page.getByRole('list')).toBeVisible();
    await page.getByRole('button', { name: '履歴をクリア' }).click();
    await expect(page.getByText('履歴はありません')).toBeVisible();
  });
});

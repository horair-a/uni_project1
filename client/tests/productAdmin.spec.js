import { test, expect } from '@playwright/test';

test.describe('CUET Store Dashboard Tests', () => {

  const uniqueSeller = `Test Seller ${Date.now()}`;
  const uniqueProduct = `Test Product ${Date.now()}`;
  const updatedSeller = `Updated Seller ${Date.now()}`;
  const updatedProduct = `Updated Product ${Date.now()}`;

  test('Test Login Functionality', async ({ page }) => {
    await page.goto('http://localhost:5173/login_page');
    await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@gmail.com');
    await page.getByRole('textbox', { name: 'Password' }).fill('123');
    await page.getByRole('button', { name: 'Login' }).click();
    await expect(page).toHaveURL('http://localhost:5173/dashboard');
  });

  test('Test Add Product Form Visibility', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');
    await page.getByRole('list').getByText('Products').click();
    await page.getByRole('link', { name: 'Add Product' }).click();
    await expect(page.getByRole('textbox', { name: 'Product Name' })).toBeVisible();
  });

  test('Test Add Product Functionality', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');
    await page.getByRole('list').getByText('Products').click();
    await page.getByRole('link', { name: 'Add Product' }).click();
    await page.getByRole('textbox', { name: 'Sellar Name' }).fill(uniqueSeller);
    await page.getByRole('textbox', { name: 'Product Name' }).fill(uniqueProduct);
    await page.getByPlaceholder('Quantity').fill('10');
    await page.getByPlaceholder('Price').fill('50');
    await page.getByRole('button', { name: 'Submit' }).click();
    await page.goto('http://localhost:5173/orders');
    await expect(page.getByRole('cell', { name: uniqueProduct })).toBeVisible();
  });

  test('Test Manage Products Page Navigation', async ({ page }) => {
    await page.goto('http://localhost:5173/dashboard');
    await page.getByRole('list').getByText('Products').click();
    await page.getByRole('link', { name: 'Manage Products' }).click();
    await expect(page).toHaveURL('http://localhost:5173/manage-orders');
  });

  test('Test Order Update', async ({ page }) => {
    await page.goto('http://localhost:5173/manage-orders');
    await page.getByRole('row', { name: `${uniqueSeller} ${uniqueProduct}` }).getByRole('link').click();
    await page.locator('input[name="customerName"]').fill(updatedSeller);
    await page.locator('input[name="productName"]').fill(updatedProduct);
    await page.getByRole('button', { name: 'Update' }).click();
    await expect(page.getByRole('cell', { name: updatedSeller })).toBeVisible();
  });

});

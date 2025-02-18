import { test, expect } from '@playwright/test';

test('User Login Test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('navigation').getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('dfk@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Dashboard')).toBeVisible();
});

test('Admin Login Test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('navigation').getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('admin@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('123');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Admin Dashboard' })).toBeVisible();
});

test('Logout Test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('navigation').getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Sign In' }).click();
  await page.getByRole('textbox', { name: 'Email Address' }).fill('dfk@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).fill('1234');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'Logout' }).click();
});

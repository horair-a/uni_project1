import { test, expect } from "@playwright/test";

const uniqueEmail = `tester${Date.now()}@gmail.com`;
const uniqueName = `tester-${Date.now()}`;

test("User Signup Test", async ({ page }) => {
  await page.goto("http://localhost:5173/signup_page");
  await page.getByRole("textbox", { name: "Username" }).fill(uniqueName);
  await page.getByRole("textbox", { name: "Email Address" }).fill(uniqueEmail);
  await page.getByRole("textbox", { name: "Department Name" }).fill("TestDept");
  await page.getByRole("textbox", { name: "Password" }).fill("test1234");
  await page.getByRole("button", { name: "Sign Up" }).click();

  await page.waitForTimeout(2000);
  // Check if redirected to login page or a confirmation appears
  await expect(page.getByText("Login to your account")).toBeVisible();
});

test("User Login Test", async ({ page }) => {
  await page.goto("http://localhost:5173/login_page");
  await page.getByRole("textbox", { name: "Email Address" }).fill(uniqueEmail);
  await page.getByRole("textbox", { name: "Password" }).fill("test1234");
  await page.getByRole("button", { name: "Login" }).click();

  // Check if dashboard is visible after login
  await expect(page.getByText("Dashboard")).toBeVisible();
});

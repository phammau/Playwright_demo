import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/Login.page';
import { InventoryPage } from '../pages/inventory.page';

const test = base.extend<{ loginPage: LoginPage }>({
  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },
});

test('Test01', async ({ loginPage, page }) => {
  await loginPage.loginAuto();
  const inventoryPage = new InventoryPage(page);
  expect(await inventoryPage.isDisplayOk()).toBeTruthy();
});

test('Test02', async ({ loginPage }) => {
  await loginPage.inputUsername("abc");
  await loginPage.inputPassword("secret_sauce");
  await loginPage.clickBtnLogin();
  expect(await loginPage.getErrorMessage(), "Epic sadface: Username and password do not match any user in this service");
});

test('Test03', async ({ loginPage }) => {
  await loginPage.inputUsername("standard_user");
  await loginPage.inputPassword("abc");
  await loginPage.clickBtnLogin();
  expect(await loginPage.getErrorMessage(), "Epic sadface: Username and password do not match any user in this service");
});

test('Test04', async ({ page, loginPage }) => {
  await loginPage.inputUsername("abc");
  await loginPage.inputPassword("dfg");
  await loginPage.clickBtnLogin();
  expect(await loginPage.getErrorMessage(), "Epic sadface: Username and password do not match any user in this service");
});


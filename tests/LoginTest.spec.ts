import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { InventoryPage } from '../pages/inventory.page';

test('Test01', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/')

  const loginPage = new LoginPage(page)

  await loginPage.inputUsername("standard_user")
  await loginPage.inputPassword("secret_sauce")
  await loginPage.clickBtnLogin()
  const inventoryPage = new InventoryPage(page)

  expect(await inventoryPage.isDisPlayOk()).toBeTruthy()
});

test('Test02', async ({ page }) =>{
  await page.goto('https://www.saucedemo.com/')
  const loginPage = new LoginPage(page)

  await loginPage.inputUsername("abc")
  await loginPage.inputPassword("secret_sauce")
  await loginPage.clickBtnLogin()
  expect(await loginPage.getErrorMessage, "Epic sadface: Username and password do not match any user in this service")
});

test('Test03', async ({ page }) =>{
  await page.goto('https://www.saucedemo.com/')
  const loginPage = new LoginPage(page)

  await loginPage.inputUsername("standard_user")
  await loginPage.inputPassword("abc")
  await loginPage.clickBtnLogin()
  expect(await loginPage.getErrorMessage, "Epic sadface: Username and password do not match any user in this service")
});

test('Test04', async ({ page }) =>{
  await page.goto('https://www.saucedemo.com/')
  const loginPage = new LoginPage(page)

  await loginPage.inputUsername("abc")
  await loginPage.inputPassword("dfg")
  await loginPage.clickBtnLogin()
  expect(await loginPage.getErrorMessage, "Epic sadface: Username and password do not match any user in this service")
});


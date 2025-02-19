import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/login.page";
import { InventoryPage } from '../pages/inventory.page';
import { BaseTest } from "./BaseTest";

test ('testAddToCart', async ({ page }) =>{
    await page.goto('https://www.saucedemo.com/')
    const baseTest = new BaseTest()
    baseTest.loginAutoInventoryPage(page)
    // const loginPage =  new LoginPage(page)

    // await loginPage.inputUsername("standard_user")
    // await loginPage.inputPassword("secret_sauce")
    // await loginPage.clickBtnLogin()
    
    const inventoryPage = new InventoryPage(page)
    let expectCount = 0
    expect(await inventoryPage.getCartCount()).toBe(expectCount)

    const productItems = await inventoryPage.getProductItem()// Lấy danh sách sản phẩm từ trang inventory

    for (const productItem of productItems) {
        expectCount++
        console.log("gia tri của expectCount = ", expectCount)
        await productItem.clickAddToCartBtn()
        console.log("gia tri của getCartCount = ", await inventoryPage.getCartCount())
        expect(await inventoryPage.getCartCount()).toBe(expectCount)
    }

    for (const productItem of productItems) {
        expectCount--
        console.log("gia tri của expectCount = ", expectCount)
        await productItem.clickRemoteBtn()
        console.log("gia tri của getCartCount = ", await inventoryPage.getCartCount())
        expect(await inventoryPage.getCartCount()).toBe(expectCount)
    }
});

test('testClickProductItem', async ({ page }) =>{

});
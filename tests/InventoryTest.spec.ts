import test, { expect } from "@playwright/test";
import { LoginPage } from "../pages/Login.page";
import { InventoryPage } from '../pages/Inventory.page';
import { BaseTest } from "./BaseTest";
import { InventoryItem } from "../pages/InventoryItem.page";

test ('testAddToCart', async ({ page }) =>{
    await page.goto('https://www.saucedemo.com/')
    const baseTest = new BaseTest()
    baseTest.loginAutoInventoryPage(page)

    const inventoryPage = new InventoryPage(page)
    let expectCount = 0
    expect(await inventoryPage.getCartCount()).toBe(expectCount)

    const productItems = await inventoryPage.getProductItems()// Lấy danh sách sản phẩm từ trang inventory

    for (const productItem of productItems) {
        expectCount++
        await productItem.clickAddToCartBtn()
        expect(await inventoryPage.getCartCount()).toBe(expectCount)
    }

    for (const productItem of productItems) {
        expectCount--
        await productItem.clickRemoteBtn()
        expect(await inventoryPage.getCartCount()).toBe(expectCount)
    }
});

test.only('testClickProductItem', async ({ page }) =>{
    await page.goto("https://www.saucedemo.com/")
    const baseTest = new BaseTest()
    await baseTest.loginAutoInventoryPage(page)
    const inventoryPage = new InventoryPage(page)
    const productItems = await inventoryPage.getProductItems()
   
    for (const productItem of productItems) {
        let expectedName = await productItem.getName()
        let expectedPrice = await productItem.getPrice()
        let expectedDescription = await productItem.getDescription()
        let expectedImage = await productItem.getImage()

        await productItem.clickName()
        const inventoryItem = new InventoryItem(page)
    
        let actualName = await inventoryItem.getName()
        let actualPrice = await inventoryItem.getPrice()
        let actualDescription = await inventoryItem.getDescription()
        let actualImage= await inventoryItem.getImage()

        expect(expectedName).toBe(actualName)
        expect(expectedImage).toBe(actualImage)
        expect(expectedPrice).toBe(actualPrice)
        expect(expectedDescription).toBe(actualDescription)

        await inventoryItem.clickBtnBackToProduct()
    }
});
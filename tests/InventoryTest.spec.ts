import {test as  base, expect } from "@playwright/test";
import { LoginPage } from "../pages/Login.page";
import { InventoryPage } from '../pages/Inventory.page';
import { InventoryItem } from "../pages/InventoryItem.page";

const test = base.extend<{ inventoryPage: InventoryPage }>({
    inventoryPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();
        await loginPage.inputUsername('standard_user');
        await loginPage.inputPassword('secret_sauce');
        await loginPage.clickBtnLogin();

        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    }
});

test('testAddToCart', async ({ inventoryPage }) => {
    let expectCount = 0
    expect(await inventoryPage.getCartCount()).toBe(expectCount)

    const productItems = await inventoryPage.getProductItems()
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

test('testClickProductItem', async ({ page, inventoryPage }) => {
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
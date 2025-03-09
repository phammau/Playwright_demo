import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/Login.page";
import { InventoryPage } from '../pages/inventory.page';
import { InventoryItem } from "../pages/InventoryItem.page";
import { CartPage } from "../pages/CartPage.page";

const test = base.extend<{ loginPage: LoginPage, inventoryPage: InventoryPage }>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAuto();
        await use(loginPage);
    },
    inventoryPage: async ({ loginPage, page }, use) => {
        const inventoryPage = new InventoryPage(page);
        await use(inventoryPage);
    },
});
test('testAddToCart', async ({ loginPage, inventoryPage, page }) => {
    let expectCount = 0;
    expect(await inventoryPage.getCartCount()).toEqual(expectCount);
    const productItems = await inventoryPage.getProductItems();// Lấy danh sách sản phẩm từ trang inventory
    for (const productItem of productItems) {
        expectCount++;
        await productItem.clickAddToCartBtn();
        expect(await inventoryPage.getCartCount()).toEqual(expectCount);
    }
    for (const productItem of productItems) {
        expectCount--;
        await productItem.clickRemoteBtn();
        expect(await inventoryPage.getCartCount()).toEqual(expectCount);
    }
});

test('testClickProductItem', async ({ loginPage, inventoryPage, page }) => {
    const productItems = await inventoryPage.getProductItems();
    for (const productItem of productItems) {
        let expectedName = await productItem.getName();
        let expectedPrice = await productItem.getPrice();
        let expectedDescription = await productItem.getDescription();
        let expectedImage = await productItem.getImage();
        await productItem.clickName();
        const inventoryItem = new InventoryItem(page);
        let actualName = await inventoryItem.getName();
        let actualPrice = await inventoryItem.getPrice();
        let actualDescription = await inventoryItem.getDescription();
        let actualImage = await inventoryItem.getImage();
        expect(expectedName).toEqual(actualName);
        expect(expectedImage).toEqual(actualImage);
        expect(expectedPrice).toEqual(actualPrice);
        expect(expectedDescription).toEqual(actualDescription);
        await inventoryItem.clickBtnBackToProduct();
    }
});
test('testClickAddToCartAndCheckShoppingCart', async ({ loginPage, inventoryPage, page }) => {
    const productItems = await inventoryPage.getProductItems();
    for (let i = 0; i < productItems.length; i++) {
        let productItem = productItems[i];
        let expectedName = await productItem.getName();
        let expectedPrice = await productItem.getPrice();
        let expectedDescription = await productItem.getDescription();
        await productItem.clickAddToCartBtn();
        await inventoryPage.clickShoppingCart();
        const cartPage = new CartPage(page);
        let cartItems = await cartPage.getCartItems();
        let cartItem = cartItems[i];
        let actualName = await cartItem.getName();
        let actualPrice = await cartItem.getPrice();
        let actualDescription = await cartItem.getDescription();
        expect(expectedName).toEqual(actualName);
        expect(expectedPrice).toEqual(actualPrice);
        expect(expectedDescription).toEqual(actualDescription);
        await cartPage.clickShoppingContinue();
    }
});

test('testSortProductIitemByPriceLowToHight', async ({ loginPage, inventoryPage, page }) => {
    const productItems = await inventoryPage.getProductItems();
    const expectted = await Promise.all(productItems.map(async (productItem) => productItem.getPrice()));
    await inventoryPage.sortByPriceLowToHight();
    const actual = await Promise.all(productItems.map(async (productItem) => productItem.getPrice()));
    expect(expectted).not.toEqual(actual);
    expectted.sort((a, b) => a - b);
    expect(expectted).toEqual(actual);
});
test('testSortProductIitemByPrice', async ({ loginPage, inventoryPage, page }) => {
    const productItems = await inventoryPage.getProductItems();
    const expectted = await Promise.all(productItems.map(async (productItem) => productItem.getPrice()));
    await inventoryPage.sortByPriceHightToLow();
    const actual = await Promise.all(productItems.map(async (productItem) => productItem.getPrice()));
    expect(expectted).not.toEqual(actual);
    expectted.sort((a, b) => b - a);
    expect(expectted).toEqual(actual);
});
test('testSortProductIitemByNameAToZ', async ({ loginPage, inventoryPage, page }) => {
    const productItems = await inventoryPage.getProductItems();
    const expectted = await Promise.all(productItems.map(async (productItem) => productItem.getName()));
    await inventoryPage.sortByNameAToZ();
    const actual = await Promise.all(productItems.map(async (productItem) => productItem.getName()));
    expect(expectted).toEqual(actual);
    expectted.sort();
    expect(expectted).toEqual(actual);
});
test('testSortProductIitemByNameZToA', async ({ loginPage, inventoryPage, page }) => {
    const productItems = await inventoryPage.getProductItems();
    const expectted = await Promise.all(productItems.map(async (productItem) => productItem.getName()));
    await inventoryPage.sortByNameZToA();
    const actual = await Promise.all(productItems.map(async (productItem) => productItem.getName()));
    expect(expectted).not.toEqual(actual);
    expectted.sort((a, b) => b?.localeCompare(a!) ?? 0);
    expect(expectted).toEqual(actual);
});
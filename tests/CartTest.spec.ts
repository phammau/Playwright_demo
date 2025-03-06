import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/Login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/CartPage.page";

const test = base.extend<{ loginPage: LoginPage, inventoryPage: InventoryPage, cartPage: CartPage }>({

    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAuto();
        await use(loginPage);
    },

    inventoryPage: async ({ loginPage, page }, use) => {
        const inventoryPage = new InventoryPage(page);
        const productItems = await inventoryPage.getProductItems();
        for (const productItem of productItems) {
            await productItem.clickAddToCartBtn();
        }
        await inventoryPage.clickShoppingCart();
        await use(inventoryPage);
    },

    cartPage: async ({ inventoryPage, page }, use) => {
        const cartPage = new CartPage(page);
        await use(cartPage);
    },
})
test('testCartCout', async ({ loginPage, inventoryPage, cartPage, page }) => {
    let expectCount = await inventoryPage.getCartCount();
    let cartItems = await cartPage.getCartItems();
    for (let i = 0; i < cartItems.length; i++) {
        await cartItems[i].clickRemoteBtn();
        expectCount--
        cartItems = await cartPage.getCartItems();
        i--  //lui i de khong bo qua phan tu dau tien
    }
    let actual = await cartPage.getCartCount();
    console.log("giatri= " + actual);

    expect(actual).toEqual(expectCount);
});
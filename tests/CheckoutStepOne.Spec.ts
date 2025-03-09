import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/Login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/CartPage.page";
import { ProductItem } from "../pages/ProductItem.page";
import { CheckoutStepOne } from "../pages/CheckoutStepOne.page";
import { CheckoutStepTwo } from "../pages/CheckoutStepTwo.page";
const test = base.extend<{ loginPage: LoginPage, inventoryPage: InventoryPage, cartPage: CartPage }>({
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.loginAuto();
        await use(loginPage);
    },
    inventoryPage: async ({ loginPage, page }, use) => {
        const inventoryPage = new InventoryPage(page);
        const productItem = new ProductItem(page, 1);
        await productItem.clickAddToCartBtn();
        await inventoryPage.clickShoppingCart();
        await use(inventoryPage);
    },
    cartPage: async ({ inventoryPage, page }, use) => {
        const cartPage = new CartPage(page);
        await cartPage.clickCheckout();
        await use(cartPage);
    },
});

test('testCheckout', async ({ cartPage, page }) => {
    const checkoutStepOne = new CheckoutStepOne(page);
    await checkoutStepOne.autoFillAndGoToCheckoutStepTwoPage();
    const checkoutStepTwo = new CheckoutStepTwo(page);
    expect(await checkoutStepTwo.isDisPlayOk()).toBeTruthy();
});
test('testLoginCheckoutStepTwo02', async ({ cartPage, page }) => {
    const checkoutStepOne = new CheckoutStepOne(page);
    await checkoutStepOne.inputFirstName("");
    await checkoutStepOne.inputLastName("edf");
    await checkoutStepOne.inputPostalCode("1111")
    await checkoutStepOne.clickBtnContinue();
    expect(await checkoutStepOne.getError()).toEqual("Error: First Name is required")
});
test('testLoginCheckoutStepTwo03', async ({ cartPage, page }) => {
    const checkoutStepOne = new CheckoutStepOne(page);
    await checkoutStepOne.inputFirstName("abc");
    await checkoutStepOne.inputLastName("");
    await checkoutStepOne.inputPostalCode("1111");
    await checkoutStepOne.clickBtnContinue();
    expect(await checkoutStepOne.getError()).toEqual("Error: Last Name is required")
});
test('testLoginCheckoutStepTwo04', async ({ cartPage, page }) => {
    const checkoutStepOne = new CheckoutStepOne(page);
    await checkoutStepOne.inputFirstName("abc");
    await checkoutStepOne.inputLastName("edf");
    await checkoutStepOne.inputPostalCode("");
    await checkoutStepOne.clickBtnContinue();
    expect(await checkoutStepOne.getError()).toEqual("Error: Postal Code is required");
});
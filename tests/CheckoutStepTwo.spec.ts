import { test as base, expect } from "@playwright/test";
import { LoginPage } from "../pages/Login.page";
import { InventoryPage } from "../pages/inventory.page";
import { CartPage } from "../pages/CartPage.page";
import { CheckoutStepOne } from "../pages/CheckoutStepOne.page";
import { CheckoutStepTwo } from "../pages/CheckoutStepTwo.page";
import { CheckoutComplete } from "../pages/CheckoutComplete.page";
import { InventoryItem } from "../pages/InventoryItem.page";
import { ProductItem } from "../pages/ProductItem.page";

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

test('testLoginCheckoutStepTwo01', async ({ inventoryPage, page }) => {
    const inventoryItems = await inventoryPage.getProductItems();
    let inventoryItemsActual: any[] = []; //khong chac chan kieu du lieu nên dung any[]

    for (const product of inventoryItems) { // dung const tham chieu den tung phan tu  và ko can thay  doi tham chieu
        let actualName = await product.getName();
        let actualPrice = await product.getPrice();
        let actualDescription = await product.getDescription();
        if (actualName !== null && actualPrice !== null && actualDescription !== null) {
            inventoryItemsActual.push({ actualName, actualPrice, actualDescription });//push khong dung key: value truc tiep. neu muon push object, de trong dau  { }
        }
        await product.clickAddToCartBtn();
    }
    const checkoutStepOne = new CheckoutStepOne(page);
    await checkoutStepOne.loginAndGoToCheckoutStepTwo();
    const checkoutStepTwo = new CheckoutStepTwo(page);
    const checkoutStepTwoItems = await checkoutStepTwo.getCheckoutStepTwoItems();
    for (let i = 0; i < checkoutStepTwoItems.length; i++) {
        let expectedName = await checkoutStepTwoItems[i].getName();
        let expectedDescription = await checkoutStepTwoItems[i].getDescription();
        let expectedPrice = await checkoutStepTwoItems[i].getPrice();

        expect(expectedName).toEqual(inventoryItemsActual[i].actualName);
        expect(expectedPrice).toEqual(inventoryItemsActual[i].actualPrice);
        expect(expectedDescription).toEqual(inventoryItemsActual[i].actualDescription);
    }
});
test("testItemTotal", async ({ inventoryPage, page }) => {
    const inventoryItems = await inventoryPage.getProductItems();
    for (const product of inventoryItems) {
        await product.clickAddToCartBtn();
    }
    const checkoutStepOne = new CheckoutStepOne(page);
    await checkoutStepOne.loginAndGoToCheckoutStepTwo();
    const checkoutStepTwo = new CheckoutStepTwo(page);
    let price = 0;
    const checkoutStepTwoItems = await checkoutStepTwo.getCheckoutStepTwoItems();
    for (const product of checkoutStepTwoItems) {
        price += await product.getPrice();
    }
    expect(price).toEqual(await checkoutStepTwo.getItemTotal());
});
test("testLoginCheckoutCompletePage", async ({ inventoryPage, page }) => {
    const checkoutStepTwo = new CheckoutStepTwo(page);
    await checkoutStepTwo.loginAndGoToCheckoutCompletePage();
    const checkoutComplete = new CheckoutComplete(page);
    expect(checkoutComplete.isDisplayOk).toBeTruthy();
});
test("testFinishCheckoutComplete", async ({ inventoryPage, page }) => {
    const productItem = await inventoryPage.getProductItems();
    await productItem[1].clickAddToCartBtn(); //chon san pham dau đau tien
    const checkoutStepTwo = new CheckoutStepTwo(page);
    await checkoutStepTwo.loginAndGoToCheckoutCompletePage();
    const checkoutComplete = new CheckoutComplete(page);
    await checkoutComplete.clickBtnBackToHome();
    inventoryPage = new InventoryPage(page);
    expect(await inventoryPage.getCartCount()).toEqual(0);

});
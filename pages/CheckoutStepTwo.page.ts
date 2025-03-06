import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.page";
import { CheckoutStepTwoItems } from "./CheckoutStepTwoItems.page";
import { InventoryPage } from "./inventory.page";
import { CartPage } from "./CartPage.page";
import { CheckoutStepOne } from "./CheckoutStepOne.page";

export class CheckoutStepTwo extends BasePage {
    private readonly btn_cancle: Locator;
    private readonly btn_finish: Locator;
    private readonly productItems: Locator
    private readonly title: Locator;
    private readonly itemTotal: Locator;

    constructor(page: Page) {
        super(page);
        this.title = this.page.locator("//span[@class='title']")
        this.btn_cancle = this.page.locator("#cancel");
        this.btn_finish = this.page.locator("#finish");
        this.productItems = this.page.locator("//div[@class='cart_item_label']");
        this.itemTotal = this.page.locator("//div[@class='summary_subtotal_label']");
    }
    async getCheckoutStepTwoItems() {
        const productItem = await this.productItems.all();
        if (productItem.length === 0) return []
        return productItem.map((_, i) => new CheckoutStepTwoItems(this.page, i));
    }
    async clickCancle() { await this.btn_cancle.click() }
    async clickFinish() { await this.btn_finish.click() }
    async isDisPlayOk() { return await this.title.isVisible() }
    async getItemTotal() {
        const priceText = await this.itemTotal.textContent();
        return priceText ? parseFloat(priceText.replace(/[^0-9.]/g, "")) : 0;//neu ton tai price thi se thuc hien ben trai ,nguoc lai
    }
    async loginAndGoToCheckoutCompletePage() {
        const checkoutStepOne = new CheckoutStepOne(this.page);
        await checkoutStepOne.loginAndGoToCheckoutStepTwo();
        const checkoutStepTwo = new CheckoutStepTwo(this.page);
        await checkoutStepTwo.clickFinish();
    }
}
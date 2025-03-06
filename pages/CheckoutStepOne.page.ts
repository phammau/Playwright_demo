import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.page";
import { InventoryPage } from "./inventory.page";
import { CartPage } from "./CartPage.page";

export class CheckoutStepOne extends BasePage {
    private readonly title: Locator;
    private readonly firstName: Locator;
    private readonly lastName: Locator;
    private readonly postalCode: Locator;
    private readonly btn_continue: Locator;
    private readonly error: Locator;

    constructor(page: Page) {
        super(page);
        this.title = this.page.locator("//span[@class='title']");
        this.btn_continue = this.page.locator("#continue");
        this.firstName = this.page.locator("#first-name");
        this.lastName = this.page.locator("#last-name");
        this.postalCode = this.page.locator("#postal-code");
        this.error = this.page.locator("//h3[@data-test='error']");
    }
    async isDisPlayOk() { await this.title.isVisible() }
    async inputFirstName(firstname: string) { await this.firstName.fill(firstname) }
    async inputLastName(lastname: string) { await this.lastName.fill(lastname) }
    async inputPostalCode(code: string) { await this.postalCode.fill(code) }
    async clickBtnContinue() { await this.btn_continue.click() }
    async getError() { return await this.error.textContent() }
    async autoFillAndGoToCheckoutStepTwoPage() {
        await this.inputFirstName("abc");
        await this.inputLastName("edf");
        await this.inputPostalCode("1111");
        await this.clickBtnContinue();
    }
    async loginAndGoToCheckoutStepTwo() {
        const inventoryPage = new InventoryPage(this.page);
        await inventoryPage.clickShoppingCart();
        const cartPage = new CartPage(this.page);
        await cartPage.clickCheckout();
        await this.autoFillAndGoToCheckoutStepTwoPage();
    }
}
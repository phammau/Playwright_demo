import { Locator, Page } from "playwright-core";
import { BasePage } from "./BasePage.page";

export class CheckoutComplete extends BasePage {
    private readonly title: Locator;
    private readonly btn_backHome: Locator;

    constructor(page: Page) {
        super(page);
        this.title = this.page.locator("//span[@class='title']")
        this.btn_backHome = this.page.locator("#back-to-products");
    }
    async isDisplayOk() { await this.title.isVisible() }
    async clickBtnBackToHome() { await this.btn_backHome.click() }
}
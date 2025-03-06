import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.page";

export class CheckoutStepTwoItems extends BasePage {
    private readonly name: Locator;
    private readonly description: Locator;
    private readonly price: Locator;

    constructor(page: Page, index: number) {
        super(page);
        index++;
        this.name = this.page.locator("//div[@class='cart_item'][" + index + "]//div[@class='inventory_item_name']");
        this.price = this.page.locator("//div[@class='cart_item'][" + index + "]//div[@class='inventory_item_price']");
        this.description = this.page.locator("//div[@class='cart_item'][" + index + "]//div[@class='inventory_item_desc']");

    }
    async getName() { return await this.name.textContent() }
    async getDescription() { return await this.description.textContent() }
    async getPrice() {
        const priceText = await this.price.textContent();
        return priceText ? parseFloat(priceText.replace(/[^0-9.]/g, "")) : 0;
    }
}
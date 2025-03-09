import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.page";

export class ProductItem extends BasePage {
    private readonly name: Locator;
    private readonly image: Locator;
    private readonly description: Locator;
    private readonly price: Locator;
    private readonly btn_addToCart: Locator;
    private readonly remoteBtn: Locator;
    constructor(page: Page, index: number) {
        super(page);
        index++;
        this.description = this.page.locator("//div[@class='inventory_item'][" + index + "]//div[@class='inventory_item_desc']");
        this.name = this.page.locator("//div[@class='inventory_item'][" + index + "]//div[@class='inventory_item_name ']");
        this.image = this.page.locator("//div[@class='inventory_item'][" + index + "]//img[@class='inventory_item_img']");
        this.price = this.page.locator("//div[@class='inventory_item'][" + index + "]//div[@class='inventory_item_price']");
        this.btn_addToCart = this.page.locator("//div[@class='inventory_item'][" + index + "]//button[text()='Add to cart']");
        this.remoteBtn = this.page.locator("//div[@class='inventory_item'][" + index + "]//button[text()='Remove']");
    }
    async getPrice() {
        const priceText = await this.price.textContent();
        return priceText ? parseFloat(priceText.replace(/[^0-9.]/g, "")) : 0; // ep kieu
    }
    async getImage() { return await this.image.getAttribute("src") }
    async getDescription() { return await this.description.textContent() }
    async getName() { return await this.name.textContent() }
    async clickAddToCartBtn() { await this.btn_addToCart.click() }
    async clickRemoteBtn() { await this.remoteBtn.click() }
    async clickName() { await this.name.click() }
}
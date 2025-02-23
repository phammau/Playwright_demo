import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.page";

export class InventoryItem extends BasePage{
    private readonly btn_backToProduct: Locator
    private readonly name: Locator
    private readonly image: Locator
    private readonly description: Locator
    private readonly price: Locator 
    private readonly btn_addToCart: Locator

    constructor(page: Page) {
        super(page);
        this.btn_backToProduct = this.page.locator("#back-to-products")
        this.name = this.page.locator("//div[@data-test='inventory-item-name']")
        this.description = this.page.locator("//div[@data-test='inventory-item-desc']")
        this.price =  this.page.locator("//div[@data-test='inventory-item-price']")
        this.btn_addToCart = this.page.locator("#add-to-cart")
        this.image = this.page.locator("//img[@class='inventory_details_img']")
    }

    async getName() { return await this.name.textContent() }
    
    async getImage() { return await this.image.getAttribute("src") }
    
    async getDescription() { return await this.description.textContent() }
    
    async getPrice() {
        const priceText =  await this.price.textContent()
        return priceText? parseFloat(priceText) : 0
    }

    async clickBtnBackToProduct() { await this.btn_backToProduct.click() }
}
import { Locator, Page } from "@playwright/test";

export class ProductItem {
    private readonly page: Page
    private readonly name: Locator
    private readonly image: Locator
    private readonly description: Locator
    private readonly price: Locator
    private readonly addToCartBtn: Locator
    private readonly remoteBtn: Locator
    
    constructor(page: Page, index: number) {
        this.page = page
        index++
        this.description = this.page.locator("//div[@class='inventory_item'][" + index + "]//div[@class='inventory_item_desc']")
        this.name = this.page.locator("//div[@class='inventory_item'][" + index + "]//div[@class='inventory_item_name ']")
        this.image = this.page.locator("//div[@class='inventory_item'][" + index + "]//img[@class='inventory_item_img']")
        this.price = this.page.locator("//div[@class='inventory_item'][" + index + "]//div[@class='inventory_item_price']")
        this.addToCartBtn = this.page.locator("//div[@class='inventory_item'][" + index + "]//button[text()='Add to cart']")
        this.remoteBtn = this.page.locator("//div[@class='inventory_item'][" + index + "]//button[text()='Remove']")
    }

    async getPrice() {
        return await this.price.textContent()  
    }

    async getImage() {
        return await this.image.getAttribute("src")
    }

    async getDescription() {
        return await this.description.textContent()
    }

    async getName() {
        return await this.name.textContent()
    }

    async clickAddToCartBtn() {
        await this.addToCartBtn.click()
    }

    async clickRemoteBtn() {
        await this.remoteBtn.click()
    }
}
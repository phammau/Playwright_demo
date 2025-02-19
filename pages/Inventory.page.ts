import { Locator, Page } from "@playwright/test";
import { ProductItem } from '../pages/ProductItem.page'
import { BasePage } from '../pages/BasePage.page'

export class InventoryPage extends BasePage{
    private readonly header: Locator
    private readonly cartCount: Locator
    private readonly productElements: Locator

    constructor(page: Page) {
        super(page)
        this.header =  this.page.locator("//span[text()='Products']")
        this.cartCount = this.page.locator("//a[@class='shopping_cart_link']")
        this.productElements = this.page.locator("//div[@class='inventory_item']")
    }

    isDisPlayOk() {
        return this.header.isVisible()
    }
    
    async getCartCount() {
        const count = await this.cartCount.textContent()
        if (count == "" || count == null) {
            return 0
        }
        return Number(count)
    }

    async getProductItem() {
        const elements = await this.productElements.all()
        if (elements.length ==0) {
            return []
        }
        const productItems: ProductItem[] = []
        for (let i = 0; i<elements.length; i++) {
            const productItem = new ProductItem(this.page,i)
            productItems.push(productItem)
        }
        return productItems
    }
   
}
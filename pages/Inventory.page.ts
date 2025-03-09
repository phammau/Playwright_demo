import { Locator, Page } from "@playwright/test";
import { ProductItem } from '../pages/ProductItem.page'
import { BasePage } from '../pages/BasePage.page'

export class InventoryPage extends BasePage {
    private readonly header: Locator;
    private readonly cartCount: Locator;
    private readonly productElements: Locator;
    private readonly sort: Locator;
    constructor(page: Page) {
        super(page);
        this.header = this.page.locator("//span[text()='Products']");
        this.cartCount = this.page.locator("//a[@class='shopping_cart_link']");
        this.productElements = this.page.locator("//div[@class='inventory_item']");
        this.sort = this.page.locator("//select[@data-test ='product-sort-container']");
    }
    async getCartCount() {
        let count = await this.cartCount.textContent();
        if (!count) return 0;
        return Number(count);
    }
    async getProductItems() {
        const elements = await this.productElements.all();//Tìm tất cả sản phẩm trên trang
        if (elements.length === 0) return [];//đô dài mảng = 0 thì trả về mảng rổng
        return elements.map((_, i) => new ProductItem(this.page, i)); // trả về một mảng các đối tượng ProductItem, mỗi đối tượng đại diện cho một sản phẩm trên trang
    }
    isDisplayOk() { return this.header.isVisible() }
    async clickShoppingCart() { await this.cartCount.click() }
    async selectDropdownOption(locator: Locator, value: string) { await locator.selectOption({ value }) }
    async sortByPriceLowToHight() { await this.selectDropdownOption(this.sort, "lohi") }
    async sortByPriceHightToLow() { await this.selectDropdownOption(this.sort, "hilo") }
    async sortByNameAToZ() { await this.selectDropdownOption(this.sort, "az") }
    async sortByNameZToA() { await this.selectDropdownOption(this.sort, "za") }
}
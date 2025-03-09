import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.page";
import { CartItem } from "./CartItem.page";

export class CartPage extends BasePage {
    private readonly title: Locator;
    private readonly cartItems: Locator;
    private readonly btn_continueShopping: Locator;
    private readonly btn_checkout: Locator;
    private readonly cart: Locator;
    constructor(page: Page) {
        super(page);
        this.title = this.page.locator("//span[@class='title']");
        this.cartItems = this.page.locator("//div[@class='cart_item']");
        this.btn_checkout = this.page.locator("#checkout");
        this.btn_continueShopping = this.page.locator("//button[@data-test='continue-shopping']");
        this.cart = this.page.locator("//span[@data-test='shopping-cart-badge']");
    }
    async isDisplayOk() { await this.title.isVisible() }
    async clickShoppingContinue() { await this.btn_continueShopping.click() }
    async clickShoppingCart() { await this.cart.click() }
    async clickCheckout() { await this.btn_checkout.click() }
    async getCartItems() {
        const items = await this.cartItems.all();
        if (items.length === 0) return [];
        return items.map((_, i) => new CartItem(this.page, i));
    }
    async getCartCount() {
        if (!(await this.cart.isVisible())) {//neu khong co phan tu thi tra ve 0
            return 0;
        }
        let count = await this.cart.textContent();
        return count ? Number(count) : 0;
    }
} 
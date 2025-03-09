import { Locator, Page } from "@playwright/test";
import { BasePage } from "./BasePage.page";

export class LoginPage extends BasePage {
    private readonly input_username: Locator;
    private readonly input_password: Locator;
    private readonly btn_login: Locator;
    private readonly message_error: Locator;
    constructor(page: Page) {
        super(page);
        this.input_username = this.page.locator('#user-name');
        this.input_password = this.page.locator('#password');
        this.btn_login = this.page.locator('#login-button');
        this.message_error = this.page.locator("h3[data-test='error']");
    }
    async goto() { await this.page.goto('') }
    async inputUsername(username: string) { await this.input_username.fill(username) }
    async inputPassword(password: string) { await this.input_password.fill(password) }
    async clickBtnLogin() { await this.btn_login.click() }
    async getErrorMessage() { return await this.message_error.textContent() }
    async loginAuto() {
        await this.goto();
        await this.inputUsername("standard_user");
        await this.inputPassword("secret_sauce");
        await this.clickBtnLogin();
    }
}
import { Page } from "@playwright/test";
import { LoginPage } from "../pages/login.page";

export class BaseTest {
    private loginPage: LoginPage

    constructor() {}

    async loginAutoInventoryPage(page: Page) {
        this.loginPage =  new LoginPage(page)
        await this.loginPage.inputUsername("standard_user")
        await this.loginPage.inputPassword("secret_sauce")
        await this.loginPage.clickBtnLogin()
    }
}
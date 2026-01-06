/**
 * Menu Page Object Model
 * Contains all methods and interactions for the Hamburger Menu
 */

const { expect } = require("@playwright/test");
const Locators = require("../locators/locators");
const Config = require("../config/configLoader");

class MenuPage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Click hamburger menu button
     */
    async openMenu() {
        console.log("[MenuPage] Opening hamburger menu");
        await this.page.click(Locators.menu.hamburgerButton);
    }

    /**
     * Verify menu is visible
     */
    async verifyMenuIsVisible() {
        console.log("[MenuPage] Verifying menu is visible");
        await expect(this.page.locator(Locators.menu.menuContainer)).toBeVisible();
    }

    /**
     * Open and verify menu
     */
    async openAndVerifyMenu() {
        await this.openMenu();
        await this.verifyMenuIsVisible();
    }

    /**
     * Click logout menu item
     */
    async clickLogout() {
        console.log("[MenuPage] Clicking logout button");
        await this.page.click(Locators.menu.menuItemLogout);
    }

    /**
     * Perform logout action
     */
    async logout() {
        console.log("[MenuPage] Performing logout");
        await this.openAndVerifyMenu();
        await this.clickLogout();
    }

    /**
     * Click all items menu option
     */
    async clickAllItems() {
        console.log("[MenuPage] Clicking All Items menu option");
        await this.page.click(Locators.menu.menuItemAllItems);
    }

    /**
     * Click about menu option
     */
    async clickAbout() {
        console.log("[MenuPage] Clicking About menu option");
        await this.page.click(Locators.menu.menuItemAbout);
    }

    /**
     * Click reset app state menu option
     */
    async clickResetAppState() {
        console.log("[MenuPage] Clicking Reset App State menu option");
        await this.page.click(Locators.menu.menuItemResetAppState);
    }

    /**
     * Close menu
     */
    async closeMenu() {
        console.log("[MenuPage] Closing menu");
        await this.page.click(Locators.menu.closeMenuButton);
    }
}

module.exports = MenuPage;


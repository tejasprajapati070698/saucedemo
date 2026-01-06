/**
 * Cart Page Object Model
 * Contains all methods and interactions for the Cart page
 */

const { expect } = require("@playwright/test");
const Locators = require("../locators/locators");
const Config = require("../config/configLoader");

class CartPage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Get cart items locator
     * @returns {Locator} Cart items locator
     */
    getCartItems() {
        return this.page.locator(Locators.cart.cartItem);
    }

    /**
     * Verify number of items in cart
     * @param {number} expectedCount - Expected number of items
     */
    async verifyCartItemCount(expectedCount) {
        console.log(`[CartPage] Verifying ${expectedCount} items are in the cart`);
        const cartItems = this.getCartItems();
        await expect(cartItems).toHaveCount(expectedCount);
    }

    /**
     * Click checkout button
     */
    async clickCheckoutButton() {
        console.log("[CartPage] Clicking checkout button");
        await this.page.click(Locators.cart.checkoutButton);
    }

    /**
     * Navigate to checkout page
     */
    async navigateToCheckout() {
        console.log("[CartPage] Navigating to checkout page");
        await this.clickCheckoutButton();
        await expect(this.page).toHaveURL(Config.urls.checkoutUrl);
    }

    /**
     * Click continue shopping button
     */
    async clickContinueShopping() {
        console.log("[CartPage] Clicking continue shopping button");
        await this.page.click(Locators.cart.continueShoppingButton);
    }
}

module.exports = CartPage;


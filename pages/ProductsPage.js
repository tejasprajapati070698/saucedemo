/**
 * Products/Inventory Page Object Model
 * Contains all methods and interactions for the Products/Inventory page
 */

const { expect } = require("@playwright/test");
const Locators = require("../locators/locators");
const Config = require("../config/configLoader");

class ProductsPage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Add backpack to cart
     */
    async addBackpackToCart() {
        console.log("[ProductsPage] Adding Sauce Labs Backpack to cart");
        await this.page.click(Locators.products.addToCartBackpack);
    }

    /**
     * Add bike light to cart
     */
    async addBikeLightToCart() {
        console.log("[ProductsPage] Adding Sauce Labs Bike Light to cart");
        await this.page.click(Locators.products.addToCartBikeLight);
    }

    /**
     * Add bolt t-shirt to cart
     */
    async addBoltTShirtToCart() {
        console.log("[ProductsPage] Adding Sauce Labs Bolt T-Shirt to cart");
        await this.page.click(Locators.products.addToCartBoltTShirt);
    }

    /**
     * Add fleece jacket to cart
     */
    async addFleeceJacketToCart() {
        console.log("[ProductsPage] Adding Sauce Labs Fleece Jacket to cart");
        await this.page.click(Locators.products.addToCartFleeceJacket);
    }

    /**
     * Add onesie to cart
     */
    async addOnesieToCart() {
        console.log("[ProductsPage] Adding Sauce Labs Onesie to cart");
        await this.page.click(Locators.products.addToCartOnesie);
    }

    /**
     * Add red t-shirt to cart
     */
    async addTShirtRedToCart() {
        console.log("[ProductsPage] Adding Test.allTheThings() T-Shirt (Red) to cart");
        await this.page.click(Locators.products.addToCartTShirtRed);
    }

    /**
     * Add all products to cart
     */
    async addAllProductsToCart() {
        console.log("[ProductsPage] Adding all 6 products to cart");
        await this.addBackpackToCart();
        console.log("  - Added: Sauce Labs Backpack");
        await this.addBikeLightToCart();
        console.log("  - Added: Sauce Labs Bike Light");
        await this.addBoltTShirtToCart();
        console.log("  - Added: Sauce Labs Bolt T-Shirt");
        await this.addFleeceJacketToCart();
        console.log("  - Added: Sauce Labs Fleece Jacket");
        await this.addOnesieToCart();
        console.log("  - Added: Sauce Labs Onesie");
        await this.addTShirtRedToCart();
        console.log("  - Added: Test.allTheThings() T-Shirt (Red)");
    }

    /**
     * Get cart badge locator
     * @returns {Locator} Cart badge locator
     */
    getCartBadge() {
        return this.page.locator(Locators.products.cartBadge);
    }

    /**
     * Verify cart badge shows expected count
     * @param {number} expectedCount - Expected number of items in cart
     */
    async verifyCartBadgeCount(expectedCount) {
        console.log(`[ProductsPage] Verifying cart badge shows ${expectedCount} items`);
        const cartBadge = this.getCartBadge();
        await expect(cartBadge).toBeVisible();
        await expect(cartBadge).toHaveText(expectedCount.toString());
    }

    /**
     * Click cart icon to navigate to cart page
     */
    async clickCartIcon() {
        console.log("[ProductsPage] Clicking cart icon");
        await this.page.click(Locators.products.cartIcon);
    }

    /**
     * Navigate to cart page
     */
    async navigateToCart() {
        console.log("[ProductsPage] Navigating to cart page");
        await this.clickCartIcon();
        await expect(this.page).toHaveURL(Config.urls.cartUrl);
    }

    /**
     * Get product container by add-to-cart button locator
     * @param {string} addToCartLocator - Locator for the add-to-cart button
     * @returns {Locator} Product container locator
     */
    getProductContainer(addToCartLocator) {
        return this.page.locator(Locators.products.productContainer).filter({
            has: this.page.locator(addToCartLocator)
        });
    }

    /**
     * Verify product details (name, price, description, image)
     * @param {string} addToCartLocator - Locator for the add-to-cart button
     * @param {Object} expectedProduct - Expected product data (name, price, description)
     */
    async verifyProductDetails(addToCartLocator, expectedProduct) {
        console.log(`[ProductsPage] Verifying product details for: ${expectedProduct.name}`);
        const productContainer = this.getProductContainer(addToCartLocator);
        
        await expect(productContainer.locator(Locators.products.productName)).toHaveText(expectedProduct.name);
        await expect(productContainer.locator(Locators.products.productPrice)).toHaveText(expectedProduct.price);
        await expect(productContainer.locator(Locators.products.productDescription)).toContainText(expectedProduct.description);
        await expect(productContainer.locator(Locators.products.productImage)).toBeVisible();
        
        console.log(`  [✓] ${expectedProduct.name} - ${expectedProduct.price}`);
    }

    /**
     * Verify backpack product details
     * @param {Object} expectedProduct - Expected product data
     */
    async verifyBackpackDetails(expectedProduct) {
        await this.verifyProductDetails(Locators.products.addToCartBackpack, expectedProduct);
    }

    /**
     * Verify bike light product details
     * @param {Object} expectedProduct - Expected product data
     */
    async verifyBikeLightDetails(expectedProduct) {
        await this.verifyProductDetails(Locators.products.addToCartBikeLight, expectedProduct);
    }

    /**
     * Verify bolt t-shirt product details
     * @param {Object} expectedProduct - Expected product data
     */
    async verifyBoltTShirtDetails(expectedProduct) {
        await this.verifyProductDetails(Locators.products.addToCartBoltTShirt, expectedProduct);
    }

    /**
     * Verify fleece jacket product details
     * @param {Object} expectedProduct - Expected product data
     */
    async verifyFleeceJacketDetails(expectedProduct) {
        await this.verifyProductDetails(Locators.products.addToCartFleeceJacket, expectedProduct);
    }

    /**
     * Verify onesie product details
     * @param {Object} expectedProduct - Expected product data
     */
    async verifyOnesieDetails(expectedProduct) {
        await this.verifyProductDetails(Locators.products.addToCartOnesie, expectedProduct);
    }

    /**
     * Verify red t-shirt product details
     * @param {Object} expectedProduct - Expected product data
     */
    async verifyTShirtRedDetails(expectedProduct) {
        await this.verifyProductDetails(Locators.products.addToCartTShirtRed, expectedProduct);
    }

    /**
     * Verify all product details
     * @param {Object} productsData - Object containing all product test data
     */
    async verifyAllProductDetails(productsData) {
        console.log("[ProductsPage] Validating all product details");
        
        console.log("\n[STEP] Validating Backpack product details");
        await this.verifyBackpackDetails(productsData.backpack);
        
        console.log("[STEP] Validating Bike Light product details");
        await this.verifyBikeLightDetails(productsData.bikeLight);
        
        console.log("[STEP] Validating Bolt T-Shirt product details");
        await this.verifyBoltTShirtDetails(productsData.boltTShirt);
        
        console.log("[STEP] Validating Fleece Jacket product details");
        await this.verifyFleeceJacketDetails(productsData.fleeceJacket);
        
        console.log("[STEP] Validating Onesie product details");
        await this.verifyOnesieDetails(productsData.onesie);
        
        console.log("[STEP] Validating T-Shirt Red product details");
        await this.verifyTShirtRedDetails(productsData.tShirtRed);
    }
}

module.exports = ProductsPage;


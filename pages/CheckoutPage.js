/**
 * Checkout Page Object Model
 * Contains all methods and interactions for the Checkout page
 */

const { expect } = require("@playwright/test");
const Locators = require("../locators/locators");

class CheckoutPage {
    constructor(page) {
        this.page = page;
    }

    /**
     * Fill first name field
     * @param {string} firstName - First name to enter
     */
    async fillFirstName(firstName) {
        console.log(`[CheckoutPage] Filling first name: ${firstName}`);
        await this.page.fill(Locators.checkout.firstName, firstName);
    }

    /**
     * Fill last name field
     * @param {string} lastName - Last name to enter
     */
    async fillLastName(lastName) {
        console.log(`[CheckoutPage] Filling last name: ${lastName}`);
        await this.page.fill(Locators.checkout.lastName, lastName);
    }

    /**
     * Fill postal code field
     * @param {string} postalCode - Postal code to enter
     */
    async fillPostalCode(postalCode) {
        console.log(`[CheckoutPage] Filling postal code: ${postalCode}`);
        await this.page.fill(Locators.checkout.postalCode, postalCode);
    }

    /**
     * Fill all checkout information
     * @param {Object} checkoutData - Object containing firstName, lastName, postalCode
     */
    async fillCheckoutInformation(checkoutData) {
        console.log("[CheckoutPage] Filling checkout information");
        await this.fillFirstName(checkoutData.firstName);
        await this.fillLastName(checkoutData.lastName);
        await this.fillPostalCode(checkoutData.postalCode);
        console.log(`  - First Name: ${checkoutData.firstName}`);
        console.log(`  - Last Name: ${checkoutData.lastName}`);
        console.log(`  - Postal Code: ${checkoutData.postalCode}`);
    }

    /**
     * Verify first name field value
     * @param {string} expectedValue - Expected first name value
     */
    async verifyFirstName(expectedValue) {
        console.log(`[CheckoutPage] Verifying first name: ${expectedValue}`);
        await expect(this.page.locator(Locators.checkout.firstName)).toHaveValue(expectedValue);
    }

    /**
     * Verify last name field value
     * @param {string} expectedValue - Expected last name value
     */
    async verifyLastName(expectedValue) {
        console.log(`[CheckoutPage] Verifying last name: ${expectedValue}`);
        await expect(this.page.locator(Locators.checkout.lastName)).toHaveValue(expectedValue);
    }

    /**
     * Verify postal code field value
     * @param {string} expectedValue - Expected postal code value
     */
    async verifyPostalCode(expectedValue) {
        console.log(`[CheckoutPage] Verifying postal code: ${expectedValue}`);
        await expect(this.page.locator(Locators.checkout.postalCode)).toHaveValue(expectedValue);
    }

    /**
     * Verify all checkout information is filled correctly
     * @param {Object} checkoutData - Object containing firstName, lastName, postalCode
     */
    async verifyCheckoutInformation(checkoutData) {
        console.log("[CheckoutPage] Verifying checkout information is filled correctly");
        await this.verifyFirstName(checkoutData.firstName);
        await this.verifyLastName(checkoutData.lastName);
        await this.verifyPostalCode(checkoutData.postalCode);
    }

    /**
     * Verify checkout page elements are visible
     */
    async verifyCheckoutPageElements() {
        console.log("[CheckoutPage] Verifying checkout page elements are visible");
        await expect(this.page.locator(Locators.checkout.firstName)).toBeVisible();
        await expect(this.page.locator(Locators.checkout.lastName)).toBeVisible();
        await expect(this.page.locator(Locators.checkout.postalCode)).toBeVisible();
        await expect(this.page.locator(Locators.checkout.continueButton)).toBeVisible();
        await expect(this.page.locator(Locators.checkout.cancelButton)).toBeVisible();
    }

    /**
     * Click continue button
     */
    async clickContinueButton() {
        console.log("[CheckoutPage] Clicking continue button");
        await this.page.click(Locators.checkout.continueButton);
    }

    /**
     * Click cancel button
     */
    async clickCancelButton() {
        console.log("[CheckoutPage] Clicking cancel button");
        await this.page.click(Locators.checkout.cancelButton);
    }

    /**
     * Get error message locator
     * @returns {Locator} Error message locator
     */
    getErrorMessage() {
        return this.page.locator(Locators.checkout.errorMessage);
    }

    /**
     * Get cart items on checkout step two page
     * @returns {Locator} Cart items locator
     */
    getCheckoutStepTwoCartItems() {
        return this.page.locator(Locators.checkoutStepTwo.cartItem);
    }

    /**
     * Verify all products are visible on checkout step two page
     * @param {number} expectedCount - Expected number of products
     */
    async verifyAllProductsVisible(expectedCount) {
        console.log(`[CheckoutPage] Verifying all ${expectedCount} products are visible on checkout step two page`);
        const cartItems = this.getCheckoutStepTwoCartItems();
        
        // Verify the count matches expected
        await expect(cartItems).toHaveCount(expectedCount);
        console.log(`  [✓] Verified ${expectedCount} products are present`);
        
        // Verify each product is visible
        const count = await cartItems.count();
        for (let i = 0; i < count; i++) {
            const item = cartItems.nth(i);
            
            // Verify product name is visible
            const productName = item.locator(Locators.checkoutStepTwo.productName);
            await expect(productName).toBeVisible();
            
            // Verify product price is visible
            const productPrice = item.locator(Locators.checkoutStepTwo.productPrice);
            await expect(productPrice).toBeVisible();
            
            // Verify product description is visible (if present)
            const productDescription = item.locator(Locators.checkoutStepTwo.productDescription);
            if (await productDescription.count() > 0) {
                await expect(productDescription.first()).toBeVisible();
            }
            
            const name = await productName.textContent();
            const price = await productPrice.textContent();
            console.log(`  [✓] Product ${i + 1}: ${name.trim()} - ${price.trim()}`);
        }
        
        console.log(`[✓] All ${expectedCount} products are visible and validated`);
    }

    /**
     * Click finish button on checkout step two page
     */
    async clickFinishButton() {
        console.log("[CheckoutPage] Clicking finish button on checkout step two page");
        await expect(this.page.locator(Locators.checkoutStepTwo.finishButton)).toBeVisible();
        await this.page.click(Locators.checkoutStepTwo.finishButton);
        console.log("[✓] Finish button clicked successfully");
    }

    /**
     * Verify checkout step two page elements are visible
     */
    async verifyCheckoutStepTwoElements() {
        console.log("[CheckoutPage] Verifying checkout step two page elements are visible");
        await expect(this.page.locator(Locators.checkoutStepTwo.finishButton)).toBeVisible();
        await expect(this.page.locator(Locators.checkoutStepTwo.cancelButton)).toBeVisible();
        console.log("[✓] Checkout step two page elements are visible");
    }

    /**
     * Verify checkout complete page elements are visible
     */
    async verifyCheckoutCompleteElements() {
        console.log("[CheckoutPage] Verifying checkout complete page elements are visible");
        
        // Verify completion header (usually contains "Thank you for your order!")
        await expect(this.page.locator(Locators.checkoutComplete.completeHeader)).toBeVisible();
        console.log("  [✓] Completion header is visible");
        
        // Verify completion text/message
        await expect(this.page.locator(Locators.checkoutComplete.completeText)).toBeVisible();
        console.log("  [✓] Completion message is visible");
        
        // Verify back home button is visible
        await expect(this.page.locator(Locators.checkoutComplete.backHomeButton)).toBeVisible();
        console.log("  [✓] Back home button is visible");
        
        // Verify pony express image/icon is visible
        await expect(this.page.locator(Locators.checkoutComplete.ponyExpressImage)).toBeVisible();
        console.log("  [✓] Pony express image is visible");
        
        console.log("[✓] All checkout complete page elements are visible");
    }

    /**
     * Verify checkout completion message text
     * @param {string} expectedHeader - Expected header text (default: "Thank you for your order!")
     */
    async verifyCompletionHeader(expectedHeader = "Thank you for your order!") {
        console.log(`[CheckoutPage] Verifying completion header text: "${expectedHeader}"`);
        const header = this.page.locator(Locators.checkoutComplete.completeHeader);
        await expect(header).toBeVisible();
        await expect(header).toHaveText(expectedHeader);
        console.log(`[✓] Completion header verified: "${expectedHeader}"`);
    }

    /**
     * Verify checkout completion message text
     * @param {string} expectedText - Expected completion message text
     */
    async verifyCompletionText(expectedText) {
        console.log(`[CheckoutPage] Verifying completion message text`);
        const textElement = this.page.locator(Locators.checkoutComplete.completeText);
        await expect(textElement).toBeVisible();
        if (expectedText) {
            await expect(textElement).toContainText(expectedText);
            console.log(`[✓] Completion message verified: contains "${expectedText}"`);
        } else {
            const text = await textElement.textContent();
            console.log(`[✓] Completion message is visible: "${text.trim()}"`);
        }
    }

    /**
     * Validate checkout complete page
     * Verifies all elements and messages on the checkout complete page
     */
    async validateCheckoutComplete() {
        console.log("[CheckoutPage] Validating checkout complete page");
        
        // Verify all page elements are visible
        await this.verifyCheckoutCompleteElements();
        
        // Verify completion header
        await this.verifyCompletionHeader("Thank you for your order!");
        
        // Verify completion message
        await this.verifyCompletionText("Your order has been dispatched");
        
        console.log("[✓] Checkout complete page validated successfully");
    }

    /**
     * Click back home button on checkout complete page
     */
    async clickBackHomeButton() {
        console.log("[CheckoutPage] Clicking back home button on checkout complete page");
        await expect(this.page.locator(Locators.checkoutComplete.backHomeButton)).toBeVisible();
        await this.page.click(Locators.checkoutComplete.backHomeButton);
        console.log("[✓] Back home button clicked successfully");
    }
}

module.exports = CheckoutPage;


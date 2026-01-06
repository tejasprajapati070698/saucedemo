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
}

module.exports = CheckoutPage;


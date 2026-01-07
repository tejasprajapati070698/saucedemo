const { test, expect } = require("@playwright/test");
const Config = require("../config/configLoader");
const LoginPage = require("../pages/Login");
const ProductsPage = require("../pages/ProductsPage");
const CartPage = require("../pages/cartPage");
const CheckoutPage = require("../pages/CheckoutPage");
const MenuPage = require("../pages/MenuPage");

test.describe("End-to-End Flow", () => {
    
    test.beforeEach(async ({ page }) => {
        // Navigate to the application's main page before each test
        const loginPage = new LoginPage(page);
        await loginPage.goto();
    });

    test("Verify Locked User is not able to login", async ({ page }) => {
        console.log("\n[TEST] Verify Locked User is not able to login");
        const loginPage = new LoginPage(page);
        
        // Step 1: Attempt login with locked user
        console.log(`[STEP 1] Attempting login with locked user: ${Config.testData.users.locked.username}`);
        await loginPage.attemptLoginWithLockedUser(
            Config.testData.users.locked.username,
            Config.testData.users.locked.password
        );
        
        // Step 2: Verify error message is displayed
        console.log("[STEP 2] Verifying error message is displayed");
        await loginPage.verifyErrorMessage("Epic sadface: Sorry, this user has been locked out.");
        console.log("[✓] Test passed: Locked user correctly prevented from logging in");
    });

    test("Validate username is required", async ({ page }) => {
        console.log("\n[TEST] Validate username is required");
        const loginPage = new LoginPage(page);
        
        // Step 1: Click login button without providing any inputs
        console.log("[STEP 1] Clicking login button without providing any inputs");
        await loginPage.attemptLoginWithoutUsername();
        
        // Step 2: Verify error message is displayed
        console.log("[STEP 2] Verifying error message for missing username");
        await loginPage.verifyErrorMessage("Epic sadface: Username is required");
        console.log("[✓] Test passed: Username required validation working correctly");
    });

    test("Validate password is required", async ({ page }) => {
        console.log("\n[TEST] Validate password is required");
        const loginPage = new LoginPage(page);
        
        // Step 1: Fill username but leave password empty
        console.log(`[STEP 1] Filling username: ${Config.testData.users.standard.username}, leaving password empty`);
        await loginPage.attemptLoginWithoutPassword(Config.testData.users.standard.username);
        
        // Step 2: Verify error message is displayed
        console.log("[STEP 2] Verifying error message for missing password");
        await loginPage.verifyErrorMessage("Epic sadface: Password is required");
        console.log("[✓] Test passed: Password required validation working correctly");
    });

    test("Verify User Login Is Successful", async ({ page }) => {
        console.log("\n[TEST] Verify User Login Is Successful");
        const loginPage = new LoginPage(page);
        
        // Step 1: User logs in
        console.log(`[STEP 1] Logging in with user: ${Config.testData.users.standard.username}`);
        await loginPage.login(
            Config.testData.users.standard.username,
            Config.testData.users.standard.password
        );
        
        // Step 2: Verify successful navigation to inventory page
        console.log("[STEP 2] Verifying successful navigation to inventory page");
        await loginPage.verifySuccessfulLogin();
        console.log(`[✓] Test passed: User successfully logged in and redirected to ${Config.urls.inventoryUrl}`);
    });
   

    test("Add all Products to Cart and Verify Checkout Page", async ({ page }) => {
        console.log("\n[TEST] Add all Products to Cart and Verify Checkout Page");
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        const cartPage = new CartPage(page);
        const checkoutPage = new CheckoutPage(page);
        
        // Step 1: Login to the application
        console.log(`[STEP 1] Logging in with user: ${Config.testData.users.standard.username}`);
        await loginPage.login(
            Config.testData.users.standard.username,
            Config.testData.users.standard.password
        );
        await loginPage.verifySuccessfulLogin();
        console.log("[✓] Login successful");

        // Step 2: Add all products to cart
        console.log("[STEP 2] Adding all 6 products to cart");
        await productsPage.addAllProductsToCart();

        // Step 3: Verify cart badge shows correct count (6 products)
        console.log("[STEP 3] Verifying cart badge shows 6 items");
        await productsPage.verifyCartBadgeCount(6);
        console.log("[✓] Cart badge verified: 6 items");

        // Step 4: Navigate to cart page
        console.log("[STEP 4] Navigating to cart page");
        await productsPage.navigateToCart();
        console.log(`[✓] Navigated to cart page: ${Config.urls.cartUrl}`);

        // Step 5: Verify all items are in the cart (6 products)
        console.log("[STEP 5] Verifying all 6 items are in the cart");
        await cartPage.verifyCartItemCount(6);
        console.log("[✓] Verified: 6 items in cart");

        // Step 6: Navigate to checkout page
        console.log("[STEP 6] Clicking checkout button");
        await cartPage.navigateToCheckout();
        console.log(`[✓] Navigated to checkout page: ${Config.urls.checkoutUrl}`);

        // Step 7: Verify checkout page elements are visible
        console.log("[STEP 7] Verifying checkout page elements are visible");
        await checkoutPage.verifyCheckoutPageElements();
        console.log("[✓] All checkout page elements are visible");

        // Step 8: Fill checkout information
        console.log("[STEP 8] Filling checkout information");
        await checkoutPage.fillCheckoutInformation(Config.testData.checkout);

        // Step 9: Verify information is filled correctly
        console.log("[STEP 9] Verifying checkout information is filled correctly");
        await checkoutPage.verifyCheckoutInformation(Config.testData.checkout);
        console.log("[✓] Test passed: All products added to cart and checkout page validated successfully");

        console.log("[STEP 10] Click on Continue Button");
        await checkoutPage.clickContinueButton();
        console.log("[✓] Test passed: Continue Button is Clicked Successfully");

        // Step 11: Verify we're on checkout step two page
        console.log("[STEP 11] Verifying navigation to checkout step two page");
        await expect(page).toHaveURL(Config.urls.checkoutStepTwoUrl);
        await checkoutPage.verifyCheckoutStepTwoElements();
        console.log("[✓] Navigated to checkout step two page");

        // Step 12: Verify all products are visible on checkout step two page
        console.log("[STEP 12] Verifying all 6 products are visible on checkout step two page");
        await checkoutPage.verifyAllProductsVisible(6);
        console.log("[✓] All products are visible and validated");

        // Step 13: Click finish button
        console.log("[STEP 13] Clicking finish button");
        await checkoutPage.clickFinishButton();
        console.log("[✓] Finish button clicked successfully");

        // Step 14: Verify navigation to checkout complete page
        console.log("[STEP 14] Verifying navigation to checkout complete page");
        await expect(page).toHaveURL(Config.urls.checkoutCompleteUrl);
        console.log("[✓] Navigated to checkout complete page");

        // Step 15: Validate checkout complete page
        console.log("[STEP 15] Validating checkout complete page");
        await checkoutPage.validateCheckoutComplete();
        console.log("[✓] Checkout complete page validated successfully");
        console.log("[✓] Test passed: Complete checkout flow validated successfully from products to order confirmation");

    });

    test("Validate Product Details for Each Product", async ({ page }) => {
        console.log("\n[TEST] Validate Product Details for Each Product");
        const loginPage = new LoginPage(page);
        const productsPage = new ProductsPage(page);
        
        // Step 1: Login to the application
        console.log(`[STEP 1] Logging in with user: ${Config.testData.users.standard.username}`);
        await loginPage.login(
            Config.testData.users.standard.username,
            Config.testData.users.standard.password
        );
        await loginPage.verifySuccessfulLogin();
        console.log("[✓] Login successful");

        // Step 2: Validate all product details
        console.log("[STEP 2] Validating all product details");
        await productsPage.verifyAllProductDetails(Config.testData.products);
        console.log("[✓] Test passed: All product details validated successfully");
    });

    test("Verify User Logout Is Successful", async ({ page }) => {
        console.log("\n[TEST] Verify User Logout Is Successful");
        const loginPage = new LoginPage(page);
        const menuPage = new MenuPage(page);
        
        // Step 1: Login to the application
        console.log(`[STEP 1] Logging in with user: ${Config.testData.users.standard.username}`);
        await loginPage.login(
            Config.testData.users.standard.username,
            Config.testData.users.standard.password
        );
        await loginPage.verifySuccessfulLogin();
        console.log("[✓] Login successful");

        // Step 2: Perform logout
        console.log("[STEP 2] Performing logout");
        await menuPage.logout();
        console.log("[✓] Logout completed");

        // Step 3: Verify user is redirected to login page
        console.log("[STEP 3] Verifying user is redirected to login page");
        await expect(page).toHaveURL(Config.urls.baseUrl);
        await loginPage.verifyLoginPageElements();
        console.log("[✓] Test passed: User successfully logged out and redirected to login page");
    });
});
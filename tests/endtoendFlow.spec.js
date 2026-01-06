const { test, expect } = require("@playwright/test");
const Locators = require("../locators/locators");
const Config = require("../config/configLoader");

test.describe("End-to-End Flow", () => {
    
    test.beforeEach(async ({ page }) => {
        // Navigate to the application's main page before each test
        console.log(`\n[SETUP] Navigating to base URL: ${Config.urls.baseUrl}`);
        await page.goto(Config.urls.baseUrl);
    });
    test("Verify Locked User is not able to login", async ({ page }) => {
        console.log("\n[TEST] Verify Locked User is not able to login");
        // Step 1: User logs in
        console.log(`[STEP 1] Attempting login with locked user: ${Config.testData.users.locked.username}`);
        await page.fill(Locators.login.username, Config.testData.users.locked.username);
        await page.fill(Locators.login.password, Config.testData.users.locked.password);
        await page.click(Locators.login.loginButton);
        
        console.log("[STEP 2] Verifying error message is displayed");
        const errorMessage = page.locator(Locators.login.errorMessage);
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText("Epic sadface: Sorry, this user has been locked out.");
        console.log("[✓] Test passed: Locked user correctly prevented from logging in");
    });
    test("Validate username is required", async ({ page }) => {
        console.log("\n[TEST] Validate username is required");
        // Step 1: Click login button without providing any inputs
        console.log("[STEP 1] Clicking login button without providing any inputs");
        await page.click(Locators.login.loginButton);
        
        // Step 2: Verify error message is displayed
        console.log("[STEP 2] Verifying error message for missing username");
        const errorMessage = page.locator(Locators.login.errorMessage);
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText("Epic sadface: Username is required");
        console.log("[✓] Test passed: Username required validation working correctly");
    });
    test("Validate password is required", async ({ page }) => {
        console.log("\n[TEST] Validate password is required");
        // Step 1: Fill username but leave password empty
        console.log(`[STEP 1] Filling username: ${Config.testData.users.standard.username}, leaving password empty`);
        await page.fill(Locators.login.username, Config.testData.users.standard.username);
        await page.click(Locators.login.loginButton);
        
        // Step 2: Verify error message is displayed
        console.log("[STEP 2] Verifying error message for missing password");
        const errorMessage = page.locator(Locators.login.errorMessage);
        await expect(errorMessage).toBeVisible();
        await expect(errorMessage).toHaveText("Epic sadface: Password is required");
        console.log("[✓] Test passed: Password required validation working correctly");
    });
    test("Verify User Login Is Successful", async ({ page }) => {
        console.log("\n[TEST] Verify User Login Is Successful");
        // Step 1: User logs in
        console.log(`[STEP 1] Logging in with user: ${Config.testData.users.standard.username}`);
        await page.fill(Locators.login.username, Config.testData.users.standard.username);
        await page.fill(Locators.login.password, Config.testData.users.standard.password);
        await page.click(Locators.login.loginButton);
        
        console.log("[STEP 2] Verifying successful navigation to inventory page");
        await expect(page).toHaveURL(Config.urls.inventoryUrl);
        console.log(`[✓] Test passed: User successfully logged in and redirected to ${Config.urls.inventoryUrl}`);
    });
   

    test("Add all Products to Cart and Verify Checkout Page", async ({ page }) => {
        console.log("\n[TEST] Add all Products to Cart and Verify Checkout Page");
        // Step 1: Login to the application
        console.log(`[STEP 1] Logging in with user: ${Config.testData.users.standard.username}`);
        await page.fill(Locators.login.username, Config.testData.users.standard.username);
        await page.fill(Locators.login.password, Config.testData.users.standard.password);
        await page.click(Locators.login.loginButton);
        await expect(page).toHaveURL(Config.urls.inventoryUrl);
        console.log("[✓] Login successful");

        // Step 2: Add all products to cart using individual locators
        console.log("[STEP 2] Adding all 6 products to cart");
        await page.click(Locators.products.addToCartBackpack);
        console.log("  - Added: Sauce Labs Backpack");
        await page.click(Locators.products.addToCartBikeLight);
        console.log("  - Added: Sauce Labs Bike Light");
        await page.click(Locators.products.addToCartBoltTShirt);
        console.log("  - Added: Sauce Labs Bolt T-Shirt");
        await page.click(Locators.products.addToCartFleeceJacket);
        console.log("  - Added: Sauce Labs Fleece Jacket");
        await page.click(Locators.products.addToCartOnesie);
        console.log("  - Added: Sauce Labs Onesie");
        await page.click(Locators.products.addToCartTShirtRed);
        console.log("  - Added: Test.allTheThings() T-Shirt (Red)");

        // Step 3: Verify cart badge shows correct count (6 products)
        console.log("[STEP 3] Verifying cart badge shows 6 items");
        const cartBadge = page.locator(Locators.products.cartBadge);
        await expect(cartBadge).toBeVisible();
        await expect(cartBadge).toHaveText('6');
        console.log("[✓] Cart badge verified: 6 items");

        // Step 4: Navigate to cart page
        console.log("[STEP 4] Navigating to cart page");
        await page.click(Locators.products.cartIcon);
        await expect(page).toHaveURL(Config.urls.cartUrl);
        console.log(`[✓] Navigated to cart page: ${Config.urls.cartUrl}`);

        // Step 5: Verify all items are in the cart (6 products)
        console.log("[STEP 5] Verifying all 6 items are in the cart");
        const cartItems = page.locator(Locators.cart.cartItem);
        await expect(cartItems).toHaveCount(6);
        console.log("[✓] Verified: 6 items in cart");

        // Step 6: Click checkout button
        console.log("[STEP 6] Clicking checkout button");
        await page.click(Locators.cart.checkoutButton);
        await expect(page).toHaveURL(Config.urls.checkoutUrl);
        console.log(`[✓] Navigated to checkout page: ${Config.urls.checkoutUrl}`);

        // Step 7: Verify checkout page elements are visible
        console.log("[STEP 7] Verifying checkout page elements are visible");
        await expect(page.locator(Locators.checkout.firstName)).toBeVisible();
        await expect(page.locator(Locators.checkout.lastName)).toBeVisible();
        await expect(page.locator(Locators.checkout.postalCode)).toBeVisible();
        await expect(page.locator(Locators.checkout.continueButton)).toBeVisible();
        await expect(page.locator(Locators.checkout.cancelButton)).toBeVisible();
        console.log("[✓] All checkout page elements are visible");

        // Step 8: Fill checkout information
        console.log("[STEP 8] Filling checkout information");
        await page.fill(Locators.checkout.firstName, Config.testData.checkout.firstName);
        await page.fill(Locators.checkout.lastName, Config.testData.checkout.lastName);
        await page.fill(Locators.checkout.postalCode, Config.testData.checkout.postalCode);
        console.log(`  - First Name: ${Config.testData.checkout.firstName}`);
        console.log(`  - Last Name: ${Config.testData.checkout.lastName}`);
        console.log(`  - Postal Code: ${Config.testData.checkout.postalCode}`);

        // Step 9: Verify information is filled correctly
        console.log("[STEP 9] Verifying checkout information is filled correctly");
        await expect(page.locator(Locators.checkout.firstName)).toHaveValue(Config.testData.checkout.firstName);
        await expect(page.locator(Locators.checkout.lastName)).toHaveValue(Config.testData.checkout.lastName);
        await expect(page.locator(Locators.checkout.postalCode)).toHaveValue(Config.testData.checkout.postalCode);
        console.log("[✓] Test passed: All products added to cart and checkout page validated successfully");
    });

    test("Validate Product Details for Each Product", async ({ page }) => {
        console.log("\n[TEST] Validate Product Details for Each Product");
        // Step 1: Login to the application
        console.log(`[STEP 1] Logging in with user: ${Config.testData.users.standard.username}`);
        await page.fill(Locators.login.username, Config.testData.users.standard.username);
        await page.fill(Locators.login.password, Config.testData.users.standard.password);
        await page.click(Locators.login.loginButton);
        await expect(page).toHaveURL(Config.urls.inventoryUrl);
        console.log("[✓] Login successful");

        // Helper function to get product container from add-to-cart button
        const getProductContainer = (addToCartLocator) => {
            return page.locator(Locators.products.productContainer).filter({
                has: page.locator(addToCartLocator)
            });
        };

        // Step 2: Validate Backpack product details
        console.log("\n[STEP 2] Validating Backpack product details");
        const backpackContainer = getProductContainer(Locators.products.addToCartBackpack);
        await expect(backpackContainer.locator(Locators.products.productName)).toHaveText(Config.testData.products.backpack.name);
        await expect(backpackContainer.locator(Locators.products.productPrice)).toHaveText(Config.testData.products.backpack.price);
        await expect(backpackContainer.locator(Locators.products.productDescription)).toContainText(Config.testData.products.backpack.description);
        await expect(backpackContainer.locator(Locators.products.productImage)).toBeVisible();
        console.log(`  [✓] Backpack: ${Config.testData.products.backpack.name} - ${Config.testData.products.backpack.price}`);

        // Step 3: Validate Bike Light product details
        console.log("[STEP 3] Validating Bike Light product details");
        const bikeLightContainer = getProductContainer(Locators.products.addToCartBikeLight);
        await expect(bikeLightContainer.locator(Locators.products.productName)).toHaveText(Config.testData.products.bikeLight.name);
        await expect(bikeLightContainer.locator(Locators.products.productPrice)).toHaveText(Config.testData.products.bikeLight.price);
        await expect(bikeLightContainer.locator(Locators.products.productDescription)).toContainText(Config.testData.products.bikeLight.description);
        await expect(bikeLightContainer.locator(Locators.products.productImage)).toBeVisible();
        console.log(`  [✓] Bike Light: ${Config.testData.products.bikeLight.name} - ${Config.testData.products.bikeLight.price}`);

        // Step 4: Validate Bolt T-Shirt product details
        console.log("[STEP 4] Validating Bolt T-Shirt product details");
        const boltTShirtContainer = getProductContainer(Locators.products.addToCartBoltTShirt);
        await expect(boltTShirtContainer.locator(Locators.products.productName)).toHaveText(Config.testData.products.boltTShirt.name);
        await expect(boltTShirtContainer.locator(Locators.products.productPrice)).toHaveText(Config.testData.products.boltTShirt.price);
        await expect(boltTShirtContainer.locator(Locators.products.productDescription)).toContainText(Config.testData.products.boltTShirt.description);
        await expect(boltTShirtContainer.locator(Locators.products.productImage)).toBeVisible();
        console.log(`  [✓] Bolt T-Shirt: ${Config.testData.products.boltTShirt.name} - ${Config.testData.products.boltTShirt.price}`);

        // Step 5: Validate Fleece Jacket product details
        console.log("[STEP 5] Validating Fleece Jacket product details");
        const fleeceJacketContainer = getProductContainer(Locators.products.addToCartFleeceJacket);
        await expect(fleeceJacketContainer.locator(Locators.products.productName)).toHaveText(Config.testData.products.fleeceJacket.name);
        await expect(fleeceJacketContainer.locator(Locators.products.productPrice)).toHaveText(Config.testData.products.fleeceJacket.price);
        await expect(fleeceJacketContainer.locator(Locators.products.productDescription)).toContainText(Config.testData.products.fleeceJacket.description);
        await expect(fleeceJacketContainer.locator(Locators.products.productImage)).toBeVisible();
        console.log(`  [✓] Fleece Jacket: ${Config.testData.products.fleeceJacket.name} - ${Config.testData.products.fleeceJacket.price}`);

        // Step 6: Validate Onesie product details
        console.log("[STEP 6] Validating Onesie product details");
        const onesieContainer = getProductContainer(Locators.products.addToCartOnesie);
        await expect(onesieContainer.locator(Locators.products.productName)).toHaveText(Config.testData.products.onesie.name);
        await expect(onesieContainer.locator(Locators.products.productPrice)).toHaveText(Config.testData.products.onesie.price);
        await expect(onesieContainer.locator(Locators.products.productDescription)).toContainText(Config.testData.products.onesie.description);
        await expect(onesieContainer.locator(Locators.products.productImage)).toBeVisible();
        console.log(`  [✓] Onesie: ${Config.testData.products.onesie.name} - ${Config.testData.products.onesie.price}`);

        // Step 7: Validate T-Shirt Red product details
        console.log("[STEP 7] Validating T-Shirt Red product details");
        const tShirtRedContainer = getProductContainer(Locators.products.addToCartTShirtRed);
        await expect(tShirtRedContainer.locator(Locators.products.productName)).toHaveText(Config.testData.products.tShirtRed.name);
        await expect(tShirtRedContainer.locator(Locators.products.productPrice)).toHaveText(Config.testData.products.tShirtRed.price);
        await expect(tShirtRedContainer.locator(Locators.products.productDescription)).toContainText(Config.testData.products.tShirtRed.description);
        await expect(tShirtRedContainer.locator(Locators.products.productImage)).toBeVisible();
        console.log(`  [✓] T-Shirt Red: ${Config.testData.products.tShirtRed.name} - ${Config.testData.products.tShirtRed.price}`);
        console.log("[✓] Test passed: All product details validated successfully");
    });

    test("Verify User Logout Is Successful", async ({ page }) => {
        console.log("\n[TEST] Verify User Logout Is Successful");
        // Step 1: Login to the application
        console.log(`[STEP 1] Logging in with user: ${Config.testData.users.standard.username}`);
        await page.fill(Locators.login.username, Config.testData.users.standard.username);
        await page.fill(Locators.login.password, Config.testData.users.standard.password);
        await page.click(Locators.login.loginButton);
        await expect(page).toHaveURL(Config.urls.inventoryUrl);
        console.log("[✓] Login successful");

        // Step 2: Open hamburger menu
        console.log("[STEP 2] Opening hamburger menu");
        await page.click(Locators.menu.hamburgerButton);
        await expect(page.locator(Locators.menu.menuContainer)).toBeVisible();
        console.log("[✓] Hamburger menu opened");

        // Step 3: Click logout button
        console.log("[STEP 3] Clicking logout button");
        await page.click(Locators.menu.menuItemLogout);
        console.log("[✓] Logout button clicked");

        // Step 4: Verify user is redirected to login page
        console.log("[STEP 4] Verifying user is redirected to login page");
        await expect(page).toHaveURL(Config.urls.baseUrl);
        await expect(page.locator(Locators.login.username)).toBeVisible();
        await expect(page.locator(Locators.login.password)).toBeVisible();
        await expect(page.locator(Locators.login.loginButton)).toBeVisible();
        console.log("[✓] Test passed: User successfully logged out and redirected to login page");
    });
});
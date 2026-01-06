/**
 * Centralized locators for SauceDemo application
 * All selectors and locators should be defined here for better maintainability
 */

const Locators = {
    // Login Page Locators
    login: {
        username: '[data-test="username"]',
        password: '[data-test="password"]',
        loginButton: '[data-test="login-button"]',
        profileLink: '#profile-link',
        errorMessage: '[data-test="error"]'
    },

    // Products/Inventory Page Locators
    products: {
        // Individual Add to Cart buttons for each product
        addToCartBackpack: '[data-test="add-to-cart-sauce-labs-backpack"]',
        addToCartBikeLight: '[data-test="add-to-cart-sauce-labs-bike-light"]',
        addToCartBoltTShirt: '[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]',
        addToCartFleeceJacket: '[data-test="add-to-cart-sauce-labs-fleece-jacket"]',
        addToCartOnesie: '[data-test="add-to-cart-sauce-labs-onesie"]',
        addToCartTShirtRed: '[data-test="add-to-cart-test.allthethings()-t-shirt-(red)"]',
        // Product item containers - locate by add-to-cart button, then find details within
        productContainer: '.inventory_item',
        productName: '[data-test="inventory-item-name"]',
        productPrice: '[data-test="inventory-item-price"]',
        productDescription: '.inventory_item_desc',
        productImage: '.inventory_item_img img',
        // Generic locators
        removeButton: 'button[data-test*="remove"]',
        cartBadge: '.shopping_cart_badge',
        cartIcon: '.shopping_cart_link',
        inventoryItem: '.inventory_item'
    },

    // Cart Page Locators
    cart: {
        cartItem: '.cart_item',
        checkoutButton: '[data-test="checkout"]',
        continueShoppingButton: '[data-test="continue-shopping"]',
        removeButton: 'button[data-test*="remove"]'
    },

    // Checkout Page Locators
    checkout: {
        firstName: '[data-test="firstName"]',
        lastName: '[data-test="lastName"]',
        postalCode: '[data-test="postalCode"]',
        continueButton: '[data-test="continue"]',
        cancelButton: '[data-test="cancel"]',
        errorMessage: '[data-test="error"]'
    },

    // Hamburger Menu Locators
    menu: {
        hamburgerButton: '#react-burger-menu-btn',
        menuContainer: '.bm-menu',
        menuItemAllItems: '[data-test="inventory-sidebar-link"]',
        menuItemAbout: '[data-test="about-sidebar-link"]',
        menuItemLogout: '[data-test="logout-sidebar-link"]',
        menuItemResetAppState: '[data-test="reset-sidebar-link"]',
        closeMenuButton: '#react-burger-cross-btn'
    }
};

module.exports = Locators;


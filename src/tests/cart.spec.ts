import { test, expect } from '../fixtures/testFixtures';
import users from '../fixtures/users';

const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
  boltShirt: 'Sauce Labs Bolt T-Shirt',
};

test.describe('Shopping Cart', () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('should add a single item and update cart badge', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);

    await expect(inventoryPage.cartBadge).toHaveText('1');

    await inventoryPage.visitCart();
    await expect(page).toHaveURL(/cart/);

    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain(PRODUCTS.backpack);
  });

  test('should add multiple items and show all of them in the cart', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);
    await inventoryPage.addProductToCart(PRODUCTS.boltShirt);

    await expect(inventoryPage.cartBadge).toHaveText('3');

    await inventoryPage.visitCart();
    await expect(page).toHaveURL(/cart/);

    const cartItems = await cartPage.getCartItemNames();

    expect(cartItems).toContain(PRODUCTS.backpack);
    expect(cartItems).toContain(PRODUCTS.bikeLight);
    expect(cartItems).toContain(PRODUCTS.boltShirt);
    expect(cartItems.length).toBe(3);
  });

  test('should remove an item from the cart and update cart state', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);

    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.visitCart();
    await expect(page).toHaveURL(/cart/);

    await cartPage.removeItemByName(PRODUCTS.bikeLight);

    const cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain(PRODUCTS.backpack);
    expect(cartItems).not.toContain(PRODUCTS.bikeLight);

    await expect(page.locator('[data-test="shopping-cart-link"]')).toContainText('1');
  });

  test('should persist cart across page navigation', async ({
    inventoryPage,
    cartPage,
    page,
  }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);

    await expect(inventoryPage.cartBadge).toHaveText('2');

    await inventoryPage.visitCart();
    await expect(page).toHaveURL(/cart/);

    let cartItems = await cartPage.getCartItemNames();
    expect(cartItems).toContain(PRODUCTS.backpack);
    expect(cartItems).toContain(PRODUCTS.bikeLight);

    await cartPage.continueShopping();
    await expect(page).toHaveURL(/inventory/);

    await inventoryPage.visitCart();
    cartItems = await cartPage.getCartItemNames();

    expect(cartItems).toContain(PRODUCTS.backpack);
    expect(cartItems).toContain(PRODUCTS.bikeLight);
    expect(cartItems.length).toBe(2);
  });
});
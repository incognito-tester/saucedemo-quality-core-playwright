import { Locator, Page } from '@playwright/test';

export class CartPage {
  readonly page: Page;
  readonly cartItems: Locator;
  readonly checkoutButton: Locator;
  readonly continueShoppingButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="inventory-item"]');
    this.checkoutButton = page.locator('[data-test="checkout"]');
    this.continueShoppingButton = page.locator('[data-test="continue-shopping"]');
  }

  async getCartItemNames() {
    return await this.page.locator('[data-test="inventory-item-name"]').allTextContents();
  }

  async removeItemByName(productName: string) {
    const item = this.page.locator('[data-test="inventory-item"]').filter({
      has: this.page.locator('[data-test="inventory-item-name"]', { hasText: productName }),
    });

    await item.getByRole('button', { name: 'Remove' }).click();
  }

  async goToCheckout() {
    await this.checkoutButton.click();
  }

  async continueShopping() {
    await this.continueShoppingButton.click();
  }
}
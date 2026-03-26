import { Locator, Page } from "@playwright/test";

export class CheckoutOverviewPage {
    readonly page: Page;
    readonly itemPrices: Locator;
    readonly subtotalLabel: Locator;
    readonly taxLabel: Locator;
    readonly totalLabel: Locator;
    readonly finishButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.itemPrices = page.locator('[data-test="inventory-item-price"]');
        this.subtotalLabel = page.locator('[data-test="subtotal-label"]');
        this.taxLabel = page.locator('[data-test="tax-label"]');
        this.totalLabel = page.locator('[data-test="total-label"]');
        this.finishButton = page.locator('[data-test="finish"]');
    }

    async getItemPrices() {
        return await this.itemPrices.allTextContents();
    }

    async getSubtotalText() {
        return (await this.subtotalLabel.textContent())?.trim() || '';
    }

    async getTaxtext() {
        return (await this.taxLabel.textContent())?.trim() || '';
    }

    async getTotalText() {
        return (await this.totalLabel.textContent())?.trim() || '';
    }

    async finishCheckout() {
        await this.finishButton.click();
    }
}
import { Locator, Page } from "@playwright/test";

export class InventoryPage {
    readonly page: Page;
    readonly item: Locator;
    readonly itemName: Locator;
    readonly itemPrice: Locator;
    readonly sortDropdown: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;
    
    constructor(page: Page) {
        this.page = page;
        this.item = page.locator('[data-test="inventory-item"]');
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.sortDropdown = page.locator('[data-test="product-sort-container"]');
        this.cartBadge = page.locator('[data-test="shopping-cart-badge"]');
        this.cartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    async getProductCount() {
        return await this.item.count();
    }

    async getProductNames() {
        return await this.itemName.allTextContents();
    }

    async getProductPrices() {
        return await this.itemPrice.allTextContents();
    }

    async sortBy(value: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.sortDropdown.selectOption(value);
    }

    async addProductToCart(productName: string) {
        const productCard = this.item.filter({
            has: this.page.locator('[data-test="inventory-item-name"]', {
             hasText: productName,
         }),
        });
        await productCard.getByRole('button', { name: 'Add to cart' }).click();
    }

    async removeProductFromCart(productName: string) {
        const productCard = this.item.filter({
            has: this.page.locator('[data-test="inventory-item-name"]', {
             hasText: productName,
         }),
        });
        await productCard.getByRole('button', { name: 'Remove' }).click();
    }

    async getCartBadgeCount() {
        if (await this.cartBadge.count()) {
            return Number((await this.cartBadge.textContent()) || '0');
        }
        return 0;
    }

    async visitCart() {
        await this.cartLink.click();
    }

    async getProductImages() {
        const products = this.item;
        const count = await products.count();
        const result: { name: string; src:string | null }[] = [];

        for (let i = 0; i < count; i++) {
            const product = products.nth(i);
            const name = (await product.locator('[data-test="inventory-item-name"]').textContent()) || '';
            const src = await product.locator('.inventory_item_img img').getAttribute('src');

            result.push({
                name: name.trim(),
                src,
            });
        }
        return result;
    }
}
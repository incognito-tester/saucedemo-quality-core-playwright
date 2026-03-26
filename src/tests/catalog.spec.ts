import { describe } from "node:test";
import { test, expect } from "../fixtures/testFixtures";
import users from '../fixtures/users.json';
import { parsePrice } from "../utils/priceUtil";
import { InventoryPage } from "../pages/InventoryPage";

test.describe('Product Catalog Tests', () => {
    test.beforeEach(async ({ loginPage, inventoryPage, page}) => {
        await loginPage.goto();
        await loginPage.login(users.standardUser.username, users.standardUser.password);
        await expect(page).toHaveURL(/inventory/);
        await expect(inventoryPage.item.first()).toBeVisible();
    });

    test('should laod products correctly with count, names and prices', async ({ inventoryPage }) => {
        const productcount = await inventoryPage.getProductCount();
        const productNames = await inventoryPage.getProductNames();
        const productPrices = await inventoryPage.getProductPrices();

        expect(productcount).toBeGreaterThan(0);
        expect(productNames.length).toBe(productcount);
        expect(productPrices.length).toBe(productcount);

        // validate names and prices format 
        for (const name of productNames) {
            expect(name.trim().length).toBeGreaterThan(0)
        }

        for (const price of productPrices) {
            expect(price).toMatch(/^\$\d+(\.\d{2})?$/);
        }
    }); 

    test('should sort products by name Z to A', async ({ inventoryPage }) => {
        await inventoryPage.sortBy('za');

        const actualNames =  await inventoryPage.getProductNames();
        const expectedNames =  [...actualNames].sort((a, b) => b.localeCompare(a));
        
        expect(actualNames).toEqual(expectedNames);
    });

    test('should sort products by name A to Z', async ({ inventoryPage }) => {
        await inventoryPage.sortBy('az');

        const actualNames =  await inventoryPage.getProductNames();
        const expectedNames =  [...actualNames].sort((a, b) => a.localeCompare(b));

        expect(actualNames).toEqual(expectedNames);
    });

    test('should sort products by price low to high', async ({ inventoryPage }) => {
        await inventoryPage.sortBy('lohi');

        const actualPrices = (await inventoryPage.getProductPrices()).map(parsePrice);
        const expectedPrices = [...actualPrices].sort((a, b) => a - b);

        expect(actualPrices).toEqual(expectedPrices);
    });

    test('should detect image issue for problem user', async ({ loginPage, inventoryPage, page }) => {
        await loginPage.goto();
        await loginPage.login(users.problemUser.username, users.problemUser.password);

        await expect(page).toHaveURL(/inventory/);

        const productImages = await inventoryPage.getProductImages();

        expect(productImages.length).toBeGreaterThan(0);

        // Set automatically removes the duplicates
        const imageSrcSet = new Set(
            productImages
                .map((item) => item.src)
                .filter((src): src is string => Boolean(src))
        );

        // problem_user shows repeated image sources in this case
        // so we expect fewer unique image src values than total products.
         expect(imageSrcSet.size).toBeLessThan(productImages.length);
    });
});
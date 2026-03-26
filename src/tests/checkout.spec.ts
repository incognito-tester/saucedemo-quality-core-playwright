import { test, expect } from '../fixtures/testFixtures';
import users from '../fixtures/users';
import checkoutData from '../fixtures/checkoutData.json';
import { parsePrice, roundToTwo } from '../utils/priceUtil';

const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
  bikeLight: 'Sauce Labs Bike Light',
};

test.describe('Checkout Flow', () => {
  test.beforeEach(async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL(/inventory/);
  });

  test('should complete a full purchase with valid details', async ({
    inventoryPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    page,
  }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);

    await inventoryPage.visitCart();
    await expect(page).toHaveURL(/cart/);

    await cartPage.goToCheckout();
    await expect(page).toHaveURL(/checkout-step-one/);

    await checkoutInformationPage.fillCheckoutInfo(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );

    await checkoutInformationPage.proceedCheckout();
    await expect(page).toHaveURL(/checkout-step-two/);

    await checkoutOverviewPage.finishCheckout();
    await expect(page).toHaveURL(/checkout-complete/);

    await expect(checkoutCompletePage.completeHeader).toContainText(
      'Thank you for your order'
    );
    await expect(checkoutCompletePage.completeText).toBeVisible();
  });

  for (const missingFieldCase of checkoutData.missingFieldCases) {
    test(`should block checkout when ${missingFieldCase.label}`, async ({
      inventoryPage,
      cartPage,
      checkoutInformationPage,
      page,
    }) => {
      await inventoryPage.addProductToCart(PRODUCTS.backpack);
      await inventoryPage.visitCart();

      await cartPage.goToCheckout();
      await expect(page).toHaveURL(/checkout-step-one/);

      await checkoutInformationPage.fillCheckoutInfo(
        missingFieldCase.firstName,
        missingFieldCase.lastName,
        missingFieldCase.postalCode
      );

      await checkoutInformationPage.proceedCheckout();

      await expect(checkoutInformationPage.errorMessage).toBeVisible();
      await expect(page).toHaveURL(/checkout-step-one/);
    });
  }

  test('should validate order summary calculation correctly', async ({
    inventoryPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    page,
  }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.addProductToCart(PRODUCTS.bikeLight);

    await inventoryPage.visitCart();
    await cartPage.goToCheckout();

    await checkoutInformationPage.fillCheckoutInfo(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );

    await checkoutInformationPage.proceedCheckout();
    await expect(page).toHaveURL(/checkout-step-two/);

    const itemPrices = (await checkoutOverviewPage.getItemPrices()).map(parsePrice);
    const calculatedItemTotal = roundToTwo(
      itemPrices.reduce((sum:number, price:number) => sum + price, 0)
    );

    const displayedItemTotal = parsePrice(await checkoutOverviewPage.getSubtotalText());
    const displayedTax = parsePrice(await checkoutOverviewPage.getTaxtext());
    const displayedFinalTotal = parsePrice(await checkoutOverviewPage.getTotalText());

    expect(displayedItemTotal).toBe(calculatedItemTotal);
    expect(displayedFinalTotal).toBe(roundToTwo(displayedItemTotal + displayedTax));
  });

  test('should verify confirmation screen content after successful checkout', async ({
    inventoryPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    page,
  }) => {
    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.visitCart();
    await cartPage.goToCheckout();

    await checkoutInformationPage.fillCheckoutInfo(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );

    await checkoutInformationPage.proceedCheckout();
    await checkoutOverviewPage.finishCheckout();

    await expect(page).toHaveURL(/checkout-complete/);
    await expect(checkoutCompletePage.completeHeader).toHaveText(
      'Thank you for your order!'
    );
    await expect(checkoutCompletePage.completeText).toContainText(
      'Your order has been dispatched'
    );
    await expect(checkoutCompletePage.backHomeButton).toBeVisible();
  });
});
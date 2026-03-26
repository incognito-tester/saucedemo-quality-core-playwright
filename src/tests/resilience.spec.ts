import { test, expect } from '../fixtures/testFixtures';
import users from '../fixtures/users';
import checkoutData from '../fixtures/checkoutData.json';

const PRODUCTS = {
  backpack: 'Sauce Labs Backpack',
};

test.describe('Performance and Resilience', () => {
  test('performance_glitch_user should log in successfully with smart waits', async ({
    loginPage,
    inventoryPage,
    page,
  }) => {
    const startTime = Date.now();

    await loginPage.goto();
    await loginPage.login(
      users.performanceUser.username,
      users.performanceUser.password
    );

    await expect(page).toHaveURL(/inventory/);
    await expect(inventoryPage.item.first()).toBeVisible();

    const endTime = Date.now();
    const loginDurationMs = endTime - startTime;

    test.info().annotations.push({
      type: 'performance',
      description: `Login completed in ${loginDurationMs} ms`,
    });
  });

  test('error_user should be able to reach checkout overview before the failure point', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.errorUser.username, users.errorUser.password);

    await expect(page).toHaveURL(/inventory/);

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.visitCart();

    await cartPage.goToCheckout();

    await checkoutInformationPage.fillCheckoutInfo(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );

    await checkoutInformationPage.proceedCheckout();

    await expect(page).toHaveURL(/checkout-step-two/);
    await expect(checkoutOverviewPage.finishButton).toBeVisible();
  });

  test('error_user should expose a failure on finish action instead of reaching confirmation page', async ({
    loginPage,
    inventoryPage,
    cartPage,
    checkoutInformationPage,
    checkoutOverviewPage,
    checkoutCompletePage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.errorUser.username, users.errorUser.password);

    await expect(page).toHaveURL(/inventory/);

    await inventoryPage.addProductToCart(PRODUCTS.backpack);
    await inventoryPage.visitCart();
    await cartPage.goToCheckout();

    await checkoutInformationPage.fillCheckoutInfo(
      checkoutData.validCustomer.firstName,
      checkoutData.validCustomer.lastName,
      checkoutData.validCustomer.postalCode
    );

    await checkoutInformationPage.proceedCheckout();
    await expect(page).toHaveURL(/checkout-step-two/);

    await checkoutOverviewPage.finishCheckout();

    // Commonly observed behavior for error_user:
    // the finish action does not complete checkout successfully.
    await expect(page).not.toHaveURL(/checkout-complete/);
    await expect(checkoutCompletePage.completeHeader).not.toBeVisible();
    await expect(checkoutOverviewPage.finishButton).toBeVisible();
  });
});
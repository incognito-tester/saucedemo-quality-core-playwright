import { test, expect } from '../fixtures/testFixtures';
import users from '../fixtures/users.json';

test.describe('Authentication', () => {
  test('should login successfully with valid credentials', async ({
    loginPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);

    await expect(page).toHaveURL(/inventory/);
  });

  for (const invalidCase of users.invalidCases) {
    test(`should show an error for ${invalidCase.label}`, async ({
      loginPage,
      page,
    }) => {
      await loginPage.goto();
      await loginPage.login(invalidCase.username, invalidCase.password);

      await expect(loginPage.errorMessage).toBeVisible();
      await expect(page).toHaveURL(/saucedemo/);
    });
  }

  test('should block locked out user login', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('should logout successfully after login', async ({ loginPage, page }) => {
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);

    await expect(page).toHaveURL(/inventory/);

    await loginPage.logout();

    await expect(page).toHaveURL(/saucedemo/);
    await expect(loginPage.loginButton).toBeVisible();
  });

  test('should preserve session after page reload until logout', async ({
    loginPage,
    page,
  }) => {
    await loginPage.goto();
    await loginPage.login(users.standardUser.username, users.standardUser.password);

    await expect(page).toHaveURL(/inventory/);

    await page.reload();

    await expect(page).toHaveURL(/inventory/);
    await expect(page.locator('.title')).toContainText('Products');
  });
});
import { test, expect } from '../fixtures/testFixtures';
import users from '../fixtures/users'; 

test.describe('Authentication', () => {
  
  // DRY - navigate to login before every test
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test('should login successfully with valid credentials', async ({ loginPage, page }) => {
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL(/inventory/);
  });

  // Data-Driven testing for invalid scenarios
  for (const invalidCase of users.invalidCases) {
    test(`should show an error for ${invalidCase.label}`, async ({ loginPage }) => {
      await loginPage.login(invalidCase.username, invalidCase.password);
      
      // Verify exact error message from the user data provider
      await expect(loginPage.errorMessage).toHaveText(invalidCase.expectedError);
    });
  }

  test('should block locked out user login', async ({ loginPage }) => {
    await loginPage.login(users.lockedOutUser.username, users.lockedOutUser.password);

    await expect(loginPage.errorMessage).toContainText('locked out');
  });

  test('should logout successfully after login', async ({ loginPage, page }) => {
    await loginPage.login(users.standardUser.username, users.standardUser.password);
    await expect(page).toHaveURL(/inventory/);

    await loginPage.logout();

    await expect(page).toHaveURL(/saucedemo/);
    await expect(loginPage.loginButton).toBeVisible();
  });
});
import { Locator, Page } from '@playwright/test';

export class CheckoutCompletePage {
  readonly page: Page;
  readonly completeHeader: Locator;
  readonly completeText: Locator;
  readonly backHomeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.completeHeader = page.locator('[data-test="complete-header"]');
    this.completeText = page.locator('[data-test="complete-text"]');
    this.backHomeButton = page.locator('[data-test="back-to-products"]');
  }

  async getCompleteHeaderText() {
    return (await this.completeHeader.textContent())?.trim() || '';
  }

  async getCompleteText() {
    return (await this.completeText.textContent())?.trim() || '';
  }

  async backToHome() {
    await this.backHomeButton.click();
  }
}
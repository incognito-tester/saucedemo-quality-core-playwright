# Playwright Test Automation Framework — SauceDemo

This project is a production-oriented test automation framework built using Playwright. The focus is on clean structure, maintainability, and handling real-world test scenarios — not just passing tests.

---

## 1. Framework Choice & Rationale

**Stack:** Playwright + TypeScript + Allure + GitHub Actions

Playwright was chosen for its built-in auto-waiting, reliable execution, and strong TypeScript support. It reduces flakiness compared to Selenium and gives more flexibility than Cypress for end-to-end flows.

---

## 2. Architecture Overview

```text
.
├── .github/
│   └── workflows/
├── reports/
├── src/
│   ├── config/
│   │   └── env.ts
│   ├── fixtures/
│   │   ├── checkoutData.json
│   │   ├── testFixtures.ts
│   │   └── users.json
│   ├── pages/
│   │   ├── CartPage.ts
│   │   ├── CheckoutCompletePage.ts
│   │   ├── CheckoutInformationPage.ts
│   │   ├── CheckoutOverviewPage.ts
│   │   ├── InventoryPage.ts
│   │   └── LoginPage.ts
│   ├── tests/
│   │   ├── auth.spec.ts
│   │   ├── cart.spec.ts
│   │   ├── catalog.spec.ts
│   │   ├── checkout.spec.ts
│   │   └── resilience.spec.ts
│   └── utils/
│       └── priceUtil.ts
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
└── README.md
```
# Folder responsibilities:
. config/ holds environment-specific settings

. fixtures/ keeps shared test data and runtime fixtures

. pages/ contains Page Objects to separate UI interactions from test logic

. tests/ contains feature-based test specs

. utils/ contains reusable helper functions


```md
The framework is organized by responsibility, ensuring clear separation between test logic, UI interaction, and reusable utilities.
```

---

## 3. Setup & Run

```bash
git clone <repo>
cd <repo>
npm install
npx playwright install --with-deps
npm test 
```
Run specific test:
```bash
npx playwright test src/tests/catalog.spec.ts
```
## 4. CI/CD Pipeline

GitHub Actions runs on push and PR:

Install dependencies

Run tests

Upload reports

Reports can be downloaded from the Actions tab after each run.

## 5. Test Coverage Summary
Covered

Authentication (valid, invalid, locked users)

Product catalog (listing, sorting, image issues)

Cart (add/remove, persistence)

Checkout (E2E flow, validation, totals)

Resilience (slow users, error scenarios)

# Not Covered (by design)

Cross-browser matrix in CI

Visual diff tools

API testing

# Notes

No hardcoded waits (uses smart waits)

No hardcoded test data

Clean separation of concerns

Designed to scale with more tests and environments
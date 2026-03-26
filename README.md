# 🎭 QualityCore Playwright Framework — SauceDemo

![Playwright Tests](https://github.com/incognito-tester/saucedemo-quality-core-playwright/actions/workflows/ci.yml/badge.svg)

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
|       └── ci.yml
├── reports/
├── src/
│   ├── config/
│   │   └── env.ts
│   ├── fixtures/
│   │   ├── checkoutData.json
│   │   ├── testFixtures.ts
│   │   └── users.ts
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
├── .env
├── .env.example
├── .gitignore
├── package-lock.json
├── package.json
├── playwright.config.ts
└── README.md
```
# Folder responsibilities:

* **`config/`** — Holds environment-specific settings and `env.ts` mapping.
* **`fixtures/`** — Shared test data (JSON) and custom Playwright `test` extensions.
* **`pages/`** — Implements the **Page Object Model (POM)** to isolate UI selectors.
* **`tests/`** — Feature-based test specifications (e.g., Auth, Cart, Checkout).
* **`utils/`** — Reusable, framework-agnostic helper functions (e.g., price formatters).

---

## 3. Setup & Run

1. **Clone & Install:**
```bash
git clone <repo>
cd <repo>
npm install
npx playwright install --with-deps
```
2. **Environment Configuration:**
This project uses `dotenv` for secure credential management.

Copy the template: `cp .env.example .env`

Open `.env` and fill in the SauceDemo credentials (e.g., `STANDARD_USER=standard_user`).

3. **Execution:**

Run all tests
```bash
npx playwright test
```
Run specific test:
```bash
npx playwright test src/tests/catalog.spec.ts
```
Open HTML Report
```bash
npx playwright show-report
```

---

## 4. Reporting & Observability

This framework uses **Allure Report** for rich, graphical test execution insights.

### Local Reporting
To generate and view the Allure report locally:
1. **Generate Results:** `npx playwright test` (creates `allure-results` folder)
2. **Serve Report:** `npx allure serve allure-results`

### CI/CD Artifacts
Every GitHub Action run automatically captures:
* **Screenshots:** On every test failure.
* **Traces:** Full Playwright zip traces for debugging.
* **HTML Reports:** Downloadable from the "Actions" summary page.

---
## 5. CI/CD Pipeline (GitHub Actions)

The workflow (`ci.yml`) triggers on every Push and Pull Request.
* **Security:** Sensitive credentials are injected into the CI runner via **GitHub Actions Secrets**.
* **Artifacts:** On failure, Playwright Traces and Screenshots are uploaded as job artifacts for debugging.
* **Retention:** HTML Reports are stored for 30 days.

---

## 6. Test Coverage Summary
**Covered**

Authentication (valid, invalid, locked users)

Product catalog (listing, sorting, image issues)

Cart (add/remove, persistence)

Checkout (E2E flow, validation, totals)

Resilience (slow users, error scenarios)

**Not Covered (by design)**

Cross-browser matrix in CI

Visual diff tools

API testing

**Engineering Principles**

No hardcoded waits (uses smart waits)

No hardcoded test data

Clean separation of concerns

Designed to scale with more tests and environments
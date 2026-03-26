# Playwright Test Automation Framework — SauceDemo

This project is a production-oriented test automation framework built using Playwright. The focus is on clean structure, maintainability, and handling real-world test scenarios — not just passing tests.

---

## 1. Framework Choice & Rationale

**Stack:** Playwright + TypeScript + Allure + GitHub Actions

Playwright was chosen for its built-in auto-waiting, reliable execution, and strong TypeScript support. It reduces flakiness compared to Selenium and gives more flexibility than Cypress for end-to-end flows.

---

## 2. Architecture Overview

src/
├── tests/ → Test specs
├── pages/ → Page Objects
├── fixtures/ → Test data & custom fixtures
├── utils/ → Reusable helpers
└── config/ → Environment setup


Key ideas:
- **Page Objects** → keep UI logic separate from tests
- **Fixtures** → avoid repeated setup and improve readability
- **Utils** → reusable, single-purpose helpers (DRY)
- **Fail-safe locators** → reduce flaky tests

Tests focus only on behavior, not implementation.

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
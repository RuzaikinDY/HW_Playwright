const { test, expect } = require("@playwright/test");
const { chromium } = require("playwright");
const { email, password, failEmail, failPassword } = require("../user");


test("fail authorization", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });
  
  const page = await browser.newPage("https://netology.ru/");
  // await page.goto("https://netology.ru/");

  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', failEmail);
  await page.fill('[placeholder="Пароль"]', failPassword);
  await page.click('[data-testid="login-submit-btn"]');
  const error = await page.locator('[data-testid="login-error-hint"]');
  await expect(error).toHaveText("Вы ввели неправильно логин или пароль");
  browser.close();
}, 60000);

test("Pass authorization", async () => {
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500,
  });
  
  const page = await browser.newPage("https://netology.ru/");
  // await page.goto("https://netology.ru/");

  await page.getByRole("link", { name: "Войти" }).click();
  await expect(page).toHaveURL("https://netology.ru/?modal=sign_in");
  await page.fill('[placeholder="Email"]', email);
  await page.fill('[placeholder="Пароль"]', password);
  await page.click('[data-testid="login-submit-btn"]');
  await expect(page.locator("h2")).toContainText(["Мои курсы и профессии"]);
  browser.close();
}, 60000);
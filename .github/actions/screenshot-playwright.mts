import { chromium } from "@playwright/test";

const res = await fetch("http://localhost:3000");
if (!res.ok) {
  console.error("Failed to fetch the page:", res.statusText);
  process.exit(1);
} else {
  console.log("Page fetched successfully.");
}

await new Promise((resolve) => setTimeout(resolve, 10_000));

const browser = await chromium.launch();
const page = await browser.newPage();

await page.goto("http://localhost:3000");

await page.waitForLoadState("networkidle");

await page.screenshot({ path: "screenshot-playwright.png" });

await browser.close();

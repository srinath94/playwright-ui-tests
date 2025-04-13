import { Locator, Page } from "@playwright/test";
import { configDotenv } from "dotenv";

configDotenv();

export class HomePage {
  readonly page: Page;
  readonly acceptCookiesButton: Locator;
  readonly welcomeToThomannBanner: Locator;
  readonly cablesMenuButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.acceptCookiesButton = page.getByRole("button", { name: "small Alright!" });
    this.welcomeToThomannBanner = page.getByRole("heading", { name: "Welcome to Thomann" });
    this.cablesMenuButton = page.getByRole("link", { name: "Cables", exact: true });
  }

  async gotoStoreHomePage() {
    await this.page.goto(process.env.STORE_URL!);
  }

  async clickOnAcceptCookiesButton() {
    await this.acceptCookiesButton.click();
  }

  async navigateToCablesPage() {
    await this.cablesMenuButton.click();
  }
}

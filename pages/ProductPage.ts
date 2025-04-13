import { Page, Locator } from "@playwright/test";

export class ProductPage {
  readonly page: Page;
  readonly ProductTitleOnPage: Locator;
  readonly addtoBasketButton: Locator;
  readonly basketNotificationPopup: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ProductTitleOnPage = page.locator("div.fx-content-product__main.product-title h1");
    this.addtoBasketButton = page.getByRole("button", { name: "Add to Basket" });
    this.basketNotificationPopup = page.locator("#notifications-display");
  }

  async clickOnAddToBasket() {
    await this.addtoBasketButton.click();
  }

  async getProductTitleOnPage() :Promise<string> {
    return await this.ProductTitleOnPage.innerText();
  }
}

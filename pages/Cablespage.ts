import { Page, Locator } from "@playwright/test";

export class CablesPage {
  readonly page: Page;
  readonly cablesAndConnectorsText: Locator;
  readonly findSuitableCablesButton: Locator;
  readonly cableBeginningButton: Locator;
  readonly cableEndButton: Locator;
  readonly cableTypeWebElements: Locator;
  readonly parent: Locator;
  readonly cableWebElements: Locator;
  readonly cablesFoundText: Locator;
  readonly cableManufacturers: Locator;
  readonly cableManufacturerCount: Locator;
  readonly cablesOfFoundText: Locator;
  readonly numberOfCablesListed: Locator;
  readonly productsFiltered: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cablesAndConnectorsText = page.getByRole("heading", { name: "Cables and Connectors" });
    this.findSuitableCablesButton = page.getByRole("link", { name: "CableGuy CableGuy: Find" });
    this.cableBeginningButton = page.getByRole("button", { name: "cable beginning" });
    this.cableEndButton = page.getByRole("button", { name: "cable end" });
    this.cableTypeWebElements = page.locator("div.cg-plugmodal__category__item");
    this.parent = page.locator("div.batch").first();
    this.cableWebElements = this.parent.locator(".cg-plugItem");
    this.cablesFoundText = page.getByText("cables found");
    this.cableManufacturers = page.locator("div.cg-brands__header + div.scroll div.item");
    this.cableManufacturerCount = this.cableManufacturers.locator("div.cg-brands__item__count");
    this.cablesOfFoundText = page.getByText("cables of  found");
    this.numberOfCablesListed = page.locator("div.cg-articles-list > div[index]");
    this.productsFiltered = page.locator("div.product img.fx-image");
  }

  async clickOnFindSuitableCablesButton() {
    await this.findSuitableCablesButton.click();
  }

  async clickOnCableBeginningButton() {
    await this.cableBeginningButton.click();
  }

  async clickOnCableEndButtonButton() {
    await this.cableEndButton.click();
  }

  /**
   * Clicks a random cable type and then a random cable model.
   *
   * @returns {Promise<void>} Nothing is returned.
   * @throws {Error} If cables are not found or visible.
   */
  async selectRandomCableTypeAndModel(): Promise<void> {
    // Picks a random cable type and clicks it.
    // Waits until cables are shown.
    const totalCableTypeCount: number = await this.cableTypeWebElements.count();
    const randomTypeIndex: number = Math.floor(Math.random() * totalCableTypeCount);
    await this.cableTypeWebElements.nth(randomTypeIndex).click();
    await this.waitForCableFoundTextTobeVisible();

    // Picks a random cable model from the list and clicks it.
    // Waits again to make sure cables are loaded.
    const totalCableCount: number = await this.cableWebElements.count();
    const randomCableIndex: number = Math.floor(Math.random() * totalCableCount);
    await this.cableWebElements.nth(randomCableIndex).click();
    await this.waitForCableFoundTextTobeVisible();
  }

  /**
   * Waits for the "Cables Found" text element to become visible on the page.
   * If the element does not appear within the default timeout, throws an error.
   *
   * @throws {Error} When the "Cables Found" text is not found or not visible within the timeout.
   */
  private async waitForCableFoundTextTobeVisible() {
    try {
      await this.cablesFoundText.waitFor({ state: "visible" });
    } catch (error) {
      throw new Error("No Cables Found!");
    }
  }

  /**
   * Randomly selects a cable manufacturer from the list,
   * waits for the cables section to be visible and returns the number of cables
   * listed under the selected manufacturer.
   *
   * @returns {Promise<number>} The number of cables available for the selected manufacturer.
   */
  async selectRandomManufacturerAndReturnCount(): Promise<number> {
    const totalCableManufacturers: number = await this.cableManufacturers.count();
    const randomManufacturerIndex: number = Math.floor(Math.random() * totalCableManufacturers);
    await this.cableManufacturers.nth(randomManufacturerIndex).click();
    await this.cablesOfFoundText.waitFor({ state: "visible" });
    const cableCountunderManufacturer: string = await this.cableManufacturers.nth(randomManufacturerIndex).innerText();
    return Number(cableCountunderManufacturer);
  }

  /**
   * Iterates through paginated cable listing buttons (1, 2, 3, ...)
   * Clicks each page button and counts the number of cables listed.
   * Stops when a button with the next number is not found.
   *
   * @returns Total number of cables across all available pages
   */
  async getTotalCablesAcrossPages(): Promise<number> {
    let totalCables: number = 0;
    let i: number = 1;
    let isPaginationButtonVisible = false;

    while (true) {
      const paginationButton = this.page.getByRole("button", { name: String(i), exact: true });
      try {
        isPaginationButtonVisible = await paginationButton.isVisible();
      } catch (error) {
        isPaginationButtonVisible = false;
      }
      if (!isPaginationButtonVisible) break;
      await paginationButton.click();
      const cablesOnPage: number = await this.numberOfCablesListed.count();
      totalCables += cablesOnPage;
      i++;
    }
    return totalCables;
  }

  /**
   * Selects a random product from the filtered product list and returns its alt text (product name).
   *
   * @returns {Promise<string>} The alt text (product name) of the selected product.
   */
  async selectProductFromListAndReturnName(): Promise<string> {
    const productsOnPage: number = await this.productsFiltered.count();
    const randomProductIndex: number = Math.floor(Math.random() * productsOnPage);
    const productName: string = this.productsFiltered.nth(randomProductIndex).getAttribute("alt") as unknown as string;
    await this.productsFiltered.nth(randomProductIndex).click();
    return productName;
  }
}

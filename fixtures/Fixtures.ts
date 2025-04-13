import { CablesPage } from "../pages/Cablespage";
import { HomePage } from "../pages/Homepage";
import { ProductPage } from "../pages/ProductPage";
import { test as base } from "@playwright/test";

type Fixtures = {
  homePage: HomePage;
  cablePage: CablesPage;
  productPage: ProductPage;
};

export const test = base.extend<Fixtures>({
  /**
   * Home page fixture to handle repeated tasks for the store's homepage.
   *
   * 1. Navigates to the store homepage.
   * 2. Clicks the button to Accept Cookies.
   * 3. The homePage instance is then provided to the test for further actions.
   *
   */
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.gotoStoreHomePage();
    await homePage.clickOnAcceptCookiesButton();
    await use(homePage);
  },

  //Cable page Fixture
  cablePage: async ({ page }, use) => {
    const cablePage = new CablesPage(page);
    await use(cablePage);
  },

  //product page fixture
  productPage: async ({ page }, use) => {
    const productPage = new ProductPage(page);
    await use(productPage);
  },
});
export { expect } from "@playwright/test";

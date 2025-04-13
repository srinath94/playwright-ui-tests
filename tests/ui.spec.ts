import { expect, test } from "../fixtures/Fixtures";

test("Verify that the user can select a custom cable and add it to the basket", async ({ homePage, cablePage, productPage }) => {
  await expect(homePage.welcomeToThomannBanner).toBeVisible();
  await homePage.navigateToCablesPage();
  await expect(cablePage.cablesAndConnectorsText).toBeVisible();
  await cablePage.clickOnFindSuitableCablesButton();

  //click on cable beginning and choose random cable type and cable
  await cablePage.clickOnCableBeginningButton();
  await cablePage.selectRandomCableTypeAndModel();

  //click on cable End and choose random cable type and cable
  await cablePage.clickOnCableEndButtonButton();
  await cablePage.selectRandomCableTypeAndModel();

  // select a Random Manufacturer and return count under logo
  const cableCountunderManufacturerLogo: number = await cablePage.selectRandomManufacturerAndReturnCount();

  // return total cables count listed across the pages.
  const cablecountAcrossPages: number = await cablePage.getTotalCablesAcrossPages();

  //Cable count validation
  expect(cableCountunderManufacturerLogo).toBe(cablecountAcrossPages);

  // select a Random product from list and return it's name
  const productTitleSelected: string = await cablePage.selectProductFromListAndReturnName();

  //Get the name of the product on the product page
  const productNameOnPage: string = await productPage.getProductTitleOnPage();

  //verify the correct product page is opened.
  expect(productNameOnPage).toBe(productTitleSelected);

  await productPage.clickOnAddToBasket();

  // Assertion to verify the Basket Notification Popup has the correct product name.
  await expect(productPage.basketNotificationPopup).toContainText(`Item ${productTitleSelected} is now in the shopping basket.`);
});

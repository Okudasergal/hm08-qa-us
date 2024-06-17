const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const pnoneNumberModal = await $(page.phoneNumberModal);
        await expect(pnoneNumberModal).toBeExisting();
    })

    it('should save the phone', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumber = helper.getPhoneNumber("+1");
        await page.submitPhoneNumber(phoneNumber);
        await expect(await helper.getElementByText(phoneNumber)).toBeExisting();
    })

    it('should click supportive plan button', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const callATaxiButton = await $('page.callATaxiButton');
        const supportivePlanButton = await $('page.supportivePlanButton');
        await supportivePlanButton.waitForDisplay();
        await expect(supportivePlanButton).toBeDisplayed();
    })

    it('should order 2 ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        await page.selectSupportive();
        const plusIceCream = await $(page.plusIceCream);
        await plusIceCream.waitForDisplay();
        await plusIceCream.click();
        await plusIceCream.click();
        const iceCreamCount = await $(page.iceCreamCount).getText();
        await expect(iceCreamCount).toBe('2');
    })

})


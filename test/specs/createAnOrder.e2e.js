const page = require('../../page');
const helper = require('../../helper')

describe('Create an order', () => {
    it('should set an address', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const fromField = await $(page.fromField);
        const toField = await $(page.toField);
        await expect(fromField).toHaveValue('East 2nd Street, 601');
        await expect(toField).toHaveValue('1300 1st St');
    })

    it('should open phone number modal', async () => {
        await browser.url(`/`)
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const phoneNumberButton = await $(page.phoneNumberButton);
        await phoneNumberButton.waitForDisplayed();
        await phoneNumberButton.click();
        const phoneNumberModal = await $(page.phoneNumberModal);
        await expect(phoneNumberModal).toBeExisting();
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
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        await expect(supportivePlanButton).toBeDisplayed();
    })

    it('should add a credit card number and CVV in payment modal', async () => {
        await browser.url(`/`);
    
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
    
        const paymentMethodButton = await $(page.paymentMethodButton);
        console.log('Clicking Payment Method Button');
        await paymentMethodButton.waitForDisplayed();
        await paymentMethodButton.click();
    
        const addCardButton = await $(page.addCardButton);
        await addCardButton.waitForDisplayed();
        await addCardButton.click();
        
        const cardNumberField = await $(page.cardNumberField);
        await cardNumberField.waitForDisplayed();
        await cardNumberField.setValue('1234 0000 1420');
    
        const cvvCodeField = await $(page.cvvCodeField);
        await cvvCodeField.waitForDisplayed();
        await cvvCodeField.setValue('12');
    
        const linkButton = await $(page.linkButton);
        await linkButton.waitForDisplayed();
        await linkButton.click();
        await expect(paymentMethodButton).toBeExisting();
    });

    it('write a message to the driver', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const messageToDriver = await $(page.messageToDriver);
        await messageToDriver.waitForDisplayed();
        await messageToDriver.scrollIntoView();
        await messageToDriver.setValue('i need help.');
        await expect(messageToDriver).toBeExisting();
    })

    it('should order a Blanket and hankerchiefs', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const supportivePlanButton = await $(page.supportivePlanButton);
        await supportivePlanButton.waitForDisplayed();
        await supportivePlanButton.click();
        const blanketAndHankerchiefButton = await $(page.blanketAndHankerchiefButton);
        await blanketAndHankerchiefButton.waitForDisplayed();
        await blanketAndHankerchiefButton.click();
        await browser.pause(2000);
        await expect ($(page.blanketSwitch)).toBeChecked();
    })

    it('should order 2 ice creams', async () => {
        await browser.url(`/`);
        await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
        const plusIceCream = await $(page.plusIceCream);
        await plusIceCream.waitForDisplayed();
        await plusIceCream.click();
        await plusIceCream.click();
        const iceCreamCount = await $(page.iceCreamCount).getText();
        await expect(iceCreamCount).toBe('2');
    })

     it('should open the car search modal', async () => {
         await browser.url(`/`);
         await page.fillAddresses('East 2nd Street, 601', '1300 1st St');
         const orderButton = await $(page.orderButton);
         await orderButton.click();
         const carSearchModal = await $(page.carSearchModal);
         await expect(carSearchModal).toBeExisting();
    });
})


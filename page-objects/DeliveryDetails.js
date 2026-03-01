import { v4 as uuidv4 } from 'uuid';
import { deliveryDetails } from '../data/deliveryDetails';
import { expect } from '@playwright/test';

export class DeliveryDetails {

    //create the  constructor of the page
    constructor (page) {
        this.page = page
        //add the variables to the constructor
      
        this.firstName = page.locator('[data-qa="delivery-first-name"]')
        this.lastName = page.locator('[data-qa="delivery-last-name"]')
        this.street = page.locator('[data-qa="delivery-address-street"]')
        this.postCode = page.locator('[data-qa="delivery-postcode"]')
        this.city = page.locator('[data-qa="delivery-city"]')
        this.country = page.getByRole('combobox')
        this.saveAddressButton = page.getByRole('button', { name: 'Save address for next time' })
        this.addressContainer = page.locator('[data-qa="saved-address-container"]')
        this.savedFirstName = page.locator('[data-qa="saved-address-firstName"]')
        this.savedLastName =  page.locator('[data-qa="saved-address-lastName"]')
        this.savedStreet =  page.locator('[data-qa="saved-address-street"]')
        this.savedZipCode =  page.locator('[data-qa="saved-address-postcode"]')
        this.savedCity =  page.locator('[data-qa="saved-address-city"]')
        this.continuePayment = page.getByRole('button', { name: 'Continue to payment' })


        
    }

    fillDetails = async() => {
        await this.firstName.waitFor()
        await this.firstName.fill(deliveryDetails.firstName)
        await this.lastName.fill(deliveryDetails.lastName)
        await this.street.fill(deliveryDetails.street)
        await this.postCode.fill(deliveryDetails.postcode)
        await this.city.fill(deliveryDetails.city)
        await this.country.selectOption(deliveryDetails.country)

    }
    
    saveDetails = async() => {
        const addressBeforeSaving = await this.addressContainer.count()
        await this.saveAddressButton.waitFor()
        await this.saveAddressButton.click ()
        //await this.addressContainer.waitFor()
        await expect(this.addressContainer).toHaveCount(addressBeforeSaving + 1)// getting the quantity of address containers after saving address
        //asserting the address container to be equal to the input
        await this.savedFirstName.first().waitFor() // waiting for the item to be present
       // expect(await this.savedFirstName.first().innerText()).toBe(await this.firstName.inputValue())
        // 1. Create an object from the UI results
        const actualSavedData = {
            firstName: await this.savedFirstName.first().innerText(),
            lastName: await this.savedLastName.first().innerText(),
            street: await this.savedStreet.first().innerText(),
            postcode: await this.savedZipCode.first().innerText(),
            city: await this.savedCity.first().innerText(),
        };

        // 2. Perform the assertion against our stored input data
        // We use toMatchObject to compare the keys that exist in both
        expect(actualSavedData).toMatchObject({
        firstName: deliveryDetails.firstName,
        lastName: deliveryDetails.lastName,
        street: deliveryDetails.street,
        postcode: deliveryDetails.postcode,
        city: deliveryDetails.city,
        });

        // 3. Print the result to console
        console.log("✅ Saved Address matches Input Data:");
        console.table(actualSavedData);
        


    }

    continueToPayment = async() => {
        await this.continuePayment.waitFor()
        await this.continuePayment.click()
        await this.page.waitForURL(/\payment/, {timeout:3000})
 
    }

}

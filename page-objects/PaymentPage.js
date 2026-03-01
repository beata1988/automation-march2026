import { expect } from "@playwright/test"

import { paymentDetails } from "../data/paymentDetails"
export class PaymentPage {

    //create the  constructor of the page
    constructor (page) {
        this.page = page
        //add the variables to the constructor
        this.discountCode = page.frameLocator('[data-qa="active-discount-container"]') //grab the iframe container first
                            .locator('[data-qa="discount-code"]')
        // new element for the discount input
        this.discountInput = page.locator('[data-qa="discount-code-input"]')
        this.submitDiscount= page.locator('[data-qa="submit-discount-button"]')
        this.discountMessage = page.locator('[data-qa="discount-active-message"]')
        this.totalDiscount = page.locator('[data-qa="total-with-discount-value"]')
        this.totalValue = page.locator('[data-qa="total-value"]')
        this.ownerInput = page.getByRole('textbox', { name: 'Credit card owner' })
        this.numberInput = page.getByRole('textbox', { name: 'Credit card number' })
        this.expInput = page.getByRole('textbox', { name: 'Valid until' })
        this.cvcInput = page.getByRole('textbox', { name: 'Credit card CVC' })
        this.payButton = page.locator('[data-qa="pay-button"]')

       

    }

    activateDiscount = async() => {
        await this.discountCode.waitFor()
        const code = await this.discountCode.innerText()
        await this.discountInput.waitFor()
        
       //Option 1 for laggy inputs: using fill()
        // need to fill out the discount input
       await this.discountInput.fill(code)
      // await this.discountInput.pressSequentially(code, {delay:150});

       // wait to see that the input contains the value entered
        await expect(this.discountInput).toHaveValue(code)
        
        console.log(code)

         /*
         //OPTION 2 for laggy inputs (inputs that slow the typing)
        await this.discountInput.focus()// so the input is available
        await this.page.keyboard.type(code, {delay:1000})
        expect(await this.discountInput.inputValue()).toBe(code)
        */

        //await this.submitDiscount.waitFor()
        await this.submitDiscount.click({force:true}) // forzar el boton y que siga el flujo
       

        //await expect(this.discountMessage).toBeVisible()
        //await expect(this.totalDiscount).toBeVisible()
        await this.discountMessage.waitFor()
        await this.totalDiscount.waitFor()
        //get the discounted value to text
        const discountValueText = await this.totalDiscount.innerText()
        //const discountValueString = discountValueText.replace("$","")
        const discountOnly = discountValueText.slice(0)
        const discountNumber = parseInt(discountOnly, 10)
        console.log(discountNumber)
         //check that the discounted price is less than total
        const totalValueText = await this.totalValue.innerText()
        //const discountValueString = discountValueText.replace("$","")
        const totalValueOnly = totalValueText.slice(0)
        const totalNumber = parseInt(totalValueOnly, 10)
        console.log(totalNumber) 
        expect(discountNumber).toBeLessThan(totalNumber)

        

        



       


        //await this.page.pause()

         
    }

    fillPaymentDetails = async (paymentDetails) => {
        //await this.ownerInput.waitFor()
        await this.ownerInput.fill(paymentDetails.ccOwner)
        await this.numberInput.fill(paymentDetails.ccNumber)
        await this.expInput.fill(paymentDetails.expDate)
        await this.cvcInput.fill(paymentDetails.cvc)
        // 
       

    }

   completePayment = async (paymentDetails) => {
        //await this.payButton.waitFor()
        await this.payButton.click()
    
        await this.page.waitForURL(/\/thank-you/, {timeout:3000})

    }


}
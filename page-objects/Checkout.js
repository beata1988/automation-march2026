import {expect} from "@playwright/test"

export class Checkout{
        constructor(page){
            this.page =  page
            this.basketCards = page.locator('[data-qa="basket-card"]')
            this.basketItemPrice = page.locator('[data-qa="basket-item-price"]')
            this.basketItemRemoveButton = page.locator('[data-qa="basket-card-remove-item"]')
            this.continueToCheckoutButton = page.locator('[data-qa="continue-to-checkout"]')
        }

        removeCheapestItem = async () => {
                await this.basketCards.first().waitFor()
                const itemsBeforeRemoval = await this.basketCards.count() // getting the items before removal or 1 by counting the elements of the basket
                await this.basketItemPrice.first().waitFor()
                //getting all prices within a constant
                const allPriceTexts = await this.basketItemPrice.allInnerTexts()
                console.warn({allPriceTexts})//--imprime en consola todos los items de los cards

                //we must get the prices into a new array, manipulate it to turn them into numbers naming them element
                const justNumbers = allPriceTexts.map((element) => {
                    const withoutDollarSign = element.replace("$", "") // we take the elements (prices)and take the $ sign
                    return parseInt (withoutDollarSign, 10) // turn string to int
                    
                })
               //printing 
                console.warn({justNumbers})

                //store the smallest price
                const smallestPrice= Math.min(...justNumbers) // 3 dots spread operator expandir elements from array to be individual arguments
                console.log(smallestPrice)
                const smallestIndex = justNumbers.indexOf(smallestPrice)
                const specificRemoveBtn =this.basketItemRemoveButton.nth(smallestIndex)
                await specificRemoveBtn.waitFor()
                await specificRemoveBtn.click()
                await expect(this.basketCards).toHaveCount(itemsBeforeRemoval - 1) // validating the removal of 1 item

       



                //await this.page.pause()

                //regular expressions helper 
       
       
        }
        
        continueToCheckout = async() => {
                await this.continueToCheckoutButton.waitFor()
                await this.continueToCheckoutButton.click()
                await this.page.waitForURL(/\/login/, {timeout: 3000}) // we need to turn to a regular expression because /login only does not point to the correct one


        }



}
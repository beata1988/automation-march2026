import {expect} from "@playwright/test"

export class Navigation{

constructor (page) {
        this.page = page
        //add the variables to the constructor
        this.basketCounter = page.locator ('[data-qa ="header-basket-count"]')
        this.basketLink = page.getByRole('link', { name: 'Checkout' })

    }

    getBasketCount = async () => {
        
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
         return parseInt(text, 10)
       
    }

    goToCheckout= async () =>{
        await this.basketLink.waitFor()
        await this.basketLink.click()
        await this.page.waitForURL("/basket")//landing on the basket page


    }



     
      


}
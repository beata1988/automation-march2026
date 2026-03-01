import {expect} from "@playwright/test"
import { Navigation } from "./Navigation"
export class ProductsPage {

    //create the  constructor of the page
    constructor (page) {
        this.page = page
        //add the variables to the constructor
        this.addButtons = page.locator('[data-qa="product-button"]')
        this.sortDropdown = page.locator('[data-qa="sort-dropdown"]')
      //  this.basketCounter = page.locator ('[data-qa ="header-basket-count"]')
        this.productTitle = page.locator('[data-qa="product-title"]')

    }

    visit = async () => {
        await this.page.goto("/")
    }


    /*getBasketCount = async () => {
        
        await this.basketCounter.waitFor()
        const text = await this.basketCounter.innerText()
         return parseInt(text, 10)
       
    }*/

    addProductToBasket = async (index) => {
       //data-qa="product-button"
        const specificAddButton = this.addButtons.nth(index)
        await specificAddButton.waitFor()
        await expect(specificAddButton).toHaveText("Add to Basket")
        //instanciar el objeto / archivo Navigation donde se encuentran los métodos
        const navigation = new Navigation(this.page)
        const basketCountBeforeAdding = await navigation.getBasketCount()
        await specificAddButton.click()
        const basketCountAfterAdding = await navigation.getBasketCount()
        await expect(specificAddButton).toHaveText("Remove from Basket")
        expect (basketCountAfterAdding).toBeGreaterThan(basketCountBeforeAdding)

    }

    sortByCheapest = async() => {
        await this.sortDropdown.waitFor()
        //get the order of products
        await this.productTitle.first().waitFor()
        const prodTitlesBefore = await this.productTitle.allInnerTexts() // geting the list of titles before selecting asc option
        await this.sortDropdown.selectOption("price-asc") //the droptdown allows selecting a value within the options
        const prodTitlesAfter = await this.productTitle.allInnerTexts()
        //get the order of products
        expect(prodTitlesAfter).not.toEqual(prodTitlesBefore)

        //compare lists to be different
        //await this.page.pause()

    }

}
import {test, expect} from "@playwright/test"

test.skip ("Prod page Add to Basket", async({page}) => {
    await page.goto("/") // to configure the base url go to config file --- use section
   

     const addToBasketBttn = page.locator('[data-qa="product-button"]').first()
     const basketCounter = page.locator ('[data-qa ="header-basket-count"]')
     const basketLink = page.getByRole('link', { name: 'Checkout' })
     

    await addToBasketBttn.waitFor()
    await expect(addToBasketBttn).toHaveText("Add to Basket")
    await expect(basketCounter).toHaveText("0")
    console.log(basketCounter)
    
    await addToBasketBttn.click()

   // await page.pause();

    await expect(addToBasketBttn).toHaveText("Remove from Basket")
     await expect(basketCounter).toHaveText("1")
        
      //  await basketLink.waitFor()

        await basketLink.click()

        await page.waitForURL("/basket") // lands on the next page




    




})




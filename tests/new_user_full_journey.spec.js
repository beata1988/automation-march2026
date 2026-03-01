import { test} from "@playwright/test"
import { ProductsPage } from "../page-objects/ProductsPage.js"
import { Navigation } from "../page-objects/Navigation.js"
import { Checkout } from "../page-objects/Checkout.js"
import { LoginPage } from "../page-objects/LoginPage.js"
import { RegisterPage } from "../page-objects/RegisterPage.js"
import { DeliveryDetails } from "../page-objects/DeliveryDetails.js"    
import { deliveryDetails } from "../data/deliveryDetails.js"
import { PaymentPage } from "../page-objects/PaymentPage.js"
import { paymentDetails } from "../data/paymentDetails.js"  

test.only("New user full flow", async ({page})=>{


    //productPage.visit()-- pseudo code of what we want to do

    const productsPage = new ProductsPage(page)
    await productsPage.visit()
     //await page.pause()
     //adding 3 items to the basket
    await productsPage.sortByCheapest()
    await productsPage.addProductToBasket(0)
    await productsPage.addProductToBasket(1)
    await productsPage.addProductToBasket(2)
    

    const navigation = new Navigation(page)
    // going to checkout
    await navigation.goToCheckout()
    
    //remove the cheapest item
    const checkout = new Checkout(page)
    await checkout.removeCheapestItem()

    await checkout.continueToCheckout()

    //register as a new user


    const login = new LoginPage(page)
    await login.moveToSignup()


    const register = new RegisterPage(page)
    await register.signupAsNewUser()

    const delivery = new DeliveryDetails(page)
    await delivery.fillDetails(deliveryDetails)
    await delivery.saveDetails()
    await delivery.continueToPayment()

    //after this we need to create another page object for the payment page which containes a wireframe

    const paymentPage = new PaymentPage(page)
    await paymentPage.activateDiscount()

    await paymentPage.fillPaymentDetails(paymentDetails)
    await paymentPage.activateDiscount()
    await paymentPage.completePayment()

    
    



    

    await page.pause()



    //await page.pause()


})
export class LoginPage {

    //create the  constructor of the page
    constructor (page) {
        this.page = page
        //add the variables to the constructor
        this.moveToSignupButton = page.locator('[data-qa ="go-to-signup-button"]')       
    }

    moveToSignup = async () => {
        await this.moveToSignupButton.waitFor()
        await this.moveToSignupButton.click()
        this.page.waitForURL(/\/signup/)
    }

    

}

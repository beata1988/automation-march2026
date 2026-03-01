import { v4 as uuidv4 } from 'uuid';

export class RegisterPage {

    //create the  constructor of the page
    constructor (page) {
        this.page = page
        //add the variables to the constructor
        this.emailInput  = page.getByRole('textbox', { name: 'e-Mail' })
        this.passwordInput = page.getByRole('textbox', { name: 'password' })
        this.registerButton = page.getByRole('button', { name: 'register' })


        
    }

    signupAsNewUser = async () => {
        // type name
        await this.emailInput.waitFor()
        const emailId = uuidv4() // uses the random users imported in the package
        const email = emailId + "@mail.com" // creates the new email
        await this.emailInput.fill(email) // 
        await this.passwordInput.fill("test123")
        await this.registerButton.click()

        //type psw
        //click on register


        // WE NEED TO RANDOMIZE THE USERS TO AUTOMATE the users and ids, use https://www.npmjs.com/ to find the npm package
        // then install the package
        //then ins
    }
    
 
    

}

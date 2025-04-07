
const Page = require('./page')
const loginForm_Locators = require('../locators/loginForm_locators')

class LoginForm extends Page{
    async enterUsernameAndPassword(username,password){
    
        await loginForm_Locators.usernameLogin.setValue(username)
        await loginForm_Locators.passwordLogin.setValue(password)
       }
    
       async clickLoginBtn(){
        await loginForm_Locators.loginBtn.click()
       }
    
       async clickBiometricIcon(){
        await loginForm_Locators.biometricIcon.click()
       }
}

module.exports = new LoginForm();
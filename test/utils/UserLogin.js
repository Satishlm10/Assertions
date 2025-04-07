const mainPage = require('../pageobjects/mainPage_pageObjects')
const menuItem = require('../pageobjects/menuItem_pageObjects')
const loginForm = require('../pageobjects/LoginForm_pageObjects')

class UserLogin {
    async login_steps(username,password) {
        await mainPage.clickMenu()
        await menuItem.clickLoginMenuItem()
        await loginForm.enterUsernameAndPassword(username,password)
        await loginForm.clickLoginBtn()
    }
}

module.exports = new UserLogin()
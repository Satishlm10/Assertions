const { browser, driver } = require('@wdio/globals')
const {expect} = require('chai')
const menuItem_Locators = require('../locators/menuItems_locators')
const mainPage = require('../pageobjects/mainPage_pageObjects')
const menuItem = require('../pageobjects/menuItem_pageObjects')
const loginForm_Locators = require('../locators/loginForm_locators')
const userLogin = require('../utils/UserLogin')
const mainPage_locators = require('../locators/mainPage_locators')

describe('MYDEMOAPP - Login Assertions', () => {


    // beforeEach(async function () {
      
    //    // await driver.activateApp('com.saucelabs.mydemoapp.android'); 
    //     await driver.startRecordingScreen({
    //         videoType: 'mp4',
    //         screenRecordPath: '/storage/emulated/0/test.mp4'
    //       });
    //   });
    // afterEach(async function () {
    //    await driver.stopRecordingScreen()
    

    //    // await driver.terminateApp('com.saucelabs.mydemoapp.android');  
       
    //   });


    it('should have \"Email\" label in the login form ', async ()=>{
        await mainPage.clickMenu()
        await menuItem.clickLoginMenuItem()
        expect(await loginForm_Locators.usernameLabel.getText()).to.eql("Email")
    })

    it('should have \"Password\" label in the login form ', async ()=>{
        await mainPage.clickMenu()
        await menuItem.clickLoginMenuItem()
        expect(await loginForm_Locators.passwordLabel.getText()).to.eql("Password")
    })

    it('should login with valid email and password', async () => {

        await userLogin.login_steps("bod@example.com","10203040")
        await mainPage.clickMenu()
        expect(await menuItem_Locators.logoutMenuItem.isDisplayed()).to.be.true;
    })

    it('shouldn\'t login with empty credentials',async ()=>{
        await userLogin.login_steps("","")
        expect(await loginForm_Locators.emptyUsernameError.isDisplayed()).to.be.true;
    })

    it('shouldn\'t login with empty email',async ()=>{
        await userLogin.login_steps("","10203040")
        expect(await loginForm_Locators.emptyUsernameError.isDisplayed()).to.be.true;
    })

    it('shouldn\'t login with empty password',async ()=>{
        await userLogin.login_steps("bod@example.com","")
        expect(await loginForm_Locators.emptyPasswordError.isDisplayed()).to.be.true;
    })

    it('shouldn\'t login with invalid email',async ()=>{
        await userLogin.login_steps("invalidEmail","10203040")
        expect(await loginForm_Locators.emptyUsernameError.isDisplayed()).to.be.true;
    })

    it('shouldn\'t login with invalid email',async ()=>{
        await userLogin.login_steps("invalidEmail","10203040")
        expect(await loginForm_Locators.usernameLabel.isDisplayed()).to.be.true;
    })

    it('shouldn\'t login with invalid password',async ()=>{
        await userLogin.login_steps("bod@example.com","abc")
        expect(await loginForm_Locators.usernameLabel.isDisplayed()).to.be.true;
    })
   
})


describe('MYDEMOAPP - Product Sorting Assertions',()=>{
    it('catalog page should display Sorting button',async ()=>{
        expect(await mainPage_locators.sortIcon.isDisplayed()).to.be.true;
    })

    it.only('should sort the catalog in descending order of name',async ()=>{
        let products = await mainPage_locators.allProductsInCatalogPage

        await products.forEach(product => {
            console.log(product.getText())
        });
        await mainPage.clickSortIcon()
        await mainPage.clickSortByNameDescending()

        let descProducts = await mainPage_locators.allProductsInCatalogPage
        await descProducts.forEach(product => {
            console.log(product)
        });
        // function areListsEqual(products, descProducts) {
        //     return JSON.stringify(products) === JSON.stringify(descProducts);
        // }

        // let result = areListsEqual(products,descProducts)

        // expect(result).is.eql(true)
    })
})


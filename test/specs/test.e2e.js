const { browser, driver } = require('@wdio/globals')
const {expect, assert} = require('chai')
const menuItem_Locators = require('../locators/menuItems_locators')
const mainPage = require('../pageobjects/mainPage_pageObjects')
const menuItem = require('../pageobjects/menuItem_pageObjects')
const loginForm_Locators = require('../locators/loginForm_locators')
const userLogin = require('../utils/UserLogin')
const mainPage_locators = require('../locators/mainPage_locators')
const scroll = require('../utils/Scroll')
const product_details = require('../pageobjects/ProductDetails_pageObjects')

describe('MYDEMOAPP - Login Assertions', () => {


    beforeEach(async function () {
      
       await driver.activateApp('com.saucelabs.mydemoapp.android'); 
        // await driver.startRecordingScreen({
        //     videoType: 'mp4',
        //     screenRecordPath: '/storage/emulated/0/test.mp4'
        //   });
      });
    afterEach(async function () {
    //    await driver.stopRecordingScreen()
    

       await driver.terminateApp('com.saucelabs.mydemoapp.android');  
       
      });


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

    beforeEach(async function () {
    
        await driver.activateApp('com.saucelabs.mydemoapp.android'); 

       });
     afterEach(async function () {
        await driver.terminateApp('com.saucelabs.mydemoapp.android');  
        
       });
    it('catalog page should display Sorting button',async ()=>{
        expect(await mainPage_locators.sortIcon.isDisplayed()).to.be.true;
    })

    // it('should sort the products in descending order of name',async ()=>{
    //    const allProductsAscending = await scroll.getAllProductsByTitle()
    //    allProductsAscending.reverse()
    //    await mainPage.clickSortIcon()
    //    await mainPage.clickSortByNameDescending()
    //    await mainPage.clickCartIcon()
    //    await mainPage.clickMenu()
    //    await menuItem.clickCatalogMenuItem()
    //    const allProductsDescending = await scroll.getAllProductsByTitle() 
      
       
    //    expect(allProductsDescending).to.deep.equal(allProductsAscending)

    // })

    it('should add the product to cart',async ()=>{
        await mainPage.clickFirstProduct()
        await product_details.clickAddToCartBtn()
        await mainPage.clickCartIcon()

        expect("Sauce Labs Backpack").to.be.equal(await $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/titleTV"]').getText())
    })

    it('should increase the quanity of item in the product details page', async ()=>{
        await mainPage.clickFirstProduct()
        await product_details.clickPlusSign()
        expect('2').to.be.equal(await $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/noTV"]').getText())
    })

    it('should decrease the quanity of item in the product details page', async ()=>{
        await mainPage.clickFirstProduct()
        await product_details.clickPlusSign()
        await product_details.clickMinusSign()
        expect('1').to.be.equal(await $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/noTV"]').getText())
    })

    it('should redirect guest user to login page when proceeding to checkout',async()=>{
        await mainPage.clickFirstProduct()
        await product_details.clickAddToCartBtn()
        await mainPage.clickCartIcon()
        await product_details.clickProceedToCheckoutBtn()

        expect('Login').to.be.equal(await $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/loginTV"]').getText())
      })

      it('should disply no items when user hasn\'t add products to cart',async ()=>{
        await mainPage.clickCartIcon()
        expect('No Items').to.be.equal(await $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/noItemTitleTV"]').getText())
      })

})


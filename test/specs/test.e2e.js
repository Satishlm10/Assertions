const { browser, driver } = require('@wdio/globals')
const {expect} = require('chai')
const menuItem_Locators = require('../locators/menuItems_locators')
const mainPage = require('../pageobjects/mainPage_pageObjects')
const menuItem = require('../pageobjects/menuItem_pageObjects')
const loginForm_Locators = require('../locators/loginForm_locators')
const loginForm = require('../pageobjects/LoginForm_pageObjects')
const userLogin = require('../utils/UserLogin')
const mainPage_locators = require('../locators/mainPage_locators')
const scroll = require('../utils/Scroll')
const product_details = require('../pageobjects/ProductDetails_pageObjects')
const checkoutForm = require('../pageobjects/CheckoutForm_pageObjects')
const checkoutForm_locators = require('../locators/checkoutForm_locators')
const paymentForm = require('../pageobjects/paymentForm_pageObjects')
const paymentForm_Locators = require('../locators/paymentForm_locators')
const paymentForm_locators = require('../locators/paymentForm_locators')
const reviewOrder_Locators = require('../locators/reviewOrder_locators')
const revieOrder = require('../pageobjects/reviewOrder_pageObject')

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

    it.only('should be able to login with fingerprint.',async ()=>{
        await mainPage.clickMenu()
        await menuItem.clickFingerPrintMenuItem()
        await menuItem.clickToggleFingerPrint()
        await mainPage.clickMenu()
        await menuItem.clickLoginMenuItem()
        await loginForm.clickBiometricIcon()
        await mainPage.clickMenu()
        expect(await menuItem_Locators.logoutMenuItem.isDisplayed()).to.be.true;


    })
   
})

describe.skip('MYDEMOAPP - Cart and checkout',()=>{

    beforeEach(async function () {
    
        await driver.activateApp('com.saucelabs.mydemoapp.android'); 

       });
     afterEach(async function () {
        await driver.terminateApp('com.saucelabs.mydemoapp.android');  
        
       });
    it('catalog page should display Sorting button',async ()=>{
        expect(await mainPage_locators.sortIcon.isDisplayed()).to.be.true;
    })


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

      it('guest user after loggin in from the cart should be redirected to checkout page',async()=>{
        await mainPage.clickFirstProduct()
        await product_details.clickAddToCartBtn()
        await mainPage.clickCartIcon()
        await product_details.clickProceedToCheckoutBtn()
        await userLogin.enter_credentials("bod@example.com","10203040")
    
        expect('Checkout').to.be.equal(await $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/checkoutTitleTV"]').getText())
      })

      it('should be able to checkout with valid inputs')


})

describe.only('MYDEMOAPP - CHECKOUT PAGE',()=>{

    beforeEach(async function () {
    
        await driver.activateApp('com.saucelabs.mydemoapp.android'); 
        await userLogin.login_steps("bod@example.com","10203040")
        await browser.pause(500)
        await mainPage.clickFirstProduct()
        await product_details.clickAddToCartBtn()
        await mainPage.clickCartIcon()
        await product_details.clickProceedToCheckoutBtn()


       });
     afterEach(async function () {
        await driver.terminateApp('com.saucelabs.mydemoapp.android');  
        
       });

    it('should redirect user to payement page when checking out with valid shipping details', async ()=>{
        await checkoutForm.enterAllCheckoutDetails("Batman","Gotham","Arkham","Kathmandu","Bagmati",44600,"Nepal")
        await checkoutForm.clickToPaymentBtn()
        expect(await $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/enterPaymentMethodTV"]').getText()).to.be.equal("Enter a payment method")
    })

    it('should redirect user to payement page when checking out with only required and valid shipping details', async ()=>{
        await checkoutForm.enterRequiredFields_Checkout("Batman","Gotham","Kathmandu",44600,"Nepal")
        await checkoutForm.clickToPaymentBtn()
        expect(await $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/enterPaymentMethodTV"]').getText()).to.be.equal("Enter a payment method")

    })

    it('should display validation error message when submitting empty fullname field', async ()=>{
        await checkoutForm.clickToPaymentBtn()
        expect(await $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/fullNameErrorTV"]').getText()).to.be.equal("Please provide your full name.")
    })

    it('should display validation error message when submitting empty AddressLine 1 field', async ()=>{
        await checkoutForm.clickToPaymentBtn()
        expect(await checkoutForm_locators.addressLine1Validation_Error.getText()).to.be.equal("Please provide your address.")
    })

    it('should display validation error message when submitting empty City field', async ()=>{
        await checkoutForm.clickToPaymentBtn()
        expect(await checkoutForm_locators.cityValidation_Error.getText()).to.be.equal("Please provide your city.")
    })

    it('should display validation error message when submitting empty ZipCode field', async ()=>{
        await checkoutForm.clickToPaymentBtn()
        expect(await checkoutForm_locators.zipCodeValidation_Error.getText()).to.be.equal("Please provide your zip.")
    })

    it('should display validation error message when submitting empty Country field', async ()=>{
        await checkoutForm.clickToPaymentBtn()
        expect(await checkoutForm_locators.countryValidation_Error.getText()).to.be.equal("Please provide your country.")
    })
})

describe.only('MYDEMOAPP - PAYMENT PAGE', ()=>{
    beforeEach(async function () {
    
        await driver.activateApp('com.saucelabs.mydemoapp.android'); 

        await userLogin.login_steps("bod@example.com","10203040")

        await mainPage.clickFirstProduct()
        await product_details.clickAddToCartBtn()
        await mainPage.clickCartIcon()
        await product_details.clickProceedToCheckoutBtn()

        await checkoutForm.enterRequiredFields_Checkout("Bruce Wayne","Gotham","Arkham","44600","Nepal")
        await checkoutForm.clickToPaymentBtn()


       });
     afterEach(async function () {
        await driver.terminateApp('com.saucelabs.mydemoapp.android');  
        
       });


    it('should redirect user to the Review Order page with valid payment details',async ()=>{
        await paymentForm.enterAllPaymentDetails("Bruce Wayne","9999999999999999","0325","777")
        await paymentForm.clickReviewOrderBtn()
        expect(await $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/enterShippingAddressTV"]').getText()).to.be.equal("Review your order")
    })

    it("should display validation error message when leaving fullname field empty",async ()=>{
        await paymentForm.clickReviewOrderBtn()
        expect(await paymentForm_Locators.fullName_validationError_payment.getText()).to.be.equal("Value looks invalid.")
    })

    it("should display validation error message when leaving card number field empty",async ()=>{
        await paymentForm.clickReviewOrderBtn()
        expect(await paymentForm_Locators.cardNumber_validationError_payment.getText()).to.be.equal("Value looks invalid.")
    })

    it("should display validation error message when leaving expiration date field empty",async ()=>{
        await paymentForm.clickReviewOrderBtn()
        expect(await paymentForm_Locators.expirationDate_validationError_payment.getText()).to.be.equal("Value looks invalid.")
    })

    it("should display validation error message when leaving security code field empty",async ()=>{
        await paymentForm.clickReviewOrderBtn()
        expect(await paymentForm_Locators.securityCode_validationError_payment.getText()).to.be.equal("Value looks invalid.")
    })

    it("should the billing details is the same as shipping address checkbox is checked by default",async ()=>{
        expect(await paymentForm_Locators.billingAddress_checkbox_payment.getAttribute('checked')).to.be.equal('true')
    })

    it('should display validation error message when submitting empty fullname field', async ()=>{
        await paymentForm.clickBillingAddressCheckbox()
        expect(await paymentForm_Locators.fullname_billing_validationError_payment.getText()).to.be.equal("Please provide your full name.")
    })

    it('should display validation error message when submitting empty AddressLine 1 field', async ()=>{
        await paymentForm.clickBillingAddressCheckbox()
        expect(await paymentForm_locators.addressLine1_billing_validationError_payment.getText()).to.be.equal("Please provide your address.")
    })

    it('should display validation error message when submitting empty City field', async ()=>{
        await paymentForm.clickBillingAddressCheckbox()
        expect(await paymentForm_locators.city_billing_validationError_payment.getText()).to.be.equal("Please provide your city.")
    })

    it('should display validation error message when submitting empty ZipCode field', async ()=>{
        await paymentForm.clickBillingAddressCheckbox()
        expect(await paymentForm_Locators.zipCode_billing_validationError_payment.getText()).to.be.equal("Please provide your zip.")
    })

    it('should display validation error message when submitting empty Country field', async ()=>{
        await paymentForm.clickBillingAddressCheckbox()
        expect(await paymentForm_Locators.country_billing_validationError_payment.getText()).to.be.equal("Please provide your country.")
    })

    it('should have seperate Delivery address and Billing address when they are not the same',async ()=>{
        await paymentForm.enterAllPaymentDetails("Bruce Wayne","9999999999999999","0325","777")
        await paymentForm.clickBillingAddressCheckbox()
        await paymentForm.enterRequiredFields_payment("Bruce Wayne","Gotham","Arkham","44600","Nepal")
        await paymentForm.clickReviewOrderBtn()
        expect(await $('//android.widget.TextView[@text="Billing Address"]').getText()).to.be.equal("Billing Address")

    })

})

describe.only('MYDEMOAPP - Review Order Page',()=>{

    beforeEach(async function () {
    
       // await driver.activateApp('com.saucelabs.mydemoapp.android'); 

        await userLogin.login_steps("bod@example.com","10203040")

        await mainPage.clickFirstProduct()
        await product_details.clickAddToCartBtn()
        await mainPage.clickCartIcon()
        await product_details.clickProceedToCheckoutBtn()

        await checkoutForm.enterRequiredFields_Checkout("Bruce Wayne","Gotham","Arkham","44600","Nepal")
        await checkoutForm.clickToPaymentBtn()


        await paymentForm.enterAllPaymentDetails("Bruce Wayne","9999999999999999","0325","777")
        await paymentForm.clickReviewOrderBtn()

       });

     afterEach(async function () {
        // await driver.terminateApp('com.saucelabs.mydemoapp.android');  
        
       });


    it('should display one product image when checked out with one item in the cart',async ()=>{
        expect(await reviewOrder_Locators.oneProductImage_reviewOrder.getAttribute('displayed')).to.be.equal('true')
    })

    it('should display one product title when checked out with one item in the cart',async ()=>{
        expect(await reviewOrder_Locators.prouductTitles_reviewOrder.getAttribute('displayed')).to.be.equal('true')
    })

    it('should display product price.',async ()=>{
        expect(await reviewOrder_Locators.productPrice_reviewOrder.getAttribute('displayed')).to.be.equal('true')
    })

    it('should display total items for checkout',async()=>{
        expect(await reviewOrder_Locators.totalItem_reviewOrder.getAttribute('text')).to.be.equal('1 Items')
    })

    it('should displya total amount.',async ()=>{
        expect(await reviewOrder_Locators.totalcost_reviewOrder.getAttribute('text')).to.be.equal('$ 35.98')
    })

    it('should redirect the user to cart when the order is placed.', async ()=>{
        await revieOrder.clickPlaceOrderBtn()
        expect(await reviewOrder_Locators.checkout_complete_reviewOrder.getText()).to.be.equal("Checkout Complete")
    })
})

describe.skip('MYDEMOAPP - Sorting Products',()=>{
    it('should sort the products in descending order of name',async ()=>{
       const allProductsAscending = await scroll.getAllProductsByTitle()
       allProductsAscending.reverse()
       await mainPage.clickSortIcon()
       await mainPage.clickSortByNameDescending()
       await mainPage.clickCartIcon()
       await mainPage.clickMenu()
       await menuItem.clickCatalogMenuItem()
       const allProductsDescending = await scroll.getAllProductsByTitle() 
      
       
       expect(allProductsDescending).to.deep.equal(allProductsAscending)

    })
})




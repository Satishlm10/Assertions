
const Page = require('./page')
const checkoutForm_Locators = require('../locators/checkoutForm_locators')

class CheckoutForm extends Page{
    async enterFullName(fullname){
        await checkoutForm_Locators.fullname_checkout.setValue(fullname)
    }

    async enterAddressLine1(address1){
        await checkoutForm_Locators.addressLine1_checkout.setValue(address1)
    }

    async enterAddressLine2(address2){
        await checkoutForm_Locators.addressLine2_checkout.setValue(address2)
    }

    async enterCity(city){
        await checkoutForm_Locators.city_checkout.setValue(city)
    }

    async enterStateRegion(stateRegion){
        await checkoutForm_Locators.stateRegion_checkout.setValue(stateRegion)
    }

    async enterZipCode(zipCode){
        await checkoutForm_Locators.zipCode_checkout.setValue(zipCode)
    }

    async enterCountry(country){
        await checkoutForm_Locators.coutnry_checkout.setValue(country)
    }

    async clickToPaymentBtn(){
        await checkoutForm_Locators.toPaymentBtn_checkout.click()
    }


    async enterAllCheckoutDetails(fullname,address1,address2,city,stateRegion,zipCode,country){
        await this.enterFullName(fullname)
        await this.enterAddressLine1(address1)
        await this.enterAddressLine2(address2)
        await this.enterCity(city)
        await this.enterStateRegion(stateRegion)
        await this.enterZipCode(zipCode)
        await this.enterCountry(country)
    }

    async enterRequiredFields_Checkout(fullname,address1,city,zipCode,country){
        await this.enterFullName(fullname)
        await this.enterAddressLine1(address1)
        await this.enterCity(city)
        await this.enterZipCode(zipCode)
        await this.enterCountry(country)
    }


}

module.exports = new CheckoutForm();
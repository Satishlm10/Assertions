
const Page = require('./page')
const paymentForm_locators = require('../locators/paymentForm_locators')

class PaymentForm extends Page{

    async enterFullNameInCardField(fullname){
        await paymentForm_locators.fullName_payment.setValue(fullname)
    }

    async enterCardNumber(cardNumber){
        await paymentForm_locators.cardNumber_payment.addValue(cardNumber)
    }

    async enterExpirationDate(date){
        await paymentForm_locators.expirationDate_payment.addValue(date)
    }

    async enterSecurityCode(code){
        await paymentForm_locators.securityCode_payment.addValue(code)
    }

    async clickReviewOrderBtn(){
        await paymentForm_locators.reviewOrderBtn_payment.click()
    }

    async clickBillingAddressCheckbox(){
        await paymentForm_locators.billingAddress_checkbox_payment.click()
    }

    async enterAllPaymentDetails(fullname,cardNumber,date,code){
        await this.enterFullNameInCardField(fullname)
        await this.enterCardNumber(cardNumber)
        await this.enterExpirationDate(date)
        await this.enterSecurityCode(code)
    }


    async enterFullName(fullname){
        await paymentForm_locators.fullname_billing_payment.setValue(fullname)
    }

    async enterAddressLine1(address1){
        await paymentForm_locators.addressLine1_billing_payment.setValue(address1)
    }

    async enterAddressLine2(address2){
        await paymentForm_locators.addressLine2_billing_payment.setValue(address2)
    }

    async enterCity(city){
        await paymentForm_locators.city_billing_paymnet.setValue(city)
    }

    async enterStateRegion(stateRegion){
        await paymentForm_locators.stateRegion_billing_payment.setValue(stateRegion)
    }

    async enterZipCode(zipCode){
        await paymentForm_locators.zipCode_billing_payment.setValue(zipCode)
    }

    async enterCountry(country){
        await paymentForm_locators.country_billing_payment.setValue(country)
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

    async enterRequiredFields_payment(fullname,address1,city,zipCode,country){
        await this.enterFullName(fullname)
        await this.enterAddressLine1(address1)
        await this.enterCity(city)
        await this.enterZipCode(zipCode)
        await this.enterCountry(country)
    }


}

module.exports = new PaymentForm();
const { $ } = require('@wdio/globals')

class PaymentForm_Locators {

   get fullName_payment(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/nameET"]')}
   get cardNumber_payment(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/cardNumberET"]')}
   get expirationDate_payment(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/expirationDateET"]')}
   get securityCode_payment(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/securityCodeET"]')}
   get billingAddress_checkbox_payment(){return $('~Select if User billing address and shipping address are same')}
   get reviewOrderBtn_payment(){return $('~Saves payment info and launches screen to review checkout data')}

   get fullName_validationError_payment(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/nameErrorTV"]')}
   get cardNumber_validationError_payment(){return $('//android.widget.ImageView[@resource-id="com.saucelabs.mydemoapp.android:id/cardNumberErrorIV"]')}
   get expirationDate_validationError_payment(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/expirationDateErrorTV"]')}
   get securityCode_validationError_payment(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/securityCodeErrorTV"]')}

   get fullname_billing_payment(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/fullNameET"]')}
   get addressLine1_billing_payment(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/address1ET"]')}
   get addressLine2_billing_payment(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/address2ET"]')}
   get city_billing_paymnet(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/cityET"]')}
   get stateRegion_billing_payment(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/stateET"]')}
   get zipCode_billing_payment(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/zipET"]')}
   get country_billing_payment(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/countryET"]')}

   get fullname_billing_validationError_payment(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/fullNameErrorTV"]')}
   get addressLine1_billing_validationError_payment(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/address1ErrorTV"]')}
   get city_billing_validationError_payment(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/cityErrorTV"]')}
   get zipCode_billing_validationError_payment(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/zipErrorTV"]')}
   get country_billing_validationError_payment(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/countryErrorTV"]')}

}

module.exports = new PaymentForm_Locators();
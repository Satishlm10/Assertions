const { $ } = require('@wdio/globals')

class CheckoutForm_Locators {

    get fullname_checkout(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/fullNameET"]')}
    get addressLine1_checkout(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/address1ET"]')}
    get addressLine2_checkout(){return $('//android.widget.RelativeLayout[@resource-id="com.saucelabs.mydemoapp.android:id/address2RL"]')}
    get city_checkout(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/cityET"]')}
    get stateRegion_checkout(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/stateET"]')}
    get zipCode_checkout(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/zipET"]')}
    get coutnry_checkout(){return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/countryET"]')}
    get toPaymentBtn_checkout(){return $('~Saves user info for checkout')}

    get fullnameValidation_Error(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/fullNameErrorTV"]')}
    get addressLine1Validation_Error(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/fullNameErrorTV"]')}
    get cityValidation_Error(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/cityErrorTV"]')}
    get zipCodeValidation_Error(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/zipErrorTV"]')}
    get countryValidation_Error(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/countryErrorTV"]')}
    

}

module.exports = new CheckoutForm_Locators();
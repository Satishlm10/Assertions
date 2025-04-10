const { $ } = require('@wdio/globals')

class LoginForm_Locators {

    get usernameLogin() {return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/nameET"]')}
    get passwordLogin() {return $('//android.widget.EditText[@resource-id="com.saucelabs.mydemoapp.android:id/passwordET"]')}
    get loginBtn() {return $('~Tap to login with given credentials')}
    get biometricIcon() {return $('~Tap to login using biometric verification')}
    get emptyUsernameError(){return $('//andaroid.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/nameErrorTV"]')}
    get emptyPasswordError(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/passwordErrorTV"]')}
    get usernameLabel(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/usernameTV"]')}
    get passwordLabel(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/passwordTV"]')}

}

module.exports = new LoginForm_Locators();
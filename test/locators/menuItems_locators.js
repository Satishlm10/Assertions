const { $ } = require('@wdio/globals')
class MenuItems_Locators{
    get catalogMenuItem() {return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/itemTV" and @text="Catalog"]')}
    get webViewMenuItem() {return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/itemTV" and @text="WebView"]')}
    get qrScannerMenuItem() {return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/itemTV" and @text="QR Code Scanner"]')}
    get geoLocationMenuItem() {return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/itemTV" and @text="Geo Location"]')}
    get drawingMenuItem() {return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/itemTV" and @text="Drawing"]')}
    get aboutMenuItem() {return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/itemTV" and @text="About"]')}
    get resetAppStateMenuItem() {return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/itemTV" and @text="Reset App State"]')}
    get fingerPrintMenuItem() {return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/itemTV" and @text="FingerPrint"]')}
    get loginMenuItem() {return $('~Login Menu Item')}
    get logoutMenuItem() {return $('~Logout Menu Item')}
    get logoutDialogBtn() {return $('//android.widget.Button[@resource-id="android:id/button1"]')}

    get toggleFingerPrint(){return $('~Enable or disable biometric login')}
}
module.exports = new MenuItems_Locators();
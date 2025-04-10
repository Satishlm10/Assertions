const { $ } = require('@wdio/globals')

class ReviewOrder_Locators {

    get oneProductImage_reviewOrder(){return $('~Displays selected product')}
    get oneProductRemoveBtn_reviewOrder(){return $('~Removes product from cart')}
    get placeOrderBtn_reviewOrder(){return $('~Completes the process of checkout')}

    get productImages_reviewOrder(){return $('(//android.widget.ImageView[@content-desc="Displays selected product"])')}
    get prouductTitles_reviewOrder(){return $('(//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/titleTV"])')}
    get productPrice_reviewOrder(){return $('(//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/priceTV"])')}
    get productRevomeBtn_reviewOrder(){return $('(//android.widget.TextView[@content-desc="Removes product from cart"])')}
    get totalItem_reviewOrder(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/itemNumberTV"]')}
    get totalcost_reviewOrder(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/totalAmountTV"]')}

    get checkout_complete_reviewOrder(){return $('//android.widget.TextView[@resource-id="com.saucelabs.mydemoapp.android:id/completeTV"]')}
}

module.exports = new ReviewOrder_Locators();
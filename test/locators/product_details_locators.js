const { $ } = require('@wdio/globals')

class ProductDetails_Locators {
    get addToCart() {return $('~Tap to add product to cart')}

    get increaseItemQuantity() {return $('~Increase item quantity')}

    get decreaseItemQuantity() {return $('~Decrease item quantity')}

    get proceedToCheckoutBtn(){
    return $('~Confirms products for checkout')
    }
}

module.exports = new ProductDetails_Locators()
const Page = require('./page')
const ProductDetails_Locators = require('../locators/product_details_locators')

class ProductDetails{
    async clickAddToCartBtn(){
        await ProductDetails_Locators.addToCart.click()
    }
    
    async clickPlusSign(){
        await ProductDetails_Locators.increaseItemQuantity.click()
    }

    async clickMinusSign(){
        await ProductDetails_Locators.decreaseItemQuantity.click()
    }

    async clickProceedToCheckoutBtn(){
        await ProductDetails_Locators.proceedToCheckoutBtn.click()
    }
}

module.exports = new ProductDetails()
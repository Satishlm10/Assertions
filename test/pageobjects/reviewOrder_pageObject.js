const Page = require('./page')
const ReviewOrder_Locators = require('../locators/reviewOrder_locators')

class ReviewOrder extends Page{
 
    async clickPlaceOrderBtn(){
        await ReviewOrder_Locators.placeOrderBtn_reviewOrder.click()
    }

}

module.exports = new ReviewOrder()
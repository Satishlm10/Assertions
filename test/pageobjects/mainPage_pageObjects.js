
const Page = require('./page')
const mainPage_Locators = require('../locators/mainPage_locators')

class MainPage extends Page{
    async clickMenu() {
        await mainPage_Locators.menuIcon.click()
    }

    async clickSortIcon(){
        await mainPage_Locators.sortIcon.click()
    }
    
    async clickCartIcon(){
        await mainPage_Locators.cartIcon.click()
    }

    // provide the the product position value to click a specific product
    async clickProductsInCatalog(productNumber){
        mainPage_Locators.productNumberInCatalog(productNumber)
        await mainPage_Locators.productsInCatalog.click()
    }

    async clickSortByNameAscending(){
        await mainPage_Locators.sortByNameAscending.click()
    }

    async clickSortByNameDescending(){
        await mainPage_Locators.sortByNameDescending.click()
    }

    async clickSortByPriceAscending(){
        await mainPage_Locators.sortByPriceAscending.click()
    }

    async clickSortByPriceDescending(){
        await mainPage_Locators.sortByPriceDescending.click()
    }

    async clickFirstProduct(){
        await mainPage_Locators.firstProduct.click()
    }

}

module.exports = new MainPage();
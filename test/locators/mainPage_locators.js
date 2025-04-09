const { $ } = require('@wdio/globals')

class MainPage_Locators  {

    productNumber = null

    get mainPage() {
        return $('//android.widget.FrameLayout[@content-desc="Container for fragments"]/android.view.ViewGroup');
    }
    get menuIcon() {
        return $('~View menu');
    }
    get sortIcon() {
        return $('~Shows current sorting order and displays available sorting options');
    }
    get cartIcon() {
        return $('~Displays number of items in your cart');
    }

    set productNumberInCatalog(productNumber){
        this.productNumber = productNumber
    }

    get productsInCatalog() {
         return $(`(//android.widget.ImageView[@content-desc="Product Image"])[${this.productNumber}]`)
    }
    get sortByNameAscending() {
        return $('//android.widget.TextView[@text="Name - Ascending"]');
    }
    get sortByNameDescending() {
        return $('//android.widget.TextView[@text="Name - Descending"]');
    }
    get sortByPriceAscending() {
        return $('~Ascending order by price');
    }
    get sortByPriceDescending() {
        return $('~Descending order by price');
    }

    get allProductsInCatalogPage(){
        return $$('//android.widget.TextView[@content-desc="Product Title"]')
    }

    get socialLinks(){
        return $('//android.widget.LinearLayout[@resource-id="com.saucelabs.mydemoapp.android:id/socialLL"]')
    }

    get firstProduct(){
        return $('(//android.widget.ImageView[@content-desc="Product Image"])[1]')
    }
};

module.exports = new MainPage_Locators();

const { browser } = require('@wdio/globals')
const mainPage_locators = require('../locators/mainPage_locators')
class Scroll {

    constructor() {
        this.anchor = null;
        this.startPoint = null;
        this.endPoint = null;
        this.initialized = false;
    }

    async initScrollValues() {
        if (!this.initialized) {
            const { height, width } = await browser.getWindowSize();
            this.anchor = Math.round(width * 0.5);
            this.startPoint = Math.round(height * 0.8);
            this.endPoint = Math.round(height * 0.1);
            this.initialized = true;
        }
    }

    async scrolling() {
        await this.initScrollValues();
    
        await browser.performActions([
            {
                type: "pointer",
                id: "finger1",
                parameters: { pointerType: "touch" },
                actions: [
                    { type: "pointerMove", duration: 0, x: this.anchor, y: this.startPoint }, 
                    { type: "pointerDown", button: 0 }, 
                    { type: "pause", duration: 1000 }, 
                    { type: "pointerMove", duration: 3000, x: this.anchor, y: this.endPoint }, 
                    { type: "pointerUp", button: 0 } 
                ]
            }
        ])

    }

    async scrollToBottom(){
        let socialLinkVisibility = false
        while(socialLinkVisibility === false){
             await this.scrolling()
             socialLinkVisibility = await mainPage_locators.socialLinks.isExisting()
       }
    }

    async getAllProductsByTitle(){
           let allProducts = []
           let socialLinkVisibility = false
    
           while(socialLinkVisibility === false){
                await browser.pause(1000)
                let products = await mainPage_locators.allProductsInCatalogPage
                await products.forEach(async product => {
                     await browser.pause(1000)
                     const title = await product.getText()
                      allProducts.push(title)  });
                
                await this.scrolling()
                socialLinkVisibility = await mainPage_locators.socialLinks.isExisting()
           }
      
           return allProducts
        }
  
}

module.exports = new Scroll()
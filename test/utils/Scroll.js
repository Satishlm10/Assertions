const { browser } = require('@wdio/globals')
const mainPage_locators = require('../locators/mainPage_locators')
class Scroll {
    async scrolling() {
        const { height, width } = await browser.getWindowSize();
        const anchor = Math.round(width * 0.5);
        const startPoint = Math.round(height * 0.8);
        const endPoint = Math.round(height * 0.1);
    
        await browser.performActions([
            {
                type: "pointer",
                id: "finger1",
                parameters: { pointerType: "touch" },
                actions: [
                    { type: "pointerMove", duration: 0, x: anchor, y: startPoint }, 
                    { type: "pointerDown", button: 0 }, 
                    { type: "pause", duration: 500 }, 
                    { type: "pointerMove", duration: 1000, x: anchor, y: endPoint }, 
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
                
                let products = await mainPage_locators.allProductsInCatalogPage
                await browser.pause(1000)
                products.forEach(async product => {
                     const title = await product.getText()
                     allProducts.push(title)  });
                
                await this.scrolling()
                socialLinkVisibility = await mainPage_locators.socialLinks.isExisting()
           }
           await browser.pause(1000)
           return allProducts
        }
  
}

module.exports = new Scroll()
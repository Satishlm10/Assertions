const Page = require('./page')
const menuItems = require('../locators/menuItems_locators')
const menuItems_locators = require('../locators/menuItems_locators')

class MenuItem extends Page{
    async clickLoginMenuItem(){
        await menuItems.loginMenuItem.click()
    }

    async clickLogoutMenuItem(){
        await menuItems.logoutMenuItem.click()
        await menuItems.logoutDialogBtn.click()
    }

    async clickFingerPrintMenuItem(){
        await menuItems.fingerPrintMenuItem.click()
    }

    async clickDrawingMenuItem(){
        await menuItems.drawingMenuItem.click()
    }

    async clickCatalogMenuItem(){
      
        await menuItems.catalogMenuItem.click()
    }

    async clickToggleFingerPrint(){
        await menuItems_locators.toggleFingerPrint.click()
    }
}

module.exports = new MenuItem()
const { Elements } = require("nightwatch");

module.exports = {
    elements: {
        loginPopupText : {
             selector : `//label[text()='Enter Email/Mobile number']`,
             locateStrategy : 'xpath',

        },
        closeButton: {
            selector: '//span[@role="button"]',
            locateStrategy: 'xpath'
          },

        searchBar: {
            selector : `//input[@placeholder='Search for Products, Brands and More']`,
            locateStrategy : 'xpath'

        },

          productResult: {
            selector: '//span[normalize-space()="Redmi note 13"]',
            locateStrategy: 'xpath'
          }
      
    },
    commands: [{

        navigatetoHomePage(){
            return this.api.url('https://www.flipkart.com/');
        },
        waitForLoginPopup() {
          return this.useXpath().waitForElementVisible('@loginPopupText');
        },
    
        dismissLoginPopup() {
          return this.useXpath().click('@closeButton');
        },
    
        enterProductName(productName) {
          return this.useXpath().setValue('@searchBar', productName + this.api.Keys.ENTER);
        },
    
        assertBodyContains(text) {
          return this.useXpath().assert.textContains('@productResult', text);
        }
}]
}
import Page from './Page.js'
/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/

 class HomePage extends Page{
    get searchBox() { return $(`//input[@placeholder='Search for Products, Brands and More']`); }

    async open() {
            await super.open('https://www.flipkart.com')
        }
    async enterSearchText(text) {
            (await this.searchBox).waitForDisplayed()
            await this.searchBox.setValue(text);
            browser.keys('Enter');
        }
    async searchResultsTitle(text){
        let searchTitle = $(`//span//span[text() = "${text}"]`);
        return searchTitle;
    }
    
}

export default new HomePage();

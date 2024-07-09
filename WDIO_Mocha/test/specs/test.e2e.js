import { expect } from '@wdio/globals'
import HomePage from '../../Pages/homePage.page.js'


describe('Flipkart Product Search', () => {
    it('should search for a product', async() => {
        await HomePage.open();
        const productName = "redmi note 13";
        await HomePage.enterSearchText(productName);
        expect(HomePage.searchResultsTitle(productName)).toBePresent();
    });
});

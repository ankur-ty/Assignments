
 const {Given, Then, When, Before} = require('@cucumber/cucumber');
 
 

 Given('I open the Flipkart page',async function () {
   await browser.page.homePage().navigatetoHomePage();
 });
 
 When('I see login popup', async function () {
   await browser.page.homePage().waitForLoginPopup();
 });
 
 Then('I dismiss it', async function () {
   await browser.page.homePage().dismissLoginPopup();
 });
 
 When('I enter {string} in the product search textbox', async function (productName) {
   await browser.page.homePage().enterProductName(productName);
 });
 
 Then('Body contains {string}', async function (contains) {
   await browser.page.homePage().assertBodyContains(contains);
 });



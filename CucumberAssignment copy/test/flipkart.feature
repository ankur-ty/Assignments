Feature: Flipkart Search
Background: Background name
  Given I open the Flipkart page

Scenario: Search for a product on Flipkart
    Given I open the Flipkart page
    When I see login popup 
    Then I dismiss it
    When I enter "Redmi note 13" in the product search textbox
    Then Body contains "Redmi note 13"

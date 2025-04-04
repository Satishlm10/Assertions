Feature: Login functionality

  Scenario: Valid user login
    Given the browser is open
    When the user navigates to the login page
    And enters valid credentials
    Then the user should be redirected to the homepage

  Scenario: Invalid user login
    Given the browser is open
    When the user navigates to the login page
    And enters valid credentials
    Then the user should be redirected to the homepage
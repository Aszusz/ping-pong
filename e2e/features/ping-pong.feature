Feature: Ping Pong

  Background:
    Given I open the app
    And I clear all pongs

  Scenario: Page loads with empty state
    Then I should see the heading "Ping Pong"
    And I should see the empty state message

  Scenario: Creating a pong
    When I click the Ping button
    Then I should see 1 pong in the list

  Scenario: Creating multiple pongs
    When I click the Ping button
    And I click the Ping button
    And I click the Ping button
    Then I should see 3 pongs in the list

  Scenario: Refreshing the list
    When I click the Ping button
    And I click the Refresh button
    Then I should see 1 pong in the list

  Scenario: Clearing all pongs
    When I click the Ping button
    And I click the Ping button
    And I click the Clear button
    Then I should see the empty state message

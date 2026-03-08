Feature: Pongs

  Scenario: Empty state is shown on initial load
    Given I open the Ping Pong app
    Then I should see the empty state message
    And I should see 0 pongs in the list

  Scenario: Clicking Ping adds a pong
    Given I open the Ping Pong app
    When I click the "Ping" button
    Then I should see 1 pongs in the list

  Scenario: Clicking Clear removes existing pongs
    Given I open the Ping Pong app
    And 2 pongs exist in the database
    When I refresh the pongs list
    And I click the "Clear" button
    Then I should see the empty state message
    And I should see 0 pongs in the list

  Scenario: Refresh pulls API-side updates
    Given I open the Ping Pong app
    And a pong exists in the database
    When I refresh the pongs list
    Then I should see 1 pongs in the list

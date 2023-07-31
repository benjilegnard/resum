Feature: articles
    Scenario: Articles Page views
        Given There are 10 articles in the datafile
        And I am a "visitor"
        When I visit the "home" page
        Then I should be redirected to "/articles"
        And 10 articles should be displayed

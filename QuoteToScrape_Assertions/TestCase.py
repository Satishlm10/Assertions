from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import unittest
from selenium.common.exceptions import TimeoutException
from pages.login_page import LoginPage
from pages.quote_blocks import Quote_Blocks
from pages.navigation_links import Navigation_Links
from locator import Locators

class QuotesToScrape_Test(unittest.TestCase):
    
    def setUp(self):
        self.driver = webdriver.Chrome()
        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 5)
        self.driver.get("https://quotes.toscrape.com/")
        self.login_page = LoginPage(self.driver)
        self.quote_blocks = Quote_Blocks(self.driver)
        self.navigation_links = Navigation_Links(self.driver)
    
    def test_login_with_valid_credentials(self):
        expected_result = "Logout"
        
        self.login_page.click_login_link()
        self.login_page.enter_username("Test User")
        self.login_page.enter_password("K@thmnadu123")
        self.login_page.click_login_button()
        actual_result = self.login_page.is_logout_link_visible()
        
        try:
            self.assertEqual(actual_result,expected_result)
            print("Test Pass - User Successfully logged in with valid credentials")
        except AssertionError as e:
            print("Test Failed - User cannot login with valid credentials")
    
    def test_login_with_invalid_username(self):
        expected_result = "https://quotes.toscrape.com/login"
    
        self.login_page.click_login_link()
        self.login_page.enter_username("1234567!@#$%^")
        self.login_page.enter_password("K@thmandu")
        self.login_page.click_login_button()
        
        actual_result = self.driver.current_url

        try:
            self.assertEqual(actual_result,expected_result)
            print("Test Pass")
        except AssertionError as e:
            print("Test Fail - User is logged in even with invalid username")
            
    def test_login_with_invalid_password(self):
        expected_result = "https://quotes.toscrape.com/login"
    
        self.login_page.click_login_link()
        self.login_page.enter_username("Test User")
        self.login_page.enter_password("abcdefgh")
        self.login_page.click_login_button()
        self.driver.implicitly_wait(1)
        actual_result = self.driver.current_url

       
        self.assertEqual(actual_result,expected_result)
        
    def test_login_with_invalid_credentials(self):
        expected_result = "https://quotes.toscrape.com/login"
    
        self.login_page.click_login_link()
        self.login_page.enter_username("1234567!@#$%")
        self.login_page.enter_password("abcdefgh")
        self.login_page.click_login_button()
        self.driver.implicitly_wait(1)
        actual_result = self.driver.current_url

       
        self.assertEqual(actual_result,expected_result)
        
    def test_login_with_empty_credentials(self):
        expected_result = "Error while logging in: please, provide your username."
    
        self.login_page.click_login_link()
        self.login_page.click_login_button()
        self.driver.implicitly_wait(1)
        actual_result = self.login_page.login_error_msg()

        self.assertEqual(actual_result,expected_result)
        
    def test_login_with_empty_username(self):
        expected_result = "Error while logging in: please, provide your username."
    
        self.login_page.click_login_link()
        self.login_page.enter_password("K@thmandu123")
        self.login_page.click_login_button()
        self.driver.implicitly_wait(1)
        actual_result = self.login_page.login_error_msg()

        self.assertEqual(actual_result,expected_result)
        
    def test_login_with_empty_password(self):
        
        self.login_page.click_login_link()
        expected_result = self.driver.current_url
        self.login_page.enter_username("Test User")
        self.login_page.click_login_button()
        self.driver.implicitly_wait(1)
        actual_result = self.driver.current_url

        self.assertEqual(actual_result,expected_result)
        
    def test_check_total_number_of_quotes(self):
        totalQuotes = 0
        while True:
            numberOfQuotesPerPage = 0
            quotes = self.quote_blocks.get_quotes()
            numberOfQuotesPerPage = len(quotes)
            totalQuotes += numberOfQuotesPerPage
            
            try:
                self.navigation_links.click_next_link()
            except Exception as e:
                break  
            
        actualResult = totalQuotes

        try:
            self.assertGreaterEqual(actualResult,100)
            print("Test Pass - The number of quotes is greater than or equal to 100")
        except AssertionError as e:
            print("Test Fail - The number of quotes is not greater than or equal to 100")
            print(e.args)
    
    def test_all_quote_block_contains_quote(self):
    
        quotes_present = False

        while True:
            quotes = self.quote_blocks.get_quotes_from_quote_blocks()
            for quote in quotes:
                quotes_present = quote.is_displayed()
                if(quotes_present == False):
                    break
            
            try:
                self.navigation_links.click_next_link()
            except Exception as e:
                break  
            
        actual_result = quotes_present
        

        try:
            self.assertTrue(actual_result)
            print("Test Pass - All quote blocks consist of quotes")
        except AssertionError as e:
            print("Test Fail - All quote block do not consists of quotes")
            print(e.args)

    def test_all_quote_block_contains_author_name(self):
        authors_present = False

        while True:
            authors = self.quote_blocks.get_authors_from_quote_blocks()
            for author in authors:
                authors_present = author.is_displayed()
                if(authors_present == False):
                    break
            
            try:
                self.navigation_links.click_next_link()
            except Exception as e:
                break  
            
        actual_result = authors_present
        
        try:
            self.assertTrue(actual_result)
            print("Test Pass - All quotes blocks contain author name")
        except AssertionError as e:
            print("Test Fail - All quotes blocks do not contain author name")
            print(e.args)
    
    def test_all_quote_block_contains_author_about_link(self):
        about_link_present = False

        while True:
            about_links = self.quote_blocks.get_about_link_from_quote_blocks()
            for link in about_links:
                about_link_present = link.is_displayed()
                if(about_link_present == False):
                    break
            
            try:
               self.navigation_links.click_next_link()
            except Exception as e:
                break  
            
        actual_result = about_link_present

        try:
            self.assertTrue(actual_result)
            print("Test Pass - All quotes blocks contain author about link")
        except AssertionError as e:
            print("Test Fail - All quotes blocks do not contain author about link")
            print(e.args)
    
    def test_all_quote_block_contains_tags(self):
        tags_present = False

        while True:
            tags = self.quote_blocks.get_tags_from_quote_blocks()
            for tag in tags:
                tags_present = tag.is_displayed()
                if(tags_present == False):
                    break
            
            try:
               self.navigation_links.click_next_link()
            
            except Exception as e:
                break  
            
        actual_result = tags_present

        try:
            self.assertTrue(actual_result)
            print("Test Pass - All quotes blocks contain tags")
        except AssertionError as e:
            print("Test Fail - All quotes blocks do not contain tags")
            print(e.args)
    
    def test_homepage_displays_top_ten_tags(self):
    
        top_ten_quotes = self.quote_blocks.get_top_ten_tag_in_homepage()
        actual_result = len(top_ten_quotes)

        try:
            self.assertEqual(actual_result,10)
            print("Test Pass - The homepage conists of top 10 tags")
        except AssertionError as e:
            print("Test Fail - The homepage doen't have top 10 tags")
            print(e.args)
    
    
    
    def tearDown(self):
        self.driver.quit()
        

if __name__ == "__main__":
    unittest.main()
from selenium import webdriver
from selenium.webdriver.support.ui import WebDriverWait
import unittest
from selenium.common.exceptions import TimeoutException
from pages.login_page import LoginPage
from pages.quote_blocks import Quote_Blocks
from pages.navigation_links import Navigation_Links
from pages.author_details_page import Author_Details_Page
import re
from unidecode import unidecode
from selenium.webdriver.chrome.options import Options

class QuotesToScrape_Test(unittest.TestCase):
    
    def setUp(self):
        chrome_options = Options()
        chrome_options.add_argument("--headless")
        chrome_options.add_argument("--disable-gpu")  
        self.driver = webdriver.Chrome(options=chrome_options)
        # self.driver = webdriver.Chrome()

        self.driver.maximize_window()
        self.wait = WebDriverWait(self.driver, 5)
        self.driver.get("https://quotes.toscrape.com/")
        self.login_page = LoginPage(self.driver)
        self.quote_blocks = Quote_Blocks(self.driver)
        self.navigation_links = Navigation_Links(self.driver)
        self.author_details_page = Author_Details_Page(self.driver)
    
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
        
    def test_login_user_can_logout(self):
        expected_result = "Login"
        self.login_page.click_login_link()
        self.login_page.enter_username("Test User")
        self.login_page.enter_password("K@thmnadu123")
        self.login_page.click_login_button()
        self.driver.implicitly_wait(1)
        self.login_page.click_logout_link()
        actual_result = self.login_page.is_login_link_visible()
        
        try:
            self.assertEqual(actual_result,expected_result)
            print("Test Pass - User can Login and Logout from the website")
        except AssertionError as e:
            print("Test Fail - Logged in user isn't able to logout from the website")
            print(e.args)
        
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
    
    def test_author_details_page_contains_author_details(self):
   
        self.driver.get("https://quotes.toscrape.com/author/Albert-Einstein/")
        
        author_title = self.author_details_page.get_author_title()
        title_present = author_title.is_displayed()

        author_dob = self.author_details_page.get_author_dob()
        dob_present = author_dob.is_displayed()

        author_born_location = self.author_details_page.get_author_birth_location()
        location_present = author_born_location.is_displayed()

        author_description = self.author_details_page.get_author_description()
        description_present = author_description.is_displayed()
                                                                
        actual_result = title_present and dob_present and location_present and description_present

        try:
            self.assertTrue(actual_result)
            print("Test Pass - The author details page contains all the author details.")
        except AssertionError as e:
            print("Test Fail - The author details page do not contain all the author details.")
            print(e.args)
        
    def test_author_details_page_consists_author_name(self):

        self.driver.get("https://quotes.toscrape.com/author/Albert-Einstein/")
        title_present = False
        
        author_title = self.author_details_page.get_author_title()
        title_present = author_title.is_displayed()
        actual_result = title_present 

        try:
            self.assertTrue(actual_result)
            print("Test Pass - The author details page consist of author name")
        except AssertionError as e:
            print("Test Fail - The author details page does not consist author name")
            print(e.args)
    
    def test_author_details_page_consists_author_dob(self):
        self.driver.get("https://quotes.toscrape.com/author/Albert-Einstein/")
        dob_present = False

        author_dob = self.author_details_page.get_author_dob()
        dob_present = author_dob.is_displayed()                                                  
        actual_result = dob_present


        try:
            self.assertTrue(actual_result)
            print("Test Pass - The author details page consist of author dob")
        except AssertionError as e:
            print("Test Fail - The author details page does not consist author dob")
            print(e.args)
    
    def test_author_details_page_consists_author_birth_location(self):
     
        self.driver.get("https://quotes.toscrape.com/author/Albert-Einstein/")
        location_present = False
        
        author_born_location = self.author_details_page.get_author_birth_location()
        location_present = author_born_location.is_displayed()    
        actual_result = location_present

        try:
            self.assertTrue(actual_result)
            print("Test Pass - The author details page consist of author birth location")
        except AssertionError as e:
            print("Test Fail - The author details page does not consist author birth location")
            print(e.args)
    
    def test_author_details_page_consists_author_description(self):
       
        self.driver.get("https://quotes.toscrape.com/author/Albert-Einstein/")
        description_present = False
        
        author_description = self.author_details_page.get_author_description()
        description_present = author_description.is_displayed()
                                                                
        actual_result = description_present

        try:
            self.assertTrue(actual_result)
            print("Test Pass - The author details page consist of author description")
        except AssertionError as e:
            print("Test Fail - The author details page does not consist author description")
            print(e.args)
    
    def test_all_top_ten_tags_are_of_equal_height(self):
    
        tag_size = None
        tag_height = set()

        top_ten_tag = self.quote_blocks.get_top_ten_tag_in_homepage()
        for tag in top_ten_tag:
            tag_size = tag.size
            tag_height.add(tag_size.get('height'))
    
        actual_result = len(tag_height)

        try:
            self.assertEqual(actual_result,1)
            print("Test Pass - The height of all the tags in the top ten tags section is equal")
        except AssertionError as e:
            print("Test Fail - The height of all the tags in the top ten tags section is not equal")
                
    def test_all_tags_inside_quote_block_are_of_equal_height(self):
        tag_size = None
        tag_height = set()
        
        while True:
            tags = self.quote_blocks.get_tags_from_quote_blocks()
            for tag in tags:
                tag_size = tag.size
                tag_height.add(tag_size.get('height'))
            
            try:
                self.navigation_links.click_next_link()
            
            except Exception as e:
                break  
    
        actual_result = len(tag_height)

        try:
            self.assertEqual(actual_result,1)
            print("Test Pass - All the tags inside the quote blocks have equal height")
        except AssertionError as e:
            print("Test Fail - All the tags inside the quote blokcs do not have equal height")
            print(e)
    
    def test_all_quote_blocks_are_of_equal_width(self):
        expected_result = 1
        quote_block_size = None
        quote_block_width = set()
        

        while True:
            quote_blocks = self.quote_blocks.get_quotes()
            for block in quote_blocks:
                quote_block_size = block.size
                quote_block_width.add(quote_block_size.get('width'))
                
            
            try:
                self.navigation_links.click_next_link()
            
            except Exception as e:
                break  
    
        actual_result = len(quote_block_width)

        try:
            self.assertEqual(actual_result,expected_result)
            print("Test Pass - All the quote blocks are of equal width")
        except AssertionError as e:
            print("Test Fail - All the quote blocks are not of equal width")
            print(e)
    
    def test_all_quote_blocks_have_atleast_one_tag(self):
        block_counter = len(self.quote_blocks.get_quotes())
        quote_page = 1

        while True:
            try:
                tags_in_a_quote_block = self.quote_blocks.get_tags_from_each_quote_blocks(block_counter)
                tag_count = len(tags_in_a_quote_block)
                
            except TimeoutException as e:
                tag_count = 0
                
            try:
                self.assertGreaterEqual(tag_count,1)
                
            except AssertionError as e:
                print("Test Fail")
                print(f"In page number {quote_page} and quote block {block_counter} doesn't have any tags ")
                
            block_counter = block_counter - 1

            if(block_counter == 0):
                try:
                    block_counter = len(self.quote_blocks.get_quotes())
                    self.navigation_links.click_next_link()
                    quote_page += 1
            
                except Exception as e:
                    break  
    
    def get_all_tags(self):
        all_tags_arr = []
        all_tags_set = set()

        while True:
            tags = self.quote_blocks.get_tags_from_quote_blocks()
            for tag in tags:
                all_tags_arr.append(tag.text)
            
            try:
                self.navigation_links.click_next_link()
            
            except Exception as e:
                break  

        for tags in all_tags_arr:
            all_tags_set.add(tags)

        all_tags_arr = list(all_tags_set)
        all_tags_arr.sort()
        return all_tags_arr
    
    def get_all_author_name_list(self):
        all_author_arr = []
        all_author_set = set()

        while True:
            authors = self.quote_blocks.get_authors_from_quote_blocks()
            for author in authors:
                ascii_name = unidecode(author.text)
                ascii_name = re.sub(r"'", "", ascii_name)
                cleaned_name = re.sub(r"[^a-zA-Z0-9]", "-", ascii_name)
                cleaned_name = re.sub(r"-+", "-", cleaned_name).strip("-")
                all_author_arr.append(cleaned_name)
            
            try:
                self.navigation_links.click_next_link()
            
            except Exception as e:
                break  

        for author in all_author_arr:
            all_author_set.add(author)

        all_author_arr = list(all_author_set)
        all_author_arr.sort()
        return all_author_arr
    
    def test_all_tag_links_can_be_visited(self):
        
        all_tags_arr = self.get_all_tags()
        number_of_tags = len(all_tags_arr)
        link_visited_counter = 0

        try:
            for tag in all_tags_arr:
                self.driver.get(f"https://quotes.toscrape.com/tag/{tag}")
                link_visited_counter += 1
        
            self.assertEqual(number_of_tags,link_visited_counter)
            print("Test Pass - All tag links can be visited")
        except AssertionError as e:
            print(f"Test Fail - Tag {tag} link cannot be visited.")
            print(e.args)
    
    def test_all_tags_have_atleast_one_quote(self):
        all_tags_arr = self.get_all_tags()
        
        try:
            for tag in all_tags_arr:
                number_of_quotes = 0
                self.driver.get(f"https://quotes.toscrape.com/tag/{tag}")
                number_of_quotes = len(self.quote_blocks.get_quotes())
        
                self.assertGreaterEqual(number_of_quotes,1)
                print(f"Tag {tag} has {number_of_quotes} quotes")
        except AssertionError as e:
            print(f"Test Fail - Tag {tag} doesn't have any quotes.")
            print(e.args)
    
    def test_all_author_description_page_can_be_visited(self):
        
        all_author_arr = self.get_all_author_name_list()
        number_of_tags = len(all_author_arr)
        link_visited_counter = 0

        try:
            for author in all_author_arr:
                self.driver.get(f"https://quotes.toscrape.com/author/{author}")
                link_visited_counter += 1
        
            self.assertEqual(number_of_tags,link_visited_counter)
            print("Test Pass - All author description page can be visited.")
        except AssertionError as e:
            print(f"Test Fail - Author {author} description cannot be visited.")
            print(e.args)
            
    def test_all_author_description_page_has_author_title(self):
        
        all_author_arr = self.get_all_author_name_list()

        try:
            for author in all_author_arr:
                self.driver.get(f"https://quotes.toscrape.com/author/{author}")
                author_title = self.author_details_page.get_author_title().is_displayed()
        
                self.assertTrue(author_title)
                print(f"Test Pass - Author {author} description page contains the title.")
        except AssertionError as e:
            print(f"Test Fail - Author {author} description page cannot be visited.")
            print(e.args)
            
    def test_all_author_description_page_has_author_dob(self):
        
        all_author_arr = self.get_all_author_name_list()

        try:
            for author in all_author_arr:
                self.driver.get(f"https://quotes.toscrape.com/author/{author}")
                author_dob = self.author_details_page.get_author_dob().is_displayed()
        
                self.assertTrue(author_dob)
                print(f"Test Pass - Author {author} description page contains the date of birth.")
        except AssertionError as e:
            print(f"Test Fail - Author {author} description page cannot be visited.")
            print(e.args)
            
    def test_all_author_description_page_has_author_birth_location(self):
        
        all_author_arr = self.get_all_author_name_list()

        try:
            for author in all_author_arr:
                self.driver.get(f"https://quotes.toscrape.com/author/{author}")
                author_birth_location = self.author_details_page.get_author_birth_location().is_displayed()
        
                self.assertTrue(author_birth_location)
                print(f"Test Pass - Author {author} description page contains the birth location.")
        except AssertionError as e:
            print(f"Test Fail - Author {author} description page cannot be visited.")
            print(e.args)
            
    def test_all_author_description_page_has_author_description(self):
        
        all_author_arr = self.get_all_author_name_list()

        try:
            for author in all_author_arr:
                self.driver.get(f"https://quotes.toscrape.com/author/{author}")
                author_description = self.author_details_page.get_author_description().is_displayed()
        
                self.assertTrue(author_description)
                print(f"Test Pass - Author {author} description page contains the author description.")
        except AssertionError as e:
            print(f"Test Fail - Author {author} description page cannot be visited.")
            print(e.args)
            
    def test_navigating_to_previous_page_work(self):
         expected_result = "https://quotes.toscrape.com/page/1/"
         while True:
            try:
                self.navigation_links.click_next_link()
            
            except Exception as e:
                break 
         while True:
            try:
                self.navigation_links.click_previous_link()
            except Exception as e:
                  actual_result = self.driver.current_url
                  self.assertEqual(actual_result,expected_result)
                  print("Test Passed")
                  break
            
    
    def tearDown(self):
        self.driver.quit()
        

if __name__ == "__main__":
    unittest.main(defaultTest="QuotesToScrape_Test.test_navigating_to_previous_page_work")
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from locator import Locators

class Quote_Blocks:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 5)

    def get_quotes(self):
      return self.wait.until(EC.presence_of_all_elements_located(Locators.QUOTE_BLOCK))

    def get_quotes_from_quote_blocks(self):
        return self.wait.until(EC.presence_of_all_elements_located(Locators.QUOTE_IN_QUOTE_BLOCK))
    
    def get_authors_from_quote_blocks(self):
        return self.wait.until(EC.presence_of_all_elements_located(Locators.AUTHOR_IN_QUOTE_BLOCK))
    
    def get_about_link_from_quote_blocks(self):
        return self.wait.until(EC.presence_of_all_elements_located(Locators.ABOUT_LINK_IN_QUOTE_BLOCK))
    
    def get_tags_from_quote_blocks(self):
        return self.wait.until(EC.presence_of_all_elements_located(Locators.TAGS_IN_QUOTE_BLOCK))
    
    def get_top_ten_tag_in_homepage(self):
        return self.wait.until(EC.presence_of_all_elements_located(Locators.TOP_TEN_TAGS))
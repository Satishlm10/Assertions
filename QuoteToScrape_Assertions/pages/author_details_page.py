from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from locator import Locators

class Author_Details_Page:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 5)

    def get_author_title(self):
       return self.wait.until(EC.presence_of_element_located(Locators.AUTHOR_TITLE))
   
    def get_author_dob(self):
       return self.wait.until(EC.presence_of_element_located(Locators.AUTHOR_DOB))
   
    def get_author_birth_location(self):
       return self.wait.until(EC.presence_of_element_located(Locators.AUTHOR_BIRTH_LOCATION))
   
    def get_author_description(self):
       return self.wait.until(EC.presence_of_element_located(Locators.AUTHOR_DESCRIPTION))


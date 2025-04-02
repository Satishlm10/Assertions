from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from locator import Locators

class Navigation_Links:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 5)

    def click_next_link(self):
        self.wait.until(EC.visibility_of_element_located(Locators.NEXT_LINK)).click()


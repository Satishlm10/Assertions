from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from locator import Locators

class LoginPage:
    def __init__(self, driver):
        self.driver = driver
        self.wait = WebDriverWait(driver, 5)

    def click_login_link(self):
        self.wait.until(EC.element_to_be_clickable(Locators.LOGIN_LINK)).click()

    def enter_username(self, username):
        self.wait.until(EC.presence_of_element_located(Locators.USERNAME_INPUT)).send_keys(username)

    def enter_password(self, password):
        self.wait.until(EC.presence_of_element_located(Locators.PASSWORD_INPUT)).send_keys(password)

    def click_login_button(self):
        self.wait.until(EC.element_to_be_clickable(Locators.LOGIN_BUTTON)).click()

    def is_logout_link_visible(self):
        return self.wait.until(EC.presence_of_element_located(Locators.LOGOUT_LINK)).text 
    
    def is_login_link_visible(self):
        return self.wait.until(EC.presence_of_element_located(Locators.LOGIN_LINK)).text 
    
    def click_logout_link(self):
        self.wait.until(EC.presence_of_element_located(Locators.LOGOUT_LINK)).click()
    
    def login_error_msg(self):
        return self.wait.until(EC.presence_of_element_located(Locators.LOGIN_ERROR)).text

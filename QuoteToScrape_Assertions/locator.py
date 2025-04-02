from selenium.webdriver.common.by import By

class Locators:
    # Login Locators
    LOGIN_LINK = (By.XPATH, '//a[contains(text(), "Login")]')
    USERNAME_INPUT = (By.XPATH, '//*[@id="username"]')
    PASSWORD_INPUT = (By.XPATH, '//*[@id="password"]')
    LOGIN_BUTTON = (By.XPATH, "//input[@type='submit']")
    LOGOUT_LINK = (By.XPATH,'//a[contains(text(),"Logout")]')
    LOGIN_ERROR = (By.XPATH,'//p[@class="error"]')
    
    
    # locator for all the quote blocks, quotes, authors, about links and tags in a page
    QUOTE_BLOCK = (By.XPATH,'//div[@class="quote"]') 
    QUOTE_IN_QUOTE_BLOCK = (By.XPATH,'//span[@itemprop="text"]')
    AUTHOR_IN_QUOTE_BLOCK = (By.XPATH,'//small[@itemprop="author"]')
    ABOUT_LINK_IN_QUOTE_BLOCK = (By.XPATH,'//a[contains(text(),"(about)")]')
    TAGS_IN_QUOTE_BLOCK = (By.XPATH,'//div[@class="tags"]//a[@class="tag"]')
    
    # locator for next button to navigate the pages
    NEXT_LINK = (By.XPATH,'//li[@class="next"]/a') 
    
    # locator for all the tags in the top ten quotes section in the homepage
    TOP_TEN_TAGS = (By.XPATH,'//span/a[@class="tag"]')
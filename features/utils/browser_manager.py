from selenium import webdriver

class BrowserManager:
    @staticmethod
    def start_browser():
        driver = webdriver.Chrome()
        driver.maximize_window()
        return driver
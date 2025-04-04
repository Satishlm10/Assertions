from behave import given, when, then
import time
from features.utils.browser_manager import BrowserManager
from features.pages.login_pages import LoginPage

@given("the browser is open")
def step_open_browser(context):
    context.driver = BrowserManager.start_browser()
   

@when("the user navigates to the login page")
def step_navigate_to_login(context):
    context.driver.get("https://quotes.toscrape.com/")
    context.login_page = LoginPage(context.driver)
    context.login_page.click_login_link() 

@when("enters valid credentials")
def step_enter_credentials(context):
    context.login_page.enter_username("Test User")
    context.login_page.enter_password("K@thmandu123")
    context.login_page.click_login_button()

@then("the user should be redirected to the homepage")
def step_verify_dashboard(context):
    time.sleep(2)
    assert "https://quotes.toscrape.com" in context.driver.current_url

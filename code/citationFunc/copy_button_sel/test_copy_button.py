from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.action_chains import ActionChains
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Initialize the WebDriver
driver = webdriver.Chrome()  # Make sure 'chromedriver' is in your PATH or specify the full path here

try:
    # Open the target page
    driver.get("https://www.easybib.com/")  # Replace with the actual URL
    
    # Wait for the element to load
    wait = WebDriverWait(driver, 10)  # Waits up to 10 seconds
    element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#__next > div.styled__Background-sc-11wpos5-1.jvqjHY > div > div > main > div > div.styled__CardsContainer-sc-popgt-1.kealfW > div:nth-child(1) > a')))
    
    # Scroll into view if necessary
    driver.execute_script("arguments[0].scrollIntoView();", element)
    
    # Click the element
    element.click()
    
    # Pause to observe the action (optional)
    time.sleep(2)  # Adjust time as needed

finally:
    # Close the browser after completing the action
    time.sleep(30)
    driver.quit()
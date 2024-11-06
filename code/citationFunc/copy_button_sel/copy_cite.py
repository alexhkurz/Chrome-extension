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
    driver.get("https://ieeexplore.ieee.org/document/10034461")  # Replace with the actual URL
    
    time.sleep(1)
    # Wait for the element to load
    wait = WebDriverWait(driver, 10)  # Waits up to 10 seconds
    element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, '#xplMainContentLandmark > div > xpl-document-details > div > div.document-main.global-content-width-w-rr > section.document-main-header.row.g-0 > div > xpl-document-header > section > div.document-header-inner-container.row.g-0 > div > div > div.row.g-0.document-title-fix > div > div.left-container.w-100 > div > div:nth-child(2) > xpl-cite-this-modal > div > button')))
    
    # Scroll into view if necessary
    driver.execute_script("arguments[0].scrollIntoView();", element)
    
    # Click the element
    element.click()
    
    # Pause to observe the action (optional)
    time.sleep(1)  # Adjust time as needed


    wait = WebDriverWait(driver, 10)  # Waits up to 10 seconds
    element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'body > ngb-modal-window > div > div > div > div.tab-nav > nav > div:nth-child(2) > a')))
    
    # Scroll into view if necessary
    driver.execute_script("arguments[0].scrollIntoView();", element)
    
    # Click the elementx
    element.click()
    
    # Pause to observe the action (optional)
    time.sleep(1)  # Adjust time as needed

    wait = WebDriverWait(driver, 10)  # Waits up to 10 seconds
    element = wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, 'body > ngb-modal-window > div > div > div > div:nth-child(3) > div.user-selection-wrapper > div.btn-container.d-flex > a')))
    
    # Scroll into view if necessary
    driver.execute_script("arguments[0].scrollIntoView();", element)
    
    # Click the elementx
    element.click()
    
    # Pause to observe the action (optional)
    time.sleep(1)  # Adjust time as needed

finally:
    # Close the browser after completing the action
    time.sleep(30)
    driver.quit()
from selenium import webdriver
from selenium.webdriver.common.by import By
import time

# 1. Start the session
driver = webdriver.Chrome()  # Create a new driver session

try:
    # 2. Take action on browser
    driver.get("https://ieeexplore.ieee.org/document/10034461")  # Replace with the actual URL containing the "Copy Citation" button

    # 3. Request browser information
    title = driver.title
    print(f"Page Title: {title}")

    # 4. Establish Waiting Strategy
    driver.implicitly_wait(0.5)  # Set an implicit wait

    # 5. Find the "Copy Citation" button
    copy_button = driver.find_element(By.CSS_SELECTOR, 'body > ngb-modal-window > div > div > div > div:nth-child(3) > div.user-selection-wrapper > div.btn-container.d-flex > a')  # Update with the actual selector

    # 6. Take action on element
    copy_button.click()  # Click the "Copy Citation" button
    print("Citation copied!")

    # Optional: Request element information (if needed)
    # For example, you can check if a confirmation message appears
    confirmation_message = driver.find_element(By.CSS_SELECTOR, 'div.confirmation')
    print(confirmation_message.text)

finally:
    # 8. End the session
    driver.quit()  # Always use driver.quit() to end the session


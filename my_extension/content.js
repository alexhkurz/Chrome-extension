document.addEventListener('mouseup', () => {
    console.log('Mouseup event detected.');
    const selectedText = window.getSelection().toString().trim();
    console.log('Mouseup event detected. Selected text:', selectedText);
    if (selectedText) {
      console.log('Selected text:', selectedText);
      console.log('Sending highlight message:', selectedText);
      chrome.runtime.sendMessage({ type: 'highlight', text: selectedText }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError);
        } else {
          console.log('Message sent successfully:', response);
        }
      });
    }
  });
  
  document.addEventListener('copy', () => {
    const selectedText = window.getSelection().toString().trim();
    console.log('Copy event detected. Selected text:', selectedText);
    if (selectedText) {
      console.log('Sending copy message:', selectedText);
      chrome.runtime.sendMessage({ type: 'copy', text: selectedText }, (response) => {
        if (chrome.runtime.lastError) {
          console.error('Error sending message:', chrome.runtime.lastError);
        } else {
          console.log('Message sent successfully:', response);
        }
      });
    }
  });
  
  console.log('Mouseup event detected.');
  const selectedText = window.getSelection().toString().trim();
  console.log('Mouseup event detected. Selected text:', selectedText);
  if (selectedText) {
    console.log('Selected text:', selectedText);
    console.log('Sending highlight message:', selectedText);
    chrome.runtime.sendMessage({ type: 'highlight', text: selectedText }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError);
      } else {
        console.log('Message sent successfully:', response);
      }
    });
  }
});

document.addEventListener('copy', () => {
  const selectedText = window.getSelection().toString().trim();
  console.log('Copy event detected. Selected text:', selectedText);
  if (selectedText) {
    console.log('Sending copy message:', selectedText);
    chrome.runtime.sendMessage({ type: 'copy', text: selectedText }, (response) => {
      if (chrome.runtime.lastError) {
        console.error('Error sending message:', chrome.runtime.lastError);
      } else {
        console.log('Message sent successfully:', response);
      }
    });
  }
});

console.log('PDA loaded')
chrome.storage.sync.set({ history: [] }) // reset

// Track when a tab becomes active (i.e., user switches tabs)
chrome.tabs.onActivated.addListener(function(activeInfo) {
  chrome.tabs.get(activeInfo.tabId, function(tab) {
    if (tab.url) {
      updateHistory(tab, 'tabActivated')
    }
  })
})

// Track when the user changes window focus
chrome.windows.onFocusChanged.addListener(function(windowId) {
  if (windowId !== chrome.windows.WINDOW_ID_NONE) {
    chrome.tabs.query({ active: true, windowId: windowId }, function(tabs) {
      if (tabs.length > 0) {
        const tab = tabs[0]
        if (tab.url) {
          updateHistory(tab, 'windowFocusChanged')
        }
      }
    })
  }
})

// Track when the user navigates to a new page
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete' && tab.url) {
    updateHistory(tab, 'tabUpdated')
  }
})

// Track when the user highlights text
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('Message received:', message);
  if (message.type === 'highlight' || message.type === 'copy') {
    console.log('Highlight or copy message received.');
    const event = {
      event: message.type,
      text: message.text,
      timestamp: Date.now()
    };
    console.log(`${message.type.charAt(0).toUpperCase() + message.type.slice(1)} message received:`, message.text, 'from', sender);
    chrome.storage.sync.get(['history'], function(result) {
      const history = result.history ? result.history : [];
      history.push(event);
      chrome.storage.sync.set({ history }, function() {
        console.log(`${message.type.charAt(0).toUpperCase() + message.type.slice(1)} text added to history.`);
        console.log('History:', history);
      });
      fetch('http://localhost:3000/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      }).then(response => {
        if (!response.ok) {
          console.error(`Failed to send ${message.type} event to server:`, response.statusText);
        } else {
          console.log(`${message.type.charAt(0).toUpperCase() + message.type.slice(1)} event sent to server successfully.`);
        }
      }).catch(error => {
        console.error(`Error sending ${message.type} event to server:`, error);
      });
    });
  }
});

function updateHistory(tab, event) {
  chrome.storage.sync.get(['history'], function(result) {
    const history = result.history ? result.history : []
    const prev = history[history.length-1]
    let curr = {
      event,
      id: tab.id,
      url: tab.url,
      title: tab.title,
      windowId: tab.windowId,
      groupId: tab.groupId,
      openerTabId: tab.openerTabId,
      lastAccessed: tab.lastAccessed,
      timestamp: Date.now()
    }

    // append to history if new event
    if (!prev || prev.id !== curr.id || prev.url !== curr.url) {
      history.push(curr)
      chrome.storage.sync.set({ history }, function() {
        console.log('URL ' + tab.url + ' added to history.')
        console.log('History:', history)
      })
      console.log('Attempting to fetch:', 'http://localhost:3000/event');
      fetch('http://localhost:3000/event', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(curr)
      })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json(); // or response.text() depending on what you're expecting
      })
      .then(data => {
        console.log('Success:', data);
      })
      .catch(error => {
        console.error('Error:', error.message);
        console.error('Error details:', error);
      });
    }
  })
}

chrome.action.onClicked.addListener((tab) => {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    let activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "collect_bibtex"});
  });
});

const serverUrl = 'http://localhost:3000'; 

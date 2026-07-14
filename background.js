chrome.action.onClicked.addListener((tab) => {
  if (tab.url && tab.url.includes("instagram.com")) {
    chrome.tabs.sendMessage(tab.id, { action: "toggle_ui" }).catch(() => {
      // Ignore errors if the content script is not yet loaded
    });
  }
});

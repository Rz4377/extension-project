chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ blockedKeywords: [] });
    console.log('YouTube Filter extension installed.');
  });
  
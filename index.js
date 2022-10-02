browser.browserAction.onClicked.addListener((tab) => {
    browser.tabs.executeScript({file: "/spotify2tabs.js"});
});

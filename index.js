let flag = false;

const icons = {
    path: {
        "16": "./assets/icons/spotify2tabs/16.png",
        "32": "./assets/icons/spotify2tabs/32.png",
        "48": "./assets/icons/spotify2tabs/48.png",
        "64": "./assets/icons/spotify2tabs/64.png",
        "256": "./assets/icons/spotify2tabs/256.png"
    }
}

browser.browserAction.onClicked.addListener((tab) => {
    if (flag) {
        browser.tabs.executeScript({file: "/spotify2tabs.js"});
    }
});

browser.tabs.onActivated.addListener((activeInfo) => {
    browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tab = tabs[0];
        const url = tab.url;
        console.log(url);
        if (!url.includes('https://open.spotify.com/')) {
            browser.browserAction.setIcon({tabId: activeInfo.tabId, ...deactivatedIcon});
            flag = false;
        } else {
            browser.browserAction.setIcon({tabId: activeInfo.tabId, ...activatedIcon});
            flag = true;
        }
    })
})

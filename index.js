let flag = false;

const deactivatedIcon = {
    path: {
        "48": "/assets/deactivated_icon.png"
    }
}

const activatedIcon = {
    path: {
        "48": "/assets/activated_icon.png"
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

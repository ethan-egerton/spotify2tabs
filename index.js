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

chrome.action.onClicked.addListener((tab) => {
    if (flag) {
        chrome.scripting.executeScript({
            target: {tabId: tab.id},
            files: ["/spotify2tabs.js"]
        });
    }
});

chrome.tabs.onActivated.addListener((activeInfo) => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tab = tabs[0];
        const url = tab.url;
        console.log(url);
        if (!url.includes('https://open.spotify.com/')) {
            chrome.action.setIcon({tabId: activeInfo.tabId, ...deactivatedIcon});
            flag = false;
        } else {
            chrome.action.setIcon({tabId: activeInfo.tabId, ...activatedIcon});
            flag = true;
        }
    })
})

chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
        case 'activate':
            chrome.scripting.executeScript({file: "/spotify2tabs.js"});
            break;
        default:
            console.log(`Command ${command} not found`);
    }
});

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

function runScript() {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tab = tabs[0];
        const url = tab.url;
        if (url.includes('https://open.spotify.com/')) {
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ["/spotify2tabs.js"]
        });
        }
    })
}

chrome.commands.onCommand.addListener(function (command) {
    switch (command) {
        case 'activate':
            chrome.scripting.executeScript({
                target: {tabId: tab.id},
                files: ["/spotify2tabs.js"]
        });
            break;
        default:
            console.log(`Command ${command} not found`);
    }
});

chrome.tabs.onUpdated.addListener(runScript);
chrome.tabs.onActivated.addListener(runScript);
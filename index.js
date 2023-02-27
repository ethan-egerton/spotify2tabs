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
    browser.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        const tab = tabs[0];
        const url = tab.url;
        if (url.includes('https://open.spotify.com/')) {
            browser.tabs.executeScript({file: "/spotify2tabs.js"});
        }
    })
}

browser.commands.onCommand.addListener(function (command) {
    switch (command) {
        case 'activate':
            browser.tabs.executeScript({file: "/spotify2tabs.js"});
            break;
        default:
            console.log(`Command ${command} not found`);
    }
});

browser.tabs.onUpdated.addListener(runScript);
browser.tabs.onActivated.addListener(runScript);
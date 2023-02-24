let flag = false;

browser.browserAction.onClicked.addListener((tab) => {
  if (flag) {
    browser.tabs.executeScript({file: "/spotify2tabs.js"});
  }
});

browser.tabs.onActivated.addListener((tab) => {
  const url = tab.url;
  if (!url.includes('https://open.spotify.com/')) {
    browser.action.setIcon("/deactivated_icon.png");
    flag = false;
  } else {
    browser.action.setIcon("/activated_icon.png");
    flag = true;
  }
})
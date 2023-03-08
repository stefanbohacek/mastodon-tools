(async () => {
    const src = chrome.runtime.getURL('scripts/main.js');
    const contentMain = await import(src);
})();

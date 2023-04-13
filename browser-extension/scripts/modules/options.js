const loadOptions = async () => {
  const options = await chrome.storage.sync.get({
    mastodonInstances: 'mastodon.social\nbotsin.space',
    showHovercards: false,
    accounts: {},
    tokens: {},
  });
  return options;
}

const saveOptions = async (options) => {
   chrome.storage.sync.set(options, () => {
    let status = document.getElementById('status');
    if (status){
      status.textContent = 'Options saved.';
      setTimeout(() => {
        status.textContent = '';
      }, 1000);
    }
  });
}

export {saveOptions, loadOptions};

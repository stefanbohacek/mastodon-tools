import {saveOptions, loadOptions} from './modules/options.js';

const restoreOptions = async () => {
  const options = await loadOptions();
  
  if (options.mastodonInstances){
    document.getElementById('mastodon-instances').value = options.mastodonInstances;
  }
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', () => {
  let mastodonInstances = document.getElementById('mastodon-instances').value.trim();
  let getStatusContext = document.getElementById('get-status-context').checked;
  saveOptions({mastodonInstances, getStatusContext});
});

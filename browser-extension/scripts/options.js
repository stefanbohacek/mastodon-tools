import {saveOptions, loadOptions} from './modules/options.js';

const restoreOptions = async () => {
  const options = await loadOptions();
  
  if (options.mastodonInstances){
    document.getElementById('mastodon-instances').value = options.mastodonInstances;
  }
  if (options.showHovercards){
    document.getElementById('show-hovercards').checked = true;
  }
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', () => {
  let mastodonInstances = document.getElementById('mastodon-instances').value.trim();
  let showHovercards = document.getElementById('show-hovercards').checked;
  let getStatusContext = document.getElementById('get-status-context').checked;
  saveOptions({mastodonInstances, showHovercards, getStatusContext});
});

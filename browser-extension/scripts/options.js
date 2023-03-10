const saveOptions = () => {
  let mastodonInstances = document.getElementById('mastodon-instances').value;
  let showHovercards = document.getElementById('show-hovercards').checked;

  chrome.storage.sync.set({
    mastodonInstances,
    showHovercards
  }, function() {
    let status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 1000);
  });
}

const restoreOptions = () => {
  chrome.storage.sync.get({
    mastodonInstances: 'mastodon.social\nbotsin.space',
    showHovercards: true
  }, function(items) {
    if (items.mastodonInstances){
      document.getElementById('mastodon-instances').value = items.mastodonInstances;
    }
    if (items.showHovercards){
      document.getElementById('show-hovercards').checked = true;
    }
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

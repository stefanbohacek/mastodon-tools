const saveOptions = () => {
  let mastodonInstances = document.getElementById('mastodon-instances').value;
  chrome.storage.sync.set({
    mastodonInstances: mastodonInstances
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
    mastodonInstances: 'mastodon.social\nbotsin.space'
  }, function(items) {
    if (items.mastodonInstances){
      document.getElementById('mastodon-instances').value = items.mastodonInstances;
    }
  });
}
document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);

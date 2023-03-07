const ready = (fn) => {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

const switchInstance = (currentTarget) => {
  const instance = currentTarget.dataset.instance;

  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    const activeTab = tabs[0];
    const currentURL = activeTab.url;

    let domain = (new URL(currentURL));
    domain = domain.hostname;
    console.log();

    if (domain === instance){
      alert(`You are already on ${instance}.`);
    } else {
      const switchedURL = `https://${instance}/authorize_interaction?uri=${currentURL}`;
      chrome.tabs.update({url:switchedURL});
    }
    

  });
}

const addLiveEventListeners = (selector, event, handler) => {
  const rootElement = document.querySelector('body');
  rootElement.addEventListener(event, function (evt) {
    const targetElement = evt.target;
    while (targetElement != null) {
      if (targetElement.matches(selector)) {
          handler(targetElement);
          return;
      }
      targetElement = targetElement.parentElement;
    }
  }, true);
}

ready(() => {
  addLiveEventListeners(".switch-instance-btn", "click", switchInstance);

  document.getElementById('go-to-options').addEventListener('click', ()  => {
    if (chrome.runtime.openOptionsPage) {
      chrome.runtime.openOptionsPage();
    } else {
      window.open(chrome.runtime.getURL('options.html'));
    }
  });

  chrome.storage.sync.get({
    mastodonInstances: 'mastodon.social'
  }, (items)  => {
    console.log(items);
    if (items.mastodonInstances){
      let instanceListHTML = '';      
      items.mastodonInstances.split('\n').forEach((instance) => {
        instanceListHTML += `
        <li class="pb-1">
          <button class="switch-instance-btn w-100 text-left" data-instance=${instance}>${instance}</button>
        </li>    
        `;
      });
      const mastodonInstances = document.getElementById('mastodon-instances');
      mastodonInstances.innerHTML = instanceListHTML;
    }
  });  
});

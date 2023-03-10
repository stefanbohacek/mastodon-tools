import {saveOptions, loadOptions} from './modules/options.js';

let currentURL;

const ready = (fn) => {
  if (document.attachEvent ? document.readyState === 'complete' : document.readyState !== 'loading'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}

const handleLinks = () => {
  const links = document.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
    (() => {
        const ln = links[i];
        const location = ln.href;

        if (!location.includes('#')){
          ln.onclick = () => {
            chrome.tabs.create({active: true, url: location});
          };
        }
    })();
  }
}

const addFediverseExplorerLink = async (currentURL) => {
  const tagBrowserLink = document.getElementById('tag-browser-link');
  let tag = currentURL.split('/tags/');

  if (tag && tag.length > 1){
    tag = tag[1].toLowerCase();

    const a = document.createElement('a');
    const link = document.createTextNode(`Explore the #${tag} tag`);
    a.classList.add('fw-bold');
    a.appendChild(link); 
    a.href = `https://fediverse-explorer.stefanbohacek.dev/?tag=${tag}`; 
    tagBrowserLink.appendChild(a);
    tagBrowserLink.classList.remove('d-none');
  }
}

const switchInstance = async (currentTarget) => {
  const instance = currentTarget.dataset.instance;
  let domain = (new URL(currentURL));
  domain = domain.hostname;

  if (domain === instance){
    alert(`You are already on ${instance}.`);
  } else {
    const switchedURL = `https://${instance}/authorize_interaction?uri=${currentURL}`;
    chrome.tabs.update({url:switchedURL});
  }
  window.close();
}

const addLiveEventListeners = (selector, event, handler) => {
  const rootElement = document.querySelector('body');
  rootElement.addEventListener(event, function (evt) {
    let targetElement = evt.target;
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
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const activeTab = tabs[0];
    currentURL = activeTab.url;

    addFediverseExplorerLink(currentURL);
    addLiveEventListeners(".switch-instance-btn", "click", switchInstance);
    handleLinks();
  
    document.getElementById('go-to-options').addEventListener('click', ()  => {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL('options.html'));
      }
    });

    const options = await loadOptions();

    if (options.mastodonInstances){
      let instanceListHTML = '';      
      options.mastodonInstances.split('\n').forEach((instance) => {
        instanceListHTML += `
        <li class="pb-1">
          <a href="#" class="switch-instance-btn w-100 text-left" data-instance=${instance}>${instance}</a>
        </li>    
        `;
      });
      const mastodonInstances = document.getElementById('mastodon-instances');
      mastodonInstances.innerHTML = instanceListHTML;
    }
  });
});

import { saveOptions, loadOptions } from "./modules/options.js";

let currentURL;

const ready = (fn) => {
  if (
    document.attachEvent
      ? document.readyState === "complete"
      : document.readyState !== "loading"
  ) {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

const handleLinks = () => {
  const links = document.getElementsByTagName("a");
  for (let i = 0; i < links.length; i++) {
    (() => {
      const ln = links[i];
      const location = ln.href;

      if (!location.includes("#")) {
        ln.onclick = () => {
          chrome.tabs.create({ active: true, url: location });
        };
      }
    })();
  }
};

const switchInstance = async (currentTarget) => {
  const instance = currentTarget.dataset.instance;
  let domain = new URL(currentURL);
  domain = domain.hostname;

  if (domain === instance) {
    alert(`You are already on ${instance}.`);
  } else {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      console.log({ tabs });

      chrome.scripting.executeScript(
        {
          target: { tabId: tabs[0].id },
          func: () => {
            return document.querySelector("[rel='canonical']").href;
          },
        },
        (results) => {
          console.log({ results });
          const postUrl = results[0].result;
          if (postUrl && postUrl.length) {
            const switchedURL = `https://${instance}/authorize_interaction?uri=${postUrl}`;
            chrome.tabs.update({ url: switchedURL });
            window.close();
          } else {
            alert("Please open a post first.");
          }
        }
      );
    });
  }
};

const addLiveEventListeners = (selector, event, handler) => {
  const rootElement = document.querySelector("body");
  rootElement.addEventListener(
    event,
    function (evt) {
      let targetElement = evt.target;
      while (targetElement != null) {
        if (targetElement.matches(selector)) {
          handler(targetElement);
          return;
        }
        targetElement = targetElement.parentElement;
      }
    },
    true
  );
};

ready(() => {
  chrome.tabs.query({ active: true, currentWindow: true }, async (tabs) => {
    const activeTab = tabs[0];
    currentURL = activeTab.url;

    addLiveEventListeners(".switch-instance-btn", "click", switchInstance);
    handleLinks();

    document.getElementById("go-to-options").addEventListener("click", () => {
      if (chrome.runtime.openOptionsPage) {
        chrome.runtime.openOptionsPage();
      } else {
        window.open(chrome.runtime.getURL("options.html"));
      }
    });

    const options = await loadOptions();

    if (options.mastodonInstances) {
      let instanceListHTML = "";
      options.mastodonInstances.split("\n").forEach((instance) => {
        instanceListHTML += `
        <li class="pb-1">
          <a href="#" class="switch-instance-btn w-100 text-left" data-instance=${instance}>${instance}</a>
        </li>    
        `;
      });
      const mastodonInstances = document.getElementById("mastodon-instances");
      mastodonInstances.innerHTML = instanceListHTML;
    }
  });
});

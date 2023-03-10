import ready from './modules/ready.js';
import addLiveEventListeners from './modules/addLiveEventListeners.js';
import Hovercard from './modules/Hovercard.js';

const hovercard = new Hovercard();

ready(() => {
    chrome.storage.sync.get({
        showHovercards: true
    }, (items)  => {
      if (items.showHovercards){
        addLiveEventListeners(".mention", "mouseenter", hovercard.addHovercard);
        // addLiveEventListeners(".mention.status-link", "mouseenter", hovercard.addHovercard);
        addLiveEventListeners(".account__display-name", "mouseenter", hovercard.addHovercard);
        addLiveEventListeners(".detailed-status__display-name", "mouseenter", hovercard.addHovercard);
        addLiveEventListeners(".notification__display-name", "mouseenter", hovercard.addHovercard);
        addLiveEventListeners(".status__display-name", "mouseenter", hovercard.addHovercard);
      }
    });
});

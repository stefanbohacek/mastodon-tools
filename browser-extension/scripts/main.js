import ready from './modules/ready.js';
import addLiveEventListeners from './modules/addLiveEventListeners.js';
import Hovercard from './modules/Hovercard.js';

const hovercard = new Hovercard();

ready(() => {
    addLiveEventListeners(".status__display-name", "mouseenter", hovercard.addHovercard);
    // addLiveEventListeners(".status__display-name", "mouseleave", hovercard.removeHovercards);
    // addLiveEventListeners(".status__display-name", "mouseout", hovercard.removeHovercards);
    // addLiveEventListeners(".sbmt-account-info", "mouseleave", hovercard.removeHovercards);
});

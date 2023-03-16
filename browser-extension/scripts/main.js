import ready from './modules/ready.js';
import addLiveEventListeners from './modules/addLiveEventListeners.js';
import checkToken from './modules/checkToken.js';
import {loadOptions} from './modules/options.js';
import Hovercard from './modules/Hovercard.js';
// import familiarFollowers from './modules/familiarFollowers.js';

const hovercard = new Hovercard();

ready(async () => {
  checkToken();
  const options = await loadOptions();

  // if (options.authToken){
  //   familiarFollowers(options.authToken).then(() => {
  //     console.log('done');
  //   });
  // }

  if (options.showHovercards){
    addLiveEventListeners(".mention", "mouseenter", hovercard.addHovercard);
    addLiveEventListeners(".account__display-name", "mouseenter", hovercard.addHovercard);
    addLiveEventListeners(".detailed-status__display-name", "mouseenter", hovercard.addHovercard);
    addLiveEventListeners(".notification__display-name", "mouseenter", hovercard.addHovercard);
    addLiveEventListeners(".status__display-name", "mouseenter", hovercard.addHovercard);
  }
});

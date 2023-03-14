import ready from './modules/ready.js';
import addLiveEventListeners from './modules/addLiveEventListeners.js';
import Hovercard from './modules/Hovercard.js';
import {saveOptions, loadOptions} from './modules/options.js';

// import showFamiliarFollowers from './modules/familiarFollowers.js';

const hovercard = new Hovercard();

ready(async () => {
    const options = await loadOptions();

    // if (options.authToken){
    //   showFamiliarFollowers(options.authToken).then(() => {
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
    let params = new URLSearchParams(window.location.search);
    
    const internal_redirect_uri = params.get('internal_redirect_uri');
    const method = params.get('method');
    const code = params.get('code');

    if (internal_redirect_uri && method && code){
      saveOptions({
        authToken: code
      });
      window.location.replace(internal_redirect_uri);
    }
});

import ready from './modules/ready.js';
import addLiveEventListeners from './modules/addLiveEventListeners.js';
import checkToken from './modules/checkToken.js';
import checkUserID from './modules/checkUserID.js';
import {loadOptions} from './modules/options.js';
import Hovercard from './modules/Hovercard.js';
import getFollowedAccounts from './modules/getFollowedAccounts.js';
import getFollowers from './modules/getFollowers.js';
// import familiarFollowers from './modules/familiarFollowers.js';

const fetchStatus = async (instance, url) => {
  let results = {};
  try {
    const resp = await fetch(
      `https://${instance}/authorize_interaction?uri=${url}`
    );
    const respJSON = await resp.json();
    results = respJSON;
    return results;
  } catch (error) {
    // console.log(error);
    return results;
  }
};

const getStatusContext = async (url) => {
  let results = [];
  try {
    const resp = await fetch(`https://fediverse-info.stefanbohacek.dev/post-context?url=${url}`);
    const respJSON = await resp.json();
    results = respJSON;
    return results;
  } catch (error) {
    // console.log(error);
    return results;
  }
};

ready(async () => {
  checkToken();

  const instance = window.location.host;
  const options = await loadOptions();
  // console.log(options);

  let hovercard;

  if (options.accounts[instance]){
    const followedAccounts = await getFollowedAccounts(options.accounts[instance], options.token);
    const followers = await getFollowers(options.accounts[instance], options.token);
    // console.log({followedAccounts});
    // console.log({followers});
    hovercard = new Hovercard({
      followers,
      followedAccounts
    });
  } else {
    hovercard = new Hovercard()
  }  


  if (options.tokens){
    checkUserID(instance, options);

    // familiarFollowers(options.tokens[currentInstance]).then(() => {
    //   console.log('done');
    // });
  }

  // if (options.accounts[instance]){
  //   const followedAccounts = await getFollowedAccounts(options.accounts[instance], options.token);
  //   const followers = await getFollowers(options.accounts[instance], options.token);
  //   // console.log({followedAccounts});
  //   // console.log({followers});
  // }

  if (options.showHovercards){
    addLiveEventListeners(".u-url.mention", "mouseenter", hovercard.addHovercard);
    addLiveEventListeners(".account__display-name", "mouseenter", hovercard.addHovercard);
    addLiveEventListeners(".detailed-status__display-name", "mouseenter", hovercard.addHovercard);
    addLiveEventListeners(".notification__display-name", "mouseenter", hovercard.addHovercard);
    addLiveEventListeners(".status__display-name", "mouseenter", hovercard.addHovercard);
  }

  let atSigns = document.URL.match(/@/g);
  if (atSigns && atSigns.length === 2){
    const url = new URL(document.URL);
    const domain = url.hostname;
    const postId = url.pathname.split("/")[2];
    
    getStatusContext(url).then((statusContext) => {
      console.log(statusContext);
    
      if (statusContext.ancestors) {
        statusContext.ancestors.forEach((result) => {
          fetchStatus(domain, result.url);
        });
      }
    
      if (statusContext.ancestors) {
        statusContext.descendants.forEach((result) => {
          fetchStatus(domain, result.url);
        });
      }
    });
  }
});

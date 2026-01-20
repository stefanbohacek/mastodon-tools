import ready from './modules/ready.js';
import checkToken from './modules/checkToken.js';
import checkUserID from './modules/checkUserID.js';
import {loadOptions} from './modules/options.js';

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
    const resp = await fetch(`https://fediverse-info.stefanbohacek.com/post-context?url=${url}`);
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

  if (options.tokens){
    checkUserID(instance, options);
  }

  let atSigns = document.URL.match(/@/g);

  if (options.getStatusContext && atSigns && atSigns.length === 2){
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

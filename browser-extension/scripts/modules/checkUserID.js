import {saveOptions} from './options.js';

const checkUserID = async (instance, options) => {
  console.log('checking user ID', instance, options);
  if (!options.accounts[instance] && options.tokens[instance]){
    const accounts = options.accounts;
    const resp = await fetch(`https://${instance}/api/v1/accounts/verify_credentials`, {
      headers: new Headers({
        'Authorization':  `Bearer ${options.tokens[instance]}`
      })
    }).then(async resp => {
      const results = await resp.json();
      console.log('results', results);
      accounts[instance] = results.id;
      saveOptions({accounts});
    });
  }    
}

export default checkUserID;

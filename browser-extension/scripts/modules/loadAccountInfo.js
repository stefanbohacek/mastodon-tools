import Cookies from './cookies.js';

const cookies = new Cookies();
let savedAccounts = [];
let isFetchingData = false;

try{
  savedAccounts = JSON.parse(window.atob(decodeURIComponent(escape(cookies.getCookie('sbmtSavedAccounts')))));
} catch (err) {
  console.log('savedAccounts:error', err, cookies.getCookie('sbmtSavedAccounts'));
}

// console.log('savedAccounts', savedAccounts);

const loadAccountInfo = async (account) => {

  if (savedAccounts.map(a => a.account).includes(account)){
    return savedAccounts.filter(a => a.account === account)[0];
  } else if (!isFetchingData) {
    const accountArray = account.split('@');
    let domain;

    if (accountArray.length === 2){
      domain = window.location.host;
    } else {
      domain = accountArray[2];
    }

    if (domain){
      const apiURL = `https://${domain}/api/v1/accounts/lookup?acct=${account}`
      let results = {};
    
      try {
        isFetchingData = true;
        const resp = await fetch(apiURL);
        const respJSON = await resp.json();
 
        if (respJSON && (respJSON.display_name || respJSON.username)){
          results = {
            account,
            display_name: respJSON.display_name,
            username: respJSON.username,
            avatar_static: respJSON.avatar_static,
            note: respJSON.note,
            fields: respJSON.fields,
            followers_count: respJSON.followers_count,
            following_count: respJSON.following_count,
            header_static: respJSON.header_static,
            bot: respJSON.bot,
            locked: respJSON.locked,
            url: respJSON.url
          };

          if (respJSON.roles){
            results.roles = respJSON.roles.map(role => role.name.toLowerCase());
          }
    
          savedAccounts.push(results);
  
          if (savedAccounts.length > 11){
            savedAccounts = savedAccounts.slice(Math.max(savedAccounts.length - 11, 0))
          }
  
          cookies.setCookie('sbmtSavedAccounts', window.btoa(window.unescape(encodeURIComponent(JSON.stringify(savedAccounts)))), 15);
        }
  
        isFetchingData = false;
        return results;
      } catch (error) {
        console.log('loadAccountInfo:error', error);
        isFetchingData = false;
        if (error != 'TypeError: Failed to fetch'){
          loadAccountInfo(account);
        } else {
          const profileData = document.querySelector(`a[href="/${account}"]`);
          const displayName = profileData.querySelector('.display-name__html').textContent;
          const imgURL = document.querySelector(`img[alt="${account.substring(1)}"]`).getAttribute('src');

          results = {
            account,
            display_name: displayName,
            username: account,
            avatar_static: imgURL,
            note: 'Unable to fetch data.',
            // fields: respJSON.fields,
            // followers_count: respJSON.followers_count,
            // following_count: respJSON.following_count,
            // header_static: respJSON.header_static,
            // bot: respJSON.bot,
            // locked: respJSON.locked,
            url: ''
          };
        }
        return results;
      }
    } else {
      return {};
    }
  }
}

export default loadAccountInfo;

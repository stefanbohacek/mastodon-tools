import ready from './ready.js';

const getAccountHandle = () => {
  const accountBio = document.getElementsByClassName('account__header__bio');
  let account;

  if (accountBio){
    try{
      account = document.querySelector('.account__header__tabs__name small span').innerText;
    } catch(err){console.log('getAccountHandle:error', err);}
  }
  return account;
}

const showFamiliarFollowers = async (authToken, account) => {
  let resp, results = [];

  resp = await fetch(`https://stefanbohacek.online/api/v1/accounts/lookup?acct=${account}`);
  results = await resp.json();

  console.log(`show familiar followers:`, {
    account: results.acct,
    id: results.id,
  });

  resp = await fetch(`/api/v1/accounts/familiar_followers?id=${results.id}`, {
    headers: new Headers({
      'Authorization':  `Bearer ${authToken}`
    })
  });

  results = await resp.json();
  console.log('results', results);
  
}

const familiarFollowers = async (authToken) => {

  window.addEventListener('popstate', (event) => {
    console.log('popstate', event.state);
    const account = getAccountHandle();
    if (account){
      showFamiliarFollowers(authToken, account);
    }
  });

  
  ready(async () => {
    setTimeout(()=>{
      //TODO: Temporary fix.
      const account = getAccountHandle();
      if (account){
        showFamiliarFollowers(authToken, account);
      }  
    }, 3000);
  });
  


  return true;

}

export default familiarFollowers;

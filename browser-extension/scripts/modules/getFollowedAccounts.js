import fetchRequest from './fetchRequest.js';
import ls from './LocalStorage.js';

const getFollowedAccounts = async (id, authToken) => {
  let source = 'localStorage';
  let followedAccounts = ls.getItem('sbmtFollowedAccounts');

  if (!followedAccounts){
    source = 'API';
    followedAccounts = await fetchRequest(authToken, `/api/v1/accounts/${id}/following?id=${id}`);
    if (followedAccounts.length){
      followedAccounts = followedAccounts.map(account => {
        return{
          acc: account.acct,
          id: account.id,
          name: account.display_name || account.username,
          // followers_count: account.followers_count,
          // following_count: account.following_count
        };
      })
    }
  }

  ls.addItem('sbmtFollowedAccounts', followedAccounts, 300000)
  return followedAccounts;
}

export default getFollowedAccounts;

import fetchRequest from './fetchRequest.js';
import ls from './LocalStorage.js';

const getFollowers = async (id, authToken) => {
  let source = 'localStorage';
  let followers = ls.getItem('sbmtFollowers');

  if (!followers){
    source = 'API';
    followers = await fetchRequest(authToken, `/api/v1/accounts/${id}/followers?id=${id}`);
    if (followers.length){
      followers = followers.map(account => {
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

  ls.addItem('sbmtFollowers', followers, 300000)
  return followers;
}

export default getFollowers;

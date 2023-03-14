const showFamiliarFollowers = async (authToken) => {
  try {
    let resp, results = [];

    const account = '@anildash@me.dm';
    resp = await fetch(`https://stefanbohacek.online/api/v1/accounts/lookup?acct=${account}`);
    results = await resp.json();

    console.log({
      account: results.acct,
      id: results.id,
    });

    console.log({authToken});

    resp = await fetch(`/api/v1/accounts/familiar_followers?id[]=${results.id}`, {
      headers: new Headers({
        'Authorization':  `Bearer ${authToken}`
      })
    });

    results = await resp.json();
    console.log(results);
    
    return results;
  } catch (error) {
    console.log(error);
    return results;
  }
  

}

export default showFamiliarFollowers;

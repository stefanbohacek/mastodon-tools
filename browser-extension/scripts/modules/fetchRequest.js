const fetchRequest = async function (token, url, method){
  try {
    const response = await fetch(url, {
      method: method || 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    let data = await response.json();
    let nextPage;

    if (/<([^>]+)>; rel="next"/g.test(response.headers.get("link"))){
      nextPage = /<([^>]+)>; rel="next"/g.exec(response.headers.get("link"))[1];
    }

    if (nextPage){
      data = data.concat(await fetchRequest(token, nextPage));
    }

    return data;
  } catch (error){
    console.log('fetchRequest', {error});
    return [];
  }
}

export default fetchRequest;

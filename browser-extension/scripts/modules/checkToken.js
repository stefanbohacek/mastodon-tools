import {saveOptions, loadOptions} from './options.js';

const checkToken = async () => {
  let params = new URLSearchParams(window.location.search);
  
  const instance = params.get('instance');
  const method = params.get('method');
  const code = params.get('code');

  if (instance && method && code){
    const token = document.documentElement.innerText;
    if (token){
      let tokens = {};
      tokens[instance] = token;
      console.log({tokens})
      saveOptions({tokens});
    }
    window.location.replace(`https://${instance}`);
  }
}

export default checkToken;

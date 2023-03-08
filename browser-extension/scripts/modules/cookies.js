class Cookies {

  setCookie(name, value, expiration){
    const d = new Date();
    d.setTime(d.getTime() + (expiration*60*1000));
    let expires = "expires="+ d.toUTCString();
    document.cookie = name + "=" + value + ";" + expiration + ";path=/";
  }

  getCookie(name){
    name = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");
    for(let i = 0; i <ca.length; i++){
      let c = ca[i];
      while (c.charAt(0) == " "){
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0){
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }
};

export default Cookies;

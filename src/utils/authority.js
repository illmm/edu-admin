// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority(str = 'role') {
  // return localStorage.getItem('authority') || ['admin', 'user'];
  // const authorityString =
  // typeof str === 'undefined' ? sessionStorage.getItem('authority') : str;
  // // authorityString could be admin, "admin", ["admin"]
  // let authority;
  // try {
  //   authority = JSON.parse(authorityString);
  // } catch (e) {
  //   authority = authorityString;
  // }
  // if (typeof authority === 'string') {
  //   return [authority];
  // }
  // if(authority){
  //   return authority.role;
  // }
  // return authority;
  const authorityString = sessionStorage.getItem('authority');
  let authority;
  if(!authorityString) {
    return authorityString;
  }
  try {
    authority = JSON.parse(authorityString);
  } catch (e) {
    return null;
  }
  return authority[str];
  

  
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  
  return sessionStorage.setItem('authority', JSON.stringify(proAuthority));
}

export function getAuthority(str = 'role') {
  
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
  if(authority == null) return;
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  
  return sessionStorage.setItem('authority', JSON.stringify(proAuthority));
}

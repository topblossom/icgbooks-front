import { createUserManager } from 'redux-oidc';

const userManagerConfig = {
  client_id:
    '300830512073-9t9kejqik0dppk03q7ll55d8bnih0g2n.apps.googleusercontent.com',
  redirect_uri: `${window.location.protocol}//${window.location.hostname}${
    window.location.port ? `:${window.location.port}` : ''
  }/callback`,
  response_type: 'token id_token',
  scope:
    'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile',
  authority: 'https://accounts.google.com',
  // silent_redirect_uri: `${window.location.protocol}//${
  //   window.location.hostname
  // }${window.location.port ? `:${window.location.port}` : ''}/silent_renew.html`,
  // automaticSilentRenew: true,
  filterProtocolClaims: true,
  loadUserInfo: true,
};

const userManager = createUserManager(userManagerConfig);

export default userManager;

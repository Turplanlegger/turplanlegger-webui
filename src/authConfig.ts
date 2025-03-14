import config from './config/config.json';

export const signinMsalConfig = {
  auth: {
    clientId: config.auth.app_client_id,
    authority: config.auth.sign_in.authority,
    knownAuthorities: [config.auth.authority_domain],
    redirectUri: '/'
  }
};

export const signupMsalConfig = {
  auth: {
    clientId: config.auth.app_client_id,
    authority: config.auth.sign_up.authority,
    knownAuthorities: [config.auth.authority_domain],
    redirectUri: '/'
  }
};

export const loginRequest = {
  scopes: [config.auth.login_scope]
};

export const silentRequest = {
  scopes: ['openid', 'profile']
};

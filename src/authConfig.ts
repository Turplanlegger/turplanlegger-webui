import config from './config/config.json';

const b2cPolicies = {
  names: {
    SignIn: config.auth.sign_in.name,
    SignUp: config.auth.sign_up.name
  },
  authorities: {
    SignIn: {
      authority: config.auth.sign_in.authority
    },
    SignUp: {
      authority: config.auth.sign_up.authority
    }
  },
  authorityDomain: config.auth.authority_domain
};

export const signinMsalConfig = {
  auth: {
    clientId: config.auth.app_client_id,
    authority: b2cPolicies.authorities.SignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/'
  }
};

export const signupMsalConfig = {
  auth: {
    clientId: config.auth.app_client_id,
    authority: b2cPolicies.authorities.SignUp.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/'
  }
};

export const loginRequest = {
  scopes: [config.auth.login_scope]
};

export const silentRequest = {
  scopes: ['openid', 'profile']
};

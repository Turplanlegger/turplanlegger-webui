export const b2cPolicies = {
  names: {
    SignIn: 'B2C_1_SignIn',
    SignUp: 'B2C_1_SignUp'
  },
  authorities: {
    SignIn: {
      authority: 'https://turplanlegger.b2clogin.com/turplanlegger.onmicrosoft.com/B2C_1_SignIn'
    },
    SignUp: {
      authority: 'https://turplanlegger.b2clogin.com/turplanlegger.onmicrosoft.com/B2C_1_SignUp'
    }
  },
  authorityDomain: 'turplanlegger.b2clogin.com'
};

export const signinMsalConfig = {
  auth: {
    clientId: 'a501e8ed-b1e6-4814-ae5d-2f808e7ea3c6',
    authority: b2cPolicies.authorities.SignIn.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/'
  }
};

export const signupMsalConfig = {
  auth: {
    clientId: 'a501e8ed-b1e6-4814-ae5d-2f808e7ea3c6',
    authority: b2cPolicies.authorities.SignUp.authority,
    knownAuthorities: [b2cPolicies.authorityDomain],
    redirectUri: '/'
  }
};

export const loginRequest = {
  scopes: ['https://turplanlegger.onmicrosoft.com/0149fc65-259e-4895-9034-e144c242f733/Default']
};

export const silentRequest = {
  scopes: ['openid', 'profile']
};

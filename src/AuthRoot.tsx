import './App.css';
import { MsalProvider } from '@azure/msal-react';
import { loginRequest, signinMsalConfig } from './authConfig';
import { Configuration, PublicClientApplication } from '@azure/msal-browser';
import { useState } from 'react';
import App from './App';

export const AuthRoot = () => {
  const [msalInstance, setMsalInstance] = useState(new PublicClientApplication(signinMsalConfig));

  const setInstanceAndLogin = (config: Configuration) => {
    console.log('LoginReq: ', loginRequest);
    const instance = new PublicClientApplication(config);
    setMsalInstance(instance);
    instance.handleRedirectPromise().then().catch(); // Makes sure redirect works
    instance.loginRedirect(loginRequest);
  };

  return (
    <MsalProvider instance={msalInstance}>
      <App setInstanceAndLogin={setInstanceAndLogin} />
    </MsalProvider>
  );
};

export default AuthRoot;

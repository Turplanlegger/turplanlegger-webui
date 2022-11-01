import './App.css';
import { MsalProvider } from '@azure/msal-react';
import { loginRequest, signinMsalConfig } from './authConfig';
import { Configuration, PublicClientApplication } from '@azure/msal-browser';
import { useEffect, useState } from 'react';
import App from './App';
import { useSetRecoilState } from 'recoil';
import { apiState } from './state/apiState';
import { Api } from './services/Api';

export const AuthRoot = () => {
  const [msalInstance, setMsalInstance] = useState(new PublicClientApplication(signinMsalConfig));
  const setApi = useSetRecoilState(apiState);

  useEffect(() => {
    setApi(new Api(msalInstance));
  }, []);

  const setInstanceAndLogin = (config: Configuration) => {
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

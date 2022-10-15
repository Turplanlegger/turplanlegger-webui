import { useTranslation } from 'react-i18next';
import './App.css';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { useIsAuthenticated } from '@azure/msal-react';
import { Configuration } from '@azure/msal-browser';

type Props = {
  setInstanceAndLogin: (config: Configuration) => void;
};

export const App = ({ setInstanceAndLogin }: Props) => {
  const { t } = useTranslation();
  const isAuthenticated = useIsAuthenticated();
  document.title = t('app.turplanlegger');

  return isAuthenticated ? <Home /> : <Login setInstanceAndLogin={setInstanceAndLogin} />;
};

export default App;

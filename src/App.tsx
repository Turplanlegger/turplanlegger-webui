import './App.css';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { useIsAuthenticated } from '@azure/msal-react';
import { Configuration } from '@azure/msal-browser';
import { useTranslationWrapper } from './services/Translation';

type Props = {
  setInstanceAndLogin: (config: Configuration) => void;
};

export const App = ({ setInstanceAndLogin }: Props) => {
  const t = useTranslationWrapper();
  const isAuthenticated = useIsAuthenticated();
  document.title = t('app.turplanlegger') || 'Tripplanner';

  return isAuthenticated ? <Home /> : <Login setInstanceAndLogin={setInstanceAndLogin} />;
};

export default App;

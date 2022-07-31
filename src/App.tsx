import { Box, styled } from '@mui/material';
import './App.css';
import { Home } from './pages/Home';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Create } from './pages/Create';
import { Login } from './pages/Login';
import { useIsAuthenticated } from '@azure/msal-react';
import { Configuration } from '@azure/msal-browser';

const FullScreen = styled(Box)({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

type Props = {
  setInstanceAndLogin: (config: Configuration) => void;
};

export const App = ({ setInstanceAndLogin }: Props) => {
  const { t } = useTranslation();
  const isAuthenticated = useIsAuthenticated();

  return (
    <FullScreen>
      <BrowserRouter>
        {isAuthenticated ? (
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path={`/${t('app.routes.create')}`} element={<Create />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<Login setInstanceAndLogin={setInstanceAndLogin} />} />
          </Routes>
        )}
      </BrowserRouter>
    </FullScreen>
  );
};

export default App;

import * as React from 'react';
import LandscapeIcon from '@mui/icons-material/Landscape';
import HikingIcon from '@mui/icons-material/Hiking';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
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

  return (
    <BrowserRouter>
      {isAuthenticated ? (
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Login setInstanceAndLogin={setInstanceAndLogin} />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};

export default App;

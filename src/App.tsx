import { Box, styled } from '@mui/material';
import './App.css';
import { Home } from './pages/Home';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Create } from './pages/Create';

const FullScreen = styled(Box)({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

export const App = () => {
  const { t } = useTranslation();

  return (
    <FullScreen>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path={`/${t('app.routes.create')}`} element={<Create />} />
        </Routes>
      </BrowserRouter>
    </FullScreen>
  );
};

export default App;

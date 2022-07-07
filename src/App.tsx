import { Box, styled } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Opprett } from './pages/Opprett';

const FullScreen = styled(Box)({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center'
});

export const App = () => {
  return (
    <FullScreen>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/opprett" element={<Opprett />} />
        </Routes>
      </BrowserRouter>
    </FullScreen>
  );
};

export default App;

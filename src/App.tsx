import * as React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  styled,
  Toolbar,
  Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import LandscapeIcon from '@mui/icons-material/Landscape';
import HikingIcon from '@mui/icons-material/Hiking';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useTranslation } from 'react-i18next';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './pages/Home';
import { Create } from './pages/Create';
import { Login } from './pages/Login';
import { useIsAuthenticated } from '@azure/msal-react';
import { Configuration } from '@azure/msal-browser';
import Grid2 from '@mui/material/Unstable_Grid2';

type Props = {
  setInstanceAndLogin: (config: Configuration) => void;
};

export const App = ({ setInstanceAndLogin }: Props) => {
  const isAuthenticated = useIsAuthenticated();
  const { t } = useTranslation();
  document.title = t('app.turplanlegger');

  const menu_items = [
    {
      route: '/login',
      display_name: t('profile.my_page'),
      icon: <PersonOutlineIcon />
    },
    {
      route: '/trips',
      display_name: t('trip.my_trips'),
      icon: <HikingIcon />
    },
    {
      route: '/routes',
      display_name: t('route.my_routes'),
      icon: <LandscapeIcon />
    },
    {
      route: '/notes',
      display_name: t('note.my_notes'),
      icon: <StickyNote2Icon />
    }
  ];
  const menu_elements = (
    <List>
      {menu_items.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton onClick={() => console.debug(item.route)}>
            <ListItemText primary={item.display_name} />
            <ListItemIcon>{item.icon}</ListItemIcon>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box>
      <AppBar id="main-header">
        <Toolbar disableGutters sx={{ alignItems: 'stretch' }}>
          <Box sx={{ display: 'flex', width: '240px', backgroundColor: 'white' }}>
            <Typography variant="h6" sx={{ display: 'flex', flex: '1 0 auto' }}>
              <Link
                href="#"
                underline="none"
                color="black"
                sx={{
                  display: 'inline-block',
                  width: '100%',
                  textAlign: 'center',
                  lineHeight: '64px'
                }}>
                {t('app.turplanlegger')}
              </Link>
            </Typography>
          </Box>
          <IconButton size="large" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Button style={{ marginLeft: 'auto' }} color="inherit">
            {t('profile.login')}
          </Button>
        </Toolbar>
      </AppBar>
      <Box id="container">
        <nav id="drawer-nav">
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              width: '240px',
              '& .MuiDrawer-paper': { boxSizing: 'border-box' }
            }}
            open>
            <Divider />
            {menu_elements}
          </Drawer>
        </nav>
        <main id="main-content">
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path={`/${t('app.routes.create')}`} element={<Create />} />
            </Routes>
          </BrowserRouter>
        </main>
      </Box>
    </Box>
  );
};

export default App;

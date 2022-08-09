import * as React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  styled,
  Toolbar,
  Typography
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
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

const FullScreen = styled(Box)({
  height: '100vh',
  width: '100vw',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center'
});

type Props = {
  setInstanceAndLogin: (config: Configuration) => void;
};

export const App = ({ setInstanceAndLogin }: Props) => {
  const isAuthenticated = useIsAuthenticated();
  const { t } = useTranslation();
  const drawerWidth = 240;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
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
  const drawer = (
    <div>
      <Toolbar />
      <Divider />
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
    </div>
  );

  return (
    <FullScreen>
      <Box sx={{ display: 'flex', height: 56 }}>
        <CssBaseline />
        <AppBar
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` }
          }}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: 'none' } }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              {t('app.turplanlegger')}
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="main navigation menu">
          {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
          <Drawer
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
            sx={{
              display: { xs: 'block', sm: 'none' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}>
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            sx={{
              display: { xs: 'none', sm: 'block' },
              '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
            }}
            open>
            {drawer}
          </Drawer>
        </Box>
      </Box>
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

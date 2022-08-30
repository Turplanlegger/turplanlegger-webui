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

type Props = {
  setInstanceAndLogin: (config: Configuration) => void;
};

const drawerWidth = 240;

export const App = ({ setInstanceAndLogin }: Props) => {
  const isAuthenticated = useIsAuthenticated();
  const { t } = useTranslation();
  document.title = t('app.turplanlegger');

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
  const menu_elements = (
    <List>
      {menu_items.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton onClick={() => console.debug(item.route)}>
            <Link
              href={item.route}
              underline="none"
              color="inherit"
              sx={{ display: 'flex', flex: '1 0 auto' }}>
              <ListItemText primary={item.display_name} />
              <ListItemIcon>{item.icon}</ListItemIcon>
            </Link>
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  return (
    <Box id="main-container" sx={{ display: 'flex' }}>
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
          <Typography variant="h6" sx={{ display: { xs: 'none', sm: 'flex' }, flex: '1 0 auto' }}>
            <Link
              href="/"
              underline="none"
              color="inherit"
              sx={{
                display: 'inline-block',
                width: '100%',
                textAlign: 'center',
                lineHeight: '64px'
              }}>
              {t('app.turplanlegger')}
            </Link>
          </Typography>
          <IconButton
            size="large"
            color="inherit"
            aria-label={t('app.turplanlegger')}
            sx={{ mx: 'auto', display: { xs: 'flex', sm: 'none' } }}>
            <HikingIcon />
          </IconButton>
          <Button sx={{ ml: 'auto', mr: 2 }} color="inherit">
            {t('profile.login')}
          </Button>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders">
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
          <div>
            <Toolbar className="menu-header" />
            <Divider />
            {menu_elements}
          </div>
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth }
          }}
          open>
          <div>
            <Toolbar className="menu-header" />
            <Divider />
            {menu_elements}
          </div>
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        <Toolbar />
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

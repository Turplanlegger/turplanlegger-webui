import * as React from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography
} from '@mui/material';
import LandscapeIcon from '@mui/icons-material/Landscape';
import HikingIcon from '@mui/icons-material/Hiking';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useTranslation } from 'react-i18next';
import { TopBar } from '../components/TopBar';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMsal } from '@azure/msal-react';

const handleLogout = (instance: any) => {
  instance.logoutRedirect().catch();
};

export const Home = () => {
  const drawerWidth = 240;
  const { t } = useTranslation();
  document.title = t('app.turplanlegger');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { instance } = useMsal();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menu_items = [
    {
      route: '/profile',
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
      <ListItem key={'logout'} disablePadding sx={{ display: 'flex', flex: '1 0 auto' }}>
        <ListItemButton onClick={() => handleLogout(instance)}>
          <ListItemText primary={'Logg ut'} />
          <ListItemIcon>{<LogoutIcon />}</ListItemIcon>
        </ListItemButton>
      </ListItem>
    </List>
  );

  return (
    <Box id="main-container" sx={{ display: 'flex' }}>
      <TopBar handleDrawerToggle={handleDrawerToggle} />
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
      </Box>
    </Box>
  );
};

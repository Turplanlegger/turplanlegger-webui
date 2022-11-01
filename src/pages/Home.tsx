import * as React from 'react';
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar
} from '@mui/material';
import LandscapeIcon from '@mui/icons-material/Landscape';
import HikingIcon from '@mui/icons-material/Hiking';
import StickyNote2Icon from '@mui/icons-material/StickyNote2';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { useTranslation } from 'react-i18next';
import { TopBar } from '../components/TopBar';
import LogoutIcon from '@mui/icons-material/Logout';
import { useMsal } from '@azure/msal-react';
import { Link, Route, Routes } from 'react-router-dom';
import { Profile } from './Profile';
import { Trips } from './Trips';
import { MyRoutes } from './MyRoutes';
import { Notes } from './Notes';
import { IPublicClientApplication } from '@azure/msal-browser';
import { useRecoilValue } from 'recoil';
import { apiState } from '../state/apiState';
import { Lists } from './Lists/Lists';

const handleLogout = (instance: IPublicClientApplication) => {
  instance.logoutRedirect().catch();
};

export const menu_items = [
  {
    route: '/profile',
    display_name_key: 'profile.my_page',
    icon: <PersonOutlineIcon />,
    element: <Profile />
  },
  {
    route: '/trips',
    display_name_key: 'trip.my_trips',
    icon: <HikingIcon />,
    element: <Trips />
  },
  {
    route: '/routes',
    display_name_key: 'route.my_routes',
    icon: <LandscapeIcon />,
    element: <MyRoutes />
  },
  {
    route: '/notes',
    display_name_key: 'note.my_notes',
    icon: <StickyNote2Icon />,
    element: <Notes />
  },
  {
    route: '/lists',
    display_name_key: 'list.my_lists',
    icon: <StickyNote2Icon />,
    element: <Lists />
  }
];

export const Home = () => {
  const drawerWidth = 240;
  const { t } = useTranslation();
  document.title = t('app.turplanlegger');
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { instance } = useMsal();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menu_elements = (
    <List>
      {menu_items.map((item, index) => (
        <ListItem key={index} disablePadding>
          <ListItemButton onClick={handleDrawerToggle}>
            <Link
              to={item.route}
              color="inherit"
              style={{ display: 'flex', flex: '1 0 auto', color: 'inherit' }}>
              <ListItemText primary={t(item.display_name_key)} />
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
        sx={{
          flexGrow: 1,
          paddingTop: 10,
          paddingLeft: 5,
          width: { sm: `calc(100% - ${drawerWidth}px)` }
        }}>
        <Routes>
          {menu_items.map((item) => (
            <Route key={item.route} path={item.route} element={item.element} />
          ))}
        </Routes>
      </Box>
    </Box>
  );
};

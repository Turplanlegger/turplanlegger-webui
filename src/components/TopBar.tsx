import { AppBar, Typography, Toolbar } from '@mui/material';
import { useTranslation } from 'react-i18next';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import HikingIcon from '@mui/icons-material/Hiking';
import { Link } from 'react-router-dom';

interface Props {
  handleDrawerToggle: () => void;
}

export const TopBar = ({ handleDrawerToggle }: Props) => {
  const { t } = useTranslation();
  const drawerWidth = 240;

  return (
    <AppBar
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
            to="/"
            color="inherit"
            style={{
              display: 'inline-block',
              color: 'inherit',
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
      </Toolbar>
    </AppBar>
  );
};

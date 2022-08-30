import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  document.title = t('home.title');

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box>
            <Typography variant="h2">{t('home.welcome')}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Button color="primary" variant="contained" onClick={() => navigate('/route/create')}>
              {t('common.create')} {t('trip.trip')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

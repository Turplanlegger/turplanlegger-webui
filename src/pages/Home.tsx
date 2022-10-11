import { useMsal } from '@azure/msal-react';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Api } from '../services/Api';

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  document.title = t('home.title');

  const context = useMsal();
  const account = context.accounts[0];
  const accessTokenRequest = {
    scopes: ['https://turplanlegger.onmicrosoft.com/0149fc65-259e-4895-9034-e144c242f733/Default'],
    account: account
  };
  context.instance.acquireTokenSilent(accessTokenRequest).then((r) => {
    const token = r.accessToken;
    const api = new Api(token);
    api.create_list('test');
    api.get_list(1);
  });

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

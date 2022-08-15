import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Container,
  Grid,
  Typography
} from '@mui/material';
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
            <Typography>{t('home.welcome')}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Box>
            <Button onClick={() => navigate(`/${t('app.routes.create')}`)}>
              {t('common.create')} {t('trip.trip')}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

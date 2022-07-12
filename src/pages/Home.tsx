import { Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <>
      <Typography>{t('home.welcome')}</Typography>
      <Button onClick={() => navigate(`/${t('app.routes.create')}`)}>
        {t('home.create_trip')}
      </Button>
    </>
  );
};

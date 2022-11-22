import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const TripsOverview = () => {
  const { t } = useTranslation();
  return <Typography>{t('trip.my_trips')}</Typography>;
};

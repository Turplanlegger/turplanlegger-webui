import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const CreateTrip = () => {
  const { t } = useTranslation();
  return <Typography style={{ padding: 10 }}>{t('trip.new_trip')}</Typography>;
};

import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const ListOverview = () => {
  const { t } = useTranslation();
  return <Typography>{t('list.my_lists')}</Typography>;
};

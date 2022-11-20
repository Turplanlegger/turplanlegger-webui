import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const SomethingWentWrong = () => {
  const { t } = useTranslation();
  return <Typography>{t('common.something_went_wrong')}</Typography>;
};

import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const CreateList = () => {
  const { t } = useTranslation();
  return <Typography style={{ padding: 10 }}>{t('list.new_list')}</Typography>;
};

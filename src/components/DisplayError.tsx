import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ErrorResponse } from '../models/ErrorResponse';

interface Props {
  error: ErrorResponse;
}

export const DisplayError = ({ error }: Props) => {
  const { t } = useTranslation();
  return (
    <Box>
      <Typography>{t('common.something_went_wrong')}</Typography>
      <Typography>{error.title}</Typography>
      <Typography>{error.detail}</Typography>
    </Box>
  );
};

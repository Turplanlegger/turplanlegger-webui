import { Box, Typography } from '@mui/material';
import { useTranslationWrapper } from 'services/Translation';
import { ErrorResponse } from '../models/ErrorResponse';

interface Props {
  error: ErrorResponse;
}

export const DisplayError = ({ error }: Props) => {
  const t = useTranslationWrapper();
  return (
    <Box>
      <Typography>{t('common.something_went_wrong')}</Typography>
      <Typography>{error.title}</Typography>
      <Typography>{error.detail}</Typography>
    </Box>
  );
};

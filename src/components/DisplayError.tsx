import { Box, Typography } from '@mui/material';
import { ApiProblem } from 'services/parseError';
import { useTranslationWrapper } from 'services/Translation';

interface Props {
  error: ApiProblem;
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

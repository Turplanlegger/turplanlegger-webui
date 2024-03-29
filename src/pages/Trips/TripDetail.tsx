import { Box, Typography } from '@mui/material';
import { useTranslationWrapper } from 'services/Translation';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tripByIdSelector } from '../../state/tripState';

export const TripDetail = () => {
  const { tripId } = useParams();
  const trip = useRecoilValue(tripByIdSelector(Number(tripId)));
  const t = useTranslationWrapper();

  return trip ? (
    <Box marginTop={5} marginLeft={5}>
      <Typography component="h1" variant="h1">
        {trip.name}
      </Typography>
      <Typography>{t('common.coming_soon')}</Typography>
    </Box>
  ) : null;
};

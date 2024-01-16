import { Box, Chip, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tripByIdSelector } from '../../../state/tripState';
import { TripLists } from './TripLists';
import { TripParticipants } from './TripParticipants';
import { TripRoutes } from './TripRoutes';
import { TripDates } from './TripDates';
import { TripNotes } from './TripNotes';
import { useTranslationWrapper } from 'services/Translation';
import { PrivacyToggle } from '../PrivacyToggle';
import { useState } from 'react';

export const TripDetail = () => {
  const { tripId } = useParams();
  const trip = useRecoilValue(tripByIdSelector(Number(tripId)));
  const [localTrip, setLocalTrip] = useState(trip);
  const t = useTranslationWrapper();

  return trip ? (
    <Box marginTop={5} marginLeft={5}>
      <Typography component="h1" variant="h4">
        {trip.name}
      </Typography>
      <Chip
        color={trip.private ? 'success' : 'warning'}
        size="small"
        label={trip.private ? t('common.private') : t('common.public')}
        sx={{ mb: '15px' }}
      />
      {localTrip && <PrivacyToggle trip={localTrip} setTrip={setLocalTrip} />}
      <TripParticipants />
      <TripDates />
      <TripRoutes />
      <TripLists />
      <TripNotes />
    </Box>
  ) : null;
};

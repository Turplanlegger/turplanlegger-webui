import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Trip } from './CreateTrip';

interface Props {
  trip: Trip;
}

export const TripInfo = ({ trip }: Props) => {
  const { t } = useTranslation();

  return (
    <Box>
      <Typography>`Trip name: ${trip.name}`</Typography>
      <Typography>`Trip name: ${trip.name}`</Typography>
    </Box>
  );
};

import { Box, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Trip } from './CreateTrip';
import { TripInfo } from './TripInfo';

interface Props {
  trips: Trip[];
}

export const TripsOverview = ({ trips }: Props) => {
  const { t } = useTranslation();
  return <Box>{trips && trips.map((trip) => <TripInfo key={trip.name} trip={trip} />)}</Box>;
};

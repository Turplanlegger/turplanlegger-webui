import { Grid } from '@mui/material';
import { Trip } from '../../models/Types';
import { TripInfo } from './TripInfo';

interface Props {
  trips: Trip[];
}

export const TripsOverview = ({ trips }: Props) => {
  return (
    <Grid container spacing={2} direction="row" sx={{ margin: 1 }}>
      {trips &&
        trips.map((trip) => (
          <Grid item key={trip.id} xs={8} md={4}>
            <TripInfo key={trip.id} trip={trip} />
          </Grid>
        ))}
    </Grid>
  );
};

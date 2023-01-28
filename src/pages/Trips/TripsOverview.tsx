import { Grid } from '@mui/material';
import { Trip } from '../../models/Types';
import { TripCard } from './TripCard';

interface Props {
  trips: Trip[];
}

export const TripsOverview = ({ trips }: Props) => {
  return (
    <Grid container spacing={2} direction="row" sx={{ margin: 1 }}>
      {trips &&
        trips.map((trip) => (
          <Grid item key={trip.name}>
            <TripCard key={trip.name} trip={trip} />
          </Grid>
        ))}
    </Grid>
  );
};

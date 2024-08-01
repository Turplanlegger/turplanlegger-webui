import { Grid } from '@mui/material';
import { Trip } from '../../models/Types';
import { TripCard } from './TripCard';
// import { ModalContent } from 'components/Modal/content';
// import { modalSelector } from 'state/modalState';

interface Props {
  trips: Trip[];
}

export const TripsOverview = ({ trips }: Props) => {
  return (
    <>
      <Grid container spacing={2} direction="row" sx={{ margin: 1 }}>
        {trips &&
          trips.map((trip) => (
            <Grid item key={trip.id} xs={8} md={4}>
              <TripCard key={trip.id} trip={trip} />
            </Grid>
          ))}
      </Grid>
      {/* <ModalContent modal={modalSelector.EDIT}>
        <EditTrip trip={trips[0]} />
      </ModalContent> */}
    </>
  );
};

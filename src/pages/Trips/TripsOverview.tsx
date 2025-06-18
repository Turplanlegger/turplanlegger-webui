import Grid from '@mui/material/Grid2';
import { Trip } from '../../models/Types';
import { TripCard } from './TripCard';
import { useState } from 'react';
import { TripDetail } from './TripDetail/TripDetail';
import { ModalContent } from '../../components/Modal/content';
import { modalSelector } from '../../state/modalState';

interface Props {
  trips: Trip[];
}

export const TripsOverview = ({ trips }: Props) => {
  const [activeItem] = useState<number | null>(null);
  const activeTrip = trips.find((element) => element.id === activeItem);

  return (
    <>
      <Grid container spacing={2} direction="row" sx={{ margin: 1 }}>
        {trips &&
          trips.map((trip) => (
            <Grid key={trip.id} size={{ xs: 8, md: 4 }}>
              <TripCard key={trip.id} trip={trip} />
            </Grid>
          ))}
      </Grid>
      <ModalContent modal={modalSelector.EDIT}> {activeTrip ? <TripDetail /> : ''} </ModalContent>
    </>
  );
};

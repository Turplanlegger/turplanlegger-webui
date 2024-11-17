import { Grid } from '@mui/material';
import { Trip } from '../../models/Types';
import { TripCard } from './TripCard';
import { ModalContent } from 'components/Modal/content';
import { modalSelector } from 'state/modalState';
import { EditTrip } from './EditTrip';
import { useState } from 'react';

interface Props {
  trips: Trip[];
}

export const TripsOverview = ({ trips }: Props) => {
  const [activeItem] = useState<number | null>(null);
  const activeTrip = trips.find((element) => element.id === activeItem);
  console.debug(activeItem);

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
      <ModalContent modal={modalSelector.EDIT}> {activeTrip ? <EditTrip /> : ''} </ModalContent>
    </>
  );
};

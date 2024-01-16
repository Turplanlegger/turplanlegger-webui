import { t } from 'i18next';
import { TripDateField } from './TripDateField';
import { Grid, IconButton, Typography } from '@mui/material';
import { Trip } from 'models/Types';
import { emptyTripDate } from 'state/tripState';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  trip: Trip;
  setTrip: (value: Trip) => void;
}

export const DatesList = ({ trip, setTrip }: Props) => {
  const addDate = () => {
    setTrip({
      ...trip,
      dates: [...trip.dates, emptyTripDate]
    });
  };
  return (
    <>
      <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
        {t('common.dates')}
      </Typography>
      {trip.dates.map((_, index) => (
        <Grid item key={index} sx={{ mb: 1 }}>
          <TripDateField index={index} trip={trip} setTrip={setTrip} />
        </Grid>
      ))}
      <IconButton aria-label="add" color="primary" sx={{ mt: 0.5 }} onClick={() => addDate()}>
        <AddIcon />
      </IconButton>
    </>
  );
};

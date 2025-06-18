import AddIcon from '@mui/icons-material/Add';
import { Grid, IconButton, Typography } from '@mui/material';
import { t } from 'i18next';
import { Trip } from '../../models/Types';
import { emptyTripDate } from '../../state/tripState';
import { TripDateField } from './TripDateField';

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

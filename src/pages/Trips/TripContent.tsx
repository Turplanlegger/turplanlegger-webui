import { Button, Chip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTranslationWrapper } from 'services/Translation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Trip, TripDate } from '../../models/Types';
import { apiState } from '../../state/apiState';
import { tripState } from '../../state/tripState';
import { Link } from 'react-router-dom';

interface Props {
  trip: Trip;
}

export const TripContent = ({ trip }: Props) => {
  const t = useTranslationWrapper();

  return (
    <>
      <Typography variant="h5" sx={{ mb: 2 }}>
        {trip.name}
      </Typography>
      <SelectedTripDate dates={trip.dates} />
      <>
        <Chip
          color={trip.private ? 'success' : 'warning'}
          size="small"
          label={trip.private ? t('common.private') : t('common.public')}
        />
      </>
    </>
  );
};

export const TripButtons = ({ trip }: Props) => {
  const t = useTranslationWrapper();
  const api = useRecoilValue(apiState);
  const [trips, setTrips] = useRecoilState(tripState);

  const deleteTrip = async () => {
    const res = await api?.delete(`/notes/${trip.id}`);
    if (res.status === 'ok') {
      setTrips(trips.filter((trip) => trip.id !== trip.id));
    }
  };

  return (
    <>
      <Button component={Link} to={'/trips/' + trip.id + '/edit'} size="small">
        {t('common.edit')}
      </Button>
      <Button size="small" onClick={() => deleteTrip()}>
        {t('common.delete')}
      </Button>
    </>
  );
};

export const SelectedTripDate = ({ dates }: { dates: TripDate[] }) => {
  const t = useTranslationWrapper();

  let selected_date = undefined;
  dates.forEach((date, index) => {
    if (date.selected) {
      selected_date = index;
    }
  });

  if (selected_date != undefined) {
    return (
      <Grid>
        <Typography variant="h5">{t('common.dates')}</Typography>
        <>
          <Typography variant="h6">{t('common.start_date')}</Typography>
          <Typography>{dates[selected_date].start_time.toString()}</Typography>
        </>
        <>
          <Typography variant="h6">{t('common.end_time')}</Typography>
          <Typography>{dates[selected_date].end_time.toString()}</Typography>
        </>
      </Grid>
    );
  } else {
    return (
      <Grid>
        <Typography variant="h5">{t('common.dates')}</Typography>
        <Typography>
          {t('trip.no_selected_date')} <br />
          {dates.length} {t('trip.dates_available')}
        </Typography>
      </Grid>
    );
  }
};

import { Button, Card, CardActions, CardContent, Chip, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Trip, TripDate } from '../../models/Types';
import { apiState } from '../../state/apiState';
import LaunchIcon from '@mui/icons-material/Launch';
import { tripState } from '../../state/tripState';

interface Props {
  trip: Trip;
}

export const SelectedTripDate = ({ dates }: { dates: TripDate[] }) => {
  const { t } = useTranslation();
  let selected_date = undefined;
  dates.forEach((date, index) => {
    if (date.selected) {
      selected_date = index;
    }
  });

  if (selected_date != undefined) {
    return (
      <Grid item>
        <Typography variant="h4">{t('common.dates')}</Typography>
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
      <Grid item>
        <Typography variant="h4">{t('common.dates')}</Typography>
        <Typography>
          {t('trip.no_selected_date')} <br />
          {dates.length} {t('trip.dates_available')}
        </Typography>
      </Grid>
    );
  }
};

export const TripInfo = ({ trip }: Props) => {
  const { t } = useTranslation();
  const api = useRecoilValue(apiState);
  const [trips, setTrips] = useRecoilState(tripState);

  const deleteTrip = async () => {
    const res = await api?.delete(`/trips/${trip.id}`);
    if (res.status === 'ok') {
      setTrips(trips.filter((t) => t.id !== trip.id));
    }
  };

  return (
    <Card>
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography variant="h3">{trip.name}</Typography>
            <Chip
              color={trip.private ? 'success' : 'warning'}
              size="small"
              label={trip.private ? t('common.private') : t('common.public')}
              sx={{ mb: '15px' }}
            />
          </Grid>
          <SelectedTripDate dates={trip.dates} />
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => deleteTrip()}>
          {t('common.delete')}
        </Button>
        <Button size="small" component={Link} to={`/trips/${trip.id}`} endIcon={<LaunchIcon />}>
          {t('common.edit')}
        </Button>
      </CardActions>
    </Card>
  );
};

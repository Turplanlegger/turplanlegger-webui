import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Grid,
  Switch,
  TextField
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Trip } from '../../models/Types';
import { apiState } from '../../state/apiState';
import LaunchIcon from '@mui/icons-material/Launch';
import { tripState } from '../../state/tripState';

interface Props {
  trip: Trip;
}

export const TripCard = ({ trip }: Props) => {
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
    <Card sx={{ maxWidth: 345 }}>
      <CardContent>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <TextField label="Trip name" variant="standard" value={trip.name} />
          </Grid>
          <Grid item>
            <TextField
              label={t('common.start_time')}
              variant="standard"
              value={trip.start_time ? trip.start_time : t('common.not_set')}
            />
          </Grid>
          <Grid item>
            <TextField
              label={t('common.end_time')}
              value={trip.end_time ? trip.end_time : t('common.not_set')}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Switch checked={!trip.private} />}
              label={trip.private ? t('common.private') : t('common.public')}
            />
          </Grid>
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

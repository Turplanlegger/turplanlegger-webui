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
import { useRecoilState, useRecoilValue } from 'recoil';
import { apiState } from '../../state/apiState';
import { tripState } from '../../state/tripState';
import { Trip } from './CreateTrip';

interface Props {
  trip: Trip;
}

export const TripInfo = ({ trip }: Props) => {
  const { t } = useTranslation();
  const api = useRecoilValue(apiState);
  const [trips, setTrips] = useRecoilState(tripState);

  const deleteTrip = async () => {
    const res = await api?.delete(`/trip/${trip.id}`);
    setTrips(trips + 1);
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
              label="Start time"
              variant="standard"
              value={trip.start_time ? trip.start_time : 'Not set'}
            />
          </Grid>
          <Grid item>
            <TextField
              label="End time"
              value={trip.end_time ? trip.end_time : 'Not set'}
              variant="standard"
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Switch checked={!trip.private} />}
              label={trip.private ? 'Private' : 'Public'}
            />
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => console.log('Edit')}>
          Edit
        </Button>
        <Button size="small" onClick={() => deleteTrip()}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

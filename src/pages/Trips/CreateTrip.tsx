import { Box, Button, FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ChangeEvent, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { apiState } from '../../state/apiState';
import { modalOpen } from '../../components/CustomModal/modalState';
import { tripState } from '../../state/tripState';

export interface Trip {
  id: string;
  name: string;
  start_time: Date;
  end_time: Date;
  private: boolean;
  notes: any;
  routes: any;
  item_lists: any;
}

export const CreateTrip = () => {
  const { t } = useTranslation();
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [publicTrip, setPublicTrip] = useState(true);
  const [tripName, setTripName] = useState('');
  const api = useRecoilValue(apiState);
  const setOpen = useSetRecoilState(modalOpen);
  const [trips, setTrips] = useRecoilState(tripState);

  const createTrip = async () => {
    const trip = {
      name: tripName,
      start_time: startTime,
      end_time: endTime,
      private: !publicTrip
    } as Trip;

    await api?.post('/trip', trip);
    setOpen(false);
    setTrips(trips + 1);
  };

  const handleTripNameChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setTripName(e?.target.value);
  };

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-around'}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <Typography style={{ marginTop: 20 }}>{t('trip.new_trip')}</Typography>
          </Grid>
          <Grid item>
            <TextField
              id="outlined-basic"
              label={t('trip.trip_name')}
              variant="outlined"
              value={tripName}
              onChange={(e) => handleTripNameChange(e)}
            />
          </Grid>
          <Grid item>
            <DatePicker
              label={t('common.start_time')}
              value={startTime}
              onChange={(newValue) => {
                setStartTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} label={t('common.start_time')} />}
            />
          </Grid>
          <Grid item>
            <DatePicker
              label={t('common.end_time')}
              value={endTime}
              onChange={(newValue) => {
                setEndTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} label={t('common.end_time')} />}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Switch defaultChecked onChange={() => setPublicTrip(!publicTrip)} />}
              label={publicTrip ? t('common.public') : t('common.private')}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
      <Box display={'flex'}>
        <Button fullWidth={true} onClick={() => setOpen(false)}>
          {t('common.cancel')}
        </Button>
        <Button fullWidth={true} onClick={createTrip}>
          {t('common.create')}
        </Button>
      </Box>
    </Box>
  );
};

import { Box, Button, FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ChangeEvent, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { apiState } from '../../state/apiState';

export interface Trip {
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
  const [startTime, setStartTime] = useState<Date | null>();
  const [endTime, setEndTime] = useState<Date | null>();
  const [publicTrip, setPublicTrip] = useState(true);
  const [tripName, setTripName] = useState('');
  const api = useRecoilValue(apiState);

  const createTrip = async () => {
    const trip = { name: tripName, start_time: startTime, end_time: endTime, private: !publicTrip };
    const response = await api?.post('/trip', trip);
    console.log('RES: ', response);
    console.log('Create trip pressed');
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
              label="Trip name"
              variant="outlined"
              value={tripName}
              onChange={(e) => handleTripNameChange(e)}
            />
          </Grid>
          <Grid item>
            <DatePicker
              label="Start time"
              value={startTime}
              onChange={(newValue) => {
                setStartTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item>
            <DatePicker
              label="End time"
              value={endTime}
              onChange={(newValue) => {
                setEndTime(newValue);
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </Grid>
          <Grid item>
            <FormControlLabel
              control={<Switch defaultChecked onChange={() => setPublicTrip(!publicTrip)} />}
              label={publicTrip ? 'Public' : 'Private'}
            />
          </Grid>
        </Grid>
      </LocalizationProvider>
      <Box display={'flex'}>
        <Button fullWidth={true}>Cancel</Button>
        <Button fullWidth={true} onClick={createTrip}>
          Create
        </Button>
      </Box>
    </Box>
  );
};

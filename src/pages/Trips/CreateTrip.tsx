import { Box, Button, FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from 'react';

export const CreateTrip = () => {
  const { t } = useTranslation();
  const [startTime, setStartTime] = useState<Date | null>();
  const [endTime, setEndTime] = useState<Date | null>();
  const [publicTrip, setPublicTrip] = useState(true);
  return (
    <Box height={'100%'} margin={5}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Grid container direction="column" justifyContent="center" spacing={2}>
          <Grid item>
            <Typography style={{ marginTop: 20 }}>{t('trip.new_trip')}</Typography>
          </Grid>
          <Grid item>
            <TextField id="outlined-basic" label="Trip name" variant="outlined" />
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
      <Box display={'flex'} marginBottom={10} marginTop={10}>
        <Button fullWidth={true}>Cancel</Button>
        <Button fullWidth={true}>Create</Button>
      </Box>
    </Box>
  );
};

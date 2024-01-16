import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import 'dayjs/locale/nb';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { apiState } from '../../state/apiState';
import { newTripAtom, tripState } from '../../state/tripState';
import { isErrorResponse } from '../../models/ErrorResponse';
import { errorState } from '../../state/errorState';
import { useEffect } from 'react';
import { useTranslationWrapper } from 'services/Translation';
import { modalSelector, openModalState } from 'state/modalState';
import { useSetSelectedDate } from './useSetSelectedDate';
import { PrivacyToggle } from './PrivacyToggle';
import { DatesList } from './DatesList';

export const CreateTrip = () => {
  const t = useTranslationWrapper();
  const setOpen = useSetRecoilState(openModalState);
  const setErrorState = useSetRecoilState(errorState);

  const api = useRecoilValue(apiState);
  const [trips, setTrips] = useRecoilState(tripState);
  const [[trip, setTrip], resetTrip] = [
    useRecoilState(newTripAtom),
    useResetRecoilState(newTripAtom)
  ];

  const setSelectedDate = useSetSelectedDate();

  useEffect(() => {
    setSelectedDate();
  }, [trip.dates]);

  const createTrip = async () => {
    const result = await api?.post('/trips', trip);
    if (isErrorResponse(result)) {
      setErrorState(result);
      return;
    }
    setOpen(modalSelector.NONE);
    setTrips([...trips, result]);
    resetTrip();
  };

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-around'}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography component="h2" variant="h4">
            {t('trip.new_trip')}
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label={t('trip.trip_name')}
            variant="outlined"
            value={trip.name}
            sx={{ width: '60%' }}
            onChange={(e) => setTrip({ ...trip, name: e?.target.value })}
          />
        </Grid>
        <Grid item id="privacy">
          <PrivacyToggle trip={trip} setTrip={setTrip} />
        </Grid>
        <Grid item id="dates">
          <DatesList trip={trip} setTrip={setTrip} />
        </Grid>
      </Grid>
      <Box display={'flex'}>
        <Button fullWidth={true} onClick={() => setOpen(modalSelector.NONE)}>
          {t('common.cancel')}
        </Button>
        <Button fullWidth={true} onClick={() => resetTrip()}>
          {t('common.reset')}
        </Button>
        <Button fullWidth={true} onClick={createTrip}>
          {t('common.create')}
        </Button>
      </Box>
    </Box>
  );
};

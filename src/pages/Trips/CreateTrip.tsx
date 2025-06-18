import { Box, Button, Grid, TextField, Typography } from '@mui/material';

import 'dayjs/locale/nb';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { apiState } from '../../state/apiState';
import { convertTripDatesFromString, newTripAtom, tripState } from '../../state/tripState';
import { isErrorResponse } from '../../models/ErrorResponse';
import { errorState } from '../../state/errorState';
import { useEffect } from 'react';
import { PrivacyToggle } from './PrivacyToggle';
import { DatesList } from './DatesList';
import { useTranslationWrapper } from '../../services/Translation';
import { Trip } from '../../models/Types';
import { modalSelector, openModalState } from '../../state/modalState';

const useSetSelectedDate = () => {
  const [trip, setTrip] = useRecoilState(newTripAtom);
  const setSelectedDate = () => {
    if (trip.dates.length > 1 && trip.dates.some((date) => date.selected)) {
      setTrip({
        ...trip,
        dates: trip.dates.map((date) => {
          return { ...date, selected: false };
        })
      });
    } else if (trip.dates.length == 1 && !trip.dates[0].selected) {
      setTrip({
        ...trip,
        dates: [
          {
            ...trip.dates[0],
            selected: true
          },
          ...trip.dates.slice(1)
        ]
      });
    }
    return true;
  };
  return setSelectedDate;
};

export const CreateTrip = () => {
  const t = useTranslationWrapper();
  const setOpen = useSetRecoilState(openModalState);
  const setErrorState = useSetRecoilState(errorState);

  const api = useRecoilValue(apiState);
  const [trips, setTrips] = useRecoilState<Trip[]>(tripState);
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
    const newTrip = convertTripDatesFromString(result as Trip);
    setOpen(modalSelector.NONE);
    setTrips([...trips, newTrip]);
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

import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import 'dayjs/locale/nb';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { apiState } from '../../state/apiState';
import { emptyTripDate, newTripAtom, tripState } from '../../state/tripState';
import { isErrorResponse } from '../../models/ErrorResponse';
import { errorState } from '../../state/errorState';
import { useEffect } from 'react';
import { useTranslationWrapper } from 'services/Translation';
import { modalSelector, openModalState } from 'state/modalState';
import { TripDateField } from './TripDateField';
import { useSetSelectedDate } from './useSetSelectedDate';

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

  const addDate = () => {
    setTrip({
      ...trip,
      dates: [...trip.dates, emptyTripDate]
    });
  };

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
          <Typography variant="h2">{t('trip.new_trip')}</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label={t('trip.trip_name')}
            variant="outlined"
            value={trip.name}
            onChange={(e) => setTrip({ ...trip, name: e?.target.value })}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                onChange={() =>
                  setTrip({
                    ...trip,
                    private: !trip.private
                  })
                }
              />
            }
            label={trip.private ? t('common.private') : t('common.public')}
          />
        </Grid>
        <Grid item id="dates">
          <Typography variant="h3" sx={{ mt: 2 }}>
            {t('common.dates')}
          </Typography>
          {trip.dates.map((_, index) => (
            <Grid item key={index} sx={{ mb: 1 }}>
              <TripDateField index={index} />
            </Grid>
          ))}
          <IconButton aria-label="add" color="primary" sx={{ mt: 0.5 }} onClick={() => addDate()}>
            <AddIcon />
          </IconButton>
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

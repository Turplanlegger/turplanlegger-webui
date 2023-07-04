import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { apiState } from '../../state/apiState';
import { modalOpen } from '../../components/CustomModal/modalState';
import { emptyTripDate, newTripAtom, tripState } from '../../state/tripState';
import { isErrorResponse } from '../../models/ErrorResponse';
import { errorState } from '../../state/errorState';
import { useEffect } from 'react';
import { useTranslationWrapper } from 'services/Translation';

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

const TripDateField = ({ index }: { index: number }) => {
  const t = useTranslationWrapper();

  const [trip, setTrip] = useRecoilState(newTripAtom);

  const setSelectedDate = useSetSelectedDate();

  const removeDate = () => {
    setTrip({
      ...trip,
      dates: [...trip.dates.filter((_, i) => i !== index)]
    });

    setSelectedDate();
  };

  const updateTripDates = (start_time: dayjs.Dayjs | null, end_time: dayjs.Dayjs | null, selected: boolean) => {
    if (!start_time) {
      start_time = trip.dates[index].start_time;
    }

    if (!end_time) {
      end_time = trip.dates[index].end_time;
    }
    selected = trip.dates.length > 1 ? true : false;
    setTrip({
      ...trip,
      dates: [
        ...trip.dates.slice(0, index),
        {
          id: 0,
          start_time: start_time,
          end_time: end_time,
          selected: selected
        },
        ...trip.dates.slice(index + 1)
      ]
    });
  };

  return (
    <Box id={'trip-date' + index}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Grid item sx={{ mb: 1 }}>
          <Typography variant="h4">{t('common.date') + ' ' + (index + 1)}</Typography>
        </Grid>
        <Grid item sx={{ mb: 2 }}>
          <DatePicker
            label={t('common.start_time')}
            value={dayjs(trip.dates[index].start_time)}
            onChange={(e) =>
              updateTripDates(e, trip.dates[index].end_time, trip.dates[index].selected)
            }
          />
        </Grid>
        <Grid item>
          <DatePicker
            label={t('common.end_time')}
            value={trip.dates[index].end_time}
            onChange={(e) =>
              updateTripDates(trip.dates[index].start_time, e, trip.dates[index].selected)
            }
          />
        </Grid>
      </LocalizationProvider>
      <IconButton
        aria-label="Remove date"
        onClick={() => removeDate()}
        disabled={trip.dates.length <= 1 ? true : false}>
        <DeleteForeverIcon />
      </IconButton>
      <Divider />
    </Box>
  );
};

export const CreateTrip = () => {
  const t = useTranslationWrapper();
  const setOpen = useSetRecoilState(modalOpen);
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
    setOpen(false);
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
      </Grid>
      <Box display={'flex'}>
        <Button fullWidth={true} onClick={() => setOpen(false)}>
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

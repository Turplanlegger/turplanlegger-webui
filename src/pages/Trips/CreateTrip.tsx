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
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useTranslation } from 'react-i18next';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { apiState } from '../../state/apiState';
import { modalOpen } from '../../components/CustomModal/modalState';
import { emptyTripDate, newTripAtom, tripState } from '../../state/tripState';
import { isErrorResponse } from '../../models/ErrorResponse';
import { errorState } from '../../state/errorState';

const TripDateField = ({ index }: { index: number }) => {
  const { t } = useTranslation();

  const [trip, setTrip] = useRecoilState(newTripAtom);

  const updateTripDates = (id: number, start_time: Date | null, end_time: Date | null) => {
    if (!start_time) {
      start_time = trip.dates[index].start_time;
    }

    if (!end_time) {
      end_time = trip.dates[index].end_time;
    }

    setTrip({
      ...trip,
      dates: [
        ...trip.dates.slice(0, index),
        {
          id: 0,
          start_time: start_time,
          end_time: end_time
        },
        ...trip.dates.slice(index + 1)
      ]
    });
  };

  return (
    <Box id={'trip-date' + index}>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <Typography component="h4">{t('common.date') + ' ' + (index + 1)}</Typography>
        <Grid item>
          <DatePicker
            label={t('common.start_time')}
            value={trip.dates[index].start_time}
            onChange={(e) => updateTripDates(index, e, trip.dates[index].end_time)}
            renderInput={(params) => <TextField {...params} label={t('common.start_time')} />}
          />
        </Grid>
        <Grid item>
          <DatePicker
            label={t('common.end_time')}
            value={trip.dates[index].end_time}
            onChange={(e) => updateTripDates(index, trip.dates[index].start_time, e)}
            renderInput={(params) => <TextField {...params} label={t('common.end_time')} />}
          />
        </Grid>
      </LocalizationProvider>
      <IconButton
        aria-label="Remove date"
        onClick={() =>
          setTrip({
            ...trip,
            dates: [...trip.dates.filter((_, i) => i !== index)]
          })
        }
        disabled={trip.dates.length <= 1 ? true : false}>
        <DeleteForeverIcon />
      </IconButton>
    </Box>
  );
};

export const CreateTrip = () => {
  const { t } = useTranslation();
  const setOpen = useSetRecoilState(modalOpen);
  const setErrorState = useSetRecoilState(errorState);

  const api = useRecoilValue(apiState);
  const [trips, setTrips] = useRecoilState(tripState);
  const [[trip, setTrip], resetTrip] = [
    useRecoilState(newTripAtom),
    useResetRecoilState(newTripAtom)
  ];

  const createTrip = async () => {
    const result = await api?.post('/trips', trip);
    if (isErrorResponse(result)) {
      setErrorState(result);
      return;
    }
    setOpen(false);
    setTrips([...trips, result]);
  };

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-around'}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography style={{ marginTop: 20 }}>{t('trip.new_trip')}</Typography>
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
          <Typography sx={{ mt: 2 }}>{t('common.dates')}</Typography>
          {trip.dates.map((date, index) => (
            <Grid item key={index} sx={{ mb: 1 }}>
              <TripDateField index={index} />
            </Grid>
          ))}
          <IconButton
            aria-label="add"
            color="primary"
            sx={{ mt: 0.5 }}
            onClick={() =>
              setTrip({
                ...trip,
                dates: [...trip.dates, emptyTripDate]
              })
            }>
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

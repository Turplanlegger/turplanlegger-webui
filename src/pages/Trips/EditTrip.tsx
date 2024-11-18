import {
  Alert,
  Box,
  Button,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { Trip, TripDate } from 'models/Types';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslationWrapper } from 'services/Translation';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { emptyTripDate, tripByIdSelector, tripState } from 'state/tripState';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { Link, useParams } from 'react-router-dom';
import { apiState } from 'state/apiState';
import CheckIcon from '@mui/icons-material/Check';
import WarningIcon from '@mui/icons-material/Warning';

interface TripDateProps {
  date: TripDate;
  updateDate: (updatedDate: TripDate, index: number) => void;
  index: number;
  onRemove: (index: number) => void;
}

const TripDateField = ({ date, updateDate, index, onRemove }: TripDateProps) => {
  const t = useTranslationWrapper();

  const updateStartTime = (startTime: dayjs.Dayjs | null) => {
    startTime && updateDate({ ...date, start_time: startTime }, index);
  };

  const updateEndTime = (endTime: dayjs.Dayjs | null) => {
    endTime && updateDate({ ...date, end_time: endTime }, index);
  };

  return (
    <Box id={'trip-date' + index}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="nb">
        <Grid sx={{ mb: 1 }}>
          <Typography variant="h4">{t('common.date') + ' ' + (index + 1)}</Typography>
        </Grid>
        <Grid sx={{ mb: 2 }}>
          <DatePicker
            label={t('common.start_time')}
            value={date.start_time}
            onChange={(e) => updateStartTime(e)}
            sx={{ width: '100%' }}
          />
        </Grid>
        <Grid>
          <DatePicker
            label={t('common.end_time')}
            value={date.end_time}
            onChange={(e) => updateEndTime(e)}
            sx={{ width: '100%' }}
          />
        </Grid>
      </LocalizationProvider>
      <IconButton aria-label="Remove date" onClick={() => onRemove(index)} disabled={false}>
        <DeleteForeverIcon />
      </IconButton>
      <Divider />
    </Box>
  );
};

export const EditTrip = () => {
  const { tripId } = useParams();
  const trip = useRecoilValue(tripByIdSelector(Number(tripId)));
  const t = useTranslationWrapper();

  if (trip == undefined) {
    return (
      <>
        <Alert variant="filled" severity="error">
          ʕノ•ᴥ•ʔノ ︵ ┻━┻ <br /> Failed to load trip
        </Alert>
      </>
    );
  }

  const api = useRecoilValue(apiState);
  const setTrip = useSetRecoilState(tripState);

  const [name, setName] = useState<string>(trip.name);
  const [privacy, setPrivacyNote] = useState<boolean>(trip.private);
  const [dates, setDates] = useState<TripDate[]>(trip.dates);
  const [updateError, setUpdateError] = useState<string>('');
  const [successUpdateFeedback, setSuccessUpdateFeedback] = useState<boolean>(false);
  const [failedUpdateFeedback, setFailedUpdateFeedback] = useState<boolean>(false);

  const hideSuccessFeedback = () => {
    const timer = setTimeout(() => {
      setSuccessUpdateFeedback(false);
    }, 5 * 1000);
    return () => clearTimeout(timer);
  };

  const hideFailedFeedback = () => {
    const timer = setTimeout(() => {
      setFailedUpdateFeedback(false);
    }, 5 * 1000);
    return () => clearTimeout(timer);
  };

  const addDate = async () => {
    setDates([...dates, emptyTripDate]);
  };

  const removeDate = async (index: number) => {
    setDates(dates.filter((_, i) => i !== index));
  };

  const updateDate = async (updatedDate: TripDate, index: number) => {
    const datesCopy = [...dates];
    datesCopy[index] = updatedDate;
    setDates(datesCopy);
  };

  const updateTrip = async () => {
    setFailedUpdateFeedback(false);
    setSuccessUpdateFeedback(false);
    if (name === trip.name && dates == trip.dates && trip.private == privacy) {
      setUpdateError('No fields are changed');
      setFailedUpdateFeedback(true);
      hideFailedFeedback();
      return false;
    }

    const updatedTrip = {
      name: name,
      dates: dates,
      private: privacy
    } as Trip;

    await api
      ?.put(`/trips/${trip.id}`, updatedTrip)
      .then((response) => {
        setTrip((old) => [...old.filter((n) => n.id !== trip.id), response.trip]);
        setSuccessUpdateFeedback(true);
        hideSuccessFeedback();
      })
      .catch((response) => {
        console.error('Not ok!');
        console.debug(response.status, response.ok);
        setUpdateError('Something failed, but who knows what?');
        setFailedUpdateFeedback(true);
        hideFailedFeedback();
      });
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Grid size={{ sm: 12, md: 8, lg: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Edit trip {trip.id}: {trip.name}
        </Typography>
      </Grid>
      <Grid size={{ sm: 12, md: 8, lg: 4 }}>
        <TextField
          id="outlined-basic"
          label={t('common.name')}
          variant="outlined"
          value={name}
          onChange={(e) => setName(e?.target.value)}
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid size={{ sm: 12, md: 8, lg: 4 }}>
        <Typography variant="h3" sx={{ mt: 2 }}>
          {t('common.dates')}
        </Typography>
        {dates.map((date, index) => (
          // Add a button to select the date
          <Grid key={index} sx={{ mb: 1 }}>
            <TripDateField
              date={date}
              updateDate={updateDate}
              index={index}
              onRemove={removeDate}
            />
          </Grid>
        ))}
        <IconButton aria-label="add" color="primary" sx={{ mt: 0.5 }} onClick={() => addDate()}>
          <AddIcon />
        </IconButton>
      </Grid>
      <Grid size={{ sm: 12, md: 8, lg: 4 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>{t('common.private')}</Typography>
          <Switch value={privacy} onChange={() => setPrivacyNote(!privacy)} />
          <Typography>{t('common.public')}</Typography>
        </Stack>
      </Grid>
      <Grid>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button component={Link} to={'/trips'} variant="outlined" color="warning">
            {t('common.cancel')}
          </Button>
          <Button variant="contained" color="success" onClick={() => updateTrip()}>
            {t('common.save')}
          </Button>
        </Stack>
      </Grid>
      <Grid size={{ sm: 12, md: 8, lg: 4 }}>
        <Collapse in={successUpdateFeedback}>
          <Alert
            hidden={successUpdateFeedback}
            icon={<CheckIcon fontSize="inherit" />}
            severity="success"
            sx={{ mt: 2 }}>
            Trip was updated
          </Alert>
        </Collapse>
        <Collapse in={failedUpdateFeedback}>
          <Alert
            icon={<WarningIcon fontSize="inherit" />}
            variant="filled"
            severity="warning"
            sx={{ mt: 2 }}>
            Trip was not updated <br />
            {updateError}
          </Alert>
        </Collapse>
      </Grid>
    </Grid>
  );
};

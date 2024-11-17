import {
  Alert,
  Box,
  Button,
  Divider,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { TripDate } from 'models/Types';
import { useState } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslationWrapper } from 'services/Translation';
import { modalSelector, openModalState } from 'state/modalState';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { emptyTripDate, tripByIdSelector } from 'state/tripState';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { useParams } from 'react-router-dom';

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
          ʕノ•ᴥ•ʔノ ︵ ┻━┻ <br /> Failed to laod trip
        </Alert>
      </>
    );
  }

  const setOpen = useSetRecoilState(openModalState);
  const [name, setName] = useState<string>(trip.name);
  const [privacy, setPrivacyNote] = useState<boolean>(trip.private);
  const [dates, setDates] = useState<TripDate[]>(trip.dates);

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
    console.debug(trip.id);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <Grid size={{ xs: 4 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Edit trip {trip.id}: {trip.name}
        </Typography>
      </Grid>
      <Grid size={{ xs: 4 }}>
        <TextField
          id="outlined-basic"
          label={t('common.name')}
          variant="outlined"
          value={name}
          onChange={(e) => setName(e?.target.value)}
          sx={{ width: '100%' }}
        />
      </Grid>
      <Grid size={{ xs: 4 }}>
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
      <Grid size={{ xs: 4 }}>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>{t('common.private')}</Typography>
          <Switch value={privacy} onChange={() => setPrivacyNote(!privacy)} />
          <Typography>{t('common.public')}</Typography>
        </Stack>
      </Grid>
      <Grid>
        <Stack direction="row" spacing={1} alignItems="center">
          <Button variant="outlined" color="warning" onClick={() => setOpen(modalSelector.NONE)}>
            {t('common.cancel')}
          </Button>
          <Button variant="contained" color="success" onClick={() => updateTrip()}>
            {t('common.save')}
          </Button>
        </Stack>
      </Grid>
    </Grid>
  );
};

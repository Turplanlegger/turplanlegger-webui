import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Stack,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import { Trip, TripDate } from 'models/Types';
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { useTranslationWrapper } from 'services/Translation';
import { modalSelector, openModalState } from 'state/modalState';
import AddIcon from '@mui/icons-material/Add';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

interface Props {
  trip: Trip;
}

interface Props2 {
  date: TripDate;
}

const TripDateField = ({ date }: Props2) => {
  const t = useTranslationWrapper();

  console.debug('Any of these fail?');
  // console.debug('Index:', index);
  console.debug('Date: ', date);
  console.debug(typeof date);
  // console.debug(date.start_time);
  // console.debug(typeof date.start_time);
  // console.debug(date.end_time);
  // console.debug(typeof date.end_time);

  // const [trip, setTrip] = useRecoilState(newTripAtom);

  // const setSelectedDate = useSetSelectedDate();

  const removeDate = () => {
    console.debug('Remove date');
    // setTrip({
    //   ...trip,
    //   dates: [...trip.dates.filter((_, i) => i !== index)]
    // });

    // setSelectedDate();
  };

  // const updateTripDates = (
  //   start_time: dayjs.Dayjs | null,
  //   end_time: dayjs.Dayjs | null,
  //   selected: boolean
  // ) => {
  //   console.debug('Can you find me?');
  //   console.debug(start_time, end_time, selected);
  //   // if (!start_time) {
  //   //   start_time = trip.dates[index].start_time;
  //   // }

  //   // if (!end_time) {
  //   //   end_time = trip.dates[index].end_time;
  //   // }
  //   // selected = trip.dates.length > 1 ? true : false;
  //   // setTrip({
  //   //   ...trip,
  //   //   dates: [
  //   //     ...trip.dates.slice(0, index),
  //   //     {
  //   //       id: 0,
  //   //       start_time: start_time,
  //   //       end_time: end_time,
  //   //       selected: selected
  //   //     },
  //   //     ...trip.dates.slice(index + 1)
  //   //   ]
  //   // });
  // };

  return (
    <Box id={'trip-date' + date.id}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="nb">
        <Grid item sx={{ mb: 1 }}>
          <Typography variant="h4">{t('common.date') + ' ' + date.id}</Typography>
        </Grid>
        <Grid item sx={{ mb: 2 }}>
          <Typography>Test</Typography>
          {/* <DatePicker
            label={t('common.start_time')}
            value={dayjs(date.start_time)}
            onChange={(e) => updateTripDates(e, date.end_time, date.selected)}
          /> */}
        </Grid>
        <Grid item>
          <Typography>Test</Typography>
          {/* <DatePicker
            label={t('common.end_time')}
            value={date.end_time}
            onChange={(e) => updateTripDates(date.start_time, e, date.selected)}
          /> */}
        </Grid>
      </LocalizationProvider>
      <IconButton aria-label="Remove date" onClick={() => removeDate()} disabled={false}>
        <DeleteForeverIcon />
      </IconButton>
      <Divider />
    </Box>
  );
};

export const EditTrip = ({ trip }: Props) => {
  const t = useTranslationWrapper();
  // const api = useRecoilValue(apiState);
  const setOpen = useSetRecoilState(openModalState);
  const [name, setName] = useState<string>(trip.name);
  // const [dates, setDates] = useState(trip.dates)
  const [privacy, setPrivacyNote] = useState(trip.private);

  console.debug('SEARCH FOR ME');
  const addDate = async () => {
    console.debug('Add trip date');
  };

  const updateTrip = async () => {
    console.debug(trip.id);
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Edit trip {trip.id}: {trip.name}
        </Typography>
      </Grid>
      <Grid>
        <TextField
          id="outlined-basic"
          label={t('common.name')}
          variant="outlined"
          value={name}
          onChange={(e) => setName(e?.target.value)}
        />
      </Grid>
      <Grid item id="dates">
        <Typography variant="h3" sx={{ mt: 2 }}>
          {t('common.dates')}
        </Typography>
        {trip.dates.map((date, index) => (
          <Grid item key={index} sx={{ mb: 1 }}>
            <TripDateField date={date} />
          </Grid>
        ))}
        <IconButton aria-label="add" color="primary" sx={{ mt: 0.5 }} onClick={() => addDate()}>
          <AddIcon />
        </IconButton>
      </Grid>
      {/* <Grid>
            <TextField
              multiline
              fullWidth
              rows={5}
              id="outlined-basic"
              label={t('common.content')}
              variant="outlined"
              value={content}
              onChange={(e) => setContent(e?.target.value)}
            />
          </Grid> */}
      <Grid>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>{t('common.private')}</Typography>
          <Switch value={privacy} onChange={() => setPrivacyNote(!privacy)} />
          <Typography>{t('common.public')}</Typography>
        </Stack>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid>
          <Button variant="outlined" color="warning" onClick={() => setOpen(modalSelector.NONE)}>
            {t('common.cancel')}
          </Button>
        </Grid>
        <Grid>
          <Button variant="contained" color="success" onClick={() => updateTrip()}>
            {t('common.save')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

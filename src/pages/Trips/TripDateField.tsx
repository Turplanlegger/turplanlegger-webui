import { Box, IconButton, Typography } from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import 'dayjs/locale/nb';
import { useTranslationWrapper } from 'services/Translation';
import { useSetSelectedDate } from './useSetSelectedDate';
import { Trip } from 'models/Types';

export const TripDateField = ({
  index,
  trip,
  setTrip
}: {
  index: number;
  trip: Trip;
  setTrip: (value: Trip) => void;
}) => {
  const t = useTranslationWrapper();

  const setSelectedDate = useSetSelectedDate();

  const removeDate = () => {
    setTrip({
      ...trip,
      dates: [...trip.dates.filter((_, i) => i !== index)]
    });

    setSelectedDate();
  };

  const updateTripDates = (
    start_time: dayjs.Dayjs | null,
    end_time: dayjs.Dayjs | null,
    selected: boolean
  ) => {
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
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="nb">
        <Box display="flex" alignItems={'center'} marginBottom={1}>
          <IconButton
            aria-label="Remove date"
            onClick={() => removeDate()}
            disabled={trip.dates.length <= 1 ? true : false}>
            <DeleteForeverIcon />
          </IconButton>
          <Typography>{t('common.date') + ' ' + (index + 1)}</Typography>
        </Box>
        <DatePicker
          sx={{ marginRight: 1 }}
          label={t('common.start_time')}
          value={dayjs(trip.dates[index].start_time)}
          onChange={(e) =>
            updateTripDates(e, trip.dates[index].end_time, trip.dates[index].selected)
          }
        />
        <DatePicker
          label={t('common.end_time')}
          value={dayjs(trip.dates[index].end_time)}
          onChange={(e) =>
            updateTripDates(trip.dates[index].start_time, e, trip.dates[index].selected)
          }
        />
      </LocalizationProvider>
    </Box>
  );
};

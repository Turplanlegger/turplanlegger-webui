import { Box, Button, FormControlLabel, Switch, TextField, Typography } from '@mui/material';
import 'dayjs/locale/nb';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { apiState } from '../../state/apiState';
import { convertTripDatesFromString, newTripAtom, tripState } from '../../state/tripState';
import { errorState } from '../../state/errorState';
import { useTranslationWrapper } from 'services/Translation';
import { modalSelector, openModalState } from 'state/modalState';
import { Trip } from 'models/Types';
import { isApiProblem } from 'services/parseError';

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

  const createTrip = async () => {
    try {
      const result = await api?.post('/trips', trip);
      const newTrip = convertTripDatesFromString(result as Trip);
      setOpen(modalSelector.NONE);
      setTrips([...trips, newTrip]);
      resetTrip();
    } catch (e) {
      if (isApiProblem(e)) {
        setErrorState(e);
      }
    }
  };

  return (
    <Box
      height={'100%'}
      display={'flex'}
      flexDirection={'column'}
      justifyContent={'center'}
      alignItems={'center'}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: 'fit-content',
          gap: 10,
        }}
      >
        <Typography variant="h2" paddingBottom={5}>
          {t('trip.new_trip')}
        </Typography>
        <TextField
          id="outlined-basic"
          label={t('trip.trip_name')}
          variant="outlined"
          value={trip.name}
          onChange={(e) => setTrip({ ...trip, name: e?.target.value })}
        />
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

        <Box display={'flex'}>
          <Button fullWidth onClick={() => setOpen(modalSelector.NONE)}>
            {t('common.cancel')}
          </Button>
          <Button fullWidth onClick={createTrip}>
            {t('common.create')}
          </Button>
        </Box>
      </div>
    </Box>
  );
};

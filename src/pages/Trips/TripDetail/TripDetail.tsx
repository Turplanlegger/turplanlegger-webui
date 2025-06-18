import SaveIcon from '@mui/icons-material/Save';
import { Box, Chip, IconButton, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { TripDate } from 'models/Types';
import { useTranslationWrapper } from 'services/Translation';
import { PrivacyToggle } from '../PrivacyToggle';
import { TripDates } from './TripDates';
import { TripLists } from './TripLists';
import { TripNotes } from './TripNotes';
import { TripParticipants } from './TripParticipants';
import { TripRoutes } from './TripRoutes';
import { useEditTripState } from './useEditTripState';
import { apiState } from 'state/apiState';
import { useRecoilValue } from 'recoil';

const getSelectedDateString = (dates: TripDate[]) => {
  const selected = dates.find((d) => d.selected);
  const startTime = dayjs(selected?.start_time);
  const endTime = dayjs(selected?.end_time);

  return selected !== undefined
    ? `${startTime.format('DD/MM/YYYY')} - ${endTime.format('DD/MM/YYYY')}`
    : 'No date selected';
};

export const TripDetail = () => {
  const { editTripState, setEditTripState } = useEditTripState();
  const t = useTranslationWrapper();
  const api = useRecoilValue(apiState);

  async function saveTrip(): Promise<void> {
    await api?.put(`/trips/${editTripState.id}`, editTripState);
  }

  return editTripState ? (
    <Box marginTop={5} marginLeft={5} marginRight={5} width="fit-content">
      <Box display="flex" alignItems={'center'} justifyContent={'space-between'}>
        <Typography component="h1" variant="h4">
          {editTripState.name}
        </Typography>
        <IconButton
          aria-label="save"
          color="primary"
          style={{ border: '1px solid', borderRadius: '10%' }}
          onClick={() => saveTrip()}>
          <>Save</>
          <SaveIcon />
        </IconButton>
      </Box>
      <Typography component="h2" variant="h5">
        Date: {getSelectedDateString(editTripState.dates)}
      </Typography>
      <Chip
        color={editTripState.private ? 'success' : 'warning'}
        size="small"
        label={editTripState.private ? t('common.private') : t('common.public')}
        sx={{ mb: '15px' }}
      />
      {editTripState && <PrivacyToggle trip={editTripState} setTrip={setEditTripState} />}
      <TripParticipants />
      <TripDates />
      <TripRoutes />
      <TripLists />
      <TripNotes />
    </Box>
  ) : null;
};

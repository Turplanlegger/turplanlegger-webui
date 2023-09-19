import { useRecoilValue, useSetRecoilState } from 'recoil';
import { tripState } from '../../state/tripState';
import { CreateTrip } from './CreateTrip';
import { TripsOverview } from './TripsOverview';
import { useTranslationWrapper } from 'services/Translation';
import { modalSelector, openModalState } from 'state/modalState';
import { ModalContent } from 'components/Modal/content';
import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';

export const Trips = () => {
  const trips = useRecoilValue(tripState);
  const t = useTranslationWrapper();
  const message = trips.length === 0 ? t('trip.no_trips_found') : undefined;
  const setOpen = useSetRecoilState(openModalState);

  return (
    <>
      {trips.length > 0 ? <TripsOverview trips={trips} /> : null}
      <ModalContent modal={modalSelector.CREATE} message={message}>
        <CreateTrip />
      </ModalContent>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpen(modalSelector.CREATE)}
        sx={{ position: 'absolute', bottom: '2%', left: '50%' }}>
        <AddIcon />
      </Fab>
    </>
  );
};

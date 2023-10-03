import { useRecoilValue } from 'recoil';
import { tripState } from '../../state/tripState';
import { CreateTrip } from './CreateTrip';
import { TripsOverview } from './TripsOverview';
import { useTranslationWrapper } from 'services/Translation';
import { modalSelector } from 'state/modalState';
import { ModalContent } from 'components/Modal/content';
import { CreateButton } from 'components/Modal/create';

export const Trips = () => {
  const trips = useRecoilValue(tripState);
  const t = useTranslationWrapper();
  const message = trips.length === 0 ? t('trip.no_trips_found') : undefined;

  return (
    <>
      {trips.length > 0 ? <TripsOverview trips={trips} /> : null}
      <ModalContent modal={modalSelector.CREATE} message={message}>
        <CreateTrip />
      </ModalContent>
      <CreateButton />
    </>
  );
};

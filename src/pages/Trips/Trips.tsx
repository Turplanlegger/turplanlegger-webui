import { useRecoilValue } from 'recoil';
import { tripState } from '../../state/tripState';
import { CreateContent } from '../CreateContent';
import { CreateTrip } from './CreateTrip';
import { TripsOverview } from './TripsOverview';
import { useTranslationWrapper } from 'services/Translation';

export const Trips = () => {
  const trips = useRecoilValue(tripState);
  const t = useTranslationWrapper();

  return trips.length === 0 ? (
    <CreateContent message={t('trip.no_trips_found')}>
      <CreateTrip />
    </CreateContent>
  ) : (
    <>
      <TripsOverview trips={trips} />
      <CreateContent>
        <CreateTrip />
      </CreateContent>
    </>
  );
};

import { useTranslation } from 'react-i18next';
import { useRecoilValue } from 'recoil';
import { tripState } from '../../state/tripState';
import { CreateContent } from '../CreateContent';
import { CreateTrip } from './CreateTrip';
import { TripsOverview } from './TripsOverview';

export const Trips = () => {
  const trips = useRecoilValue(tripState);
  const { t } = useTranslation();

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

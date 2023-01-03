import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { apiState } from '../../state/apiState';
import { tripState } from '../../state/tripState';
import { CreateContent } from '../CreateContent';
import { CreateTrip } from './CreateTrip';
import { TripsOverview } from './TripsOverview';

export const Trips = () => {
  const [trips, setTrips] = useRecoilState(tripState);
  const { t } = useTranslation();
  const api = useRecoilValue(apiState);

  useEffect(() => {
    const initializeTrips = async () => {
      if (api) {
        const result = await api.get('/trip/mine');
        if (result.status === 'ok') {
          setTrips(result.trip);
        }
      }
    };

    initializeTrips();
  }, []);

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

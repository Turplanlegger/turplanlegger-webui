import { useTranslation } from 'react-i18next';
import { useRecoilValueLoadable } from 'recoil';
import { DisplayError } from '../../components/DisplayError';
import { isErrorResponse } from '../../models/ErrorResponse';
import { myTrips } from '../../state/tripState';
import { NoContentFound } from '../NoContentFound';
import { CreateTrip } from './CreateTrip';
import { TripsOverview } from './ListOverview';

export const Trips = () => {
  const tripsLoadable = useRecoilValueLoadable(myTrips);
  const trips = tripsLoadable.state === 'hasValue' ? tripsLoadable.contents : [];
  const { t } = useTranslation();

  return isErrorResponse(trips) ? (
    <>
      {trips.status === 404 && (
        <NoContentFound message={t('trip.no_trips_found')}>
          <CreateTrip />
        </NoContentFound>
      )}
      {trips.status !== 404 && <DisplayError error={trips} />}
    </>
  ) : (
    <TripsOverview />
  );
};

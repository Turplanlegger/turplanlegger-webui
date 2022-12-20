import { useTranslation } from 'react-i18next';
import { useRecoilValueLoadable } from 'recoil';
import { DisplayError } from '../../components/DisplayError';
import { isErrorResponse } from '../../models/ErrorResponse';
import { myTrips } from '../../state/tripState';
import { CreateContent } from '../CreateContent';
import { CreateTrip } from './CreateTrip';
import { TripsOverview } from './TripsOverview';

export const Trips = () => {
  const tripsLoadable = useRecoilValueLoadable(myTrips);
  const trips = tripsLoadable.state === 'hasValue' ? tripsLoadable.contents : [];
  const { t } = useTranslation();

  return isErrorResponse(trips) ? (
    <>
      {trips.status === 404 && (
        <CreateContent message={t('trip.no_trips_found')}>
          <CreateTrip />
        </CreateContent>
      )}
      {trips.status !== 404 && <DisplayError error={trips} />}
    </>
  ) : (
    <>
      <TripsOverview trips={trips.trip} />
      <CreateContent>
        <CreateTrip />
      </CreateContent>
    </>
  );
};

import { useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { tripByIdSelector } from '../../state/tripState';

export const TripDetail = () => {
  const { tripId } = useParams();
  const trip = useRecoilValue(tripByIdSelector(Number(tripId)));
  console.log('Trip: ', trip);
  return <>Hi {tripId}</>;
};

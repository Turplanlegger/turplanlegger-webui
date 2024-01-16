import { useEditTripState } from './useEditTripState';
import { DatesList } from '../DatesList';

export const TripDates = () => {
  const { editTripState, setEditTripState } = useEditTripState();

  return editTripState?.dates && <DatesList trip={editTripState} setTrip={setEditTripState} />;
};

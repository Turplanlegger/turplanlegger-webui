import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { editTripAtom, tripByIdSelector } from 'state/tripState';

export const useEditTripState = () => {
  const { tripId } = useParams();
  const trip = useRecoilValue(tripByIdSelector(Number(tripId)));
  const [editTripState, setEditTripState] = useRecoilState(editTripAtom);

  useEffect(() => {
    if (trip && trip?.id !== editTripState?.id) {
      setEditTripState(trip);
    }
  }, [trip, editTripState, setEditTripState]);

  return { editTripState, setEditTripState };
};

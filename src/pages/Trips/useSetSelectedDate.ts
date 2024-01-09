import { useRecoilState } from 'recoil';
import { newTripAtom } from 'state/tripState';

export const useSetSelectedDate = () => {
  const [trip, setTrip] = useRecoilState(newTripAtom);
  const setSelectedDate = () => {
    if (trip.dates.length > 1 && trip.dates.some((date) => date.selected)) {
      setTrip({
        ...trip,
        dates: trip.dates.map((date) => {
          return { ...date, selected: false };
        })
      });
    } else if (trip.dates.length == 1 && !trip.dates[0].selected) {
      setTrip({
        ...trip,
        dates: [
          {
            ...trip.dates[0],
            selected: true
          },
          ...trip.dates.slice(1)
        ]
      });
    }
    return true;
  };
  return setSelectedDate;
};

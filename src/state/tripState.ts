import { atom, selectorFamily } from 'recoil';
import { Trip } from '../models/Types';

export const tripState = atom<Trip[]>({
  key: 'tripState',
  default: []
});

export const tripByIdSelector = selectorFamily({
  key: 'tripByIdSelector',
  get:
    (tripId: number) =>
    ({ get }) => {
      const trips = get(tripState);
      return trips.find((trip) => trip.id === tripId);
    }
});

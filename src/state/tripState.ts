import { atom, selectorFamily, selector } from 'recoil';
import { Trip } from '../models/Types';
import { apiState } from './apiState';

const initializeTripsSelector = selector<Trip[]>({
  key: `initializeTripsSelector`,
  get: async ({ get }) => {
    const api = get(apiState);
    const result = await api?.get('/trips/mine');
    return result?.status === 'ok' ? result.trip : [];
  }
});

export const tripState = atom<Trip[]>({
  key: 'tripState',
  default: initializeTripsSelector
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

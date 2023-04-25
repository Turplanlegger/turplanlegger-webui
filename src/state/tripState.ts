import { atom, selectorFamily, selector } from 'recoil';
import { Trip, TripDate } from '../models/Types';
import { apiState } from './apiState';
import { emptyNote } from './noteState';
import { emptyRoute } from './routeState';
import { emptyList } from './listState';

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

export const emptyTripDate = {
  id: 0,
  start_time: new Date(),
  end_time: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
};

export const newTripDateAtom = atom<TripDate>({
  key: 'newTripDateAtom',
  default: emptyTripDate
});

export const newTripAtom = atom<Trip>({
  key: 'newTripAtom',
  default: {
    id: 0,
    name: '',
    dates: [emptyTripDate],
    notes: [emptyNote],
    routes: [emptyRoute],
    item_lists: [emptyList],
    private: false
  }
});

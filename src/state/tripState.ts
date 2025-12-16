import { atom, selectorFamily, selector } from 'recoil';
import dayjs from 'dayjs';
import { Trip } from '../models/Types';
import { apiState } from './apiState';

const initializeTripsSelector = selector<Trip[]>({
  key: `initializeTripsSelector`,
  get: async ({ get }) => {
    const api = get(apiState);

    try {
      const result = await api?.get('/trips/mine');
      return convertAllTripDatesFromString(result.trip);
    } catch {
      return [];
    }
  }
});

const convertAllTripDatesFromString = (trips: [Trip]) => {
  trips.map(convertTripDatesFromString);
  return trips;
};

export const convertTripDatesFromString = (trip: Trip) => {
  trip.create_time = dayjs(trip.create_time);
  trip.dates.forEach((date) => {
    date.create_time = dayjs(date.create_time);
    date.start_time = dayjs(date.start_time);
    date.end_time = dayjs(date.end_time);
  });

  return trip;
};

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
  id: undefined,
  create_time: dayjs(),
  start_time: dayjs(),
  end_time: dayjs().add(14, 'days'),
  selected: false
};

export const newTripAtom = atom<Trip>({
  key: 'newTripAtom',
  default: {
    id: 0,
    create_time: dayjs(),
    name: '',
    dates: [],
    notes: [],
    routes: [],
    item_lists: [],
    private: false
  }
});

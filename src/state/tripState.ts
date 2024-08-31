import { atom, selectorFamily, selector } from 'recoil';
import dayjs from 'dayjs';
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

    let trips: Trip[] = [];

    if (result?.status === 'ok') {
      trips = convertStringsToDates(result.trip);
    }

    return trips;
  }
});

const convertStringsToDates = (trips: [Trip]) => {
  trips.forEach((trip) => {
    trip.create_time = dayjs(trip.create_time);
    trip.dates.forEach((date) => {
      date.create_time = dayjs(date.create_time);
      date.start_time = dayjs(date.start_time);
      date.end_time = dayjs(date.end_time);
    });
  });

  return trips;
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
  id: 0,
  create_time: dayjs(),
  start_time: dayjs(),
  end_time: dayjs().add(14, 'days'),
  selected: false
};

export const newTripDateAtom = atom<TripDate>({
  key: 'newTripDateAtom',
  default: emptyTripDate
});

export const newTripAtom = atom<Trip>({
  key: 'newTripAtom',
  default: {
    id: 0,
    create_time: dayjs(),
    name: '',
    dates: [emptyTripDate],
    notes: [emptyNote],
    routes: [emptyRoute],
    item_lists: [emptyList],
    private: false
  }
});

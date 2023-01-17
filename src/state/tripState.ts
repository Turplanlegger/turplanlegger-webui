import { atom, selectorFamily } from 'recoil';

export interface Trip {
  id: number;
  name: string;
  start_time: Date;
  end_time: Date;
  private: boolean;
  notes: Note[];
  routes: Route[];
  item_lists: ItemList[];
}

interface Note {
  id: string;
}

interface Route {
  id: string;
}

interface ItemList {
  id: string;
}

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

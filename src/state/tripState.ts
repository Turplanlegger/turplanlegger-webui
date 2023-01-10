import { atom, selectorFamily } from 'recoil';

export interface Trip {
  id: string;
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
    (tripId: string) =>
    ({ get }) => {
      const trips = get(tripState);
      console.log('tripId: ', tripId);

      const trip = trips.filter((trip) => trip.id === tripId);
      // HVORFOR ER IKKKE DISSE LIKE :(
      console.log('TRIPs: ', trip);
      console.log('TRIPs: ', '19' === '19');
      return trip[0];
    }
});

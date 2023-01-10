import { atom } from 'recoil';

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

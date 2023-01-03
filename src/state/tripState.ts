import { atom, selector } from 'recoil';
import { apiState } from './apiState';

export interface Trip {
  id: string;
  name: string;
  start_time: Date;
  end_time: Date;
  private: boolean;
  notes: any;
  routes: any;
  item_lists: any;
}

export const tripState = atom<Trip[]>({
  key: 'tripState',
  default: []
});

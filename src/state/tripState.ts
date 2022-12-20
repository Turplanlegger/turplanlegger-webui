import { atom, selector } from 'recoil';
import { apiState } from './apiState';

export const tripState = atom<number>({
  key: 'tripState',
  default: 0
});

export const myTrips = selector({
  key: 'myTrips',
  get: async ({ get }) => {
    get(tripState); // dependency on tripstate for rerendering-purposes
    const api = get(apiState);
    if (api) {
      return await api.get('/trip/mine');
    }
    return [];
  }
});

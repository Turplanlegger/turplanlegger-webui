import { selector } from 'recoil';
import { apiState } from './apiState';

export const myTrips = selector({
  key: 'myTrips',
  get: async ({ get }) => {
    const api = get(apiState);
    if (api) {
      return await api.get('/trip/mine');
    }
    return [];
  }
});

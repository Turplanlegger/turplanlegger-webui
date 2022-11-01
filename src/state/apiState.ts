import { atom, selector } from 'recoil';
import { Api } from '../services/Api';

export const apiState = atom<Api | undefined>({
  key: 'apiState',
  dangerouslyAllowMutability: true,
  default: undefined
});

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

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
      const res = await api.get('/trip/mine');
      console.log('res: ', res);
      return res;
    }
    return [];
  }
});

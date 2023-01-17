import { selector } from 'recoil';
import { Trip } from '../models/Types';
import { apiState } from './apiState';

export const myLists = selector<Trip[]>({
  key: 'myLists',
  get: async ({ get }) => {
    const api = get(apiState);
    if (!api) return [];
    return await api.get('/item_list/mine');
  }
});

import { selector } from 'recoil';
import { ErrorResponse } from '../models/ErrorResponse';
import { apiState } from './apiState';

export const myLists = selector<Trip[] | ErrorResponse>({
  key: 'myLists',
  get: async ({ get }) => {
    const api = get(apiState);
    if (!api) return [];
    return await api.get('/item_list/mine');
  }
});

interface Trip {
  name: string;
}

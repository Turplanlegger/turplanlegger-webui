import { selector } from 'recoil';
import { apiState } from './apiState';

export const myNotes = selector({
  key: 'myNotes',
  get: async ({ get }) => {
    const api = get(apiState);

    if (!api) return [];

    return await api.get('/note/mine');
  }
});

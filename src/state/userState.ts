import { atom, selector } from 'recoil';
import { User } from '../models/Types';
import { apiState } from './apiState';

const initializeWhoamiSelector = selector<User>({
  key: `initializeWhoamiSelector`,
  get: async ({ get }) => {
    const api = get(apiState);
    const result = await api?.get('/whoami');
    return result?.status === 'ok' ? result.user : {};
  }
});

export const whoamiState = atom<User>({
  key: 'whoamiState',
  default: initializeWhoamiSelector
});

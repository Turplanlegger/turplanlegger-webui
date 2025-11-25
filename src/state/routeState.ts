import { atom, selector } from 'recoil';
import { Route } from '../models/Types';
import { apiState } from './apiState';

const initializeRoutesSelector = selector<Route[]>({
  key: `initializeRoutesSelector`,
  get: async ({ get }) => {
    const api = get(apiState);
    try {
      const result = await api?.get('/routes/mine');
      return result.route;
    } catch {
      return [];
    }
  }
});

export const routeState = atom<Route[]>({
  key: 'routeState',
  default: initializeRoutesSelector
});

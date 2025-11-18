import { atom, selector } from 'recoil';
import { Route } from '../models/Types';
import { apiState } from './apiState';

const initializeRoutesSelector = selector<Route[]>({
  key: `initializeRoutesSelector`,
  get: async ({ get }) => {
    const api = get(apiState);
    const result = await api?.get('/routes/mine');
    return result?.status === 'ok' ? result.route : [];
  }
});

export const routeState = atom<Route[]>({
  key: 'routeState',
  default: initializeRoutesSelector
});

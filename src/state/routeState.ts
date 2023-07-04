import { atom } from 'recoil';
import { Route } from '../models/Types';

export const emptyRoute = {
  id: 0
};

export const newRouteAtom = atom<Route>({
  key: 'newRouteAtom',
  default: emptyRoute
});

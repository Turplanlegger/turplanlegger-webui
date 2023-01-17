import { atom } from 'recoil';
import { Trip } from '../models/Types';

export const tripState = atom<Trip[]>({
  key: 'tripState',
  default: []
});

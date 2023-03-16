import { atom } from 'recoil';
import { ErrorResponse } from '../models/ErrorResponse';

export const errorState = atom<ErrorResponse | undefined>({
  key: 'errorState',
  default: undefined
});

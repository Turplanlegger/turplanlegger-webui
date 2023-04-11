import { atom } from 'recoil';
import { Api } from '../services/Api';

export const apiState = atom<Api | undefined>({
  key: 'apiState',
  dangerouslyAllowMutability: true,
  default: undefined
});

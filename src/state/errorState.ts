import { atom } from 'recoil';
import { ApiProblem } from 'services/parseError';

export const errorState = atom<ApiProblem | undefined>({
  key: 'errorState',
  default: undefined
});

import { atom } from 'recoil';

interface ApiError {
  detail: string;
  title: string;
}

export const errorState = atom<ApiError | undefined>({
  key: 'errorState',
  default: undefined
});

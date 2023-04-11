import { atom } from 'recoil';

export const modalOpen = atom<boolean>({
  key: 'modalOpen',
  default: false
});

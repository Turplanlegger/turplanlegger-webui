import { atom } from 'recoil';

export const viewModalOpen = atom<boolean>({
  key: 'viewModalOpen',
  default: false
});

export const editModalOpen = atom<boolean>({
  key: 'editModalOpen',
  default: false
});

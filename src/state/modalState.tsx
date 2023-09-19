import { atom, selectorFamily } from 'recoil';

export enum modalSelector {
  NONE,
  CREATE,
  EDIT,
  VIEW
}

export const openModalState = atom<modalSelector>({
  key: 'modalOpen',
  default: modalSelector.NONE
});

export const openModalSelector = selectorFamily<boolean, modalSelector>({
  key: 'openModalSelector',
  get:
    (modal) =>
    ({ get }) => {
      const openModal = get(openModalState);
      return openModal == modal;
    }
});

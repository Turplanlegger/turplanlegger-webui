import { atom, selector } from 'recoil';
import { ItemList } from '../models/Types';
import { apiState } from './apiState';

export const initializeItemListsSelector = selector<ItemList[]>({
  key: `initializeItemListsSelector`,
  get: async ({ get }) => {
    const api = get(apiState);
    const result = await api?.get('/item_list/mine');
    return result?.status === 'ok' ? result.item_list : [];
  }
});

export const itemListState = atom<ItemList[]>({
  key: 'itemListState',
  default: initializeItemListsSelector
});

import { atom, selector } from 'recoil';
import { ItemList } from '../models/Types';
import { apiState } from './apiState';

export const initializeItemListsSelector = selector<ItemList[]>({
  key: `initializeItemListsSelector`,
  get: async ({ get }) => {
    const api = get(apiState);

    try {
      const result = await api?.get('/item_lists/mine');
      return result.item_list;
    } catch {
      return [];
    }
  }
});

export const itemListState = atom<ItemList[]>({
  key: 'itemListState',
  default: initializeItemListsSelector
});

export const emptyListItem = {
  id: 0,
  item_list: 0,
  content: '',
  checked: false
};

export const emptyList = {
  id: 0,
  name: '',
  items: [emptyListItem],
  items_checked: [],
  private: false
};

export const newItemListAtom = atom<ItemList>({
  key: 'newItemListAtom',
  default: emptyList
});

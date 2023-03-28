import { atom, selector } from 'recoil';
import { ItemList, ListItem } from '../models/Types';
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

export const emptyListItem = {
  id: 0,
  item_list: 0,
  content: '',
  checked: false
};

export const newItemListAtom = atom<ItemList>({
  key: 'newItemListAtom',
  default: {
    id: 0,
    name: '',
    items: [emptyListItem],
    items_checked: [emptyListItem],
    private: false
  }
});

const initialValue = [emptyListItem];

export const listItemState = atom<ListItem[]>({
  key: 'listItemState',
  default: initialValue
});

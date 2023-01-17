import { atom } from 'recoil';
import { ItemList, ListItem } from '../models/Types';

export const itemListState = atom<ItemList[]>({
  key: 'itemListState',
  default: []
});

export const listItemState = atom<ListItem[]>({
  key: 'listItemState',
  default: []
});

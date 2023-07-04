import { Dayjs } from 'dayjs';

export interface Note {
  id: number;
  name: string;
  content: string;
  private: boolean;
}

export interface Trip {
  id: number;
  name: string;
  dates: TripDate[];
  private: boolean;
  notes: Note[];
  routes: Route[];
  item_lists: ItemList[];
}

export interface TripDate {
  id: number;
  start_time: Dayjs;
  end_time: Dayjs;
  selected: boolean;
}

export interface Route {
  id: number;
}

export interface ItemList {
  id: number;
  name: string;
  items: ListItem[];
  items_checked: ListItem[];
  private: boolean;
}

export interface ListItem {
  id: number;
  item_list: number;
  checked: boolean;
  content?: number | string;
}

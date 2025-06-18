import { Dayjs } from 'dayjs';

export interface Note {
  id: number;
  name: string;
  content: string;
  private: boolean;
}

export interface Trip {
  id: number;
  create_time: Dayjs;
  name: string;
  dates: TripDate[];
  private: boolean;
  notes: Note[];
  routes: Route[];
  item_lists: ItemList[];
}

export interface TripDate {
  id: number | undefined;
  trip_id: number | undefined;
  create_time: Dayjs;
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

export interface User {
  id: number;
  name: string;
  last_name: string;
  email: string;
  private: boolean;
  deleted: boolean;
  delete_time: Dayjs;
  create_time: Dayjs;
}

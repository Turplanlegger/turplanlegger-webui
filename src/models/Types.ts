export interface Note {
  id: number;
  name: string;
  content: string;
  private: boolean;
}

export interface Trip {
  id: number;
  name: string;
  start_time: Date;
  end_time: Date;
  private: boolean;
  notes: Note[];
  routes: Route[];
  item_lists: ItemList[];
}

export interface Route {
  id: string;
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
  content: string;
}

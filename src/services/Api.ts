import config from '../config/config.json';

export class Api {
  url: string;
  token: string;

  constructor(token: string) {
    this.url = config.api_base_url;
    this.token = token; // add getToken() here!
  }

  async get(path: string) {
    const response = await fetch(this.url + path, {
      method: 'GET',
      headers: { Authorization: `Bearer ${this.token}` }
    });
    return await response.json();
  }

  async post(path: string, data: object) {
    const response = await fetch(this.url + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${this.token}`
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  }

  async get_list(id: number) {
    return await this.get(`/item_list/${id}`);
  }

  async create_list(type: string, name?: string, items?: string[], itemsChecked?: string[]) {
    return await this.post('/item_list', {
      name: name,
      type: type,
      items: items,
      items_checked: itemsChecked
    });
  }
}

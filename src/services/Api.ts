import config from '../config/config.json';

export class Api {
  url: string;
  token: string;

  constructor() {
    this.url = config.api_base_url;
    this.token = 'test';
  }

  async call_get(path: string) {
    const response = await fetch(this.url + path, {
      method: 'GET',
      headers: { Authorization: `Api-Key ${this.token}` }
    });
    return await response.json();
  }

  async call_post(path: string, data: JSON) {
    const response = await fetch(this.url + path, {
      method: 'POST',
      headers: { Authorization: `Api-Key ${this.token}` },
      body: JSON.stringify(data)
    });
    return await response.json();
  }

  async get_list(id: number) {
    return await this.call_get(`/item_list/${id}`);
  }
}

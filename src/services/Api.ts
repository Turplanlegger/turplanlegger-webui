import { IPublicClientApplication } from '@azure/msal-browser';
import config from '../config/config.json';

export class Api {
  url: string;
  instance: IPublicClientApplication;

  constructor(instance: IPublicClientApplication) {
    this.url = config.api_base_url;
    this.instance = instance;
  }

  async get(path: string) {
    const response = await fetch(this.url + path, {
      method: 'GET',
      headers: { Authorization: `Bearer ${await this.getToken()}` }
    });
    return await response.json();
  }

  async post(path: string, data: object) {
    const response = await fetch(this.url + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${await this.getToken()}`
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  }

  async patch(path: string, data: object) {
    const response = await fetch(this.url + path, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'Application/json',
        Authorization: `Bearer ${await this.getToken()}`
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  }

  async delete(path: string) {
    const response = await fetch(this.url + path, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${await this.getToken()}` }
    });
    return await response.json();
  }

  async get_list(id: number) {
    return await this.get(`/item_lists/${id}`);
  }

  async create_list(type: string, name?: string, items?: string[], itemsChecked?: string[]) {
    return await this.post('/item_lists', {
      name: name,
      type: type,
      items: items,
      items_checked: itemsChecked
    });
  }

  noOp() {
    return;
  }

  async getToken() {
    await this.noOp();
    const token = await this.instance.acquireTokenSilent({
      scopes: [
        'https://turplanlegger.onmicrosoft.com/0149fc65-259e-4895-9034-e144c242f733/Default'
      ],
      account: this.instance.getAllAccounts()[0]
    });

    return token.accessToken;
  }
}

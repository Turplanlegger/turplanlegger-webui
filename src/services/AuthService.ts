import { Config } from 'config/config';

export async function Login(data: LoginBody) {
  const response = await fetch(`${Config.apiUrl}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}

type LoginBody = {
  email: string;
  password: string;
};

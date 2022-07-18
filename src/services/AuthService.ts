import config from '../config/config.json';

export async function Login(data: LoginBody) {
  const response = await fetch(`${config.api_base_url}/login`, {
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

export async function SignUp(data: SignupBody) {
  const response = await fetch(`/api/user`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export async function Login(data: LoginBody) {
  const response = await fetch(`http://localhost/login`, {
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

type SignupBody = {
  email: string;
  password: string;
};

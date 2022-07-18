import { Box, Button, TextField, Typography } from '@mui/material';
import { SetStateAction, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { PasswordField } from '../components/PasswordField';
import { Login } from '../services/AuthService';

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e: { target: { value: SetStateAction<string> } }) => {
    setEmail(e.target.value);
  };

  const UserLogin = () => {
    Login({ email: email, password: password }).then((res) => {
      console.log(res);
    });
  };

  return (
    <>
      <Typography variant="h1" fontSize={50}>
        Turplanleggeren
      </Typography>
      <p></p>
      <p></p>
      <Box
        component="form"
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <TextField
          placeholder="Epost"
          style={{ width: '60vw' }}
          value={email}
          onChange={handleEmail}
          autoComplete="email"
        />
        <PasswordField
          placeHolder="Passord"
          value={password}
          setValue={setPassword}
          autoComplete="current-password"
        />
      </Box>
      <Button onClick={() => UserLogin()} style={{ background: 'light-blue', width: '220px' }}>
        Logg inn
      </Button>
      <Box
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
        <Typography style={{ padding: '5px' }}> Ingen bruker?</Typography>
        <Link to={'/signup'} style={{ textDecoration: 'none' }}>
          Lag bruker
        </Link>
      </Box>
    </>
  );
};

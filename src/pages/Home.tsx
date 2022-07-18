import { Box, Button, TextField, Typography } from '@mui/material';
import { SetStateAction, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { Login } from '../services/AuthService';

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmail = (e: { target: { value: SetStateAction<string> } }) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e: { target: { value: SetStateAction<string> } }) => {
    setPassword(e.target.value);
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
      <TextField placeholder="Epost" value={email} onChange={handleEmail} />
      <TextField placeholder="Passord" type="password" value={password} onChange={handlePassword} />
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

import { Box, Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PasswordField } from '../components/PasswordField';

export const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const UserSignup = () => {
    console.log('Lag bruker');
  };

  return (
    <>
      <Typography variant="h1" fontSize={40}>
        Turplanleggeren
      </Typography>
      <p></p>
      <Typography variant="h2" fontSize={20}>
        Opprett bruker for å komme igang
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
        <TextField style={{ width: '60vw' }} placeholder="Fornavn" autoComplete="given-name" />
        <TextField style={{ width: '60vw' }} placeholder="Etternavn" autoComplete="family-name" />
        <TextField style={{ width: '60vw' }} placeholder="Epost" autoComplete="email" />
        <PasswordField
          placeHolder="Passord"
          value={password}
          setValue={setPassword}
          autoComplete="new-password"
        />
        <PasswordField
          placeHolder="Gjenta passord"
          value={repeatPassword}
          setValue={setRepeatPassword}
          autoComplete="new-password"
        />
      </Box>
      <Button onClick={() => UserSignup()}>Lag bruker</Button>
    </>
  );
};

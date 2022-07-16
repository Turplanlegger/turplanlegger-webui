import { Button, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

export const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

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
      <TextField placeholder="Epost" />
      <TextField placeholder="Passord" type="password" />
      <Button onClick={() => UserSignup()}>Lag bruker</Button>
    </>
  );
};

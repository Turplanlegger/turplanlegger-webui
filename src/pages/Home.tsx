import { Box, Button, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const UserLogin = () => {
    console.log('Lag bruker');
  };

  return (
    <>
      <Typography variant="h1" fontSize={50}>
        Turplanleggeren
      </Typography>
      <p></p>
      <p></p>
      <TextField placeholder="Epost" />
      <TextField placeholder="Passord" type="password" />
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

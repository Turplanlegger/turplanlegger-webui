import { Button, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export const Opprett = () => {
  const navigate = useNavigate();
  return (
    <>
      <Typography>Her kan du lage en tur!</Typography>
      <Button onClick={() => navigate('/')}>Avbryt</Button>
    </>
  );
};

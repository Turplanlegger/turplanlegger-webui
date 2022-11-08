import * as React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';
import { Fab } from '@mui/material';
import { CustomModal } from '../../components/CustomModal';

export const NothingFoundContent = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);

  return (
    <Box
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'space-around'
      }}>
      <Typography>Ingen lister funnet. Klikk på knappen nedenfor for å lage en liste</Typography>
      <Fab color="primary" aria-label="add" onClick={handleOpen}>
        <AddIcon />
      </Fab>
      <CustomModal open={open} setOpen={setOpen}>
        <CreateList />
      </CustomModal>
    </Box>
  );
};

const CreateList = () => {
  return <Typography style={{ padding: 10 }}>Ny liste</Typography>;
};

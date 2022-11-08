import * as React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';
import { Fab } from '@mui/material';
import { CustomModal } from '../../components/CustomModal/CustomModal';
import { useSetRecoilState } from 'recoil';
import { modalOpen } from '../../components/CustomModal/modalState';

export const NothingFoundContent = () => {
  const setOpen = useSetRecoilState(modalOpen);

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
      <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
      <CustomModal>
        <CreateList />
      </CustomModal>
    </Box>
  );
};

const CreateList = () => {
  return <Typography style={{ padding: 10 }}>Ny liste</Typography>;
};

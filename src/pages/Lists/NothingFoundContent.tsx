import * as React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Fab } from '@mui/material';

const style = {
  position: 'absolute',
  width: '70%',
  top: '30%',
  left: '15%',
  bgcolor: 'background.paper'
};

export const NothingFoundContent = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
      <Modal
        disablePortal
        open={open}
        onClose={handleClose}
        style={{ position: 'absolute' }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};

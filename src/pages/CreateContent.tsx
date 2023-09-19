import * as React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';
import Typography from '@mui/material/Typography';
import { Fab } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalSelector, openModalSelector, openModalState } from 'state/modalState';
import { MartinModal } from 'components/Modal/modal';

interface Props {
  children: React.ReactNode;
  message?: string;
}

export const CreateContent = ({ children, message }: Props) => {
  const open = useRecoilValue(openModalSelector(modalSelector.CREATE));
  const setOpen = useSetRecoilState(openModalState);
  const drawerWidth = 240;

  return (
    <Box
      style={{
        position: 'absolute',
        width: `calc(100% - ${drawerWidth}px)`,
        top: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: open ? 1 : -1
      }}>
      {message && <Typography>{message}</Typography>}
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpen(modalSelector.CREATE)}
        sx={{ position: 'absolute', bottom: 0, marginBottom: 5 }}>
        <AddIcon />
      </Fab>
      <MartinModal modal={modalSelector.CREATE}>{children}</MartinModal>
    </Box>
  );
};

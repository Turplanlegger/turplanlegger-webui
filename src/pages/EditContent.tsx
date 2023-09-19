import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { EditModal } from '../components/CustomModal/EditModal';
import { useRecoilValue } from 'recoil';
import { editModalOpen } from '../components/CustomModal/modalState';

interface Props {
  children: React.ReactNode;
  message?: string;
}

export const EditContent = ({ children, message }: Props) => {
  const open = useRecoilValue(editModalOpen);
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
      <EditModal>{children}</EditModal>
    </Box>
  );
};

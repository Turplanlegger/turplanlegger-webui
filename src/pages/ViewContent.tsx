import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { ViewModal } from '../components/CustomModal/ViewModal';
import { useRecoilValue } from 'recoil';
import { viewModalOpen } from '../components/CustomModal/modalState';

interface Props {
  children: React.ReactNode;
  message?: string;
}

export const ViewContent = ({ children, message }: Props) => {
  const open = useRecoilValue(viewModalOpen);
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
      <ViewModal>{children}</ViewModal>
    </Box>
  );
};

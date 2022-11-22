import * as React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';
import { Fab } from '@mui/material';
import { CustomModal } from '../components/CustomModal/CustomModal';
import { useSetRecoilState } from 'recoil';
import { modalOpen } from '../components/CustomModal/modalState';
import { useTranslation } from 'react-i18next';

interface Props {
  children: React.ReactNode;
  message: string;
}

export const NoContentFound = ({ children, message }: Props) => {
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
      <Typography>{message}</Typography>
      <Fab color="primary" aria-label="add" onClick={() => setOpen(true)}>
        <AddIcon />
      </Fab>
      <CustomModal>{children}</CustomModal>
    </Box>
  );
};

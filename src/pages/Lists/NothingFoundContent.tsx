import * as React from 'react';
import Box from '@mui/material/Box';
import AddIcon from '@mui/icons-material/Add';

import Typography from '@mui/material/Typography';
import { Fab } from '@mui/material';
import { CustomModal } from '../../components/CustomModal/CustomModal';
import { useSetRecoilState } from 'recoil';
import { modalOpen } from '../../components/CustomModal/modalState';
import { useTranslation } from 'react-i18next';

export const NothingFoundContent = () => {
  const setOpen = useSetRecoilState(modalOpen);
  const { t } = useTranslation();

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
      <Typography>{t('list.no_lists_found')}</Typography>
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
  const { t } = useTranslation();
  return <Typography style={{ padding: 10 }}>{t('list.new_list')}</Typography>;
};

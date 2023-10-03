import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useRecoilValue } from 'recoil';
import { MartinModal } from './modal';
import { modalSelector, openModalSelector } from 'state/modalState';
import { DrawerWidth } from 'components/TopBar';

interface Props {
  children: React.ReactNode;
  message?: string;
  modal: modalSelector;
}

export const ModalContent = ({ children, message, modal }: Props) => {
  const open = useRecoilValue(openModalSelector(modal));

  return (
    <Box
      style={{
        position: 'absolute',
        width: `calc(100% - ${DrawerWidth}px)`,
        top: 0,
        right: 0,
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        alignItems: 'center',
        justifyContent: 'space-around',
        zIndex: open ? 1 : -1
      }}>
      {message && (
        <Typography style={{ textAlign: 'center', whiteSpace: 'pre-line' }}>{message}</Typography>
      )}
      <MartinModal modal={modal}>{children}</MartinModal>
    </Box>
  );
};

import { Modal, Box } from '@mui/material';
import { useRecoilState } from 'recoil';
import { modalOpen } from './modalState';

const style = {
  position: 'absolute',
  width: '60%',
  height: '70%',
  top: '20%',
  left: '20%',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.paper',
  overflowX: 'scroll'
};

interface Props {
  children: React.ReactNode;
}

export const CustomModal = ({ children }: Props) => {
  const [open, setOpen] = useRecoilState(modalOpen);

  return (
    <Modal
      disablePortal
      open={open}
      onClose={() => setOpen(!open)}
      style={{ position: 'absolute' }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

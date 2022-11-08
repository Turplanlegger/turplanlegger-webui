import { Modal, Box } from '@mui/material';

const style = {
  position: 'absolute',
  width: '60%',
  height: '70%',
  top: '20%',
  left: '20%',
  alignItems: 'center',
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.paper'
};

interface Props {
  open: boolean;
  setOpen: (value: boolean) => void;
  children: React.ReactNode;
}

export const CustomModal = ({ open, setOpen, children }: Props) => {
  return (
    <Modal
      disablePortal
      open={open}
      onClose={() => setOpen(!open)}
      style={{ position: 'absolute' }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

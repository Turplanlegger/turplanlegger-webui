import { Modal, Box } from '@mui/material';
import { useRecoilState } from 'recoil';
import { editModalOpen } from './modalState';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '60%',
  bgcolor: 'background.paper',
  boxShadow: 50,
  p: 4
};

interface Props {
  children: React.ReactNode;
}

export const EditModal = ({ children }: Props) => {
  const [open, setOpen] = useRecoilState(editModalOpen);

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

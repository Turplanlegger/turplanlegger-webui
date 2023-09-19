import { Modal, Box } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalSelector, openModalSelector, openModalState } from 'state/modalState';

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

export const ViewModal = ({ children }: Props) => {
  const open = useRecoilValue(openModalSelector(modalSelector.VIEW));
  const setOpen = useSetRecoilState(openModalState);

  return (
    <Modal
      disablePortal
      open={open}
      onClose={() => setOpen(modalSelector.NONE)}
      style={{ position: 'absolute' }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

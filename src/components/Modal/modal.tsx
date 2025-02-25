import { Modal, Box } from '@mui/material';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalSelector, openModalSelector, openModalState } from 'state/modalState';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '75%',
  height: '75%',
  overflowY: 'auto',
  bgcolor: 'background.paper',
  boxShadow: 50,
  p: 4
};

interface Props {
  children: React.ReactNode;
  modal: modalSelector;
}

export const MartinModal = ({ children, modal }: Props) => {
  const open = useRecoilValue(openModalSelector(modal));
  const setOpen = useSetRecoilState(openModalState);

  return (
    <Modal
      disablePortal
      open={open}
      style={{ position: 'absolute' }}
      onClose={() => setOpen(modalSelector.NONE)}
    >
      <Box sx={style}>{children}</Box>
    </Modal>
  );
};

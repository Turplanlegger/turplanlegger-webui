import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { DrawerWidth } from 'components/TopBar';
import { modalSelector, openModalState } from 'state/modalState';
import { useSetRecoilState } from 'recoil';

export const CreateButton = () => {
  const setOpen = useSetRecoilState(openModalState);

  return (
    <Fab
      color="primary"
      aria-label="add"
      onClick={() => setOpen(modalSelector.CREATE)}
      sx={{
        position: 'absolute',
        bottom: '2%',
        transform: 'translate(-50%,0)',
        left: `calc(calc(calc(100% - ${DrawerWidth}px) / 2) + ${DrawerWidth}px)`
      }}>
      <AddIcon />
    </Fab>
  );
};

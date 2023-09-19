import { useTranslationWrapper } from 'services/Translation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { itemListState } from '../../state/listState';
import { CreateList } from './CreateList';
import { ListsOverview } from './ListsOverview';
import { modalSelector, openModalState } from 'state/modalState';
import { ModalContent } from 'components/Modal/content';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const Lists = () => {
  const item_lists = useRecoilValue(itemListState);
  const t = useTranslationWrapper();
  const message = item_lists.length === 0 ? t('list.no_lists_found') : undefined;
  const setOpen = useSetRecoilState(openModalState);

  return (
    <>
      {item_lists.length > 0 ? <ListsOverview item_lists={item_lists} /> : null}
      <ModalContent modal={modalSelector.CREATE} message={message}>
        <CreateList />
      </ModalContent>
      <Fab
        color="primary"
        aria-label="add"
        onClick={() => setOpen(modalSelector.CREATE)}
        sx={{ position: 'absolute', bottom: '2%', left: '50%' }}>
        <AddIcon />
      </Fab>
    </>
  );
};

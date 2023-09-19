import { useTranslationWrapper } from 'services/Translation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { noteState } from '../../state/noteState';
import { CreateNote } from './CreateNote';
import { NotesOverview } from './NotesOverview';
import { ModalContent } from 'components/Modal/content';
import { modalSelector, openModalState } from 'state/modalState';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

export const Notes = () => {
  const notes = useRecoilValue(noteState);
  const t = useTranslationWrapper();
  const setOpen = useSetRecoilState(openModalState);

  const message = notes.length === 0 ? t('note.no_notes_found') : undefined;
  return (
    <>
      {notes.length > 0 ? <NotesOverview notes={notes} /> : null}
      <ModalContent modal={modalSelector.CREATE} message={message}>
        <CreateNote />
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

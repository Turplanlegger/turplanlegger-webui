import { useTranslationWrapper } from 'services/Translation';
import { useRecoilValue } from 'recoil';
import { noteState } from '../../state/noteState';
import { CreateNote } from './CreateNote';
import { NotesOverview } from './NotesOverview';
import { ModalContent } from 'components/Modal/content';
import { modalSelector } from 'state/modalState';
import { CreateButton } from 'components/Modal/create';

export const Notes = () => {
  const notes = useRecoilValue(noteState);
  const t = useTranslationWrapper();
  const message = notes.length === 0 ? t('note.no_notes_found') : undefined;
  return (
    <>
      {notes.length > 0 ? <NotesOverview notes={notes} /> : null}
      <ModalContent modal={modalSelector.CREATE} message={message}>
        <CreateNote />
      </ModalContent>
      <CreateButton />
    </>
  );
};

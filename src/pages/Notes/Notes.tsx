import { useTranslationWrapper } from 'services/Translation';
import { useRecoilValue } from 'recoil';
import { noteState } from '../../state/noteState';
import { CreateContent } from '../CreateContent';
import { CreateNote } from './CreateNote';
import { NotesOverview } from './NotesOverview';

export const Notes = () => {
  const notes = useRecoilValue(noteState);
  const t = useTranslationWrapper();

  return notes.length === 0 ? (
    <CreateContent message={t('note.no_notes_found')}>
      <CreateNote />
    </CreateContent>
  ) : (
    <>
      <NotesOverview notes={notes} />
      <CreateContent>
        <CreateNote />
      </CreateContent>
    </>
  );
};

import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { noteState } from '../../state/noteState';
import { apiState } from '../../state/apiState';
import { useEffect } from 'react';
import { CreateContent } from '../CreateContent';
import { CreateNote } from './CreateNote';
import { NotesOverview } from './NotesOverview';

export const Notes = () => {
  const [notes, setNotes] = useRecoilState(noteState);
  const { t } = useTranslation();
  const api = useRecoilValue(apiState);

  useEffect(() => {
    const initializeNotes = async () => {
      if (api) {
        const result = await api.get('/note/mine');
        if (result.status === 'ok') {
          setNotes(result.note);
        }
      }
    };

    initializeNotes();
  }, []);

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

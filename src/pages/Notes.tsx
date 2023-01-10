import { Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRecoilValueLoadable } from 'recoil';
import { myNotes } from '../state/noteState';
import { NoteList } from '../components/NotesList';

export const Notes = () => {
  const { t } = useTranslation();
  const notesLoadable = useRecoilValueLoadable(myNotes);
  const notes = notesLoadable.state === 'hasValue' ? notesLoadable.contents : undefined;
  return (
    <>
      <Typography variant="h2">{t('note.my_notes')}</Typography>
      {notes && <NoteList notes={notes.note}></NoteList>}
    </>
  );
};

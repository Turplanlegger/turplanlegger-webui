import { Typography } from '@mui/material';
import { useRecoilValueLoadable } from 'recoil';
import { myNotes } from '../state/noteState';
import { NoteList } from '../components/NotesList';

export const Notes = () => {
  const notesLoadable = useRecoilValueLoadable(myNotes);
  const notes = notesLoadable.state === 'hasValue' ? notesLoadable.contents : undefined;
  console.debug(notes);
  return (
    <>
      <Typography>Trips</Typography>
      {notes && <NoteList notes={notes.note}></NoteList>}
    </>
  );
};

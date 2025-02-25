import Grid from '@mui/material/Grid2';
import { Note } from '../../models/Types';
import { NoteCard } from './NoteCard';
import { EditNote } from './EditNote';
import { ModalContent } from 'components/Modal/content';
import { modalSelector } from 'state/modalState';

interface Props {
  notes: Note[];
}

export const NotesOverview = ({ notes }: Props) => {
  return (
    <>
      <Grid container spacing={2} direction="row" sx={{ margin: 1 }}>
        {notes &&
          notes.map((note) => (
            <Grid key={note.name} size={{ xs: 8, md: 4 }}>
              <NoteCard key={note.name} note={note} />
            </Grid>
          ))}
      </Grid>
      <ModalContent modal={modalSelector.EDIT}>
        <EditNote note={notes[0]} />
      </ModalContent>
    </>
  );
};

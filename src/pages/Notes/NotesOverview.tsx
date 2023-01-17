import { Grid } from '@mui/material';
import { Note } from '../../models/Types';
import { NoteInfo } from './NoteInfo';

interface Props {
  notes: Note[];
}

export const NotesOverview = ({ notes }: Props) => {
  return (
    <Grid container spacing={2} direction="row" sx={{ margin: 1 }}>
      {notes &&
        notes.map((note) => (
          <Grid item key={note.name} xs={8} md={4}>
            <NoteInfo key={note.name} note={note} />
          </Grid>
        ))}
    </Grid>
  );
};

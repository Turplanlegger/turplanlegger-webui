import { Grid } from '@mui/material';
import { Note } from '../../models/Types';
import { EditContent } from '../EditContent';
import { NoteCard } from './NoteCard';
import { EditNote } from './EditNote';

interface Props {
  notes: Note[];
}

export const NotesOverview = ({ notes }: Props) => {
  return (
    <>
      <Grid container spacing={2} direction="row" sx={{ margin: 1 }}>
        {notes &&
          notes.map((note) => (
            <Grid item key={note.name} xs={8} md={4}>
              <NoteCard key={note.name} note={note} />
            </Grid>
          ))}
      </Grid>
      <EditContent>
        <EditNote note={notes[0]} />
      </EditContent>
    </>
  );
};

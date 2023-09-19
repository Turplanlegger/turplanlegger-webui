import { Card, CardActions, CardContent } from '@mui/material';
import { Note } from 'models/Types';
import { NoteButtons, NoteContent } from './NoteContent';

interface Props {
  note: Note;
}

export const NoteCard = ({ note }: Props) => {
  return (
    <Card>
      <CardContent>
        <NoteContent note={note}></NoteContent>
      </CardContent>
      <CardActions>
        <NoteButtons note={note}></NoteButtons>
      </CardActions>
    </Card>
  );
};

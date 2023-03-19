import { Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { Note } from '../../models/Types';
import { apiState } from '../../state/apiState';
import { noteState } from '../../state/noteState';

interface Props {
  note: Note;
}

export const NoteInfo = ({ note }: Props) => {
  const { t } = useTranslation();
  const api = useRecoilValue(apiState);
  const [notes, setNotes] = useRecoilState(noteState);

  const deleteNote = async () => {
    const res = await api?.delete(`/note/${note.id}`);
    if (res.status === 'ok') {
      setNotes(notes.filter((n) => n.id !== note.id));
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {note.name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2, whiteSpace: 'pre-line' }}>
          {note.content}
        </Typography>
        <>
          <Chip
            color={note.private ? 'success' : 'warning'}
            size="small"
            label={note.private ? t('common.private') : t('common.public')}
          />
        </>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => console.log('Edit')}>
          {t('common.edit')}
        </Button>
        <Button size="small" onClick={() => deleteNote()}>
          {t('common.delete')}
        </Button>
      </CardActions>
    </Card>
  );
};

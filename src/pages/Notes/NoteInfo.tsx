import { Button, Card, CardActions, CardContent, Chip, Typography } from '@mui/material';
import { useTranslationWrapper } from 'services/Translation';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Note } from '../../models/Types';
import { apiState } from '../../state/apiState';
import { noteState } from '../../state/noteState';
import { editModalOpen } from 'components/CustomModal/modalState';

interface Props {
  note: Note;
}

export const NoteInfo = ({ note }: Props) => {
  const t = useTranslationWrapper();
  const api = useRecoilValue(apiState);
  const [notes, setNotes] = useRecoilState(noteState);
  const setOpenEdit = useSetRecoilState(editModalOpen);

  const deleteNote = async () => {
    const res = await api?.delete(`/notes/${note.id}`);
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
        <Button
          size="small"
          onClick={() => {
            setOpenEdit(true);
            console.debug('Open me');
          }}>
          {t('common.edit')}
        </Button>
        <Button size="small" onClick={() => deleteNote()}>
          {t('common.delete')}
        </Button>
      </CardActions>
    </Card>
  );
};

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
  const [trips, setTrips] = useRecoilState(noteState);

  const deleteTrip = async () => {
    const res = await api?.delete(`/note/${note.id}`);
    if (res.status === 'ok') {
      setTrips(trips.filter((t) => t.id !== note.id));
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {note.name}
        </Typography>
        <Typography variant="body2" sx={{ mb: 2 }}>
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
        <Button size="small" onClick={() => deleteTrip()}>
          {t('common.delete')}
        </Button>
      </CardActions>
    </Card>
  );
};

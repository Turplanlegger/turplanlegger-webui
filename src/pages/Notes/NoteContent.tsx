import { Button, Chip, Typography } from '@mui/material';
import { useTranslationWrapper } from 'services/Translation';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Note } from '../../models/Types';
import { apiState } from '../../state/apiState';
import { noteState } from '../../state/noteState';
import { modalSelector, openModalState } from 'state/modalState';

interface Props {
  note: Note;
}

export const NoteContent = ({ note }: Props) => {
  const t = useTranslationWrapper();

  return (
    <>
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
    </>
  );
};

export const NoteButtons = ({ note }: Props) => {
  const t = useTranslationWrapper();
  const api = useRecoilValue(apiState);
  const [notes, setNotes] = useRecoilState(noteState);
  const setOpenEdit = useSetRecoilState(openModalState);

  const deleteNote = async () => {
    await api?.delete(`/notes/${note.id}`);
    setNotes(notes.filter((n) => n.id !== note.id));
  };

  return (
    <>
      <Button
        size="small"
        onClick={() => {
          setOpenEdit(modalSelector.EDIT);
        }}
      >
        {t('common.edit')}
      </Button>
      <Button size="small" onClick={() => deleteNote()}>
        {t('common.delete')}
      </Button>
    </>
  );
};

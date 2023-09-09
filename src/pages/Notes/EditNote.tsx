import { Button, Stack, Switch, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTranslationWrapper } from 'services/Translation';
import { Note } from '../../models/Types';
import { editModalOpen } from 'components/CustomModal/modalState';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { apiState } from 'state/apiState';
import { noteState } from 'state/noteState';

interface Props {
  note: Note;
}

export const EditNote = ({ note }: Props) => {
  const t = useTranslationWrapper();
  const api = useRecoilValue(apiState);
  const setOpen = useSetRecoilState(editModalOpen);
  const [name, setName] = useState<string>(note.name);
  const [content, setContent] = useState<string>(note.content);
  const [privacy, setPrivacyNote] = useState(note.private);
  const [notes, setNotes] = useRecoilState(noteState);

  const updateNote = async () => {
    if (name === note.name && content === note.content && note.private == privacy) {
      console.warn('No fields updated');
      return false;
    }

    const updatedNote = {
      name: name,
      content: content,
      private: privacy
    } as Note;

    console.log(notes, setNotes);

    const result = await api
      ?.put(`/note/${note.id}`, updatedNote) // This does not yet exist in the API
      .then((response) => {
        console.debug('Ok?');
        console.debug(response.status, response.ok);
      })
      .catch((response) => {
        console.error('Not ok!');
        console.debug(response.status, response.ok);
      });
    console.debug(result);
  };

  return (
    <Grid container direction="column" spacing={2}>
      <Grid>
        <TextField
          id="outlined-basic"
          label={t('common.name')}
          variant="outlined"
          value={name}
          onChange={(e) => setName(e?.target.value)}
        />
      </Grid>
      <Grid>
        <TextField
          multiline
          fullWidth
          rows={5}
          id="outlined-basic"
          label={t('common.content')}
          variant="outlined"
          value={content}
          onChange={(e) => setContent(e?.target.value)}
        />
      </Grid>
      <Grid>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>{t('common.private')}</Typography>
          <Switch value={privacy} onChange={() => setPrivacyNote(!privacy)} />
          <Typography>{t('common.public')}</Typography>
        </Stack>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid>
          <Button variant="outlined" color="warning" onClick={() => setOpen(false)}>
            {t('common.cancel')}
          </Button>
        </Grid>
        <Grid>
          <Button variant="contained" color="success" onClick={() => updateNote()}>
            {t('common.save')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

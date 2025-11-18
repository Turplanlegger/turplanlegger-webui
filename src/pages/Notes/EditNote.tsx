import { Button, Stack, Switch, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTranslationWrapper } from 'services/Translation';
import { Note } from '../../models/Types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useState } from 'react';
import { apiState } from 'state/apiState';
import { noteState } from 'state/noteState';
import { modalSelector, openModalState } from 'state/modalState';
import { parseError } from 'services/parseError';

interface Props {
  note: Note;
}

export const EditNote = ({ note }: Props) => {
  const t = useTranslationWrapper();
  const api = useRecoilValue(apiState);
  const setOpen = useSetRecoilState(openModalState);
  const [name, setName] = useState<string>(note.name);
  const [content, setContent] = useState<string>(note.content);
  const [privacy, setPrivacyNote] = useState(note.private);
  const setNotes = useSetRecoilState(noteState);

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

    await api
      ?.put(`/notes/${note.id}`, updatedNote)
      .then((response) => {
        setNotes((old) => [...old.filter((n) => n.id !== note.id), response.note]);
      })
      .catch((response) => {
        const apiProblem = parseError(response);
        console.error('Not ok!');
        console.debug(apiProblem.title, apiProblem.detail, apiProblem.status);
      });
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
          <Button variant="outlined" color="warning" onClick={() => setOpen(modalSelector.NONE)}>
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

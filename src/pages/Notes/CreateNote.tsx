import { Box, Button, Grid, Stack, Switch, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslationWrapper } from 'services/Translation';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { modalOpen } from '../../components/CustomModal/modalState';
import { Note } from '../../models/Types';
import { apiState } from '../../state/apiState';
import { noteState } from '../../state/noteState';

export const CreateNote = () => {
  const t = useTranslationWrapper();
  const [name, setName] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [publicNote, setPublicNote] = useState(false);
  const api = useRecoilValue(apiState);
  const setOpen = useSetRecoilState(modalOpen);
  const [notes, setNotes] = useRecoilState(noteState);

  const createNote = async () => {
    const note = {
      name: name,
      content: content,
      private: !publicNote
    } as Note;

    const result = await api?.post('/notes', note);
    setOpen(false);
    setNotes([...notes, result]);
  };

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-around'}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h3" style={{ marginTop: 20 }}>
            {t('note.new_note')}
          </Typography>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label={t('common.name')}
            variant="outlined"
            value={name}
            onChange={(e) => setName(e?.target.value)}
          />
        </Grid>
        <Grid item>
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
        <Grid item>
          <Stack direction="row" spacing={1} alignItems="center">
            <Typography>{t('common.private')}</Typography>
            <Switch value={publicNote} onChange={() => setPublicNote(!publicNote)} />
            <Typography>{t('common.public')}</Typography>
          </Stack>
        </Grid>
      </Grid>
      <Box display={'flex'}>
        <Button fullWidth={true} onClick={() => setOpen(false)}>
          {t('common.cancel')}
        </Button>
        <Button fullWidth={true} onClick={createNote}>
          {t('common.create')}
        </Button>
      </Box>
    </Box>
  );
};

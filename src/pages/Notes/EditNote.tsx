import { Button, Stack, Switch, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTranslationWrapper } from 'services/Translation';
import { Note } from '../../models/Types';

interface Props {
  note: Note;
}

export const EditNote = ({ note }: Props) => {
  const t = useTranslationWrapper();

  return (
    <Grid container direction="column" spacing={2}>
      <Grid>
        <TextField
          id="outlined-basic"
          label={t('common.name')}
          variant="outlined"
          value={note.name}
          onChange={(e) => console.debug(e?.target.value)}
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
          value={note.content}
          onChange={(e) => console.debug(e?.target.value)}
        />
      </Grid>
      <Grid>
        <Stack direction="row" spacing={1} alignItems="center">
          <Typography>{t('common.private')}</Typography>
          <Switch value={note.private} onChange={() => console.debug(!note.private)} />
          <Typography>{t('common.public')}</Typography>
        </Stack>
      </Grid>
      <Grid container justifyContent="flex-end">
        <Grid>
          <Button variant="outlined" color="warning" onClick={() => console.debug(false)}>
            {t('common.cancel')}
          </Button>
        </Grid>
        <Grid>
          <Button variant="contained" color="success" onClick={() => console.debug('yolo')}>
            {t('common.save')}
          </Button>
        </Grid>
      </Grid>
    </Grid>
  );
};

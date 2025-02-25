import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslationWrapper } from 'services/Translation';
import { useSetRecoilState } from 'recoil';
import { modalSelector, openModalState } from 'state/modalState';
import { TurplanleggerMap } from './TurplanleggerMap';

export const CreateRoute = () => {
  const t = useTranslationWrapper();
  const [name, setName] = useState<string>('');
  const [distance, setDistance] = useState<number>(0);
  const setOpen = useSetRecoilState(openModalState);

  const createNote = async () => {
    console.log("Create")
    setOpen(modalSelector.NONE);
  };

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-around'}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography variant="h3" style={{ marginTop: 20 }}>
            {t('route.new_route')}
          </Typography>
        </Grid>
        <Grid item>
          <div style={{display: "flex", alignItems: "center", justifyContent: "space-between"}}>
            <TextField
              id="outlined-basic"
              label={t('common.name')}
              variant="outlined"
              value={name}
              onChange={(e) => setName(e?.target.value)}
            />
            <Typography variant="h4">
              {t('route.total_distance') + " " + distance.toFixed(2) + " km"}
            </Typography>
          </div>
        </Grid>
        <Grid item>
          <TurplanleggerMap setDistance={setDistance} />
        </Grid>
      </Grid>
      <Box display={'flex'}>
        <Button fullWidth={true} onClick={() => setOpen(modalSelector.NONE)}>
          {t('common.cancel')}
        </Button>
        <Button fullWidth={true} onClick={createNote}>
          {t('common.create')}
        </Button>
      </Box>
    </Box>
  );
};

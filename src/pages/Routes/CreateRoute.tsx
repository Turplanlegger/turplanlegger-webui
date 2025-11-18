import { Box, Button, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { useTranslationWrapper } from 'services/Translation';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { modalSelector, openModalState } from 'state/modalState';
import { TurplanleggerMap } from './Map/TurplanleggerMap';
import { Route } from 'models/Types';
import { apiState } from 'state/apiState';
import { routeState } from 'state/routeState';

export const CreateRoute = () => {
  const t = useTranslationWrapper();
  const [name, setName] = useState<string>('');
  const [route, setRoute] = useState<GeoJSON.Geometry | undefined>(undefined);
  const [distance, setDistance] = useState<number>(0);
  const setOpen = useSetRecoilState(openModalState);
  const setRoutes = useSetRecoilState(routeState);
  const api = useRecoilValue(apiState);

  const createRoute = async () => {
    console.log('create route: ', route);
    if (route === undefined) return;
    const newRoute = {
      name: name,
      route: route,
      comment: 'Why u need comment pls'
    } as Route;

    const createdRoute = await api?.post('/routes', newRoute);
    setRoutes((old) => [...old, createdRoute]);
    setOpen(modalSelector.NONE);
  };

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-around'}>
      <Grid container direction="column" spacing={2}>
        <Grid>
          <Typography variant="h3" style={{ marginTop: 20 }}>
            {t('route.new_route')}
          </Typography>
        </Grid>
        <Grid>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <TextField
              id="outlined-basic"
              label={t('common.name')}
              variant="outlined"
              value={name}
              onChange={(e) => setName(e?.target.value)}
            />
            <Typography variant="h4">
              {t('route.total_distance') + ' ' + distance.toFixed(2) + ' km'}
            </Typography>
          </div>
        </Grid>
        <Grid>
          <TurplanleggerMap setDistance={setDistance} setRoute={setRoute} />
        </Grid>
      </Grid>
      <Box display={'flex'}>
        <Button fullWidth={true} onClick={() => setOpen(modalSelector.NONE)}>
          {t('common.cancel')}
        </Button>
        <Button fullWidth={true} onClick={createRoute}>
          {t('common.create')}
        </Button>
      </Box>
    </Box>
  );
};

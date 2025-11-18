import { Card, CardContent, CardActions, Button } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { t } from 'i18next';
import { Route } from 'models/Types';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { apiState } from 'state/apiState';
import { routeState } from 'state/routeState';
import { DisplayMap } from './Map/DisplayMap';

interface Props {
  routes: Route[];
}

export const RoutesOverview = ({ routes }: Props) => {
  const api = useRecoilValue(apiState);
  const setRoutes = useSetRecoilState(routeState);

  const deleteRoute = async (routeId: number) => {
    const res = await api?.delete(`/routes/${routeId}`);
    if (res.status === 'ok') {
      setRoutes(routes.filter((n) => n.id !== routeId));
    }
  };

  return (
    <div>
      <p>Routes: {routes.length}</p>
      {routes.map((route) => (
        <Grid key={route.id} container spacing={2} direction="row" sx={{ margin: 1 }}>
          <Card>
            <CardContent>
              <div key={route.id}>
                <h2>{route.name}</h2>
                <div style={{ width: 400, height: 300 }}>
                  <DisplayMap route={route} />
                </div>
              </div>
            </CardContent>
            <CardActions>
              <>
                <Button size="small" onClick={() => deleteRoute(route.id)}>
                  {t('common.delete')}
                </Button>
              </>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </div>
  );
};

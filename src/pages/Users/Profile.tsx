import {
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Switch,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { isErrorResponse } from 'models/ErrorResponse';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslationWrapper } from 'services/Translation';
import { apiState } from 'state/apiState';
import { errorState } from 'state/errorState';
import { whoamiState } from 'state/userState';

export const Profile = () => {
  const t = useTranslationWrapper();
  const api = useRecoilValue(apiState);
  const setErrorState = useSetRecoilState(errorState);
  const [user, setUser] = useRecoilState(whoamiState);

  const userAvatar = () => {
    const style = {
      margin: 'auto',
      width: 128,
      height: 128
    };
    if (user.private) {
      return <Avatar alt="Private user" src="/static/private.png" sx={style} />;
    } else {
      return <Avatar alt="Public user" src="/static/public.png" sx={style} />;
    }
  };
  const togglePrivate = async () => {
    const result = await api?.patch(`/users/${user.id}/private`);
    if (isErrorResponse(result)) {
      setErrorState(result);
      return;
    }
    setUser({
      ...user,
      private: !user.private
    });
  };
  return Object.keys(user).length === 0 ? (
    <Box marginTop={5} marginLeft={5}>
      <Typography variant="h2">{t('profile.profile')}</Typography>
      <Typography variant="h3"> U did boo-boo </Typography>
    </Box>
  ) : (
    <Grid container sx={{ margin: 1 }}>
      <Grid md={4}>
        <Card>
          <CardContent>
            {userAvatar()}
            <Typography variant="h2" sx={{ textAlign: 'center' }}>
              {user.name} {user.last_name}
            </Typography>
            <Typography variant="subtitle1" gutterBottom sx={{ textAlign: 'center' }}>
              <i>
                {t('common.member_since')} on the {user.create_time.toString()}
              </i>
            </Typography>
          </CardContent>
          <CardActions>
            <Grid xs={4}>
              <FormControlLabel
                control={<Switch defaultChecked={user.private} onChange={togglePrivate} />}
                label={t('common.private')}
              />
            </Grid>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

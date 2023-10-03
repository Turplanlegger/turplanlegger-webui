import { Avatar, Box, FormControlLabel, Switch, Typography } from '@mui/material';
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
    if (user.private) {
      return (
        <Avatar alt="Private user" src="/static/private.png" sx={{ width: 128, height: 128 }} />
      );
    } else {
      return <Avatar alt="Public user" src="/static/public.png" sx={{ width: 128, height: 128 }} />;
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
    <Box>
      <Box marginTop={5} marginLeft={5}>
        <Typography variant="h2">{t('profile.profile')}</Typography>
        <Typography variant="h5">
          {t('common.name')}: {user.name} {user.last_name}
        </Typography>
        <Typography variant="h5">
          {t('common.joined')}: {user.create_time.toString()}
        </Typography>
      </Box>
      {userAvatar()}
      <Grid container columns={1} sx={{ margin: 1 }}>
        <Grid xs={4}>
          <FormControlLabel
            control={<Switch defaultChecked={user.private} onChange={togglePrivate} />}
            label={t('common.private')}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

import { Button, FormControlLabel, FormGroup, Link, Switch } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useTranslationWrapper } from 'services/Translation';
import { whoamiState } from 'state/userState';
import { apiState } from '../../state/apiState';
import { isErrorResponse } from 'models/ErrorResponse';
import { errorState } from 'state/errorState';

export const EditProfile = () => {
  const t = useTranslationWrapper();
  const api = useRecoilValue(apiState);
  const setErrorState = useSetRecoilState(errorState);
  const [user, setUser] = useRecoilState(whoamiState);

  const updateUser = async () => {
    await console.debug('Updated user');
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

  return (
    <Grid container columns={1} sx={{ margin: 1 }}>
      <Grid xs={4}>
        <FormGroup>
          <FormControlLabel
            control={<Switch defaultChecked={user.private} onChange={togglePrivate} />}
            label={t('common.private')}
          />
        </FormGroup>
      </Grid>
      <Grid xs={4}>
        <Button component={Link} href="/profile" variant="outlined" color="warning">
          {t('common.cancel')}
        </Button>
        <Button color="success" variant="contained" onClick={updateUser}>
          {t('common.save')}
        </Button>
      </Grid>
    </Grid>
  );
};

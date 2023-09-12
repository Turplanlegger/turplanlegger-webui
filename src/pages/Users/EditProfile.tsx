import { Box, Button, Link } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useTranslationWrapper } from 'services/Translation';
import { whoamiState } from 'state/userState';

export const EditProfile = () => {
  const t = useTranslationWrapper();
  const user = useRecoilValue(whoamiState);
  console.debug(user.name);
  const updateUser = async () => {
    await console.debug('Updated user');
  };
  return (
    <Box display={'flex'}>
      <Button component={Link} href="/profile" variant="outlined" color="warning">
        {t('common.cancel')}
      </Button>
      <Button color="success" variant="contained" onClick={updateUser}>
        {t('common.save')}
      </Button>
    </Box>
  );
  // return <>{user.name}</>;
};

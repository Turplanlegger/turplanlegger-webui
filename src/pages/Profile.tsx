import { Box, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useTranslationWrapper } from 'services/Translation';
import { whoamiState } from 'state/userState';

export const Profile = () => {
  const user = useRecoilValue(whoamiState);
  const t = useTranslationWrapper();

  return Object.keys(user).length === 0 ? (
    <Box>
      <Typography variant="h2">{t('profile.profile')}</Typography>
      <Typography variant="h3"> U did boo-boo </Typography>
    </Box>
  ) : (
    <Box marginTop={5} marginLeft={5}>
      <Typography variant="h2">{t('profile.profile')}</Typography>
      <Typography variant="h5">
        Name: {user.name} {user.last_name}
      </Typography>
    </Box>
  );
};

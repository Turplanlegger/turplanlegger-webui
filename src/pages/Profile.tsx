import { Avatar, Box, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { useTranslationWrapper } from 'services/Translation';
import { whoamiState } from 'state/userState';

export const Profile = () => {
  const user = useRecoilValue(whoamiState);
  const t = useTranslationWrapper();
  const userAvatar = () => {
    if (user.private) {
      return (
        <Avatar alt="Private user" src="/static/private.png" sx={{ width: 128, height: 128 }} />
      );
    } else {
      return <Avatar alt="Public user" src="/static/public.png" sx={{ width: 128, height: 128 }} />;
    }
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
          Name: {user.name} {user.last_name}
        </Typography>
      </Box>
      {userAvatar()}
    </Box>
  );
};

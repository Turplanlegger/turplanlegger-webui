import { Box, Typography } from '@mui/material';
import { useRecoilValue } from 'recoil';
import { whoamiState } from 'state/userState';

export const Profile = () => {
  const user = useRecoilValue(whoamiState);

  return Object.keys(user).length === 0 ? (
    <Box>
      <Typography variant="h2">Profile</Typography>
      <Typography variant="h3"> U did boo-boo </Typography>
    </Box>
  ) : (
    <Box>
      <Typography variant="h2">Profile</Typography>
      <Typography variant="h3"> {user.name} </Typography>
    </Box>
  );
};

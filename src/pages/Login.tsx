import { Configuration } from '@azure/msal-browser';
import { Box, Button, Typography } from '@mui/material';
import { signupMsalConfig, signinMsalConfig } from '..//authConfig';

type Props = {
  setInstanceAndLogin: (confing: Configuration) => void;
};

export const Login = ({ setInstanceAndLogin }: Props) => {
  const handleSignup = () => {
    setInstanceAndLogin(signupMsalConfig);
  };

  const handleSignin = () => {
    setInstanceAndLogin(signinMsalConfig);
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center">
      <Typography variant="h1" fontSize={40} m={2}>
        Turplanleggeren
      </Typography>
      <Typography variant="h2" fontSize={20} mb={5}>
        Neste eventyr venter
      </Typography>
      <Button onClick={handleSignin}>Logg inn</Button>
      <Typography variant="h2" fontSize={20}>
        eller
      </Typography>
      <Button onClick={handleSignup}>Lag bruker</Button>
    </Box>
  );
};

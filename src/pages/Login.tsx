import { Configuration } from '@azure/msal-browser';
import { Button, Typography } from '@mui/material';
import { signupMsalConfig, signinMsalConfig } from '..//authConfig';

type Props = {
  setInstanceAndLogin: (config: Configuration) => void;
};

export const Login = ({ setInstanceAndLogin }: Props) => {
  const handleSignup = () => {
    setInstanceAndLogin(signupMsalConfig);
  };

  const handleSignin = () => {
    setInstanceAndLogin(signinMsalConfig);
  };

  return (
    <>
      <Typography variant="h1" fontSize={50}>
        Turplanleggeren
      </Typography>
      <Typography variant="h2" fontSize={20}>
        Neste eventyr venter
      </Typography>
      <p></p>
      <p></p>
      <Button onClick={handleSignin}>Logg inn</Button>
      <Typography variant="h2" fontSize={20}>
        eller
      </Typography>
      <Button onClick={handleSignup}>Lag bruker</Button>
    </>
  );
};

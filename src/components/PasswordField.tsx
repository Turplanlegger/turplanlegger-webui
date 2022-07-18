import { Visibility, VisibilityOff } from '@mui/icons-material';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  placeHolder: string;
  value: string;
  autoComplete: string;
  setValue: Dispatch<SetStateAction<string>>;
};

export const PasswordField = (props: Props) => {
  const { placeHolder, value, setValue, autoComplete } = props;
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  const handleChange = (e: { target: { value: SetStateAction<string> } }) => {
    setValue(e.target.value);
  };

  return (
    <TextField
      placeholder={placeHolder}
      type={showPassword ? 'text' : 'password'}
      style={{ width: '60vw' }}
      onChange={handleChange}
      autoComplete={autoComplete}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}>
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

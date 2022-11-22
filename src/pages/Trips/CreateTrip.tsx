import { Box, Button, TextField, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

export const CreateTrip = () => {
  const { t } = useTranslation();
  return (
    <Box height={'100%'} margin={5}>
      <Typography style={{ marginTop: 20 }}>{t('trip.new_trip')}</Typography>
      <Box
        style={{
          display: 'flex',
          height: '100%',
          flexDirection: 'column',
          justifyContent: 'flex-end'
        }}>
        <TextField id="outlined-basic" label="Trip name" variant="outlined" />
        <Box display={'flex'} marginBottom={10} marginTop={10}>
          <Button fullWidth={true}>Cancel</Button>
          <Button fullWidth={true}>Create</Button>
        </Box>
      </Box>
    </Box>
  );
};

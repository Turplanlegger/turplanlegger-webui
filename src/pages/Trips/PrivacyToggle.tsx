import { Typography, Box, FormControlLabel, Switch } from '@mui/material';
import { t } from 'i18next';
import { Trip } from 'models/Types';

interface Props {
  trip: Trip;
  setTrip: (value: Trip) => void;
}

export const PrivacyToggle = ({ trip, setTrip }: Props) => {
  return (
    <>
      <Typography variant="h5" component="h2" sx={{ mt: 2 }}>
        {t('common.privacy')}
      </Typography>
      <Box display="flex" alignItems={'center'}>
        <FormControlLabel
          control={
            <Switch
              defaultChecked
              onChange={() =>
                setTrip({
                  ...trip,
                  private: !trip.private
                })
              }
            />
          }
          label={trip.private ? t('common.private') : t('common.public')}
        />
      </Box>
    </>
  );
};

import {
  useTheme,
  useMediaQuery,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from '@mui/material';
import { useTranslationWrapper } from 'services/Translation';
import { useRecoilState } from 'recoil';
import { errorState } from '../state/errorState';

export const DisplayErrors = () => {
  const [error, setError] = useRecoilState(errorState);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const t = useTranslationWrapper();

  return (
    <Dialog
      fullScreen={fullScreen}
      open={error !== undefined}
      onClose={() => setError(undefined)}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">{t('error.title')}</DialogTitle>
      <DialogContent>
        <DialogContentText variant="h6">{`${error?.title}`}</DialogContentText>
        <DialogContentText variant="subtitle2">{`${error?.detail}`}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setError(undefined)} autoFocus>
          Lukk
        </Button>
      </DialogActions>
    </Dialog>
  );
};

import { Box, Button, FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { modalOpen } from '../../components/CustomModal/modalState';
import { ItemList } from '../../models/Types';
import { apiState } from '../../state/apiState';
import { itemListState } from '../../state/listState';

export const CreateList = () => {
  const { t } = useTranslation();

  const [publicList, setPublicList] = useState(false);
  const [listName, setListName] = useState('');
  const api = useRecoilValue(apiState);
  const setOpen = useSetRecoilState(modalOpen);
  const [lists, setLists] = useRecoilState(itemListState);

  const createList = async () => {
    const item_list = {
      name: listName,
      private: !publicList
    } as ItemList;

    const result = await api?.post('/item_list', item_list);
    setOpen(false);
    setLists([...lists, result]);
  };

  return (
    <Box height={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'space-around'}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography style={{ marginTop: 20 }}>{t('list.new_list')}</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label={t('trip.trip_name')}
            variant="outlined"
            value={listName}
            onChange={(e) => setListName(e?.target.value)}
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Switch defaultChecked onChange={() => setPublicList(!publicList)} />}
            label={publicList ? t('common.public') : t('common.private')}
          />
        </Grid>
      </Grid>
      <Box display={'flex'}>
        <Button fullWidth={true} onClick={() => setOpen(false)}>
          {t('common.cancel')}
        </Button>
        <Button fullWidth={true} onClick={createList}>
          {t('common.create')}
        </Button>
      </Box>
    </Box>
  );
};

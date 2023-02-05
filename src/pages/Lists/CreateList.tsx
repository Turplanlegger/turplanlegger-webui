import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { modalOpen } from '../../components/CustomModal/modalState';
import { ItemList } from '../../models/Types';
import { apiState } from '../../state/apiState';
import { itemListState } from '../../state/listState';

export const CreateList = () => {
  const { t } = useTranslation();

  const initialValue = [{ id: 0, content: '' }];

  const [publicList, setPublicList] = useState(false);
  const [listName, setListName] = useState('');
  const api = useRecoilValue(apiState);
  const setOpen = useSetRecoilState(modalOpen);
  const [lists, setLists] = useRecoilState(itemListState);
  const [listItems, setlistItems] = useState(initialValue);

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
    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-around'} sx={{ mt: 2 }}>
      <Grid container direction="column" spacing={2}>
        <Grid item>
          <Typography component="h3">{t('list.new_list')}</Typography>
        </Grid>
        <Grid item>
          <TextField
            id="outlined-basic"
            label={t('list.list_name')}
            variant="outlined"
            value={listName}
            onChange={(e) => setListName(e?.target.value)}
          />
        </Grid>
        <Grid item id="items">
          <Typography sx={{ mt: 2 }}>{t('list.items')}</Typography>
          {listItems.map((item) => (
            <Grid item key={item.id} sx={{ mb: 1 }}>
              <InputLabel htmlFor={'item-list-item' + item.id}>Remove</InputLabel>
              <TextField
                fullWidth
                label={t('list.item') + ' ' + (item.id + 1)}
                id={'item-list-item' + item.id}
                variant="standard"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="Remove item"
                        onClick={() => setlistItems(listItems.filter((i) => i.id !== item.id))}
                        disabled={listItems.length <= 1 ? true : false}>
                        <RemoveIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Grid>
          ))}
          <IconButton
            aria-label="add"
            color="primary"
            sx={{ mt: 0.5 }}
            onClick={() => setlistItems([...listItems, { id: listItems.length, content: '' }])}>
            <AddIcon />
          </IconButton>
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

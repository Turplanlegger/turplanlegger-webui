import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { modalOpen } from '../../components/CustomModal/modalState';
import { ItemList, ListItem } from '../../models/Types';
import { apiState } from '../../state/apiState';
import { itemListState, listItemState, emptyListItem } from '../../state/listState';

const ListItemField = ({
  item,
  index,
  list_len
}: {
  item: ListItem;
  index: number;
  list_len: number;
}) => {
  const { t } = useTranslation();
  let timerId: NodeJS.Timeout;

  const [listItems, setlistItems] = useRecoilState(listItemState);

  const updateListItem = (id: number, value: number | string) => {
    clearTimeout(timerId);
    timerId = setTimeout(function () {
      console.debug(`Value: ${value}`);
      console.debug(`id: ${id}`);
      item['content'] = value;
    }, 1500);
  };

  return (
    <TextField
      fullWidth
      label={t('list.item') + ' ' + (index + 1)}
      id={'item-list-item' + index}
      variant="standard"
      onChange={(e) => updateListItem(index, e?.target?.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Remove item"
              onClick={() => {
                setlistItems(listItems.filter((_, j) => j !== index));
                console.debug(`Remove item: ${index}`);
              }}
              disabled={list_len <= 1 ? true : false}>
              <DeleteForeverIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export const CreateList = () => {
  const { t } = useTranslation();

  const [publicList, setPublicList] = useState(false);
  const [listName, setListName] = useState('');
  const api = useRecoilValue(apiState);
  const setOpen = useSetRecoilState(modalOpen);
  const [lists, setLists] = useRecoilState(itemListState);
  const [listItems, setlistItems] = useRecoilState(listItemState);

  const createList = async () => {
    const item_list = {
      name: listName,
      private: !publicList,
      items: listItems
    } as ItemList;

    console.debug(item_list);
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
          {listItems.map((item, index) => (
            <Grid item key={index} sx={{ mb: 1 }}>
              <ListItemField item={item} index={index} list_len={listItems.length} />
            </Grid>
          ))}
          <IconButton
            aria-label="add"
            color="primary"
            sx={{ mt: 0.5 }}
            onClick={() => setlistItems([...listItems, emptyListItem])}>
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

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
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { modalOpen } from '../../components/CustomModal/modalState';
import { emptyListItem, itemListState, newItemListAtom } from '../../state/listState';
import { apiState } from '../../state/apiState';

const ListItemField = ({ index }: { index: number }) => {
  const { t } = useTranslation();

  const [listItem, setListItem] = useRecoilState(newItemListAtom);

  const updateListItem = (id: number, value: string) => {
    setListItem({
      ...listItem,
      items: [
        ...listItem.items.slice(0, index),
        {
          id: 0,
          item_list: 0,
          content: value,
          checked: false
        },
        ...listItem.items.slice(index + 1)
      ]
    });
  };

  return (
    <TextField
      fullWidth
      label={t('list.item') + ' ' + (index + 1)}
      id={'item-list-item' + index}
      value={listItem.items[index].content}
      variant="standard"
      onChange={(e) => updateListItem(index, e?.target?.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Remove item"
              onClick={() =>
                setListItem({
                  ...listItem,
                  items: [...listItem.items.slice(0, index), ...listItem.items.slice(index + 1)]
                })
              }
              disabled={listItem.items.length <= 1 ? true : false}>
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
  const setOpen = useSetRecoilState(modalOpen);

  const api = useRecoilValue(apiState);
  const [lists, setLists] = useRecoilState(itemListState);
  const [[listItem, setListItem], resetListItem] = [
    useRecoilState(newItemListAtom),
    useResetRecoilState(newItemListAtom)
  ];

  const createList = async () => {
    console.debug(listItem);
    const result = await api?.post('/item_list', listItem);
    setOpen(false);
    setLists([...lists, result.item_list]);
    resetListItem();
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
            value={listItem.name}
            variant="outlined"
            onChange={(e) =>
              setListItem({
                ...listItem,
                name: e?.target.value
              })
            }
          />
        </Grid>
        <Grid item id="items">
          <Typography sx={{ mt: 2 }}>{t('list.items')}</Typography>
          {listItem.items.map((item, index) => (
            <Grid item key={index} sx={{ mb: 1 }}>
              <ListItemField index={index} />
            </Grid>
          ))}
          <IconButton
            aria-label="add"
            color="primary"
            sx={{ mt: 0.5 }}
            onClick={() =>
              setListItem({
                ...listItem,
                items: [...listItem.items, emptyListItem]
              })
            }>
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                defaultChecked
                onChange={() =>
                  setListItem({
                    ...listItem,
                    private: !listItem.private
                  })
                }
              />
            }
            label={listItem.private ? t('common.private') : t('common.public')}
          />
        </Grid>
      </Grid>
      <Box display={'flex'}>
        <Button fullWidth={true} onClick={() => setOpen(false)}>
          {t('common.cancel')}
        </Button>
        <Button fullWidth={true} onClick={() => resetListItem()}>
          {t('common.reset')}
        </Button>
        <Button fullWidth={true} onClick={createList}>
          {t('common.create')}
        </Button>
      </Box>
    </Box>
  );
};

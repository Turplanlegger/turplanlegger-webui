import {
  Box,
  Button,
  FormControlLabel,
  IconButton,
  InputAdornment,
  Switch,
  TextField,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Grid2';
import AddIcon from '@mui/icons-material/Add';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useTranslationWrapper } from 'services/Translation';
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { emptyListItem, itemListState, newItemListAtom } from '../../state/listState';
import { apiState } from '../../state/apiState';
import { modalSelector, openModalState } from 'state/modalState';

const ListItemField = ({ index }: { index: number }) => {
  const t = useTranslationWrapper();

  const [listItem, setListItem] = useRecoilState(newItemListAtom);

  const updateListItem = (value: string) => {
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
      onChange={(e) => updateListItem(e?.target?.value)}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="Remove item"
              onClick={() =>
                setListItem({
                  ...listItem,
                  items: [...listItem.items.filter((_, i) => i !== index)]
                })
              }
              disabled={listItem.items.length <= 1 ? true : false}
            >
              <DeleteForeverIcon />
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  );
};

export const CreateList = () => {
  const t = useTranslationWrapper();
  const setOpen = useSetRecoilState(openModalState);

  const api = useRecoilValue(apiState);
  const [lists, setLists] = useRecoilState(itemListState);
  const [[listItem, setListItem], resetListItem] = [
    useRecoilState(newItemListAtom),
    useResetRecoilState(newItemListAtom)
  ];

  const createList = async () => {
    const result = await api?.post('/item_lists', listItem);
    setOpen(modalSelector.NONE);
    setLists([...lists, result.item_list]);
    resetListItem();
  };

  return (
    <Box display={'flex'} flexDirection={'column'} justifyContent={'space-around'} sx={{ mt: 2 }}>
      <Grid container direction="column" spacing={2}>
        <Grid>
          <Typography component="h3">{t('list.new_list')}</Typography>
        </Grid>
        <Grid>
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
        <Grid id="items">
          <Typography sx={{ mt: 2 }}>{t('list.items')}</Typography>
          {listItem.items.map((_, index) => (
            <Grid key={index} sx={{ mb: 1 }}>
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
            }
          >
            <AddIcon />
          </IconButton>
        </Grid>
        <Grid>
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
        <Button fullWidth={true} onClick={() => setOpen(modalSelector.NONE)}>
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

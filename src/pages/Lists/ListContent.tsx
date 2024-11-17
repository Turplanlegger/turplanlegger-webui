import { Button, Chip, Typography } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useTranslationWrapper } from 'services/Translation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ItemList, ListItem } from '../../models/Types';
import { apiState } from '../../state/apiState';
import { itemListState } from '../../state/listState';
import { ItemListItems } from './ItemListItems';

interface Props {
  item_list: ItemList;
}

export const ItemListContent = ({ item_list }: Props) => {
  const t = useTranslationWrapper();
  const api = useRecoilValue(apiState);
  const [item_lists, setItemLists] = useRecoilState(itemListState);

  const deleteItemList = async () => {
    const res = await api?.delete(`/item_lists/${item_list.id}`);
    if (res.status === 'ok') {
      setItemLists(item_lists.filter((il) => il.id !== item_list.id));
    }
  };

  const toggleItem = (oldItem: ListItem) => {
    const item = { ...oldItem, checked: !oldItem.checked };

    const checkedItems = item.checked
      ? [...item_list.items_checked, item]
      : item_list.items_checked.filter((i) => i.id !== item.id);

    const uncheckedItems = item.checked
      ? item_list.items.filter((i) => i.id !== item.id)
      : [...item_list.items, item];

    const newItemList = { ...item_list, items: uncheckedItems, items_checked: checkedItems };
    setItemLists((old) => [...old.filter((l) => l.id !== item_list.id), newItemList]);
    // TODO: Save changes in backend
  };

  return (
    <Grid container justifyContent="center">
      <Grid size={{ xs: 12 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {item_list.name}
        </Typography>
      </Grid>
      <Grid size={{ xs: 12 }}>
        <Chip
          color={item_list.private ? 'success' : 'warning'}
          size="small"
          label={item_list.private ? t('common.private') : t('common.public')}
          sx={{ mb: '15px' }}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ItemListItems
          title={t('list.unchecked_items')}
          items={item_list.items}
          toggleItem={toggleItem}
        />
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <ItemListItems
          title={t('list.checked_items')}
          items={item_list.items_checked}
          toggleItem={toggleItem}
        />
      </Grid>
      <Grid size={{ xs: 12 }} display="flex" justifyContent="center" sx={{ mt: 2 }}>
        <Button size="small" onClick={() => console.log('Edit')}>
          {t('common.edit')}
        </Button>
        <Button size="small" onClick={() => deleteItemList()}>
          {t('common.delete')}
        </Button>
      </Grid>
    </Grid>
  );
};

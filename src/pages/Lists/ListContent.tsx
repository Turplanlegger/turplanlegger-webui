import {
  Button,
  Checkbox,
  Chip,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { useTranslationWrapper } from 'services/Translation';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ItemList } from '../../models/Types';
import { apiState } from '../../state/apiState';
import { itemListState } from '../../state/listState';

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

  return (
    <Grid container justifyContent="center">
      <Grid xs={12}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {item_list.name}
        </Typography>
      </Grid>
      <Grid xs={12}>
        <Chip
          color={item_list.private ? 'success' : 'warning'}
          size="small"
          label={item_list.private ? t('common.private') : t('common.public')}
          sx={{ mb: '15px' }}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <Typography variant="h6" sx={{ mb: 0 }}>
          {t('list.unchecked_items')}
          <Chip label={item_list.items.length} size="small" sx={{ ml: 1, pt: 0.25 }} />
        </Typography>
        <List>
          {item_list.items &&
            item_list.items.map((list_item) => (
              <ListItem key={list_item.id} disablePadding>
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <ListItemButton
                    role={undefined}
                    onClick={() => {
                      console.debug('check me');
                    }}
                    dense
                    sx={{ pr: 0.7, mr: 1 }}>
                    <Checkbox
                      edge="start"
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': list_item.content?.toString() }}
                    />
                  </ListItemButton>
                </ListItemIcon>
                <ListItemText primary={list_item.content} />
              </ListItem>
            ))}
        </List>
      </Grid>
      <Grid xs={12} md={6}>
        <Typography variant="h6" sx={{ mb: 2 }}>
          {t('list.checked_items')}
          <Chip label={item_list.items_checked.length} size="small" sx={{ ml: 1, pt: 0.25 }} />
        </Typography>
        <List>
          {item_list.items_checked &&
            item_list.items_checked.map((list_item) => (
              <ListItem key={list_item.id} disablePadding>
                <ListItemIcon sx={{ minWidth: '30px' }}>
                  <ListItemButton
                    role={undefined}
                    onClick={() => {
                      console.debug('uncheck me');
                    }}
                    dense
                    sx={{ pr: 0.7, mr: 1 }}>
                    <Checkbox
                      edge="start"
                      checked
                      tabIndex={-1}
                      disableRipple
                      inputProps={{ 'aria-labelledby': list_item.content?.toString() }}
                    />
                  </ListItemButton>
                </ListItemIcon>
                <ListItemText primary={list_item.content} />
              </ListItem>
            ))}
        </List>
      </Grid>
      <Grid xs={12} display="flex" justifyContent="center" sx={{ mt: 2 }}>
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

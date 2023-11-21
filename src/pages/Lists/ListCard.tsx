import { CheckBox, CheckBoxOutlineBlank } from '@mui/icons-material';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { useTranslationWrapper } from 'services/Translation';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ItemList } from '../../models/Types';
import { apiState } from '../../state/apiState';
import { itemListState } from '../../state/listState';
import { IconButton } from '@mui/material';
import { Stack } from '@mui/material';
import { modalSelector, openModalState } from 'state/modalState';

interface Props {
  item_list: ItemList;
}

export const ItemListCard = ({ item_list }: Props) => {
  const t = useTranslationWrapper();
  const api = useRecoilValue(apiState);
  const [item_lists, setItemLists] = useRecoilState(itemListState);
  const setOpenView = useSetRecoilState(openModalState);

  const deleteItemList = async () => {
    const res = await api?.delete(`/item_lists/${item_list.id}`);
    if (res.status === 'ok') {
      setItemLists(item_lists.filter((il) => il.id !== item_list.id));
    }
  };

  return (
    <Card>
      <CardContent>
        <Stack direction="row" spacing={2} justifyContent="space-between">
          <Typography variant="h5" sx={{ mb: 2 }}>
            {item_list.name}
          </Typography>
          <IconButton
            aria-label="maximize"
            sx={{ borderRadius: 0 }}
            onClick={() => {
              setOpenView(modalSelector.EDIT);
            }}>
            <LaunchIcon />
          </IconButton>
        </Stack>
        <Chip
          color={item_list.private ? 'success' : 'warning'}
          size="small"
          label={item_list.private ? t('common.private') : t('common.public')}
          sx={{ mb: '15px' }}
        />
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('list.unchecked_items')}
              <Chip label={item_list.items.length} size="small" sx={{ ml: 1, pt: 0.25 }} />
            </Typography>
            <List>
              {item_list.items &&
                item_list.items.map((list_item) => (
                  <ListItem key={list_item.id}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <CheckBoxOutlineBlank />
                    </ListItemIcon>
                    <ListItemText primary={list_item.content} />
                  </ListItem>
                ))}
            </List>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('list.checked_items')}
              <Chip label={item_list.items_checked.length} size="small" sx={{ ml: 1, pt: 0.25 }} />
            </Typography>
            <List>
              {item_list.items_checked &&
                item_list.items_checked.map((list_item) => (
                  <ListItem key={list_item.id}>
                    <ListItemIcon sx={{ minWidth: '30px' }}>
                      <CheckBox />
                    </ListItemIcon>
                    <ListItemText primary={list_item.content} />
                  </ListItem>
                ))}
            </List>
          </Grid>
        </Grid>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => setOpenView(modalSelector.EDIT)}>
          {t('common.edit')}
        </Button>
        <Button size="small" onClick={() => deleteItemList()}>
          {t('common.delete')}
        </Button>
      </CardActions>
    </Card>
  );
};

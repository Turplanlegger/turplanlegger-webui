import {
  Button,
  Card,
  CardActions,
  CardContent,
  Checkbox,
  Chip,
  FormControlLabel,
  FormGroup,
  Grid,
  Typography
} from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';
import { ItemList } from '../../models/Types';
import { apiState } from '../../state/apiState';
import { itemListState } from '../../state/listState';

interface Props {
  item_list: ItemList;
}

export const ItemListInfo = ({ item_list }: Props) => {
  const { t } = useTranslation();
  const api = useRecoilValue(apiState);
  const [item_lists, setItemLists] = useRecoilState(itemListState);

  const deleteItemList = async () => {
    const res = await api?.delete(`/item_list/${item_list.id}`);
    if (res.status === 'ok') {
      setItemLists(item_lists.filter((il) => il.id !== item_list.id));
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h5" sx={{ mb: 2 }}>
          {item_list.name}
        </Typography>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('list.unchecked_items')}
            </Typography>
            <FormGroup>
              {item_list.items &&
                item_list.items.map((list_item) => (
                  <FormControlLabel
                    key={list_item.id}
                    control={<Checkbox checked={false} />}
                    label={list_item.content}
                    onClick={() => console.debug('check')}
                  />
                ))}
            </FormGroup>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" sx={{ mb: 2 }}>
              {t('list.checked_items')}
            </Typography>
            <FormGroup>
              {item_list.items_checked &&
                item_list.items_checked.map((list_item) => (
                  <FormControlLabel
                    key={list_item.id}
                    control={<Checkbox checked />}
                    label={list_item.content}
                  />
                ))}
            </FormGroup>
          </Grid>
        </Grid>
        <>
          <Chip
            color={item_list.private ? 'success' : 'warning'}
            size="small"
            label={item_list.private ? t('common.private') : t('common.public')}
          />
        </>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => console.log('Edit')}>
          {t('common.edit')}
        </Button>
        <Button size="small" onClick={() => deleteItemList()}>
          {t('common.delete')}
        </Button>
      </CardActions>
    </Card>
  );
};

import { Grid } from '@mui/material';
import { ItemList } from '../../models/Types';
import { ItemListCard } from './ListCard';
import { ModalContent } from '../../components/Modal/content';
import { ItemListContent } from './ListContent';
import { modalSelector } from 'state/modalState';

interface Props {
  item_lists: ItemList[];
}

export const ListsOverview = ({ item_lists }: Props) => {
  return (
    <>
      <Grid container spacing={2} direction="row" sx={{ margin: 1 }}>
        {item_lists &&
          item_lists.map((item_list) => (
            <Grid item key={item_list.name} xs={8} md={4}>
              <ItemListCard key={item_list.name} item_list={item_list} />
            </Grid>
          ))}
      </Grid>
      <ModalContent modal={modalSelector.VIEW}>
        <ItemListContent item_list={item_lists[0]} />
      </ModalContent>
    </>
  );
};

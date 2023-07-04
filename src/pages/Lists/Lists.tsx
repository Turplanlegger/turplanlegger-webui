import { useTranslationWrapper } from 'services/Translation';
import { useRecoilValue } from 'recoil';
import { itemListState } from '../../state/listState';
import { CreateContent } from '../CreateContent';
import { CreateList } from './CreateList';
import { ListsOverview } from './ListsOverview';

export const Lists = () => {
  const item_lists = useRecoilValue(itemListState);
  const t = useTranslationWrapper();

  return item_lists.length === 0 ? (
    <CreateContent message={t('list.no_lists_found')}>
      <CreateList />
    </CreateContent>
  ) : (
    <>
      <ListsOverview item_lists={item_lists} />
      <CreateContent>
        <CreateList />
      </CreateContent>
    </>
  );
};

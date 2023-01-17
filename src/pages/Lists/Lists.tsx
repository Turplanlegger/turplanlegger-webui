import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState, useRecoilValue } from 'recoil';

import { apiState } from '../../state/apiState';
import { itemListState } from '../../state/listState';
import { CreateContent } from '../CreateContent';
import { CreateList } from './CreateList';
import { ListsOverview } from './ListsOverview';

export const Lists = () => {
  const [item_lists, setItemLists] = useRecoilState(itemListState);
  const { t } = useTranslation();
  const api = useRecoilValue(apiState);

  useEffect(() => {
    const initializeLists = async () => {
      if (api) {
        const result = await api.get('/item_list/mine');
        if (result.status === 'ok') {
          setItemLists(result.item_list);
        }
      }
    };

    initializeLists();
  }, []);

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

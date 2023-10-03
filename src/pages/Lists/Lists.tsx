import { useTranslationWrapper } from 'services/Translation';
import { useRecoilValue } from 'recoil';
import { itemListState } from '../../state/listState';
import { CreateList } from './CreateList';
import { ListsOverview } from './ListsOverview';
import { modalSelector } from 'state/modalState';
import { ModalContent } from 'components/Modal/content';
import { CreateButton } from 'components/Modal/create';

export const Lists = () => {
  const item_lists = useRecoilValue(itemListState);
  const t = useTranslationWrapper();
  const message = item_lists.length === 0 ? t('list.no_lists_found') : undefined;

  return (
    <>
      {item_lists.length > 0 ? <ListsOverview item_lists={item_lists} /> : null}
      <ModalContent modal={modalSelector.CREATE} message={message}>
        <CreateList />
      </ModalContent>
      <CreateButton />
    </>
  );
};

import { useTranslation } from 'react-i18next';
import { useRecoilValueLoadable } from 'recoil';
import { DisplayError } from '../../components/DisplayError';
import { isErrorResponse } from '../../models/ErrorResponse';
import { myLists } from '../../state/listState';
import { CreateContent } from '../CreateContent';
import { CreateList } from './CreateList';
import { ListOverview } from './ListOverview';

export const Lists = () => {
  const listsLoadable = useRecoilValueLoadable(myLists);
  const response = listsLoadable.state === 'hasValue' ? listsLoadable.contents : [];
  const { t } = useTranslation();

  return isErrorResponse(response) ? (
    <>
      {response.status === 404 && (
        <CreateContent message={t('list.no_lists_found')}>
          <CreateList />
        </CreateContent>
      )}
      {response.status !== 404 && <DisplayError error={response} />}
    </>
  ) : (
    <ListOverview />
  );
};

import { useRecoilValueLoadable } from 'recoil';
import { DisplayError } from '../../components/DisplayError';
import { isErrorResponse } from '../../models/ErrorResponse';
import { myLists } from '../../state/listState';
import { NothingFoundContent } from './NothingFoundContent';
import { ListOverview } from './ListOverview';

export const Lists = () => {
  const listsLoadable = useRecoilValueLoadable(myLists);
  const response = listsLoadable.state === 'hasValue' ? listsLoadable.contents : [];

  return isErrorResponse(response) ? (
    <>
      {response.status === 404 && <NothingFoundContent />}
      {response.status !== 404 && <DisplayError error={response} />}
    </>
  ) : (
    <ListOverview />
  );
};

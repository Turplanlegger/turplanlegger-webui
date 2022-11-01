import { useRecoilValueLoadable } from 'recoil';
import { isErrorResponse } from '../../models/ErrorResponse';
import { myLists } from '../../state/listState';
import { ErrorContent } from './ErrorContent';
import { ListOverview } from './ListOverview';

export const Lists = () => {
  const listsLoadable = useRecoilValueLoadable(myLists);
  const lists = listsLoadable.state === 'hasValue' ? listsLoadable.contents : [];
  return isErrorResponse(lists) ? <ErrorContent /> : <ListOverview lists={lists} />;
};

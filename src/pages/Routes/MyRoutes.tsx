import { ModalContent } from 'components/Modal/content';
import { CreateButton } from 'components/Modal/create';
import { useRecoilValue } from 'recoil';
import { useTranslationWrapper } from 'services/Translation';
import { modalSelector } from 'state/modalState';
import { routeState } from 'state/routeState';
import { RoutesOverview } from './RoutesOverview';
import { CreateRoute } from './CreateRoute';

export const MyRoutes = () => {
  const routes = useRecoilValue(routeState);
  const t = useTranslationWrapper();
  const message = routes.length === 0 ? t('route.no_routes_found') : undefined;
  return (
    <>
      {routes.length > 0 ? <RoutesOverview routes={routes} /> : null}
      <ModalContent modal={modalSelector.CREATE} message={message}>
        <CreateRoute />
      </ModalContent>
      <CreateButton />
    </>
  );
};

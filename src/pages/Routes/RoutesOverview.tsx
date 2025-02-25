import { Route } from "models/Types";

interface Props {
    routes: Route[];
}

export const RoutesOverview = ({routes}: Props) => {


    return <p>Routes: {routes.length}</p>
}
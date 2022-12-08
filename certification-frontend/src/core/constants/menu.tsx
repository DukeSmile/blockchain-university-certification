import { RouteItemProp } from "../interfaces/base";
import { CertificationPage } from "../../pages/certification";
import { WatchCertificationPage } from "../../pages/display";

export const routeItems: RouteItemProp[] = [
    {
        url: '/',
        owner: 0,
        element: <WatchCertificationPage />
    },
    {
        url: '/create',
        owner: 0,
        element: <CertificationPage />
    }
];
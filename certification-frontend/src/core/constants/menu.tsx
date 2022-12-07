import { RouteItemProp } from "../interfaces/base";
import { CertificationPage } from "../../pages/certification";

export const routeItems: RouteItemProp[] = [
    {
        url: '/',
        owner: 0,
        element: <CertificationPage />
    },
    {
        url: '/create',
        owner: 0,
        element: <CertificationPage />
    }
];
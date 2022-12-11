import { RouteItemProp } from "../interfaces/base";
import { CertificationPage } from "../../pages/certification";
import { WatchCertificationPage } from "../../pages/display";
import { ProcessManage } from "../../pages/process";

export const routeItems: RouteItemProp[] = [
    {
        url: '/',
        owner: 0,
        element: <WatchCertificationPage />
    },
    {
        url: '/create',
        owner: 1,
        element: <CertificationPage />
    },
    {
        url: '/process',
        owner: 1,
        element: <ProcessManage />
    }
];
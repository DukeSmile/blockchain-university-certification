import { RouteItemProp } from "../interfaces/base";
import { CertificationPage } from "../../pages/certification";
import { WatchCertificationPage } from "../../pages/display";
import { WatchOtherCertificationPage } from "../../pages/display/other";
import { ProcessManage } from "../../pages/process";

export const routeItems: RouteItemProp[] = [
    {
        url: '/',
        owner: 0,
        element: <WatchCertificationPage />
    },
    {
        url: '/check',
        owner: 0,
        element: <WatchOtherCertificationPage />
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
import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import { Cookies } from 'src/pages/miscelanea/cookies';
import { HelpCenter } from 'src/pages/miscelanea/helpcenter';
import { Privacity } from 'src/pages/miscelanea/privacity';
import { UseTerms } from 'src/pages/miscelanea/useterms';


// dashboard routing
//const Dashboard = Loadable(lazy(() => import('src/pages/dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const StaticRoutes = {
    path: '/legal',
    element: <MainLayout />,
    children: [
        {
            path: '/legal/cookies',
            element: <Cookies />
        },
        {
            path: '/legal/helpcenter',
            element: <HelpCenter />
        },
        {
            path: '/legal/privacity',
            element: <Privacity />
        },
        {
            path: '/legal/useterms',
            element: <UseTerms />
        },
    ]
};

export default StaticRoutes;

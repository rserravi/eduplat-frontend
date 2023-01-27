import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MinimalLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const Landing = Loadable(lazy(() => import('src/pages/landingPage')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/',
            element: <Landing />
        }, 
        {
            path: 'dashboard',
            children: [
                {
                    path: 'default',
                    element: <Landing />
                }
            ]
        }
    ]
};

export default MainRoutes;

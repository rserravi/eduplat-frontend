import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
const Landing = Loadable(lazy(() => import('src/pages/landingPage')));
const Dashboard = Loadable(lazy(() => import('src/pages/dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: 'dashboard',
            element: <Dashboard />
        }, 
        {
            path: '/dashboard',
            children: [
                {
                    path: 'default',
                    element: <Dashboard />
                }
            ]
        }
    ]
};

export default MainRoutes;

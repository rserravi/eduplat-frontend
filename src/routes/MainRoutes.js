import { lazy } from 'react';
import { EdusourcePage } from 'src/pages/edusource/edusource';
import { UserPage } from 'src/pages/user/userPage';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

// dashboard routing
//const Dashboard = Loadable(lazy(() => import('src/pages/dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
    path: '/',
    element: <MainLayout />,
    children: [
        {
            path: '/edusource/:id',
            element: <EdusourcePage />
        },
        {
            path: 'user/:id',
            element: <UserPage />
        }
    ]
};

export default MainRoutes;

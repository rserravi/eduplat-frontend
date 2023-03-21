//import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
//import Loadable from '../ui-component/Loadable';

import { OpenSearch } from 'src/pages/search/openSearch';


// dashboard routing
//const Dashboard = Loadable(lazy(() => import('src/pages/dashboard')));

// ==============================|| MAIN ROUTING ||============================== //

const SearchRoutes = {
    path: '/search',
    element: <MainLayout />,
    children: [
        {
            path: '/search',
            element: <OpenSearch />
        },
        {
            path: '/search/:type/',
            element: <OpenSearch />
        },   
        {
            path: '/search/:type/:terms',
            element: <OpenSearch />
        },      
    ]
};

export default SearchRoutes;

import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';

import { OpenSearch } from 'src/pages/search/openSearch';
import { UserSearch } from 'src/pages/search/userSearch';
import { CollectionsSearch } from 'src/pages/search/collectionsSearch';


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
            path: '/search/:terms',
            element: <OpenSearch />
        },
        {
            path: '/search/users',
            element: <UserSearch />
        },
        {
            path: '/search/users/:terms',
            element: <UserSearch />
        },
        {
            path: '/search/collections',
            element: <CollectionsSearch />
        },
        {
            path: '/search/collections/:terms',
            element: <CollectionsSearch />
        }, 
        
    ]
};

export default SearchRoutes;

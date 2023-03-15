import { lazy } from 'react';

// project imports
import MainLayout from '../layout/MainLayout';
import Loadable from '../ui-component/Loadable';
import { SearchByLevel } from 'src/pages/search/searchByLevel';
import { SearchByCategories } from 'src/pages/search/searchByCategories';
import { SearchByResourceType } from 'src/pages/search/searchByResourceType';
import { SearchByThemes } from 'src/pages/search/searchByThemes';
import { OpenSearch } from 'src/pages/search/openSearch';
import { Serp } from 'src/pages/search/serp';


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
            path: '/search/bylevel',
            element: <SearchByLevel />
        },
        {
            path: '/search/bylevel/:terms',
            element: <SearchByLevel />
        },
        {
            path: '/search/bycategories/:terms',
            element: <SearchByCategories />
        },
        {
            path: '/search/byresourcetype/:terms',
            element: <SearchByResourceType />
        },
        {
            path: '/search/bythemes/:terms',
            element: <SearchByThemes />
        },
        
        {
            path: '/search/serp/:terms',
            element: <Serp />
        } 
        
    ]
};

export default SearchRoutes;

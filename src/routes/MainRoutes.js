import { lazy } from 'react';
import { CreateCollection } from 'src/collections/createCollection';
import { CreateEdusource } from 'src/components/resources/createEdusource';
import { EditEdusource } from 'src/components/resources/editEdusource';
import { EdusourcePage } from 'src/pages/edusource/edusource';
import { LandingPage } from 'src/pages/landingPage';
import { Connect } from 'src/pages/miscelanea/connect';
import { EventsPage } from 'src/pages/miscelanea/events';
import { Volunteers } from 'src/pages/miscelanea/volunteers';
import { UserPage } from 'src/pages/user/userPage';
import { MyAccount } from 'src/pages/myAccount/myAccountPage';


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
            path: '/',
            element: <LandingPage />
        },
        
        {
            path: '/resources/:id',
            element: <EdusourcePage />
        },
        {
            path: "/resources/create",
            element: <CreateEdusource />
        },
        {
            path: "/resources/edit/:editUrl",
            element: <EditEdusource />
        },
        {
            path: "/collections/create",
            element: <CreateCollection />
        },
        {
            path: 'user/:id',
            element: <UserPage />
        },
        {
            path: '/events',
            element: <EventsPage />
        },
        {
            path: '/aboutus',
            element: <EventsPage />
        },
        {
            path: '/volunteers',
            element: <Volunteers />
        },
        {
            path: '/connect',
            element: <Connect />
        },
        {
            path: '/myaccount',
            element: <MyAccount />
        },
        {
            path: '/myaccount/:tab/',
            element: <MyAccount />
        },   

    ]
};

export default MainRoutes;

//import { lazy } from 'react';
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
import { AboutUs } from 'src/pages/miscelanea/aboutus';
import { Discipline } from 'src/pages/discipline';


// project imports
import MainLayout from '../layout/MainLayout';
//import Loadable from '../ui-component/Loadable';
import { Messages } from 'src/pages/messages/messagesPage';
import { JustTheme, ThemePage } from 'src/pages/themePage';
import { LevelPage } from 'src/pages/levelPage';
import { KarmaPage } from 'src/pages/miscelanea/karmaPage';
import { LanguagePage } from 'src/pages/languagePage';
import { TypePage } from 'src/pages/typePage';



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
            element: <AboutUs />
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
        {
            path: '/discipline/:cat',
            element: <Discipline />
        },
        {   
            path: 'theme/',
            element: <JustTheme />
        },
        {   
            path: 'theme/:thm',
            element: <ThemePage />
        },
        {   
            path: 'level/:level',
            element: <LevelPage />
        },
        {   
            path: 'language/:lang',
            element: <LanguagePage />
        },
        {   
            path: 'type/:type',
            element: <TypePage />
        },
        {
            path: '/aboutus',
            element: <AboutUs />
        },
        {
            path: '/messages',
            element: <Messages />
        },
        {
            path: '/karma',
            element: <KarmaPage />
        }

    ]
};

export default MainRoutes;

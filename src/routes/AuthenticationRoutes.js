
// project imports
import MinimalLayout from '../layout/MinimalLayout';

// login option 3 routing
import {LoginPage} from 'src/pages/auth/login';
import { NotVerified } from 'src/pages/auth/notverified';
import {RegisterPage} from 'src/pages/auth/register';
import { UserVerification } from 'src/pages/auth/userverification';
import { RecoverPassword } from 'src/pages/auth/recover';
import { ForgotPassword } from 'src/pages/auth/forgotpassword';

//import {LandingPage} from 'src/pages/landingPage';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
       /*  {
            path: '/',
            element: <LandingPage />
        }, */
        {
            path: '/login/',
            element: <LoginPage />
        },
        {
            path: '/register',
            element: <RegisterPage />
        },
        {
            path: '/notverified/:email',
            element: <NotVerified />
        },
        {
            path: 'verification/:randomUrl/:email',
            element: <UserVerification />
        },
        {
            path: '/forgotpassword',
            element: <ForgotPassword />
        },
        {
            path: '/recovery/:pin/:email',
            element: <RecoverPassword />
        }
    ]
};

export default AuthenticationRoutes;

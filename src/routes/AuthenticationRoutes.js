
// project imports
import MinimalLayout from '../layout/MinimalLayout';

// login option 3 routing
import {LoginPage} from 'src/pages/auth/login';
import {RegisterPage} from 'src/pages/auth/register';
import {LandingPage} from 'src/pages/landingPage';

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
    path: '/',
    element: <MinimalLayout />,
    children: [
        {
            path: '/',
            element: <LandingPage />
        },
        {
            path: '/login/',
            element: <LoginPage />
        },
        {
            path: '/register',
            element: <RegisterPage />
        }
    ]
};

export default AuthenticationRoutes;

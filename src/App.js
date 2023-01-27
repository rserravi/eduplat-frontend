import { BrowserRouter } from 'react-router-dom';

import { CssBaseline, StyledEngineProvider } from '@mui/material';

// routing
import Routes from './routes';


// ==============================|| APP ||============================== //

const App = () => {

    return (
        <StyledEngineProvider injectFirst>
            
                <CssBaseline />
                <BrowserRouter>
                    <Routes />
                </BrowserRouter>
         
        </StyledEngineProvider>
    );
};

export default App;